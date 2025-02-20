const express = require("express");
const router = express.Router();
const { realizarPagamento, listarPagamentos, atualizarPagamento, deletarPagamento } = require("../controllers/pagamentoController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validarPagamento } = require("../middlewares/validacao");

router.post("/pagamentos", authMiddleware, validarPagamento, realizarPagamento);
router.get("/pagamentos", authMiddleware, listarPagamentos);
router.put("/pagamentos/:id", authMiddleware, validarPagamento, atualizarPagamento);
router.delete("/pagamentos/:id", authMiddleware, deletarPagamento);

module.exports = router;
