const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const seviceAccount = require('./dsm-ldm-firebase-adminsdk-2xndv-538b73f1f9.json')

const Handlebars = require('handlebars');
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

initializeApp({
    credential: cert(seviceAccount)
})

const db = getFirestore()

app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
app.set('view engine','handlebars')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.listen(8081, function() {
    console.log("Servidor ativo na porta 8081!")
})

app.get('/', function(req, res) {
    res.render('primeira_pagina')
})

app.post('/cadastrar', function(req, res) {
    var result = db.collection('clientes').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function() {
        console.log("Dados cadastrados com sucesso!")
        res.redirect('/')
    }).catch(function(error) {
        console.log("Erro ao cadastrar: " + error)
    })
})

app.get('/consulta', function(req, res) {
    var posts = []
    db.collection('clientes').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            posts.push({id: doc.id, ...doc.data()})
        })
        res.render('consulta',{posts: posts})
    })
})

app.get("/editar/:id", function(req, res){
    var posts = []
    db.collection('clientes').doc(req.params.id).get().then(function(doc) {
        const data = doc.data()
        data.id = doc.id
        posts.push(data)
        res.render('editar', {posts: posts})
    })    
})

app.post('/editar', function(req, res) {
    db.collection('clientes').doc(req.body.id).set({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function() {
        res.redirect('/consulta')
    }).catch(function(error) {
        console.log("Erro ao editar: " + error)
    })
})

app.get('/excluir/:id', async (req, res) => {
    db.collection('clientes').doc(req.params.id).delete().then(function() {
        res.redirect('/consulta')
    }).catch(function(error) {
      console.log("Erro ao deletar: " + error)
    })
})