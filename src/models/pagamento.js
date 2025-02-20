const mongoose = require("mongoose");

const PagamentoSchema = new mongoose.Schema(
  {
    cliente: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Cliente", 
      required: [true, "O cliente é obrigatório"] 
    },
    mensalidade: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Mensalidade", 
      required: [true, "A mensalidade é obrigatória"] 
    },
    valorPago: { 
      type: Number, 
      required: [true, "O valor pago é obrigatório"], 
      min: [0.01, "O valor pago deve ser maior que zero"]
    },
    metodoPagamento: { 
      type: String, 
      enum: ["pix", "cartao", "boleto"], 
      required: [true, "O método de pagamento é obrigatório"], 
      trim: true,
      lowercase: true
    },
    dataPagamento: { 
      type: Date, 
      default: Date.now,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "A data de pagamento não pode estar no futuro"
      }
    }
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Pagamento", PagamentoSchema);
