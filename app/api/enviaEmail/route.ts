import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nome, email, telefone } = await req.json();

    if (!nome || !email || !telefone) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    // Configuração do transporte SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // Usa STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Envia o email
    const info = await transporter.sendMail({
      from: `"Novo Cadastro" <${process.env.EMAIL_USER}>`,
      to: "teuemail@gmail.com", // O email para onde será enviada a notificação
      subject: "Novo Cadastro no Site 🚀",
      text: `Nome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}`,
      html: `
        <h2>🚀 Novo Cadastro Recebido!</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
      `,
    });
    console.log("✅ Email enviado com sucesso!", info); // Inclua o objeto info completo
return NextResponse.json({ message: "Notificação enviada com sucesso!", info }, { status: 200 });

  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ message: "Erro ao enviar email" }, { status: 500 });
  }
}
