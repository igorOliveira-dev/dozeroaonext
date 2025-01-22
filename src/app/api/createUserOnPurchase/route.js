import admin from "firebase-admin";
import nodemailer from "nodemailer";

// Inicializar o Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// Configurar o Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Função para gerar senha aleatória
function generatePassword() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// Rota POST
export async function POST(req) {
  console.log("Recebendo solicitação de webhook...");
  const body = await req.json();

  console.log("Payload recebido:", body);

  const { email } = body;

  if (!email) {
    console.error("Erro: Email não fornecido no payload.");
    return new Response("Email não fornecido.", { status: 400 });
  }

  const password = generatePassword();
  console.log("Senha gerada para o usuário:", password);

  try {
    console.log("Tentando criar usuário no Firebase com o email:", email);
    await admin.auth().createUser({ email, password });
    console.log("Usuário criado com sucesso no Firebase.");

    const mailOptions = {
      from: "Do Zero ao Next <dozeroaonext@gmail.com>",
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

    console.log("Enviando email para o usuário:", email);
    await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso para:", email);

    return new Response("Usuário criado e email enviado.", { status: 200 });
  } catch (error) {
    console.error("Erro ao criar usuário ou enviar email:", error);

    if (error.code === "auth/email-already-exists") {
      console.warn("O email já está registrado no Firebase:", email);
      return new Response("O email já está registrado.", { status: 400 });
    } else if (error.response) {
      console.error("Detalhes do erro no envio de email:", error.response);
      return new Response("Erro no envio de email.", { status: 500 });
    } else {
      console.error("Erro genérico ao processar a solicitação.");
      return new Response("Erro ao processar a solicitação.", { status: 500 });
    }
  }
}
