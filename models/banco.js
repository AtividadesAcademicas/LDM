const Sequelize = require('sequelize')
const sequelize = new Sequelize("dbldm", "root", "", {
    host:"localhost",
    dialect:"mysql"
})

sequelize.authenticate().then(function() {
    console.log("Conectado com o banco de dados!")
}).catch(function(error) {
    console.log("Falha ao conectar ao banco de dados: " + error)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}