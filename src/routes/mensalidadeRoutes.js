const express = require("express");
const router = express.Router();
const { criarMensalidade, listarMensalidades, atualizarMensalidade, deletarMensalidade } = require("../controllers/mensalidadeController");
const { validarMensalidade } = require("../middlewares/validacao");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/mensalidades", authMiddleware, validarMensalidade, criarMensalidade);
router.get("/mensalidades", authMiddleware, listarMensalidades);
router.put("/mensalidades/:id", authMiddleware, validarMensalidade, atualizarMensalidade);
router.delete("/mensalidades/:id", authMiddleware, deletarMensalidade);

module.exports = router;
