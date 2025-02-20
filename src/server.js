const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/", require("./routes/clienteRoutes"));
app.use("/", require("./routes/mensalidadeRoutes"));
app.use("/", require("./routes/pagamentoRoutes"));
app.use("/", require("./routes/usuarioRoutes"));
app.use("/", require("./routes/relatorioRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
