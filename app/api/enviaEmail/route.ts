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

    // Envia o email para o administrador
    const responseAdmin = await resend.emails.send({
      from: "contato@scriptdesenvolvimento.com.br", // domínio verificado no Resend
      to: "scriptdesenvolvimento@gmail.com", // email pessoal para receber notificações
      subject: "Novo Pedido de Orçamento 🚀",
      text: `Nome: ${body.nome}\nEmail: ${body.email}\nTelefone: ${body.telefone}`,
      html: `
        <h2>🚀 Novo Cadastro Recebido!</h2>
        <p><strong>Nome:</strong> ${body.nome}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Telefone:</strong> ${body.telefone}</p>
      `,
    });

    // Envia o email para o cliente
    const responseCliente = await resend.emails.send({
      from: "contato@scriptdesenvolvimento.com.br", 
      to: body.email, // Email do cliente
      subject: "Recebemos a sua solicitação!",
      text: `
Olá ${body.nome},

Obrigado por entrar em contato! Recebemos a sua solicitação de orçamento e, em breve, entrarei em contacto para entender melhor as suas necessidades e apresentar a melhor solução para o seu site.

Enquanto aguarda o meu retorno, pode já começar a pensar na estrutura e funcionalidades do seu site. Aqui estão algumas perguntas que podem ajudar nesse processo:

- Qual é o principal objetivo do seu site? (Ex.: vender produtos, divulgar serviços, captar contactos, blog, etc.)
- Tem alguma referência de site que gosta e gostaria de seguir como inspiração?
- Quais páginas e seções considera essenciais? (Ex.: Página inicial, Sobre, Serviços, Portifólio, Contatos, etc.)
- Já tem identidade visual (logotipo, cores, tipografia) ou precisa de ajuda com isso?
- Precisa de funcionalidades específicas? (Ex.: formulário de contato, integração com redes sociais, loja online, área de membros, etc.)

Com estas informações, poderei desenvolver uma proposta mais alinhada com as suas expectativas.

Caso tenha alguma dúvida, pode entrar em contato comigo a qualquer momento pelo e-mail scriptdesenvolvimento@gmail.com ou pelo WhatsApp +55 24 99258-1089.

Em breve falaremos mais sobre o seu projeto!

Cumprimentos,

Maisa
SCRIPT - Desenvolvimento de Software
      `,
    });

    console.log("✅ Emails enviados com sucesso!", { responseAdmin, responseCliente });
    return NextResponse.json({ message: "Emails enviados com sucesso!", responseAdmin, responseCliente }, { status: 200 });
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    return NextResponse.json({ message: "Erro ao enviar email" }, { status: 500 });
  }
}
