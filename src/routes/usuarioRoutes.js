const express = require("express");
const { registrarUsuario, loginUsuario, getUsuario } = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validarUser, validarLogin } = require("../middlewares/validacao");
const { validationResult } = require("express-validator");

const router = express.Router();

// Middleware para validar erros
const validarRequisicao = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  next();
};

// Rota de registro com validação
router.post("/register", validarUser, validarRequisicao, registrarUsuario);

// Rota de login com validação
router.post("/login", validarLogin, validarRequisicao, loginUsuario);

// Rota para obter o usuário logado (precisa de autenticação)
router.get("/me", authMiddleware, getUsuario);

module.exports = router;
