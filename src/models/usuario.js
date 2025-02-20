const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["admin", "cliente"],
    default: "cliente",
  },
}, { timestamps: true });

module.exports = mongoose.model("Usuario", UsuarioSchema);
