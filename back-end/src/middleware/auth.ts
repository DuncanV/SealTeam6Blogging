import jwt from "jsonwebtoken";

export function authenticateAccessToken(req: any, res:any, next:any){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) =>{
        if(err) return res.status(403).json({message:"Invalid Token"});
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
