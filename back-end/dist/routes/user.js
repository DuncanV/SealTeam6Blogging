"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (app) => {
    app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // find user by username
        try {
            // if(await bcrypt.compare(req.body.password, user.passwordHash)){
            // user found and passwords match
            const username = req.body.username;
            const user = { user: username };
            const accessToken = auth_1.generateAccessToken(user);
            const refreshToken = auth_1.generateRefreshToken(user);
            res.json({ accessToken, refreshToken });
            // }else{
            //     //passwords dont match
            //     res.status(401).send()
            // }
        }
        catch (_a) {
            res.sendStatus(500);
        }
    }));
    app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // bcrypt stores the salt so no need to store salt in the db
            // second param is the size of the salt
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            res.status(201).send();
        }
        catch (_b) {
            res.sendStatus(500);
        }
    }));
    app.post("/refresh", (req, res) => {
        // refresh the jwt token
        const refreshToken = req.body.token;
        // find the refresh tokens in the db
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403);
            const accessToken = auth_1.generateAccessToken({ name: user.name });
            res.json({ accesstoken: accessToken });
        });
    });
    app.delete("/logout", (req, res) => {
        // delete the refresh token from the db
        res.sendStatus(501);
    });
    app.put("/user", auth_1.authenticateAccessToken, (req, res) => {
        res.sendStatus(501);
    });
};
exports.register = register;
//# sourceMappingURL=user.js.map
