const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.engine('html',require('ejs').renderFile);
app.set('views engine','html');

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'))

//usando BodyParser
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));


app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({
    extended: true
}));



const db = "sistemaTarefas"

const url = `mongodb://127.0.0.1:27017/${db}`;

mongoose.connect(url).then((e) => console.table({0:{'Banco de Dados':db,teste:e}})).catch(err => console.error(err))

const PORT = 3000;



const home = require("./routes/controllerLista.js");
const cadastrar = require("./routes/controllerCadastrar.js");

app.use("/",home);
app.use("/cadastrar",cadastrar);




app.listen(PORT,() => {

        console.log("rodando na porta 3000");


})