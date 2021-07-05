import * as express from "express";
import { authenticateAccessToken } from "../middleware/auth";
import { IContent } from "../common/Interfaces";
const BlogsRouter = express.Router();
import { Mongo } from "../db/dbconfig";

const getConnection = () => {
  return Mongo.client.db(process.env.MONGO_DATABASE).collection("users");
}

const blogs: IContent[] = [
  {
    id: 1,
    username: "GerritBurger",
    title: "First post by Gerrit",
    likes: ["Duncan", "Wesley"],
    content:
      "This is static content for testing purposes only, dsaf sdf asdf asuidfgui asdkgfui ewquiebqwf uiebwfuil asbjifbsl fbasjklfbeuiw asdfvbashdfk jasdv fkjasvdf kasdvas dkfjavsdf jdf askdjlf kasjdhf klasjhd fkjbwe dlfkqjwe b asdfb asjkldfb jkasdfbl askjfbadsfjkl ",
    created: new Date(),
    deleted: false,
    visible: true,
  },
  {
    id: 2,
    username: "GerritBurger",
    title: "First post by Gerrit",
    likes: ["Duncan", "Wesley"],
    content: "This is static content for testing purposes only",
    created: new Date(),
    deleted: false,
    visible: true,
  },
];

BlogsRouter.get("/blogs", (req, res) => {
  const collection = getConnection();
  res.json(blogs);
});

BlogsRouter.delete("/blogs/:id", authenticateAccessToken, (req, res) => {
  const collection = getConnection();
  res.sendStatus(501);
});

BlogsRouter.put("/blogs/:id", authenticateAccessToken, (req, res) => {
  const collection = getConnection();
  res.sendStatus(501);
});

BlogsRouter.post("/blogs", authenticateAccessToken, (req, res) => {
  const collection = getConnection();
  res.sendStatus(200);
});

export { BlogsRouter };
