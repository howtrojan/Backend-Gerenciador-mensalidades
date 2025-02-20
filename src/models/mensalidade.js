const mongoose = require("mongoose");

const MensalidadeSchema = new mongoose.Schema(
  {
    cliente: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Cliente", 
      required: [true, "O cliente é obrigatório"] 
    },
    valor: { 
      type: Number, 
      required: [true, "O valor da mensalidade é obrigatório"], 
      min: [0, "O valor da mensalidade não pode ser negativo"]
    },
    dataVencimento: { 
      type: Date, 
      required: [true, "A data de vencimento é obrigatória"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "A data de vencimento não pode ser no passado"
      }
    },
    status: { 
      type: String, 
      enum: ["pendente", "pago", "atrasado"], 
      default: "pendente",
      trim: true 
    }
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Mensalidade", MensalidadeSchema);
