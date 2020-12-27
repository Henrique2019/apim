const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Artigo");
const Artigo = mongoose.model('artigo');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
}) 

mongoose.connect('mongodb+srv://hr:asd102030@cluster0.wvedx.mongodb.net/persona?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
    console.log("conexao ao mongo realizada com sucesso");
}).catch((erro) => {
    console.log("error : ohh nao algo deu errado , verifique e tente novamente.");
});

app.get("/artigo/", (req,res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.json(400).json({
            error: true,
            message: "nenhum artigo encontrado!!!"
        })
    })
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({_id:req.params.id}).then((artigo) =>{
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "nenhum artigo encontrado!!!"
        })
    })
});

app.post("/artigo/", (req,res) => {
   const artigo = Artigo.create(req.body, (err) => {
       if(err) return res.status(400).json({
           error: true,
           message : "erro artigo nao foi cadastrado"
       })

       return res.status(200).json({
           error: false,
           message: " Artigo cadastrado com sucesso"
       })
   })
});

app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: " error: Artigo não foi editado!!!"
        });
        return res.json({
            error: false,
            message: "Artigo editado com sucesso!!!"
        });
    });
});

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error : artigo nao foi deletado!!!"
        });

        return res.json({
            error: false,
            message: " Artigo deletado com sucesso!!!"
        });
    });
});
app.listen(8080, () => {
    console.log("servidor rodando na porta 8080: http://localhost:8080/artigo/");
});