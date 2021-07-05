import * as express from "express";
import { authenticateAccessToken } from "../middleware/auth";
import {IContent, IResponse} from "../common/Interfaces";
const BlogsRouter = express.Router();
import { Mongo } from "../db/dbconfig";
import {create} from "domain";

const getConnection = () => {
  try{
    return Mongo.client.db(process.env.MONGO_DATABASE).collection("blogs");
  } catch{
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
      throw new Error("Invalid blog ID")

    if(queryResult.username !== user)
      throw new Error("Unauthorised To Delete Blog")

    await getConnection().updateOne(query, {$set:{deleted: true}}, (err, result) =>{
      if(err) throw new Error("Cannot Delete Blog")
      res.status(200).json({message:"Blog Deleted"});
    });
  }catch(e) {
    // TODO log error
    res.status(400).json({message:e.message})
  }
});

/*
Required: id - id of the blog to be 'altered' - in the url
Obtain: username - from JWT,
        likes - from body ,
        visible - from body,
        content - from body,
        title: from body
 */
BlogsRouter.put("/blogs/:id", authenticateAccessToken, (req, res) => {
  const collection = getConnection();
  res.sendStatus(501);
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
    await getConnection().insertOne(objToAdd);
    res.status(201).json({message:"Blog Created"})
  }catch(e) {
    // TODO log error
    res.status(400).json({message:e.message})
  }
});

export { BlogsRouter };
