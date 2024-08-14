const express = require('express')
const app = express()

app.listen(8081, function() {
    console.log('Servidor ativo na porta 8081!')
})

app.get('/', function(req, res) {
    res.send('Página inicial')
})

app.get('/cadastro', function(req, res) {
    res.send('Página de cadastro')
})

app.get('/cadastro/:nome/:sobrenome/:idade', function(req, res) {
    res.send('Dados - nome: ' + req.params.nome + ' ' + req.params.sobrenome + ', idade: ' + req.params.idade + ' anos.')
})