const fs = require("fs");
const path = require("path");
const url = require("url");
const mimeTypes = {
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".json" : "application/json",
    ".css" : "text/css",
    "jpg" : "image/jpeg",
    "png" : "image/png"

}
function serveStaticFile(req,res) {
    const baseURL = req.protocol + "://" + req.headers.host; //bazowy url

}

module.exports = {
    serveStaticFile
}