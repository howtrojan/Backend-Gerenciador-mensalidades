const Cliente = require("../models/cliente");
const Mensalidade = require("../models/mensalidade");
const Pagamento = require("../models/pagamento");

exports.relatorioClientesInadimplentes = async (req, res) => {
  try {
    const clientesInadimplentes = await Cliente.find({
      possuiDivida: true,
    }).populate("mensalidades");

    res.json({
      total: clientesInadimplentes.length,
      clientes: clientesInadimplentes,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        msg: "Erro ao buscar clientes inadimplentes",
        erro: err.message,
      });
  }
};

exports.relatorioMensalidadesVencendo = async (req, res) => {
  try {
    const dataAtual = moment().startOf("month").toDate();
    const dataFinal = moment().endOf("month").toDate();

    const mensalidades = await Mensalidade.find({
      dataVencimento: { $gte: dataAtual, $lte: dataFinal },
      status: "pendente",
    }).populate("cliente", "nome email");

    res.json({ total: mensalidades.length, mensalidades });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Erro ao buscar mensalidades", erro: err.message });
  }
};

// Relatório de receitas mensais
exports.relatorioReceitasMensais = async (req, res) => {
    try {
      const pagamentos = await Pagamento.find();
  
      const receitasPorMes = pagamentos.reduce((acc, pagamento) => {
        const mesAno = new Date(pagamento.dataPagamento).toLocaleString("pt-BR", { year: "numeric", month: "2-digit" });
  
        acc[mesAno] = (acc[mesAno] || 0) + pagamento.valorPago;
        return acc;
      }, {});
  
      res.json(receitasPorMes);
    } catch (err) {
      res.status(500).json({ msg: "Erro ao calcular receitas mensais", erro: err.message });
    }
  };

// Relatório de faturamento anual
exports.relatorioFaturamentoAnual = async (req, res) => {
  try {
    const { ano } = req.query; // Ano opcional, usa o atual se não for fornecido
    const anoAtual = ano ? parseInt(ano) : new Date().getFullYear();

    const faturamento = await Pagamento.aggregate([
      {
        $match: {
          dataPagamento: {
            $gte: new Date(`${anoAtual}-01-01`),
            $lte: new Date(`${anoAtual}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$dataPagamento" },
          total: { $sum: "$valorPago" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Formatar o retorno para incluir todos os meses do ano
    const resultado = Array.from({ length: 12 }, (_, i) => ({
      mes: i + 1,
      total: 0,
    }));

    faturamento.forEach((item) => {
      resultado[item._id - 1].total = item.total;
    });

    res.json({ ano: anoAtual, faturamento: resultado });
  } catch (err) {
    res.status(500).json({ msg: "Erro ao gerar relatório", erro: err.message });
  }
};

