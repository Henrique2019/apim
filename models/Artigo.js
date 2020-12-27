const mongoose = require('mongoose');
const Artigo = new mongoose.Schema({
     
    name: { type: String, required: true},
    email: { type: String, required: true},
    site: { type: String, required: true},
    nome: { type: String, required: true},
    img: { type: String, required: true },
    Cargo: { type: String, required: true },
    idade: { type: Number, required: true },
    genero: { type: String, required: true },
    midia: { type: String, required: true },
    EmpresaQueTrabalha: { type: String, required: true },
    ocupacao: { type : String, required: true},
    escolaridade: { type: String, required: true },
    renda: { type: Number, required: true },
    PrincipaisObjtivos: { type: String, required: true },
    ProblemasDesafios: { type: String, required: true },
    AjudaEmpresa: { type: String, required: true },
    
    createdAt: { type: Date, default: Date.now}},
{
    timestamps: true,
});

mongoose.model('artigo', Artigo);