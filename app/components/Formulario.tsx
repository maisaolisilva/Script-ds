'use client';

import { useState } from "react";

interface Erros {
    nome: string;
    email: string;
    telefone: string;
}

export default function Formulario() {
    const [email, setEmail] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [errors, setErrors] = useState<Erros>({ nome: '', email: '', telefone: '' });

    const validarEmail = (email: string): boolean => {
        const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validarTelefone = (telefone: string): boolean => {
        const regex = /^\d{10,11}$/;
        return regex.test(telefone);
    };

    const validarNome = (nome: string): boolean => {
        return nome.trim().split(" ").length >= 2;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const novosErros: Erros = {
            nome: validarNome(nome) ? '' : 'O nome deve conter pelo menos dois nomes.',
            email: validarEmail(email) ? '' : 'O email não é válido.',
            telefone: validarTelefone(telefone) ? '' : 'O telefone deve conter apenas números e ter 10 ou 11 dígitos.',
        };

        setErrors(novosErros);
        
        if (Object.values(novosErros).some((erro) => erro !== '')) {
            return;
        }
    
        const dadosDoFormulario = { nome, email, telefone };
    
        try {
            const response = await fetch('/api/cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosDoFormulario),
            });
            
            if (response.ok) {
                console.log("Cliente cadastrado");
                const responseEmail = await fetch("/api/enviaEmail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dadosDoFormulario),
                });
                
                if (responseEmail.ok) {
                    console.log("Email enviado com sucesso!");
                    setEmail('');
                    setNome('');
                    setTelefone('');
                    alert("Dados enviados e email enviado com sucesso!");
                } else {
                    console.error("Erro ao enviar email");
                }
            }
        } catch (err) {
            console.error('Erro ao enviar dados:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nome">Nome:</label>
                <input value={nome} type="text" name="nome" id="nome" placeholder="Escreva seu nome completo" onChange={(e) => setNome(e.target.value)} required />
                {errors.nome && <p style={{ color: 'red' }}>{errors.nome}</p>}
            </div>
            <div>
                <label htmlFor="email">E-mail:</label>
                <input value={email} type="email" name="email" id="email" placeholder="seuemail@exemplo.com" onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="telefone">Telefone:</label>
                <input value={telefone} type="tel" name="telefone" id="telefone" placeholder="24999999999" onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))} required />
                {errors.telefone && <p style={{ color: 'red' }}>{errors.telefone}</p>}
            </div>
            <button type="submit">Solicitar Orçamento</button>
        </form>
    );
}
