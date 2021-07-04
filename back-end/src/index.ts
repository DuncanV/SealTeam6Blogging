import express from "express";
import dotenv from "dotenv";
import * as blogRoutes from "./routes/blog";
import * as userRoutes from "./routes/user";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/../../front-end/dist/front-end"));
dotenv.config({path: __dirname+'/../.env'});

const port = process.env.SERVER_PORT; // default port to listen

blogRoutes.register(app);
userRoutes.register(app);

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname+"/../../front-end/dist/front-end/index.html"));
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
