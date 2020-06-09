const express = require('express');
const server = express();

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
  res.render('index.html');
});

server.get('/create-point', (req, res) => {
  res.render('create-point.html');
});

// ligar o servidor
server.listen(3000);