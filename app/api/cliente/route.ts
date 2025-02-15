import { dbConnect } from "@/app/lib/mongodb";
import Cliente from "@/app/models/Cliente";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    await dbConnect();

    //dados do corpo da requisição
    const body = await request.json();
    const { email, nome, telefone } = body;

     // Verifica se o email já está registrado
    const existingCliente = await Cliente.findOne({ email });
    if (existingCliente) {
    return NextResponse.json({ message: 'Email já está em uso' }, { status: 400 });
  }

  const cliente = await Cliente.create({
    nome,
    email,
    telefone
  })

  return NextResponse.json({ message: 'Cliente registrado com sucesso!' }, { status: 201 });
}