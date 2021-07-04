import * as express from "express";
import {authenticateAccessToken} from "../middleware/auth";
import {IContent} from "../common/Interfaces";
export const register = ( app: express.Application ) => {

    const blogs: IContent[] = [
        {
            id: 1,
            username: 'GerritBurger',
            title: 'First post by Gerrit',
            likes: ['Duncan', 'Wesley'],
            content: 'This is static content for testing purposes only, dsaf sdf asdf asuidfgui asdkgfui ewquiebqwf uiebwfuil asbjifbsl fbasjklfbeuiw asdfvbashdfk jasdv fkjasvdf kasdvas dkfjavsdf jdf askdjlf kasjdhf klasjhd fkjbwe dlfkqjwe b asdfb asjkldfb jkasdfbl askjfbadsfjkl ',
            created: new Date(),
            deleted: false,
            visible: true
        },
        {
            id: 2,
            username: 'GerritBurger',
            title: 'First post by Gerrit',
            likes: ['Duncan', 'Wesley'],
            content: 'This is static content for testing purposes only',
            created: new Date(),
            deleted: false,
            visible: true
        }
    ]

    app.get("/blogs", (req, res) => {
        res.json(blogs);
    });

    app.delete("/blogs/:id", authenticateAccessToken, (req, res) => {
        res.sendStatus(501);
    });

    app.put("/blogs/:id", authenticateAccessToken, (req, res) => {
        res.sendStatus(501);
    });

    app.post("/blogs", authenticateAccessToken,(req, res) => {
        res.sendStatus(200);
    })
};
