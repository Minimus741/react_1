import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Produtos from "./produtos";
import DetalhesProduto from "./Detalhesproduto";
import Carrinho from "./carrinho";
import "./produtos.css";

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
    // Configuração do Router para gerenciar as rotas da aplicação
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

// Componente para a página inicial
function Home() {
  // Produtos em destaque na página inicial
  const produtosEmDestaque = [
    { id: 1, nome: "PC Gaming RGB Full Leds", preco: 899, imagem: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg" },
    { id: 2, nome: "Laptop Todo XPTO", preco: 1100, imagem: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7" },
  ];

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
            {/* Link para ver mais detalhes sobre o produto */}
            <Link to={`/produto/${produto.id}`} style={estilos.linkProduto}>
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos usados na aplicação
const estilos = {
  navbar: { display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#333", color: "#fff" },
  linkLogo: { textDecoration: "none", color: "inherit" },
  logo: { margin: 0 },
  link: { margin: "0 10px", color: "#fff", textDecoration: "none" },
  secao: { padding: "1rem", textAlign: "center" },
  containerProdutosEmDestaque: { display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" },
  produtoEmDestaque: { border: "1px solid #ddd", padding: "10px", borderRadius: "10px", width: "200px", textAlign: "center" },
  imagemProdutoEmDestaque: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" },
  linkProduto: { display: "block", marginTop: "10px", color: "#007BFF", textDecoration: "none" },
};

export default App;