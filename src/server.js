const express = require('express');
const server = express();

// Pegar o banco de dados
const db = require("./database/db.js");

// configurar pasta pública
server.use(express.static('public'));

// utilizando template engine
const nunjuncks = require('nunjucks');
nunjuncks.configure('src/views', {
  express: server,
  noCache: true
})

// configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get('/', (req, res) => {
  return res.render('index.html', { title: "Um título" });
});

server.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

server.get('/search', (req, res) => {

  // Pegar os dados do banco de dados
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    };

    const total = rows.length;

    // Mostrar a página HTML com os dados do banco de dados
    return res.render('search-results.html', { places: rows, total: total});
  });

});

// ligar o servidor
server.listen(3000);