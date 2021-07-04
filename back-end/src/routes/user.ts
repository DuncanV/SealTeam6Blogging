import * as express from "express";
import bcrypt from "bcrypt";
import {
  authenticateAccessToken,
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/auth";
import jwt from "jsonwebtoken";
import { Mongo } from "../db/dbconfig";

const UserRouter = express.Router();
const getConnection = () => {
  return Mongo.client.db(process.env.MONGO_DATABASE).collection("users");
}

UserRouter.post("/login", async (req, res) => {
  try {
    // if(await bcrypt.compare(req.body.password, user.passwordHash)){
    // user found and passwords match
    const collection = getConnection();
    const username = req.body.username;
    const user = { user: username };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken });
    // }else{
    //     //passwords dont match
    //     res.status(401).send()
    // }
  } catch {
    res.sendStatus(500);
  }
});

UserRouter.post("/signup", async (req, res) => {
  try {
    // bcrypt stores the salt so no need to store salt in the db
    // second param is the size of the salt
    const collection = getConnection();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    res.status(201).send();
  } catch {
    res.sendStatus(500);
  }
});

UserRouter.post("/refresh", (req, res) => {
  // refresh the jwt token
  const collection = getConnection();
  const refreshToken = req.body.token;
  // find the refresh tokens in the db
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accesstoken: accessToken });
    }
  );
});

UserRouter.delete("/logout", (req, res) => {
  // delete the refresh token from the db
  const collection = getConnection();
  res.sendStatus(501);
});

UserRouter.put("/user", authenticateAccessToken, (req, res) => {
  const collection = getConnection();
  res.sendStatus(501);
});

export { UserRouter };
