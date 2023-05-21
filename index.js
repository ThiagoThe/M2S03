const http = require("http");
const fs = require("fs");

function listarProdutos() {
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8"));
    return JSON.stringify(dados.produtos);
  } catch (erro) {
    return "Erro ao executar";
  }
}

function CriarProduto(novoProduto) {
  try {
    const dados = JSON.parse(fs.readFileSync("dados.json", "utf-8")); // lê o arquivo
    dados.produtos.push(JSON.parse(novoProduto)); // adiciona o novo produto
    fs.writeFileSync("dados.json", JSON.stringify(dados)); // salva o arquivo
    return "Produto cadastrado com sucesso!";
  } catch (error) {
    return "Erro ao executar";
  }
}

const server = http.createServer((request, response) => {
  if (request.url === "/produtos") {
    switch (request.method) {
      case "GET":
        response.writeHead(200, {
          "Content-Type": "application/json; charset: utf-8;",
        });
        response.end(listarProdutos());
        break;

      case "POST":
        let data = "";
        request.on("data", (chunk) => {
          data += chunk;
        });
        request.on("end", () => {
          response.writeHead(200, {
            "Content-Type": "text/plain; charset: utf-8;",
          });
          response.end(CriarProduto(data));
        });
        break;
    }
  }
});

server.listen(3001);
console.log("Servidor rodando na porta http://localhost:3001");
