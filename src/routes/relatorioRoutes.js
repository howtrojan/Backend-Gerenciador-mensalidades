const express = require("express");
const router = express.Router();
const { relatorioMensalidadesVencendo , relatorioClientesInadimplentes, relatorioReceitasMensais } = require("../controllers/relatorioController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/relatorio/mensalidades/vencendo", authMiddleware, relatorioMensalidadesVencendo);
router.get("/relatorio/clientes/inadimplentes", authMiddleware, relatorioClientesInadimplentes);
router.get("/relatorio/receitas/mensais", authMiddleware, relatorioReceitasMensais);
router.get("/relatorio/faturamento/anual", authMiddleware, relatorioFaturamentoAnual);



module.exports = router;
