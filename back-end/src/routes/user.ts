import * as express from "express";
import bcrypt from "bcrypt"
import {authenticateAccessToken, generateAccessToken, generateRefreshToken} from "../middleware/auth";
import jwt from "jsonwebtoken";

export const register = ( app: express.Application ) => {
    app.post("/login", async(req, res) => {
        // find user by username
        try {

            // if(await bcrypt.compare(req.body.password, user.passwordHash)){
               // user found and passwords match
                const username = req.body.username;
                const user = {user: username};
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                res.json({accessToken, refreshToken});
            // }else{
            //     //passwords dont match
            //     res.status(401).send()
            // }
        }catch{
            res.sendStatus(500);
        }
    });

    app.post("/signup", async (req, res) => {
        try {
            // bcrypt stores the salt so no need to store salt in the db
            // second param is the size of the salt
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            res.status(201).send();
        } catch {
            res.sendStatus(500);
        }

    });

    app.post("/refresh", (req, res) => {
        // refresh the jwt token
        const refreshToken = req.body.token
        // find the refresh tokens in the db
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err:any, user:any) =>{
            if(err) return res.sendStatus(403);
            const accessToken = generateAccessToken({name:user.name})
            res.json({accesstoken:accessToken});
        });
    });

    app.delete("/logout", (req, res) => {
        // delete the refresh token from the db
        res.sendStatus(501);
    });

    app.put("/user", authenticateAccessToken,(req, res) => {
        res.sendStatus(501);
    });
};
