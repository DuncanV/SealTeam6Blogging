import * as express from "express";
import { authenticateAccessToken } from "../middleware/auth";
import {IContent, IResponse} from "../common/Interfaces";
const BlogsRouter = express.Router();
import { Mongo } from "../db/dbconfig";
import { logBlogs } from "../middleware/logger";

const getConnection = () => {
  try{
    return Mongo.client.db(process.env.MONGO_DATABASE).collection("blogs");
  } catch{
    logBlogs("Invalid Connection to DB","error");
    throw new Error("Invalid Connection to DB")
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
    const sort = {created:-1}
    await getConnection().find().sort(sort).toArray( (err, result) => {
      if(err) throw new Error("Failed to retrieve blogs");
      res.status(200).json({message:"Blogs retrieved", data:result})
    });
  }catch(e) {
    // TODO log error
    logBlogs(e.message,"error");
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
  try{
    const query = {id: parseInt(req.params.id, 10)};

    const queryResult = await getConnection().findOne(query);
    if(isEmpty(queryResult))
    {
      logBlogs("Invalid blog ID","error");
      throw new Error("Invalid blog ID");
    }      

    if(queryResult.username !== user)
    {
      logBlogs("Unauthorised to Delete Blog", "error");
      throw new Error("Unauthorised To Delete Blog");
    }

    await getConnection().updateOne(query, {$set:{deleted: true}}, (err, result) =>{
      if(err) 
      {
        logBlogs("Cannot Delete Blog","error");
        throw new Error("Cannot Delete Blog");
      }
      res.status(200).json({message:"Blog Deleted"});
    });
  }catch(e) {
    // TODO log error
    logBlogs(e.message,"error");
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
      throw new Error("Invalid blog ID")

    if(queryResult.username !== user)
      throw new Error("Unauthorised To Update Blog")

    const objToAdd = {
      content: isEmpty(req.body.content)?queryResult.content: req.body.content ,
      title: isEmpty(req.body.title)?queryResult.title: req.body.title ,
      visible: req.body.visible? true: false
    }

    await getConnection().updateOne(query, {$set:objToAdd}, (err, result) =>{
      if(err) throw new Error("Cannot Update Blog")
      res.status(200).json({message:"Blog Updated"});
    });
  }catch(e) {
    // TODO log error
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
      throw new Error("Invalid blog ID")

    let liked = false;
    if (!queryResult.likes.includes(user)){
        liked = true;
        queryResult.likes.push(user);
    }

    if(liked){
      await getConnection().updateOne(query, {$set:{likes: queryResult.likes}}, (err, result) =>{
        if(err) throw new Error("Cannot Like Blog")
        res.status(200).json({message:"Blog Liked"});
      });
    }else{
      res.status(200).json({message:"Blog Liked"});
    }

  }catch(e) {
    // TODO log error
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
      throw new Error("No Content")
    if(isEmpty(req.body.title))
      throw new Error("No Title")
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
    getConnection().insertOne(objToAdd, (err, result) => {
      if(err) throw new Error("Cannot Create Blog")
      res.status(201).json({message:"Blog Created"})
    });
  }catch(e) {
    // TODO log error
    res.status(400).json({message:e.message})
  }
});

export { BlogsRouter };
