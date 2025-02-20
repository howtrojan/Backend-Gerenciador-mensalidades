const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
  {
    nome: { 
      type: String, 
      required: [true, "O nome é obrigatório"], 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, "O email é obrigatório"], 
      unique: true, 
      trim: true,
      match: [/.+\@.+\..+/, "Por favor, informe um email válido"]
    },
    telefone: { 
      type: String, 
      required: [true, "O telefone é obrigatório"], 
      trim: true,
      match: [/^\d{10,11}$/, "O telefone deve ter entre 10 e 11 dígitos numéricos"]
    },
    status: { 
      type: String, 
      enum: ["ativo", "inativo"], 
      default: "ativo" 
    }
  }, 
  { timestamps: true }
);

// Mensagem de erro personalizada para email duplicado
ClienteSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Este email já está em uso. Escolha outro."));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Cliente", ClienteSchema);
