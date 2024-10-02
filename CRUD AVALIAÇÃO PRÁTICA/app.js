const express = require('express')
const app = express()
const post = require('./post')
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')

app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.listen(8081, function() {
    console.log("Servidor ativo na porta 8081!")
})

app.get('/', function(req, res) {
    res.render('cadastro')
})

app.post('/cadastrar', function(req, res) {
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function() {
        res.redirect('/')
    }).catch(function(error) {
        res.send("Erro ao cadastrar: " + error)
    })
})

app.get('/consultar', function(req, res) {
    post.findAll().then(function(clients) {
        res.render('consulta', {clients: clients})
    }).catch(function(error) {
        res.send("Erro ao consultar: " + error)
    })
})

app.get('/atualizar/:id', function(req, res) {
    post.findAll({where:{'id': req.params.id}}).then(function(clients) {
        res.render('editar', {clients: clients})
    }).catch(function(error) {
        res.send("Erro ao atualizar: " + error)
    })
})

app.post('/atualizar', function(req, res) {
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }, {where:{'id': req.body}}).then(function() {
        res.redirect('/consultar')
    }).catch(function(error) {
        res.send("Erro ao atualizar: " + error)
    })
})

app.get('/excluir/:id', function(req, res) {
    post.destroy({where:{'id': req.params.id}}).then(function() {
        res.redirect('/consultar')
    }).catch(function(error) {
        res.send("Erro ao excluir: " + error)
    })
})