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
    res.render('home')
})

app.get('/cadastrar', function(req, res) {
    res.render('cadastro')
})

app.post('/cadastrar', function(req, res) {
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone: req.body.telefone,
        celular: req.body.celular
    }).then(function() {
        res.redirect('/cadastrar')
    }).catch(function(error) {
        res.send("Erro: " + error)
    })
})

app.get('/consulta', function(req, res) {
    post.findAll().then(function(posts) {
        res.render("consulta", {posts: posts})
        console.log(post)
    }).catch(function(error) {
        console.log("Erro ao carregar dados do banco: " + error)
    })
})

app.get("/editar/:id", function(req, res) {
    post.findAll({where: {"id": req.params.id}}).then(function(posts) {
        res.render("editar", {posts: posts})
    }).catch(function(error) {
        console.log("Erro ao carregar dados do banco: " + error)
    })
})

app.post("/atualizar", function(req, res) {
    post.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone: req.body.telefone,
        celular: req.body.celular
    }, {where: {id: req.body.id}}).then(function() {
        res.redirect("/consulta")
    }).catch(function(error) {
        res.send("Erro ao atualizar: " + error)
    })
})

app.get("/excluir/:id", function(req, res) {
    post.destroy({where: {"id": req.params.id}}).then(function() {
        res.redirect("/consulta")
    }).catch(function(error) {
        res.send("Erro ao deletar: " + error)
    })
})

app.listen(8081, function() {
    console.log("Servidor ativo na porta 8081!")
})