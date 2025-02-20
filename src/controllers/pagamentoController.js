const { body, validationResult } = require("express-validator");
const Pagamento = require("../models/pagamento");
const Mensalidade = require("../models/mensalidade");
const mongoose = require("mongoose");

// Realizar Pagamento
exports.realizarPagamento = async (req, res) => {
  try {
    // Validar entrada
    await body("mensalidadeId").isMongoId().withMessage("ID da mensalidade inválido").run(req);
    await body("valor").isFloat({ gt: 0 }).withMessage("O valor deve ser positivo").run(req);
    await body("metodoPagamento").notEmpty().withMessage("Método de pagamento é obrigatório").run(req);
    await body("dataPagamento").isISO8601().withMessage("Data de pagamento inválida").run(req);

    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { mensalidadeId, valor, metodoPagamento, dataPagamento } = req.body;
    
    // Verificar se a mensalidade existe
    const mensalidade = await Mensalidade.findById(mensalidadeId);
    if (!mensalidade) {
      return res.status(404).json({ erro: "Mensalidade não encontrada" });
    }

    // Criar e salvar o pagamento
    const pagamento = new Pagamento({ mensalidade: mensalidadeId, valor, metodoPagamento, dataPagamento });
    await pagamento.save();
    
    res.status(201).json(pagamento);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Listar Pagamentos (com filtros e paginação)
exports.listarPagamentos = async (req, res) => {
  try {
    const { mensalidadeId, page = 1, limit = 10 } = req.query;
    const query = {};

    if (mensalidadeId) {
      if (!mongoose.Types.ObjectId.isValid(mensalidadeId)) {
        return res.status(400).json({ erro: "ID da mensalidade inválido" });
      }
      query.mensalidade = mensalidadeId;
    }

    const pagamentos = await Pagamento.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate("mensalidade", "valor vencimento");

    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Atualizar Pagamento
exports.atualizarPagamento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID do pagamento inválido" });
    }

    const pagamento = await Pagamento.findById(id);
    if (!pagamento) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    // Atualizar pagamento com validação
    const pagamentoAtualizado = await Pagamento.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.json(pagamentoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Deletar Pagamento
exports.deletarPagamento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID do pagamento inválido" });
    }

    const pagamento = await Pagamento.findByIdAndDelete(id);
    if (!pagamento) {
      return res.status(404).json({ erro: "Pagamento não encontrado" });
    }

    res.json({ mensagem: "Pagamento removido com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
