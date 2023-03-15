const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const sequelize = require("./database/database");
const Task = require("./database/Task");

const statuses = require("./data/statuses");
const priorities = require("./data/priorities");

const { connection } = sequelize;
sequelize.authenticate(connection);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    Task.findAll().then(tasks => {
        res.render("index", { tasks });
    }).catch(error => {
        console.error("Erro ao buscar tarefas:", error);
    });
});

app.get("/create/task", (req, res) => {
    res.render("create-task", { statuses, priorities });
});

app.post("/create/task", (req, res) => {
    const { title, description, priority, status } = req.body;
    // Salvar tarefa no banco de dados
    Task.create({
        title, description, priority, status
    }).then(() => {
        res.redirect("/");
    }).catch(error => {
        console.error("Erro ao cadastrar tarefa:", error);
    });
});

app.get("/update/task/:id", (req, res) => {
    const { id } = req.params;
    Task.findOne({
        where: { id }
    }).then(response => {
        if(response) {
            const task = response.dataValues;
            res.render("update-task", { task, statuses, priorities });
        }
        else {
            res.redirect('/');
        }
    }).catch(error => {
        console.error("Erro ao buscar tarefas:", error);
    });
});

app.post("/update/task", (req, res) => {
    const { id, title, description, priority, status } = req.body;
    Task.update({
        title, description, priority, status
    },{
        where: { id }
    }).then(() => {
        res.redirect("/");
    }).catch(error => {
        console.error("Erro ao cadastrar tarefa:", error);
    });
});

app.post("/delete/task", (req, res) => {
    const { id } = req.body;
    Task.destroy({
        where: { id }
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        console.error("Erro ao excluir tarefa:", error);
    })
});

app.listen(3001, () => {
    console.log("Servidor executando na porta 3001");
});