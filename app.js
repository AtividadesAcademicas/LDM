const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const post = require('./models/post')

app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.render('pagina1')
})

app.post('/cadastrar', function(req, res) {
    post.create({
        nome: req.body.nome
    }).then(function() {
        res.redirect('/')
    }).catch(function(error) {
        res.send("Erro: " + error)
    })
})

app.listen(8081, function() {
    console.log("Servidor ativo na porta 8081!")
})