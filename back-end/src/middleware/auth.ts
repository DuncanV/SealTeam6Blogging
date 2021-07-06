import jwt from "jsonwebtoken";
import {Mongo} from "../db/dbconfig";

const getConnection = () => {
    try {
        return Mongo.client.db(process.env.MONGO_DATABASE).collection("users");
    } catch {
        throw new Error("Invalid Connection to DB")
    }
}

export function authenticateAccessToken(req: any, res:any, next:any){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: any, user: any) =>{
        if(err) return res.status(403).json({message:"Invalid Token"});
        const query = {username: req.body.username};
        const result = await getConnection().findOne(query);
        req.body.user.role = result.role;
        req.body.user = user;
        next();
    })
}

export function generateAccessToken(user:any){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_TIMEOUT});
}

export function generateRefreshToken(user:any){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
