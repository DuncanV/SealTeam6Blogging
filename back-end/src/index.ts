import express from "express";
import dotenv from "dotenv";
import { UserRouter } from "./routes/user";
import { BlogsRouter } from "./routes/blog";
import { Mongo } from "./db/dbconfig";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/../../front-end/dist/front-end"));
dotenv.config({ path: __dirname + "/../.env" });

const port = process.env.SERVER_PORT; // default port to listen

app.use(UserRouter);
app.use(BlogsRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(__dirname + "/../../front-end/dist/front-end/index.html")
    );
});

app.use((error:any, req:any, res:any, next:any) => {
  if(error instanceof SyntaxError){ // Handle SyntaxError here.
    return res.status(500).send({data : "Invalid data"});
  } else {
    next();
  }
});

// start the Express server
app.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);
  try {
    await Mongo.connect(process.env.MONGO_CONNECTION_URL);
    const db = process.env.MONGO_DATABASE;
    console.info(`MongoDB Status: Connected`);
  } catch (error) {
    console.error(error);
  }
});
