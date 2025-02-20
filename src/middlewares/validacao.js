const { body } = require("express-validator");

// Validação para criar um cliente
exports.validarCliente = [
  body("nome").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido"),
  body("telefone").notEmpty().withMessage("O telefone é obrigatório"),
];

// Validação para criar uma mensalidade
exports.validarMensalidade = [
  body("cliente").notEmpty().withMessage("O cliente é obrigatório"),
  body("valor").isFloat({ min: 0.01 }).withMessage("O valor deve ser positivo"),
  body("dataVencimento")
    .isISO8601().withMessage("Data de vencimento inválida")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("A data de vencimento não pode ser no passado");
      }
      return true;
    }),
];

// Validação para criar um pagamento
exports.validarPagamento = [
  body("cliente").notEmpty().withMessage("O cliente é obrigatório"),
  body("mensalidade").notEmpty().withMessage("A mensalidade é obrigatória"),
  body("valorPago").isFloat({ min: 0.01 }).withMessage("O valor pago deve ser positivo"),
  body("metodoPagamento").isIn(["pix", "cartao", "boleto"]).withMessage("Método de pagamento inválido"),
];

exports.validarLogin = [
  body("email").isEmail().withMessage("E-mail inválido"),
  body("senha").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
];

exports.validarToken = [
  body("token").isJWT().withMessage("Token inválido"),
];

exports.validarUser = [
  body("nome").notEmpty().withMessage("O nome é obrigatório"),
  body("email").isEmail().withMessage("E-mail inválido"),
  body("senha").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
  body("tipo").isIn(["admin", "user"]).withMessage("Tipo de usuário inválido"),
];


