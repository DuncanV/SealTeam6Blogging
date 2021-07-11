import * as express from "express";
import { authenticateAccessToken } from "../middleware/auth";
import {IContent, IResponse} from "../common/Interfaces";
const BlogsRouter = express.Router();
import { Mongo } from "../db/dbconfig";
import {ERole} from "../common/Enums";
import { logBlogs } from "../middleware/logger";
import { BlogError } from "../errors/BlogError";
import sanitize from 'mongo-sanitize';

const getConnection = () => {
  try{
    return Mongo.client.db(process.env.MONGO_DATABASE).collection("blogs");
  } catch{
    throw new BlogError("Invalid Connection to DB", "error");
  }
}

async function getNextSequenceValue (){
  const db = Mongo.client.db(process.env.MONGO_DATABASE).collection("counters");
  const sequenceDocument = await db.findOneAndUpdate(
      {_id: "blogId"},
      {$inc: {sequence_value: 1}}
  );
  return sequenceDocument.value.sequence_value;
}

function isEmpty(field:any){
  if(field === null || field === undefined || field === "")
    return true;
  return false;
}
/*
Required: Nothing
 */
BlogsRouter.get("/blogs", async (req, res) => {
  try{
    const notDeleted = {deleted:false};
    const sort = {created:-1};
    await getConnection().find(notDeleted).sort(sort).toArray( (err, result) => {
      if(err)
      {
         throw new BlogError("Failed to retrieve blogs", "error");
      }
      logBlogs("Blogs retrieved","info");

      res.status(200).json({message:"Blogs retrieved", data:result})
    });
  }catch(e) {
    res.status(400).json({message:e.message})
  }
});

/*
Required: id - id of the blog to be 'deleted' - in the url
Obtain: username - from JWT
Can possibly check the roles to see if an admin can delete a blog
 */
BlogsRouter.delete("/blogs/:id", authenticateAccessToken, async(req, res) => {
  const user = req.body.user.username;
  const role = req.body.role;
  try{
    const query = {id: parseInt(req.params.id, 10)};

    const queryResult = await getConnection().findOne(query);
    if(isEmpty(queryResult))
    {
      throw new BlogError("Invalid blog ID", "error");
    }

    if(queryResult.username !== user)
	{
    if(role !== ERole.admin && queryResult.username !== user)
    {
      throw new BlogError("Unauthorised To Delete Blog", "error");
    }
}
    await getConnection().updateOne(query, {$set:{deleted: true}}, (err, result) =>{
      if(err)
      {
        throw new BlogError("Cannot Delete Blog", "error");
      }
      logBlogs("Blogs Deleted","info");
      res.status(200).json({message:"Blog Deleted"});
    });
  }catch(e) {
    res.status(400).json({message:e.message})
  }
});

/*
Required: id - id of the blog to be 'altered' - in the url
Obtain: username - from JWT,
        visible - from body (optional),
        content - from body (optional),,
        title: from body (optional),
 */
BlogsRouter.put("/blogs/:id", authenticateAccessToken, async (req, res) => {
  const user = req.body.user.username;
  try{
    const query = {id: parseInt(req.params.id, 10)};

    const queryResult = await getConnection().findOne(query);
    if(isEmpty(queryResult))
      throw new BlogError("Invalid blog ID", "error");

    if(queryResult.username !== user)
      throw new BlogError("Unauthorised To Update Blog", "error");

    const objToAdd = {
      content: isEmpty(req.body.content)?queryResult.content: req.body.content ,
      title: isEmpty(req.body.title)?queryResult.title: req.body.title ,
      visible: req.body.visible? true: false
    }

    await getConnection().updateOne(query, {$set:sanitize(objToAdd)}, (err, result) =>{
      if(err)
       {
         throw new BlogError("Cannot Update Blog", "error");
       }
       logBlogs("Blog updated","info");
      res.status(200).json({message:"Blog Updated"});
    });
  }catch(e) {
    res.status(400).json({message:e.message})
  }
});

/*
Required: id - id of the blog to be liked - in the url
Obtain: username - from JWT
*/
BlogsRouter.put("/blogs/like/:id", authenticateAccessToken, async (req, res) => {
  const user = req.body.user.username;
  try{
    const query = {id: parseInt(req.params.id, 10)};

    const queryResult = await getConnection().findOne(query);
    if(isEmpty(queryResult))
      throw new BlogError("Invalid blog ID", "error");

    let liked = false;
    if (!queryResult.likes.includes(user)){
        liked = true;
        queryResult.likes.push(user);
    }else{
      for(let count = 0; count<queryResult.likes.length;count++){
        if(queryResult.likes[count] === user){
          queryResult.likes.splice(count,1);
          break
        }
      }
    }

    if(liked){
      await getConnection().updateOne(query, {$set:{likes: sanitize(queryResult.likes)}}, (err, result) =>{
        if(err) throw new Error("Cannot Like Blog")
        res.status(200).json({message:"Blog Liked"});
      });
    }else{
      await getConnection().updateOne(query, {$set:{likes: sanitize(queryResult.likes)}}, (err, result) =>{
        if(err) throw new Error("Cannot unlike Blog")
        res.status(200).json({message:"Blog unliked"});
      });
    }

  }catch(e) {
    res.status(400).json({message:e.message})
  }
});

/*
Required: title, content
Obtain: id - from sequence
        username - from JWT,
        likes - empty array
        created - new date()
        deleted - false
        visible - true
 */
BlogsRouter.post("/blogs", authenticateAccessToken, async (req, res) => {
  try{
    if(isEmpty(req.body.content))
      throw new BlogError("No Content", "error");
    if(isEmpty(req.body.title))
      throw new BlogError("No Title", "error");
    const objToAdd: IContent = {
      content: req.body.content,
      created: new Date(),
      deleted: false,
      id: await getNextSequenceValue(),
      likes: [],
      title: req.body.title,
      username: req.body.user.username,
      visible: true
    }
    getConnection().insertOne(sanitize(objToAdd), (err, result) => {
      if(err)
      {
        throw new BlogError("Cannot Create Blog", "error");
      }
      logBlogs("Blog Created","info");
      res.status(201).json({message:"Blog Created"})
    });
  }catch(e) {
    res.status(400).json({message:e.message})
  }
});

export { BlogsRouter };
