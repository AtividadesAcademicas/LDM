const Sequelize = require('sequelize')
const sequelize = new Sequelize('dbldm', 'root', '', {
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate().then(function(){
    console.log('Conectado com sucesso!')
}).catch(function(erro){
    console.log('Falha ao se conectar: ' + erro)
})

const Agendamentos = sequelize.define('agendamentos', {
    nome: {
        type: Sequelize.STRING
    },
    endereco: {
        type: Sequelize.STRING
    },
    bairro: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.STRING
    },
    cidade: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    observacao: {
        type: Sequelize.TEXT
    }
})

//Agendamentos.sync({force: true})

Agendamentos.create({
    nome: 'Pedro Pessina',
    endereco: 'Rua Sebastião da Silva Bueno, 383',
    bairro: 'Ponte Rasa',
    cep: '03882-100',
    cidade: 'São Paulo',
    estado: 'São Paulo',
    observacao: 'Casa'
})