const Mensalidade = require("../models/mensalidade");
const Cliente = require("../models/cliente");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

// Criar Mensalidade
exports.criarMensalidade = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  try {
    const { clienteId, valor, vencimento } = req.body;

    if (!mongoose.Types.ObjectId.isValid(clienteId)) {
      return res.status(400).json({ erro: "ID do cliente inválido" });
    }

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    const mensalidade = new Mensalidade({ cliente: clienteId, valor, vencimento });
    await mensalidade.save();
    res.status(201).json(mensalidade);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar mensalidade", detalhes: error.message });
  }
};

// Listar Mensalidades
exports.listarMensalidades = async (req, res) => {
  try {
    const { clienteId, page = 1, limit = 10 } = req.query;
    const query = {};

    if (clienteId) {
      if (!mongoose.Types.ObjectId.isValid(clienteId)) {
        return res.status(400).json({ erro: "ID do cliente inválido" });
      }
      query.cliente = clienteId;
    }

    const mensalidades = await Mensalidade.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate("cliente", "nome email");

    res.json(mensalidades);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar mensalidades", detalhes: error.message });
  }
};

// Atualizar Mensalidade
exports.atualizarMensalidade = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID da mensalidade inválido" });
    }

    const mensalidadeAtualizada = await Mensalidade.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!mensalidadeAtualizada) {
      return res.status(404).json({ erro: "Mensalidade não encontrada" });
    }

    res.json(mensalidadeAtualizada);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar mensalidade", detalhes: error.message });
  }
};

// Deletar Mensalidade
exports.deletarMensalidade = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID da mensalidade inválido" });
    }

    const mensalidade = await Mensalidade.findByIdAndDelete(id);
    if (!mensalidade) {
      return res.status(404).json({ erro: "Mensalidade não encontrada" });
    }

    res.json({ mensagem: "Mensalidade removida com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar mensalidade", detalhes: error.message });
  }
};
