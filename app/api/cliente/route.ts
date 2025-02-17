import { dbConnect } from "@/app/lib/mongodb";
import Cliente from "@/app/models/Cliente";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email, nome, telefone } = body;

    // Verifica se o email já existe no banco
    const existingCliente = await Cliente.findOne({ email }).lean();
    if (existingCliente) {
      return NextResponse.json({ message: 'Email já está em uso' }, { status: 400 });
    }

    // Cria um novo cliente
    await Cliente.create({ nome, email, telefone });
    return NextResponse.json({ message: 'Cliente registrado com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
  }
}
