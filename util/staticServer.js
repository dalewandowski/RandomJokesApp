const fs = require("fs");
const path = require("path");
const url = require("url");
const mimeTypes = {
    ".html" : "text/html",
    ".js" : "text/javascript",
    ".json" : "application/json",
    ".css" : "text/css",
    ".jpg" : "image/jpeg",
    ".png" : "image/png"

}
function serveStaticFile(req,res) {
    const baseURL = req.protocol + "://" + req.headers.host + "/"; //bazowy url
    const parsedURL = new URL(req.url, baseURL);
    console.log(parsedURL);

    let pathSanitaze = path.normalize(parsedURL.pathname)
    console.log("pathSanitaize: " + pathSanitaze);
    console.log(("__dirname: " + __dirname));

    let pathname = path.join(__dirname, "..", "static", pathSanitaze);
    console.log("pathname: " + pathname);

    if (fs.existsSync(pathname)){
        if (fs.statSync(pathname).isDirectory()){
            pathname += "/index.html";
        }

        fs.readFile(pathname, function(err, data){
            if (err){
                res.statusCode = 500;
                res.end("Error getting the file: " + err)
            } else {
                const extension = path.parse(pathname).ext;

                res.setHeader("Content-Type", mimeTypes[extension]);
                res.end(data);
            }
        });

    } else {
        res.statusCode = 404;
        res.end("File not found")
    }
}

module.exports = {
    serveStaticFile
}
    
    
    
    
