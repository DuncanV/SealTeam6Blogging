import express from "express";
import dotenv from "dotenv";
import { UserRouter } from "./routes/user";
import { BlogsRouter } from "./routes/blog";
import { Mongo } from "./db/dbconfig";

const app = express();
app.use(express.json());
dotenv.config({ path: __dirname + "./../.env" });

const port = process.env.SERVER_PORT || 3000; // default port to listen

app.use(UserRouter);
app.use(BlogsRouter);

app.get("/", (req, res) => {
  // return website (angular)
  res.sendStatus(400);
});

// start the Express server
app.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);

  try {
    await Mongo.connect(`mongodb+srv://sealteam:Se@lTeam123!@sealteam6blogging.jcabz.mongodb.net/SealTeam6Blogging?retryWrites=true&w=majority`);// process.env.MONGO_CONNECTION_URL);
    const db = process.env.MONGO_DATABASE;
    console.info(`MongoDB Status: Connected`);
  } catch (error) {
    console.error(error);
  }
});
