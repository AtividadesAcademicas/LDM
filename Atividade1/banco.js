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

const Clientes = sequelize.define('clientes', {
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
    telefone: {
        type: Sequelize.STRING
    },
    celular: {
        type: Sequelize.STRING
    }
})

//Clientes.sync({force: true})

Clientes.bulkCreate([
    {
        nome: 'Pedro',
        endereco: 'Av. Águia de Haia, 2983',
        bairro: 'Cidade AE Carvalho',
        cep: '03694-000',
        telefone: '11 1111-1111',
        celular: '11 91111-1111'
    },
    {
        nome: 'Mateus',
        endereco: 'Av. Águia de Haia, 2983',
        bairro: 'Cidade AE Carvalho',
        cep: '03694-000',
        telefone: '11 2222-2222',
        celular: '11 92222-2222'
    },
    {
        nome: 'Guilherme',
        endereco: 'Av. Águia de Haia, 2983',
        bairro: 'Cidade AE Carvalho',
        cep: '03694-000',
        telefone: '11 3333-3333',
        celular: '11 93333-3333'
    },
])