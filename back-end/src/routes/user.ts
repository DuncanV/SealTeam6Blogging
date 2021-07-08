import * as express from "express";
import bcrypt from "bcrypt";
import {authenticateAccessToken, generateAccessToken, generateRefreshToken,} from "../middleware/auth";
import jwt from "jsonwebtoken";
import {Mongo} from "../db/dbconfig";
import {IUser} from "../common/Interfaces";
import {ERole} from "../common/Enums";
import {TransactionOptions} from "mongodb";
import { logUsers } from "../middleware/logger";
import { UserError } from "../errors/UserError"
import sanitize from 'mongo-sanitize';

const UserRouter = express.Router();
const getConnection = () => {
  try{
    return Mongo.client.db(process.env.MONGO_DATABASE).collection("users");
  } catch{
    throw new UserError("Invalid Connection to DB","error");
  }
}

async function getNextSequenceValue() {
    const db = Mongo.client.db(process.env.MONGO_DATABASE).collection("counters");
    const sequenceDocument = await db.findOneAndUpdate(
        {_id: "userId"},
        {$inc: {sequence_value: 1}}
    );
    return sequenceDocument.value.sequence_value;
}

function isEmpty(field: any) {
    if (field === null || field === undefined || field === "")
        return true;
    return false;
}

function isValidPassword(field: any) {
    return field.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{10,})');
}


/*
Required:
  username - req.body;
  password - req.body;
Obtain:
  accessToken - create
  refreshToken - create
 */
UserRouter.post("/login", async (req, res) => {
    if (isEmpty(req.body.username))
        throw new UserError("Missing Username","error");
    if (isEmpty(req.body.password))
        throw new UserError("Missing Password","error");
    try {
        const userQuery = {username: req.body.username};
        const userResult = await getConnection().findOne(sanitize(userQuery));
        logUsers("Prepare Login Username:" + req.body.username, "info");
        if (!userResult)
        throw new UserError("Username and Password Incorrect","error");

        if (await bcrypt.compare(req.body.password, userResult.passwordHash)) {
            const token = {username: userResult.username};
            const accessToken = generateAccessToken(token);
            const refreshToken = generateRefreshToken(token);
            const objToReturn: any = {
                accessToken,
                refreshToken,
                firstname: userResult.firstname,
                lastname: userResult.lastname,
                username: userResult.username,
                role: userResult.role
            };
            getConnection().updateOne(sanitize(userResult), {$set: {refreshToken}}, (err, result) => {
                if (err) return res.status(500).json({message: "Could not update refresh token"})
				logUsers(" logged in","info");
                return res.status(200).json(objToReturn);
            });

        logUsers("Login Successful", "info");
        logUsers(objToReturn, "info");
        } else {
            logUsers("Username and Password Incorrect", "error");
            return res.status(401).send({message: "Username and Password Incorrect"})
        }
    } catch (e) {
        return res.status(401).json({message: e.message})
    }
});

/*
Required:
  username - req.body;
  password - req.body;
  passwordConfirmed - req.body
  firstname - req.body;
  lastname - req.body;
  email - req.body;
Obtain:
  deleted - false
  created - new date
  id - next sequence
  roles - user
  refreshToken - create it
 */
UserRouter.post("/signup", async (req, res) => {
    try {
        if (isEmpty(req.body.username))
        throw new UserError("Missing Username","error");
        if (isEmpty(req.body.password))
            throw new UserError("Missing Password","error");
        if (!isValidPassword(req.body.password))
            throw new UserError("Invalid password","error");
        if (isEmpty(req.body.passwordConfirmed))
            throw new UserError("Missing passwordConfirmed","error");
        if (req.body.passwordConfirmed !== req.body.password)
            throw new UserError("Passwords Don't Match","error");
        if (isEmpty(req.body.firstname))
            throw new UserError("Missing firstname","error");
        if (isEmpty(req.body.lastname))
            throw new UserError("Missing lastname","error");
        // TODO possibly add email and use regex
        const currentUser = await getConnection().findOne({username:sanitize(req.body.username)});
        if(currentUser)
            throw new UserError("Cannot Create User","error");

        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            if (err) return res.sendStatus(500);
            const objToAdd: IUser = {
                created: new Date(),
                deleted: false,
                // email: req.body.email,
                firstname: req.body.firstname,
                id: await getNextSequenceValue(),
                lastname: req.body.lastname,
                passwordHash: hashedPassword,
                refreshToken: null,
                role: ERole.user,
                username: req.body.username
            };

            await getConnection().insertOne(sanitize(objToAdd), (insErr, result) => {
                if (insErr) return res.status(400).json({message: "Cannot Create User"})
                logUsers("Sign up Successful", "info");
                return res.status(201).json({message: "User Created"})
            });
        });
    } catch (e) {
        return res.status(400).json({message: e.message})
    }
});

/*
Required: refreshToken - req.body
Obtain: new accessToken - create
 */
UserRouter.post("/refresh", async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        const query = {refreshToken};
        const queryResult = await getConnection().findOne(sanitize(query));
        if (queryResult){
            await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err: any, user: any) => {
                    if (err)
					{
						logUsers("Refresh failed "+user.username+"!","error");
						return res.status(403).json({message: "Invalid Refresh Token"});
					}
                    const accessToken = generateAccessToken({username: user.username});
      				logUsers("Refresh worked for "+user.username+"!","info");
                    return res.status(200).json({accessToken});
                }
            );
        }else{
            throw new UserError("Invalid Token","error");
        }
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
});

/*
Required: refreshToken - req.body
 */
UserRouter.delete("/logout", (req, res) => {
    try {
        if (isEmpty(req.body.refreshToken))
            throw new UserError("Missing Refresh Token","error");

        const query = {refreshToken: req.body.refreshToken};
        getConnection().updateOne(sanitize(query), {$set: {refreshToken: null}}, (err, result) => {
            if (err) return res.status(400).json({message: "Cannot Log User Out"});
			logUsers(" logged out","info");
            return res.status(200).json({message: "User Logged Out"})
        });
        logUsers("Logout Successful", "info");
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
});

/*
Required:
  username - req.body (optional);
  password - req.body (optional);
  passwordConfirmed - req.body (required if password is present)
  firstname - req.body (optional);
  lastname - req.body (optional);
  email - req.body (optional);
Obtain:
 */
UserRouter.put("/user", authenticateAccessToken, async (req, res) => {
    try {
        const user = req.body.user.username;
        const query = {username: user};
        const queryResult = await getConnection().findOne(sanitize(query));

        if (isEmpty(queryResult))
            throw new UserError("No User Found", "error");
        let passwordHash = null
        if (!isEmpty(req.body.password)) {
            if (!isValidPassword(req.body.password))
                throw new UserError("Invalid Password", "error");
            if (isEmpty(req.body.passwordConfirmed))
                throw new UserError("Missing Confirmed Password", "error");
            if (req.body.password !== req.body.passwordConfirmed)
                throw new UserError("Password and Confirmed Password do not match", "error");

            passwordHash = await bcrypt.hash(req.body.password, 10)
            if (!passwordHash)
                throw new UserError("Failed to update", "error");
        }
        const objToAdd = {
            username: isEmpty(req.body.username) ? queryResult.username : req.body.username,
            passwordHash: isEmpty(req.body.password) ? queryResult.passwordHash : passwordHash,
            firstname: isEmpty(req.body.firstname) ? queryResult.firstname : req.body.firstname,
            lastname: isEmpty(req.body.lastname) ? queryResult.lastname : req.body.lastname
        }

        // Must change all blogs with that username as well as the user therefore need a transaction
        if (!isEmpty(req.body.username) && req.body.username !== req.body.user.username) {
            const alreadyUser = await getConnection().findOne({username:sanitize(req.body.username)});
            if(alreadyUser)
                throw new UserError("Cannot Use Given Username", "error");

            const session = Mongo.client.startSession();

            const transactionOptions: TransactionOptions = {
                readPreference: 'primary',
                readConcern: {level: 'local'},
                writeConcern: {w: 'majority'}
            };

            try {

                const transactionResults = await session.withTransaction(async () => {
                    const blogUpdate = {username: req.body.username}
                    const userUpdateResults = await getConnection().updateOne(
                        sanitize(queryResult),
                        {$set: sanitize(objToAdd)},
                        {session});

                    const blogUpdateResults = await Mongo.client.db(process.env.MONGO_DATABASE).collection("blogs").updateMany(
                        sanitize(query),
                        {$set: sanitize(blogUpdate)},
                        {session});

                }, transactionOptions);

                if (transactionResults) {
                    logUsers("User and blogs updated", "info");
                    return res.status(200).json({message: "User and blogs updated", accessToken:generateAccessToken({username: req.body.username})})
                } else {
                    logUsers("Cannot update user and blogs", "error");
                    return res.status(400).json({message: "Cannot update user and blogs"})
                }
            } catch (e) {
                logUsers(e.message, "error");
                return res.status(400).json({message:e.message});
            } finally {
                await session.endSession();
            }
        } else {
            getConnection().updateOne(sanitize(queryResult), {$set: sanitize(objToAdd)}, (err, result) => {
                if (err) return res.status(400).json({message: "Could not update user"})
                logUsers("User updated Successfully", "info");
                return res.status(200).json({message: "User updated", accessToken:generateAccessToken({username: req.body.username})})
            });
        }
    } catch (e) {
        return res.status(400).json({message: e.message});
    }
});

export {UserRouter};
