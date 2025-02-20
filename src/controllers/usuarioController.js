const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuário
exports.registrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado!" });
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criando usuário
    const novoUsuario = new Usuario({ nome, email, senha: senhaHash, tipo });
    await novoUsuario.save();

    res.status(201).json({ msg: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
};

// Login de usuário
exports.loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: "E-mail ou senha inválidos!" });
    }

    // Compara a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ erro: "E-mail ou senha inválidos!" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
};

// Buscar usuário autenticado
exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-senha");
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
};
