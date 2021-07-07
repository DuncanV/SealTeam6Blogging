import * as express from "express";
import bcrypt from "bcrypt";
import {
  authenticateAccessToken,
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/auth";
import jwt from "jsonwebtoken";
import { Mongo } from "../db/dbconfig";
import { logUsers } from "../middleware/logger";

const UserRouter = express.Router();
const getConnection = () => {
  try{
    return Mongo.client.db(process.env.MONGO_DATABASE).collection("users");
  } catch{
    logUsers("Invalid Connection to DB","error");
    throw new Error("Invalid Connection to DB")
  }
}

async function getNextSequenceValue (){
  const db = Mongo.client.db(process.env.MONGO_DATABASE).collection("counters");
  const sequenceDocument = await db.findOneAndUpdate(
      {_id: "userId"},
      {$inc: {sequence_value: 1}}
  );
  return sequenceDocument.value.sequence_value;
}

/*
Required:
Obtain:
 */
UserRouter.post("/login", async (req, res) => {
  try {
    // if(await bcrypt.compare(req.body.password, user.passwordHash)){
    // user found and passwords match
    const collection = getConnection();
    const username = req.body.username;
    const user = { username };
    const accessToken = generateAccessToken(user);
    logUsers(username+" logged in","info");
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken });
    // }else{
    //     //passwords dont match
    //     res.status(401).send()
    // }
  } catch {
    logUsers("Login failed for "+req.body.username,"info");
    res.sendStatus(500);
  }
});

/*
Required:
Obtain:
 */
UserRouter.post("/signup", async (req, res) => {
  try {
    // bcrypt stores the salt so no need to store salt in the db
    // second param is the size of the salt
    const collection = getConnection();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    res.status(201).send();
    logUsers("Signed up!","info");
  } catch {
    logUsers("SignUp failed","error");
    res.sendStatus(500);
  }
});

/*
Required:
Obtain:
 */
UserRouter.post("/refresh", (req, res) => {
  // refresh the jwt token
  const collection = getConnection();
  const refreshToken = req.body.refreshToken;
  // find the refresh tokens in the db
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err)
      {
        logUsers("Refresh failed "+user.username+"!","error");
        return res.sendStatus(403);
      }
      const accessToken = generateAccessToken({ username: user.username });
      logUsers("Refresh worked for "+user.username+"!","info");
      res.json({ accessToken });
    }
  );
});

/*
Required:
Obtain:
 */
UserRouter.delete("/logout", (req, res) => {
  // delete the refresh token from the db
  const collection = getConnection();
    logUsers(" logged out","info");

  res.sendStatus(501);
});

/*
Required:
Obtain:
 */
UserRouter.put("/user", authenticateAccessToken, (req, res) => {
  const collection = getConnection();
  res.sendStatus(501);
});

export { UserRouter };
