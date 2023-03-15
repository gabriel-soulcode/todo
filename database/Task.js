const { Sequelize } = require('sequelize');
const { connection } = require('./database');

const Task = connection.define('task', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: null
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: null
    },
    status: {
        type: Sequelize.STRING,
        allowNull: null
    }
});

Task.sync({ force: false }).then(() => {
    console.log("Tabela tarefa criada.")
}).catch(error => {
    console.error("Erro ao criar tabela tarefa.", error)
})

module.exports = Task;