"use client";

import Image from "next/image";
import styled from "styled-components";
import Formulario from "./components/Formulario";
import Link from "next/link";

const StyledDiv = styled.div`
  margin: 0 77px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  header{
    margin-top: 15px;
    width: 100%;
    div {
      display: flex;
      gap: 58px;
      a {
      font-size: 29px;
      &:hover {
        text-decoration: underline;
      }
      }
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .linha{
    background: #15f5ba;
    height: 1px;
    margin-top: 10px;
    width: 100%;
    margin-bottom: 37px;
  }
  main{
    h1{
      text-align: center;
    }
    .apresentacao {
      margin-top: 29px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      .apresentacao-texto {
        font-size: 24px;
      }
    }
    .servicos, .planos {
      margin-top: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 100px;
        margin-top: 33px;
      }
      .card-servicos, .card-planos{
        border: #15f5ba solid 2px;
        display: flex;
        flex-direction: column;
        gap: 80px;
        width: 300px;
        height: 400px;
        justify-content: center;
        text-align: center;
        p {
          font-size: 16px;
        }
        h3 {
          text-decoration: underline;
        }
      }
      .card-planos {
        background: #1acb9c;
        color: #000000;
      }
      
    }
    .contato{
      font-size: 20px;
      display: flex;
      flex-direction: column;
      align-items: center; 
      justify-content: center; 
      text-align: justify; 
      margin: 33px 10px 20px;
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

  @media (max-width: 841px){
    margin: 0 30px;
    .logo {
      width: 100px;
      height: 100px;
    }
    header {
      display: flex;
      flex-direction: column;
      div {
        gap: 40px;
        a {
        font-size: 20px;
      }
      }
    }
    main{
      .apresentacao {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        .apresentacao-texto {
          font-size: 24px;
        }
      }
    }    
  }

`

export default function Page() {
  return (
    <StyledDiv>
      <header>
        <Image className="logo" src="/script.svg"
        alt="Logo da empresa"
          width={150}
          height={150} />
        <nav>
          <div>
            <Link href={'#servicos'}>Serviços</Link>
            <Link href={'#planos'}>Planos</Link>
            <Link href={'#contato'}>Contato</Link>
          </div>
        </nav>
      </header>
      <div className="linha"></div>
      <main>
        <h1>Precisa de resultados com sites na internet? <br /> Nós desenvolvemos!</h1>
        <section id="apresentacao" className="apresentacao">
          <div>
            <p className="apresentacao-texto">Desenvolvemos sites personalizados para pequenas e médias empresas, empreendedores e criadores de conteúdo.</p>
          </div>
          <Image 
            src="/site-aberto.png"
            alt="Imagem de um computador e um celular com um site aberto nas telas"
            width={345.9}
            height={344.2}
          />
        </section>
        <section id="servicos" className="servicos">
          <h2>Serviços Oferecidos</h2>
          <ul>
            <li>
              <div className="card-servicos">
                <h3>Criação de sites personalizados</h3>
                <h4>Institucionais, Portifólios, Blogs e Portais</h4>
                <p>Sites sob medida para destacar a sua marca, mostrar o seu trabalho ou construir autoridade com conteúdo de qualidade.</p>
              </div>
            </li>
            <li>
              <div className="card-servicos">
                <h3>Lojas Virtuais que Vendem</h3>
                <h4>E-commerce rápido, seguro e fácil de gerir</h4>
                <p>Transforme visitantes em clientes com uma loja online eficiente, responsiva e pronta para crescer com o seu negócio.</p>
              </div>
            </li>
            <li>
              <div className="card-servicos">
                <h3> Landing Pages Estratégicas</h3>
                <h4>Landing Pages e Hotsites para conversão</h4>
                <p>Páginas criadas para gerar resultados: campanhas, lançamentos ou promoções com foco total em performance.</p>
              </div>
            </li>
            <li>
              <div className="card-servicos">
                <h3> Hospedagem & Suporte Humanizado</h3>
                <h4>Infraestrutura na nuvem e assistência de verdade</h4>
                <p>Tenha segurança, velocidade e atendimento próximo sempre que precisar. Um parceiro técnico que fala a sua língua.</p>
              </div>
            </li>
            <li>
              <div className="card-servicos">
                <h3>  Tecnologia de Ponta & Personalização Total</h3>
                
                <p>Trabalhamos com as tecnologias web mais atuais para garantir desempenho, segurança e escalabilidade.
 Cada site é único, feito sob medida para refletir a identidade e os objetivos do seu negócio.</p>
              </div>
            </li>
          </ul>
        </section>
        <section id="planos" className="planos">
          <h2>Nossos Planos</h2>
          <ul>
            <li>
              <div className="card-planos">
                <h3>Sites Profissionais a partir de R$ 800,00</h3>
                <p>Sites personalizados e adaptáveis a qualquer dispositivo.</p>
              </div>
            </li>
            <li>
              <div className="card-planos">
                <h3> Hospedagem Segura a partir de R$ 30/mês</h3>
                <p>Hospedagem na nuvem com alta performance, segurança reforçada e suporte técnico humanizado.
 Seu site sempre estável, rápido e acessível, onde e quando o seu cliente precisar.</p>
              </div>
            </li>
          </ul>
        </section>
        <section id="contato" className="contato">
          <h2> Contato</h2>
          <p>Pronto para ter um site profissional? Fale conosco e faça seu orçamento sem compromisso!</p>
        </section>
        <Formulario />
        <p className="aviso">Os seus dados serão utilizados apenas para responder ao seu pedido. Não partilhamos informações com terceiros.</p>
      </main>

    </StyledDiv>
  );
}
