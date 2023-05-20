const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  if (request.url === "/") {
    switch (request.method) {
      case "GET":
        response.writeHead(200, { "Content-Type": "text/html" });
        fs.createReadStream("./index.html", "UTF-8").pipe(response);
        break;
      case "POST":
        let body = "";
        request.on("data", (chunk) => {
          body += chunk;
        });
        request.on("end", () => {});
        break;
    }
  }
});
