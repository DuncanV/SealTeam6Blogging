import express from "express";
import dotenv from "dotenv";
import * as blogRoutes from "./routes/blog";
import * as userRoutes from "./routes/user";

const app = express();
app.use(express.json());
dotenv.config({path: __dirname+'/.env'});

const port = process.env.SERVER_PORT; // default port to listen

blogRoutes.register(app);
userRoutes.register(app);

app.get("/", (req, res) => {
    // return website (angular)
    res.sendStatus(400);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
