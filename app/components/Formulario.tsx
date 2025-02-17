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
    const [loading, setLoading] = useState<boolean>(false);
    const [mensagem, setMensagem] = useState<string | null>(null);

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
        setLoading(true);
        setMensagem(null);

        const novosErros: Erros = {
            nome: validarNome(nome) ? '' : 'O nome deve conter pelo menos dois nomes.',
            email: validarEmail(email) ? '' : 'O email não é válido.',
            telefone: validarTelefone(telefone) ? '' : 'O telefone deve conter apenas números e ter 10 ou 11 dígitos.',
        };

        setErrors(novosErros);
        
        if (Object.values(novosErros).some((erro) => erro !== '')) {
            setLoading(false);
            return;
        }
    
        const dadosDoFormulario = { nome, email, telefone };
    
        try {
            const response = await fetch('/api/cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosDoFormulario),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setMensagem(data.message);
            } else {
                console.log("Cliente cadastrado");
                setEmail('');
                setNome('');
                setTelefone('');
                setMensagem("Dados enviados e email enviado com sucesso!");
            }
        } catch (err) {
            console.error('Erro ao enviar dados:', err);
            setMensagem("Erro ao enviar os dados.");
        } finally {
            setLoading(false);
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
            <button 
                type="submit" 
                disabled={loading} 
                style={{ opacity: loading ? 0.5 : 1 }}
            >
                {loading ? "Enviando..." : "Solicitar Orçamento"}
            </button>
            {loading && <p>Processando...</p>}
            {mensagem && <p style={{ color: mensagem.includes("sucesso") ? 'green' : 'red' }}>{mensagem}</p>}
        </form>
    );
}
