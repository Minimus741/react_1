import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obter o ID do produto da URL
import apiData from "./API.json"; // Arquivo com dados da API

function DetalhesProduto({ adicionarAoCarrinho }) {
  const { id } = useParams(); // Obtém o ID do produto da URL
  const [produto, setProduto] = useState(null); // Estado para guardar o produto encontrado

  // Função para obter a imagem com base na categoria
  const obterImagemPorCategoria = (categoria) => {
    const imagensCategorias = {
      "Fontes de Alimentação": "https://www.worten.pt/i/7e5c499d7abdc9e4757e61525e32d665bf048b3f",
      "Placas Gráficas": "https://www.worten.pt/i/17ed58e6095e9be43fb3c6cba64440a208460982",
      Teclados: "https://www.worten.pt/i/93f8b2abf211a7f4739576df366427c87b6ac431",
      Memórias: "https://www.worten.pt/i/8a85b122d357322bee8bed86577f3ed7d016059b",
      Ratos: "https://www.worten.pt/i/a25583dcca17a379c5a522cbfafc6bb3e8b09b9c",
      default: "https://via.placeholder.com/200?text=Imagem+Padrão",
    };

    return imagensCategorias[categoria] || "https://www.exemplo.com/imagens/default.png"; // Imagem padrão
  };

    // Função para obter a descrição com base na categoria
    const obterDescricaoPorCategoria = (categoria) => {
      const descricaoCategorias = {
        "Fontes de Alimentação": "A fonte de alimentação de alto desempenho é projetada para atender aos mais altos padrões de engenharia, é confiável e eficiente em termos de energia",
        "Placas Gráficas": "Com base na avançada ARQUITETURA “VEGA”, criada para lidar com grandes conjuntos de dados.As suas configurações de saída flexíveis são capazes de controlar vários monitores de alta resolução.",
        Teclados: "Efeitos de LED Chroma Marquee e 3 fases de configuração de brilho para teclado para melhorar a visibilidade em condições de pouca luz e opção de efeito de luz respirável no teclado.",
        Memórias: "O LEGEND 800 suporta a interface PCIe Gen4 x4 mais recente, que atende ao padrão NVMe 1.4. Oferece excelente desempenho de leitura e gravação, e suporte para as plataformas Intel e AMD mais recentes. Seja num desktop ou num laptop",
        Ratos: "Design ergonômico para conforto premium. Design simplificado com acabamento antiderrapante e anti-suor. Um ajuste perfeito para todos os tamanhos e formatos de mãos; para aproveitar ao máximo a tua experiência de jogo.",
      };
    
      return descricaoCategorias[categoria] || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."; // Descrição padrão
    };

  useEffect(() => {
    const produtoEncontrado = [];

    // Função para formatar os produtos da API
    const adicionarProduto = (categoria, dadosProduto) => {
      dadosProduto.slice(0, 5).forEach((produto, index) => {
        const preco = parseFloat(produto.price[1]) || 0;
        if (preco > 0) {
          produtoEncontrado.push({
            id: `${categoria.toLowerCase().replace(" ", "-")}-${index + 1}`, // Id único para o produto
            nome: `${produto.brand} ${produto.model}`,
            preco: preco,
            categoria: categoria,
            descricao: obterDescricaoPorCategoria(categoria),
            imagem: obterImagemPorCategoria(categoria), // Definir a imagem baseada na categoria
          });
        }
      });
    };

    // Carregar produtos da API
    if (apiData["power-supply"]) {
      adicionarProduto("Fontes de Alimentação", apiData["power-supply"]);
    }
    if (apiData["video-card"]) {
      adicionarProduto("Placas Gráficas", apiData["video-card"]);
    }
    if (apiData["keyboard"]) {
      adicionarProduto("Teclados", apiData["keyboard"]);
    }
    if (apiData["memory"]) {
      adicionarProduto("Memórias", apiData["memory"]);
    }
    if (apiData["mouse"]) {
      adicionarProduto("Ratos", apiData["mouse"]);
    }

    // Encontra o produto com base no ID
    const produtoEncontradoPorId = produtoEncontrado.find((p) => p.id === id);
    setProduto(produtoEncontradoPorId);
  }, [id]);

  // Mostra mensagem caso o produto não seja encontrado
  if (!produto) {
    return <div>Produto não encontrado!</div>;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{produto.nome}</h2>
      <img
        src={produto.imagem}
        alt={produto.nome}
        style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "10px" }}
      />
      <p><strong>Preço:</strong> €{produto.preco}</p>
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      <button
        onClick={() => adicionarAoCarrinho(produto)}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default DetalhesProduto;
