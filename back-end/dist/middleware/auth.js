"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.authenticateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).send();
        req.user = user;
        next();
    });
}
exports.authenticateAccessToken = authenticateAccessToken;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_TIMEOUT });
}
exports.generateAccessToken = generateAccessToken;
function generateRefreshToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
exports.generateRefreshToken = generateRefreshToken;
//# sourceMappingURL=auth.js.map