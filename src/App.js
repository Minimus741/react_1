import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Produtos from "./produtos";
import DetalhesProduto from "./Detalhesproduto";
import Carrinho from "./carrinho";
import "./produtos.css";
import API from "./API";
function App() {
  // Estado para armazenar os produtos no carrinho
  const [carrinho, setCarrinho] = useState([]);

  // Função para adicionar produtos ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => {
      // Verifica se o produto já está no carrinho
      const produtoExistente = prevCarrinho.find((item) => item.id === produto.id);
      if (produtoExistente) {
        // Se já existe, aumenta a quantidade
        return prevCarrinho.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Caso contrário, adiciona o produto com quantidade inicial 1
        return [...prevCarrinho, { ...produto, quantidade: 1 }];
      }
    });
  };

  // Função para remover produtos do carrinho
  const removerDoCarrinho = (produtoParaRemover) => {
    setCarrinho((prevCarrinho) =>
      // Filtra os produtos, removendo o selecionado
      prevCarrinho.filter((produto) => produto.id !== produtoParaRemover.id)
    );
  };

  // Função para atualizar a quantidade de um produto no carrinho
  const atualizarQuantidade = (produtoParaAtualizar, quantidade) => {
    setCarrinho((prevCarrinho) =>
      // Atualiza a quantidade do produto especificado
      prevCarrinho.map((produto) =>
        produto.id === produtoParaAtualizar.id
          ? { ...produto, quantidade: quantidade }
          : produto
      )
    );
  };

  return (
    <Router>
      <div style={estilos.navbar}>
        {/* Logótipo que redireciona para a página principal */}
        <Link to="/" style={estilos.linkLogo}>
          <h1 style={estilos.logo}>InfoByte</h1>
        </Link>
        {/* Navegação principal */}
        <nav>
          <Link to="/" style={estilos.link}>Página Principal</Link>
          <Link to="/produtos" style={estilos.link}>Produtos</Link>
          <Link to="/carrinho" style={estilos.link}>
            Carrinho ({carrinho.length}) {/* Mostra a quantidade de itens no carrinho */}
          </Link>
        </nav>
      </div>
      <Routes>
        {/* Define as rotas e os respetivos componentes */}
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos adicionarAoCarrinho={adicionarAoCarrinho} />} />
        <Route path="/produto/:id" element={<DetalhesProduto adicionarAoCarrinho={adicionarAoCarrinho} />} />
        <Route
          path="/carrinho"
          element={<Carrinho
            carrinho={carrinho}
            removerDoCarrinho={removerDoCarrinho}
            atualizarQuantidade={atualizarQuantidade}
          />}
        />
      </Routes>
    </Router>
  );
}

// Página inicial
function Home() {
  const apiData = API;

  const obterProdutosDaAPI = () => {
    const produtos = [];
    Object.keys(apiData).forEach((categoria) => {
      apiData[categoria].forEach((produto) => {
        const preco = parseFloat(produto.price[1]);
        if (!isNaN(preco) && preco > 0) {
          produtos.push({
            id: produto.id || `${categoria}-${produto.model}`,
            nome: `${produto.brand} ${produto.model}`,
            preco: preco,
            imagem: produto.image || "https://www.worten.pt/i/7e5c499d7abdc9e4757e61525e32d665bf048b3f",
          });
        }
      });
    });
    return produtos.slice(0, 3);
  };

  const produtosEmDestaque = obterProdutosDaAPI();

  return (
    <div style={estilos.secao}>
      <h3>Produtos em Destaque</h3>
      <div style={estilos.containerProdutosEmDestaque}>
        {produtosEmDestaque.map((produto) => (
          <div key={produto.id} style={estilos.produtoEmDestaque}>
            <img
              src={produto.imagem}
              alt={produto.nome}
              style={estilos.imagemProdutoEmDestaque}
            />
            <p>{produto.nome}</p>
            <p>€{produto.preco.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div style={estilos.imagemAbaixoProdutos}>
        <h3 style={estilos.textoImagem}>Entre em contacto connosco!</h3>
      </div>
    </div>
  );
}





const estilos = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1.5rem 2rem",
    backgroundColor: "#212121", /* Cor escura */
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", /* Sombra mais densa para dar profundidade */
    position: "sticky",
    top: 0,
    zIndex: 1000,

  },
  linkLogo: {
    textDecoration: "none",
    color: "inherit",
    
  },
  logo: {
    margin: 0,
    fontSize: "2.5rem",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#FFD700", 
    textTransform: "uppercase",
    transition: "color 0.3s ease",
    
  },
  logoHover: {
    color: "#ff5733", 
  },
  link: {
    margin: "0 20px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
    fontWeight: "500",
    transition: "color 0.3s ease, transform 0.3s ease",
    
  },
  linkHover: {
    color: "#FFD700", /* Cor de ouro no hover */
    transform: "scale(1.05)",
  },

  /* Seção de produtos em destaque */
  secao: {
    padding: "3rem 1rem",
    textAlign: "center",
    backgroundColor: "#f4f4f4", /* Cor de fundo mais clara para contraste */
    borderRadius: "20px",
    marginTop: "3rem",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)", /* Sombra para dar elegância */
  },
  containerProdutosEmDestaque: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  produtoEmDestaque: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "15px",
    width: "250px",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    
  },
  produtoEmDestaqueHover: {
    transform: "scale(1.05)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#f2f2f2", /* Fundo mais suave ao passar o rato */
    
  },

  /* Imagem do produto */
  imagemProdutoEmDestaque: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
    transition: "transform 0.3s ease, opacity 0.3s ease",
  },

  linkProdutoHover: {
    color: "#ff5733", /* Cor chamativa no hover */
  },

  /* Efeito de hover para as imagens */
  imagemProdutoHover: {
    transform: "scale(1.1)", /* Efeito de zoom nas imagens */
    opacity: "0.8", /* Diminui a opacidade para criar um efeito de foco */
  },

  /* Efeito de transição suave */
  transition: "all 0.3s ease-in-out",

  imagemAbaixoProdutos: {
    width: "100%",
    minHeight: "400px", // Define uma altura mínima para a seção
    backgroundImage: "url(https://tinyurl.com/y5mtwypw)",
    backgroundSize: "contain", // Ajusta o tamanho da imagem para caber na seção
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column", // Permite empilhar elementos verticalmente
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px", // Espaçamento interno para o conteúdo
  },
  textoImagem: {
    color: "#fff", // Cor do texto em branco
    fontSize: "2rem", // Fonte maior para destaque
    fontWeight: "bold", // Texto mais destacado
    fontFamily: "Arial, sans-serif", // Alterar para Arial
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Sombra mais forte para contraste
    WebkitTextStroke: "0.6px black", // Borda preta mais definida para navegadores WebKit
    textStroke: "1px black", // Borda preta mais definida
    margin: "15px 0", // Espaçamento maior entre as linhas de texto
  },
  
  };
  
  
export default App;