"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const auth_1 = require("../middleware/auth");
const register = (app) => {
    const blogs = [
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
    ];
    app.get("/blogs", (req, res) => {
        res.json(blogs);
    });
    app.delete("/blogs/:id", auth_1.authenticateAccessToken, (req, res) => {
        res.sendStatus(501);
    });
    app.put("/blogs/:id", auth_1.authenticateAccessToken, (req, res) => {
        res.sendStatus(501);
    });
    app.post("/blogs", auth_1.authenticateAccessToken, (req, res) => {
        res.sendStatus(200);
    });
};
exports.register = register;
//# sourceMappingURL=blog.js.map