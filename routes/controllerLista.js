const express = require("express");
const app = express();
const router = express.Router();
const Tarefas = require("../models/Tarefas.js");

function data(datinha){
    let dia = new Date(datinha).getDate();
    let mes = new Date(datinha).getMonth();
    let ano = new Date(datinha).getFullYear();

    mes < 9 ? mes = `0${mes}` : 0
    dia < 9 ? dia = `0${dia}` : 0

    return `${dia}/${mes}/${ano}`;

}

function andamento(estado,data,iniciada){
  
    if(estado && iniciada){
        return {status:"Feito",value:0}
    }else if(!estado && iniciada){
        return {status:"Fazendo",value:2}
        
    }else if(!estado && contaDiasRestantes(data) < 1){
        return {status:"Atraso",value:3}

    }else if(!estado && !iniciada){
        return {status:"Não iniciada",value:1}
    }

    
}

    function contaDiasRestantes(data){

       
        // Converte a diferença de milissegundos para dias
        const umDiaEmMilissegundos = 24 * 60 * 60 * 1000; // 24 horas * 60 minutos * 60 segundos * 1000 milissegundos
    
           
        
        const prazoTarefa = data;
        const hoje = new Date()

       
        
        const difDia = prazoTarefa - hoje;

        //console.log(difDia)

        const faltam = Math.ceil(difDia / umDiaEmMilissegundos)
        
        
        const result = faltam - 6;
        
        console.log("Tarefa tempo: ",result)

        return result;

    }

    function priori(data,urge,tend,stat,iniciada){
    
        const prioridade = andamento(stat,data,iniciada).value * urge * tend;
    
        return prioridade;
    
      
    }



router.get("/", async (req,res) => {



let tarefas = await Tarefas.find({})    






    const dados = tarefas.map(e => ({

        id:e._id,
        nome:e.nome,
        data:data(e.data),
        prioridade: priori(e.data,e.urgencia,e.tendencia,e.status,e.iniciada),
        tipo:e.tipo,
        status: andamento(e.status,e.data,e.iniciada).status,
        descricao: e.descricao
        

    }))


   


    res.render("home.html",{lista:dados.sort((a,b) => b.prioridade - a.prioridade)})

    //res.send(tarefas)

})

router.get("/tarefa/:id", async (req,res) => {

    let tarefas = await Tarefas.find({_id:req.params.id})
    console.log(tarefas)
    const dados = tarefas.map(e => ({

        id:e._id,
        nome:e.nome,
        data:data(e.data),
        prioridade: priori(e.data,e.urgencia,e.tendencia,e.status,e.iniciada),
        tipo:e.tipo,
        status: andamento(e.status,e.data,e.iniciada).status,
        descricao: e.descricao
        

    }))

    console.log(dados)


    res.render("tarefa.html",{lista:dados[0]})
    //res.send(tarefas)

})

module.exports = router;