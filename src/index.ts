import express from "express";
import {bindFlmngr} from "@flmngr/flmngr-server-node-express";


// Create Express app
const app = express();

// Let Flmngr to serve "/flmngr" URL on your webserver with storage placed in "./files" (mapped to "/files" URL)
bindFlmngr({
    app: app,
    urlFileManager: "/flmngr",
    urlFiles: "/files/",
    dirFiles: "./files"
});

// These two routes are for the demo on the index page of the website
// In real app you can remove them, and 'public/' contents too.
app.get("/", (req, res) => {
    require('fs').readFile('./public/flmngr-example.html', 'utf8', (err: any, text: string) => {
        res.send(text);
    });
});
app.get("/flmngr-example.js", (req, res) => {
    require('fs').readFile('./public/flmngr-example.js', 'utf8', (err: any, text: string) => {
        res.contentType("text/javascript")
        res.send(text);
    });
});

/*

  Here you can use your own routes that your app/website will have:

    app.get("/some/page", ...);
    app.post("/some/request", ...);

  etc.

 */

let HOST = '127.0.0.1';
let PORT = 3000;
app.listen(
    PORT,
    HOST,
    function() {
        // Server started successfully
        console.log("Express server with Flmngr started")
        console.log("Flmngr.urlFileManager = \"http://" + HOST + ":" + PORT + "/flmngr\"");
        console.log("Live demo: http://" + HOST + ":" + PORT + "");
    }
);