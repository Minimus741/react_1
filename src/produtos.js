import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importar o arquivo JSON diretamente
import apiData from "./API.json";

function Produtos({ adicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]); // Estado para guardar os produtos
  const [produtosFiltrados, setProdutosFiltrados] = useState([]); // Produtos filtrados
  const [categoriaFiltro, setCategoriaFiltro] = useState(""); // Categoria do filtro

  // URLs de imagens reais por categoria
  const imagensPorCategoria = {
    "Fontes de Alimentação": "https://www.worten.pt/i/7e5c499d7abdc9e4757e61525e32d665bf048b3f",
    "Placas Gráficas": "https://www.worten.pt/i/17ed58e6095e9be43fb3c6cba64440a208460982",
    Teclados: "https://www.worten.pt/i/93f8b2abf211a7f4739576df366427c87b6ac431",
    Memórias: "https://www.worten.pt/i/8a85b122d357322bee8bed86577f3ed7d016059b",
    Ratos: "https://www.worten.pt/i/a25583dcca17a379c5a522cbfafc6bb3e8b09b9c",
    default: "https://via.placeholder.com/200?text=Imagem+Padrão",
  };

  // Carregar os dados da API 
  useEffect(() => {
    const produtosFormatados = [];

    // Função para formatar os produtos e filtrar os que tem preço válido
    const adicionarProduto = (categoria, dadosProduto, categoriaImagem) => {
      dadosProduto.slice(0, 5).forEach((produto, index) => {
        const preco = parseFloat(produto.price[1]) || 0;
        if (preco > 0) {
          produtosFormatados.push({
            id: `${categoria.toLowerCase().replace(" ", "-")}-${index + 1}`,
            nome: `${produto.brand} ${produto.model}`,
            preco: preco,
            categoria: categoria,
            imagem: imagensPorCategoria[categoriaImagem] || imagensPorCategoria.default,
          });
        }
      });
    };

    // Fontes de alimentação
    if (apiData["power-supply"]) {
      adicionarProduto("Fontes de Alimentação", apiData["power-supply"], "Fontes de Alimentação");
    }

    // Placas gráficas
    if (apiData["video-card"]) {
      adicionarProduto("Placas Gráficas", apiData["video-card"], "Placas Gráficas");
    }

    // Teclados
    if (apiData["keyboard"]) {
      adicionarProduto("Teclados", apiData["keyboard"], "Teclados");
    }

    // Memórias
    if (apiData["memory"]) {
      adicionarProduto("Memórias", apiData["memory"], "Memórias");
    }

    // Ratos
    if (apiData["mouse"]) {
      adicionarProduto("Ratos", apiData["mouse"], "Ratos");
    }

    setProdutos(produtosFormatados); // Atualiza o estado com todos os produtos válidos
    setProdutosFiltrados(produtosFormatados); // Inicialmente mostra todos os produtos válidos
  }, []);

  // Função para filtrar os produtos pela categoria selecionada
  const handleFiltroCategoria = (e) => {
    setCategoriaFiltro(e.target.value); // Atualiza o filtro de categoria
    setProdutosFiltrados(
      e.target.value === ""
        ? produtos // Mostra todos os produtos se não houver categoria
        : produtos.filter((produto) => produto.categoria === e.target.value) // Filtra pela categoria
    );
  };

  return (
    <div>
      {/* Filtro para selecionar a categoria */}
      <div>
        <h4>Filtrar por Categoria</h4>
        <select onChange={handleFiltroCategoria} value={categoriaFiltro}>
          <option value="">Todos</option>
          <option value="Fontes de Alimentação">Fontes de Alimentação</option>
          <option value="Placas Gráficas">Placas Gráficas</option>
          <option value="Teclados">Teclados</option>
          <option value="Memórias">Memórias</option>
          <option value="Ratos">Ratos</option>
        </select>
      </div>

      {/* Exibe os produtos filtrados */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
            {/* Link para a página de detalhes do produto */}
            <Link to={`/produto/${produto.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={produto.imagem} // Imagem do produto
                alt={produto.nome}
                style={{ width: "100%", height: "150px", objectFit: "cover" }} // Estilo para a imagem
              />
              <p>{produto.nome}</p>
              <p>€{produto.preco.toFixed(2)}</p>
            </Link>
            {/* Botão para adicionar ao carrinho */}
            <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Produtos;
