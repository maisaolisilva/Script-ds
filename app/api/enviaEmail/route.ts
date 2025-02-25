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
      from: `contato@scriptdesenvolvimento.com.br`, // domínio verificado no Resend
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

    //Envia e-mail para o cliente.
    const clienteEmail = await resend.emails.send({
      from: `contato@scriptdesenvolvimento.com.br`, // domínio verificado no Resend
      to: body.email, // Email do cliente cadastrado
      subject: "Confirmação de Pedido de Orçamento ✅",
      text: `Olá ${body.nome}, recebemos sua solicitação de orçamento! Logo entraremos em contato.`,
      html: `
        <h2 style="color: #333;">Olá ${body.nome},</h2>
        <p>Obrigado por entrar em contato! Recebemos a sua solicitação de orçamento e, em breve, entrarei em contacto para entender melhor as suas necessidades e apresentar a melhor solução para o seu site.</p>
        <p>Enquanto aguarda o meu retorno, pode já começar a pensar na estrutura e funcionalidades do seu site. Aqui estão algumas perguntas que podem ajudar nesse processo:</p>
        <ul style="list-style-type: disc; padding-left: 20px;">
          <li>Qual é o principal objetivo do seu site? (Ex.: vender produtos, divulgar serviços, captar contactos, blog, etc.)</li>
          <li>Tem alguma referência de site que gosta e gostaria de seguir como inspiração?</li>
          <li>Quais páginas e seções considera essenciais? (Ex.: Página inicial, Sobre, Serviços, Portefólio, Contactos, etc.)</li>
          <li>Já tem identidade visual (logotipo, cores, tipografia) ou precisa de ajuda com isso?</li>
          <li>Precisa de funcionalidades específicas? (Ex.: formulário de contacto, integração com redes sociais, loja online, área de membros, etc.)</li>
        </ul>
        <p>Com estas informações, poderei desenvolver uma proposta mais alinhada com as suas expectativas.</p>
        <p>Caso tenha alguma dúvida, pode entrar em contacto comigo a qualquer momento pelo e-mail scriptdesenvolvimento@gmail.com ou pelo WhatsApp +55 24 99258-1089.</p>
        <p>Em breve falaremos mais sobre o seu projeto!</p>
        <p>Cumprimentos,</p>
        <p>Maisa</p>
        <p>SCRIPT - Desenvolvimento de Sftwares Ltda</p>
              `,
    });

    console.log("✅ Email enviado com sucesso!", response);
    return NextResponse.json({ message: "Email enviado com sucesso!", response }, { status: 200 });

  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return NextResponse.json({ message: "Erro ao enviar email" }, { status: 500 });
  }
}
