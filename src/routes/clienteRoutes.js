const express = require("express");
const router = express.Router();
const { validarCliente } = require("../middlewares/validacao");
const { criarCliente, listarClientes, atualizarCliente, deletarCliente } = require("../controllers/clienteController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/clientes", authMiddleware, validarCliente, criarCliente);
router.get("/clientes", authMiddleware, listarClientes);
router.put("/clientes/:id", authMiddleware, validarCliente, atualizarCliente);
router.delete("/clientes/:id", authMiddleware, deletarCliente);

module.exports = router;
