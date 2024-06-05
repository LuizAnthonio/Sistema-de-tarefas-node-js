const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tarefa = new Schema({

    nome:String,
    prioridade:Number,
    descricao:String,
    data:Date,
    tipo:String,
    tendencia:Number,
    urgencia:Number,
    status:Boolean,
    iniciada:Boolean


},{collection:"tarefas"});

const Terefas = mongoose.model("tarefas",tarefa);

module.exports = Terefas;