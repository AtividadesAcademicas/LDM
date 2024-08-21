const express = require('express')
const app = express()

app.listen(8081, function() {
    console.log('Servidor ativo na porta 8081!')
})

app.get('/', function(req, res) {
    res.send('Página inicial')
})

app.get('/regra-de-3', function(req, res) {
    res.sendFile(__dirname + '/atividade2-regra3.html')
})

app.get('/maior-valor', function(req, res) {
    res.sendFile(__dirname + '/atividade2-maior.html')
})

app.get('/menor-valor', function(req, res) {
    res.sendFile(__dirname + '/atividade2-menor.html')
})