const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        response.writeHead(404);
        response.write("Not Found!");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(data);
      }
      response.end();
    });
  } else {
    response.writeHead(404);
    response.write("Not Found!");
    response.end();
  }
});
