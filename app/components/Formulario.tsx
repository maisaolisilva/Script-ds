'use client';

import { useState } from "react";

export default function Formulario() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dadosDoFormulario = {
            nome,
            email,
            telefone,
          };
    
        try{
            //chama API para cadastrar cliente
            const response = await fetch('/api/cliente', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, nome, telefone}),
            });
            if(response.ok) {
                console.log("cliente cadastrado")
                //se o cadastro for bem sucedido, envia um e-mail notificando atravez da API enviaEmail
                const responseEmail = await fetch("/api/enviaEmail", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
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
        } catch(err) {
            console.error('Erro ao enviar dados:', err);
        }

    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nome">Nome:</label>
                <input value={ nome } 
                    type="text" name="nome" id="nome" 
                    placeholder="Escreva seu nome completo" 
                    onChange={(e) => setNome(e.target.value)}
                    required/>
            </div>
            <div>
                <label htmlFor="email">E-mail:</label>
                <input value={ email } 
                    type="email" name="email" id="email" 
                    placeholder="seuemail@exemplo.com"
                    onChange={(e) => setEmail(e.target.value)} 
                    required/>
            </div>
            <div>
                <label htmlFor="telefone">Telefone:</label>
                <input value={telefone} 
                    type="tel" name="telefone" id="telefone" 
                    placeholder="2499999-9999" 
                    onChange={(e) => setTelefone(e.target.value)}
                    required/>
            </div>
            <button type="submit">Solicitar Orçamento</button>
      </form>
    )
}