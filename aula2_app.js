const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Página inicial')
})

app.listen(8081, function() {
    console.log('Servidor ativo na porta 8081')
})