"use client";

import Image from "next/image";
import styled from "styled-components";
import Formulario from "./components/Formulario";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  header{
    margin-top: 15px;
  }
  .linha{
    background: #15f5ba;
    height: 1px;
    margin-top: 10px;
  }
  main{
    h1{
      text-align: center;
    }
    .container{
      background: #2B2B2B;

      .introducao{
        display: flex;
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
        text-align: justify; 
        margin: 0 20px;
      }
    }
    .servicos{
      .conteudo{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        gap: 38px;
        h2{
          font-size: 20px;
        }
      }
      ul{
        margin: 10px 20px;
        li{
          color: #FFFFFF;
          strong{
            color: #15f5ba;
          }
        }
      }
    }
    .chamada{
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center; 
      justify-content: center; 
      text-align: justify; 
      margin: 10px 20px;
    }
    form{
      margin: 10px 20px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      div{
        width: 100%;
        display: flex;
        margin-bottom: 12px;
        flex-direction: column;
        input{
          padding: 13px;
          border-radius: 20px;
          color: #000000;
        }
      }
      button{
        color: #000000;
        background: #15f5ba;
        padding: 15px;
        border-radius: 20px;
        
      }
    }
    .aviso{
      font-size: 16px;
      text-decoration: underline;
      display: flex;
      flex-direction: column;
      align-items: center; 
      justify-content: center; 
      text-align: justify; 
      margin: 10px 20px;
    }

  }
`

export default function Page() {
  return (
    <StyledDiv>
      <header>
        <Image src="/script.svg"
        alt="Logo da empresa"
          width={150}
          height={150} />
      </header>
     
      <main>
        <h1><div>TEM UMA IDEIA?</div> EU DESENVOLVO!</h1>
        <div className="linha"></div>
        <div className="container">
          <div className="introducao">
            <p>Desenvolvo sites personalizados para empresas, empreendedores e criadores de conteúdo. </p>
            <p>Soluções web sob medida para o seu negócio e que cabem no seu bolso.</p>
          </div>
        </div>
        <section className="servicos">
          <div className="conteudo">
            <h2>Serviços oferecidos:</h2>
            <Image src="/www.svg"
            alt="imagem com uma tela de computador sendo apontada por um cursor"
            width={130}
            height={130} />
          </div>
          <ul>
            <li><strong>Institucionais</strong> → Site que apresenta a sua empresa de forma profissional</li>
            <li><strong>Lojas Virtuais</strong> → Vende online com um e-commerce eficiente</li>
            <li><strong>Blogs & Portais</strong> → Constrói a sua autoridade com um blog otimizado</li>
            <li><strong>Portfólios</strong> → Mostra o seu trabalho de forma impactante</li>
            <li><strong>Landing Pages & Hotsites</strong> → Páginas estratégicas para conversão</li>
          </ul>
        </section>
        <section className="chamada">
          <p>Pronto para ter um site profissional? Fale comigo e faça seu orçamento sem compromisso!</p>
        </section>
        <Formulario />
        <p className="aviso">Os seus dados serão utilizados apenas para responder ao seu pedido. Não partilhamos informações com terceiros.</p>
      </main>

    </StyledDiv>
  );
}
