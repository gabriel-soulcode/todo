const { Sequelize } = require('sequelize');

const connection = new Sequelize('todo_databade', 'root', 'root3306', { host: 'localhost', dialect: 'mysql' });

async function authenticate(connection) {
    try {
        await connection.authenticate();
        console.log('A conexão foi estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
}

module.exports = { connection, authenticate, };