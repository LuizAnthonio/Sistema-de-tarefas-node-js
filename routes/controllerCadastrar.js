const express = require("express");
const app = express();
const router = express.Router();
const Tarefas = require("../models/Tarefas.js");


router.get("/test", async (req,res) => {

    await Tarefas.create({

        nome:"Tarefa 3",
        prioridade:2,
        descricao:"Ela era showw",
        data:new Date(2024,6,10),
        tipo:"conta",
        tendencia:2,
        urgencia:4,
        status:2
        
    })


    res.send("criado")

})

router.get("/", async (req,res) => {

    


    res.render("cadastrar.html")

})

router.post("/", async (req,res) => {

    const {nome,descricao,data,tipo,tendencia,urgencia} = req.body

    console.log(nome,descricao,data,tipo,tendencia,urgencia)

    await Tarefas.create({

        nome:nome,
        prioridade:1,
        descricao:descricao,
        data:new Date(data),
        tipo:tipo,
        tendencia:tendencia,
        urgencia:urgencia,
        status:false,
        iniciada:false
        
    })


    res.redirect("/")

})


module.exports = router;