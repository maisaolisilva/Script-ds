import { dbConnect } from "@/app/lib/mongodb";
import Cliente from "@/app/models/Cliente";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { email, nome, telefone } = body;

    try {
      const existingCliente = await Cliente.findOne({ email });
      if (existingCliente) {
        return NextResponse.json({ message: 'Email já está em uso' }, { status: 400 });
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return NextResponse.json({ message: 'Erro ao verificar email' }, { status: 500 });
    }

    try {
      const cliente = await Cliente.create({
        nome,
        email,
        telefone
      });
      return NextResponse.json({ message: 'Cliente registrado com sucesso!' }, { status: 201 });
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return NextResponse.json({ message: 'Erro ao criar cliente' }, { status: 500 });
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return NextResponse.json({ message: 'Erro na requisição' }, { status: 500 });
  }
}