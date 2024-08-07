
const http = require("http");
const  {getJokes, getJoke, getRandom} = require("./controllers/jokeController");

const port = 8080;
const API_CONTENT_TYPE = {"Content-type" : "application/json"};

const server = http.createServer(
    async function(req,res) {
        console.log("refresh");

        if (req.url === "/api/jokes" && req.method === "GET"){
            let jokes = await getJokes();

            if (jokes) {
                res.writeHead(200, API_CONTENT_TYPE);
            } else {
                res.writeHead(404, API_CONTENT_TYPE);
                jokes = {message : "Jokes not found"};

            }

            res.end(JSON.stringify(jokes));
            
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
        };
        
    }
);

server.listen(port)

