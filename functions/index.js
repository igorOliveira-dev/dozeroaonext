const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Inicializar o Firebase Admin
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
  tls: {
    rejectUnauthorized: false, // Ignora erros de certificados autoassinados
  },
});

// Função para gerar senha aleatória
function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

// Função HTTP para criar usuário e enviar email
exports.createUserOnPurchase = functions.https.onRequest(async (req, res) => {
  const { email } = req.body; // Dados enviados pelo webhook da Kiwify

  if (!email) {
    res.status(400).send("Email não fornecido.");
    return;
  }

  const password = generatePassword();

  try {
    // Criar usuário no Firebase Authentication
    await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Enviar email com as credenciais
    const mailOptions = {
      from: "Do Zero ao Next dozeroaonext@gmail.com",
      to: email,
      subject: "Bem-vindo ao curso!",
      html: `
        <p>Olá,</p>
        <p>Obrigado por adquirir nosso curso! Aqui estão seus dados para acessar o site:</p>
        <ul>
          <li><strong>Link de acesso:</strong> <a href="https://dozeroaonext.com.br/dashboard">https://dozeroaonext.com.br/dashboard</a></li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Senha:</strong> ${password}</li>
        </ul>
        <p>Em caso de dúvidas, entre em contato pelo email <a href="mailto:dozeroaonext@gmail.com">dozeroaonext@gmail.com</a>.</p>
        <p>Atenciosamente,<br>Equipe do Curso</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Usuário criado e email enviado.");
  } catch (error) {
    console.error("Erro ao criar usuário ou enviar email:", error);

    if (error.code === "auth/email-already-exists") {
      res.status(400).send("O email já está registrado.");
    } else if (error.response) {
      res.status(500).send("Erro no envio de email.");
    } else {
      res.status(500).send("Erro ao processar a solicitação.");
    }
  }
});
