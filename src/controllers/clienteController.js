const Cliente = require("../models/cliente");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

// Criar Cliente
exports.criarCliente = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  try {
    const { nome, email, telefone } = req.body;

    // Verificar se o email já existe
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res.status(400).json({ erro: "Já existe um cliente com este email" });
    }

    const cliente = new Cliente({ nome, email, telefone });
    await cliente.save();

    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar cliente", detalhes: error.message });
  }
};

// Listar Clientes (com paginação e filtros)
exports.listarClientes = async (req, res) => {
  try {
    const { nome, email, page = 1, limit = 10 } = req.query;
    const query = {};

    if (nome) query.nome = new RegExp(nome, "i");
    if (email) query.email = email;

    const clientes = await Cliente.find(query)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json(clientes);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar clientes", detalhes: error.message });
  }
};

// Atualizar Cliente
exports.atualizarCliente = async (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID do cliente inválido" });
    }

    const clienteAtualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!clienteAtualizado) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar cliente", detalhes: error.message });
  }
};

// Deletar Cliente
exports.deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: "ID do cliente inválido" });
    }

    const cliente = await Cliente.findByIdAndDelete(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    res.json({ mensagem: "Cliente removido com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar cliente", detalhes: error.message });
  }
};
