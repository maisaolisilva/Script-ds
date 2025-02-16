import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  nome: string;
  email: string;
  telefone: string;
}

export async function POST(req: Request) {
  try {
    const body: EmailRequest = await req.json();

    if (!body.nome || !body.email || !body.telefone) {
      return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
    }

    // Envia o email usando o Resend
    const response = await resend.emails.send({
      from: `scriptdesenvolvimento.com.br`, // Usa o teu domínio verificado no Resend
      to: "scriptdesenvolvimento@gmail.com", // O teu email pessoal para receber notificações
      subject: "Novo Pedido de Orçamento 🚀",
      text: `Nome: ${body.nome}\nEmail: ${body.email}\nTelefone: ${body.telefone}`,
      html: `
        <h2>🚀 Novo Cadastro Recebido!</h2>
        <p><strong>Nome:</strong> ${body.nome}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Telefone:</strong> ${body.telefone}</p>
      `,
    });

    console.log("✅ Email enviado com sucesso!", response);
    return NextResponse.json({ message: "Email enviado com sucesso!", response }, { status: 200 });

  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return NextResponse.json({ message: "Erro ao enviar email" }, { status: 500 });
  }
}
