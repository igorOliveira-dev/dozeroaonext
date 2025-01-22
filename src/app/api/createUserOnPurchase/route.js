const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Inicializar o Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:
        process.env.FIREBASE_PROJECT_ID,
      clientEmail:
        process.env
          .FIREBASE_CLIENT_EMAIL,
      privateKey:
        process.env.FIREBASE_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
    }),
  });
}

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

function generatePassword() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length: 12 },
    () =>
      chars[
        Math.floor(
          Math.random() * chars.length
        )
      ]
  ).join("");
}

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    res
      .status(405)
      .send("Método não permitido.");
    return;
  }

  const { email } = req.body;

  if (!email) {
    res
      .status(400)
      .send("Email não fornecido.");
    return;
  }

  const password = generatePassword();

  try {
    await admin
      .auth()
      .createUser({ email, password });

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

    await transporter.sendMail(
      mailOptions
    );

    res
      .status(200)
      .send(
        "Usuário criado e email enviado."
      );
  } catch (error) {
    console.error(
      "Erro ao criar usuário ou enviar email:",
      error
    );

    if (
      error.code ===
      "auth/email-already-exists"
    ) {
      res
        .status(400)
        .send(
          "O email já está registrado."
        );
    } else if (error.response) {
      res
        .status(500)
        .send(
          "Erro no envio de email."
        );
    } else {
      res
        .status(500)
        .send(
          "Erro ao processar a solicitação."
        );
    }
  }
}
