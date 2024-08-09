
const http = require("http");
const  {getJokes, getJoke, getRandom} = require("./controllers/jokeController");

const {serveStaticFile} = require("./util/staticServer")

const port = 8080;
const API_CONTENT_TYPE = {"Content-type" : "application/json"};

const server = http.createServer(
    async function(req,res) {
        console.log("refresh");
           ///////////// get all jokes ////////////////
        if (req.url === "/api/jokes" && req.method === "GET"){
            let jokes = await getJokes();

            if (jokes) {
                res.writeHead(200, API_CONTENT_TYPE);
            } else {
                res.writeHead(404, API_CONTENT_TYPE);
                jokes = {message : "Jokes not found"};

            }

            res.end(JSON.stringify(jokes));
            //////////////// get random joke /////////////////////
        } else 
        if (req.url === "/api/jokes/random" && req.method === "GET")
        {
            let joke =  await getRandom();

            if (joke) {
                res.writeHead(200, API_CONTENT_TYPE);
            } else
            {
                res.writeHead(404, API_CONTENT_TYPE);
                joke = { message : "Joke Not Found"}
            }
            res.end(JSON.stringify(joke));
            ////////////////////get joke byID ///////////////////////
        } else 
        if (req.url.match(/\api\/jokes\/([0-9]+)/) && req.method === "GET"){
            const id  = req.url.split("/")[3]

            let joke = await getJoke(id);
            
            if (joke){
                res.writeHead(200, API_CONTENT_TYPE)
            } else {
                res.writeHead(404, API_CONTENT_TYPE) 
                joke = {message : "Joke Not Found"}
            }
            res.end(JSON.stringify(joke))
        } else {
            serveStaticFile (req, res);
        }

    }
);


 
 
server.listen(port, () => {
    console.log("Server is running on port: ", port);
    
})

