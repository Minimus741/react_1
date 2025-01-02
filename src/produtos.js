import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importar o arquivo JSON diretamente
import apiData from "./API.json";

function Produtos({ adicionarAoCarrinho }) {
  const [produtos, setProdutos] = useState([]); // Estado para guardar os produtos
  const [produtosFiltrados, setProdutosFiltrados] = useState([]); // Produtos filtrados
  const [categoriaFiltro, setCategoriaFiltro] = useState(""); // Categoria do filtro

  // Caminhos das imagens de placeholder
  const psuImagem = "https://via.placeholder.com/200?text=PSU";
  const gpuImagem = "https://via.placeholder.com/200?text=GPU";
  const tecladoImagem = "https://via.placeholder.com/200?text=Teclado";
  const memoriaImagem = "https://via.placeholder.com/200?text=Memória";
  const ratoImagem = "https://via.placeholder.com/200?text=Rato";

  // Carregar os dados da API (já importado)
  useEffect(() => {
    const produtosFormatados = [];

    // Fontes de alimentação
    if (apiData["power-supply"]) {
      produtosFormatados.push(...apiData["power-supply"].slice(0, 5).map((produto, index) => ({
        id: `psu-${index + 1}`,
        nome: `${produto.brand} ${produto.model}`,
        preco: parseFloat(produto.price[1]) || 0,
        categoria: "Fontes de Alimentação",
        imagem: psuImagem,
      })));
    }

    // Placas gráficas
    if (apiData["video-card"]) {
      produtosFormatados.push(...apiData["video-card"].slice(0, 5).map((produto, index) => ({
        id: `gpu-${index + 1}`,
        nome: `${produto.brand} ${produto.model}`,
        preco: parseFloat(produto.price[1]) || 0,
        categoria: "Placas Gráficas",
        imagem: gpuImagem,
      })));
    }

    // Teclados
    if (apiData["keyboard"]) {
      produtosFormatados.push(...apiData["keyboard"].slice(0, 5).map((produto, index) => ({
        id: `keyboard-${index + 1}`,
        nome: `${produto.brand} ${produto.model}`,
        preco: parseFloat(produto.price[1]) || 0,
        categoria: "Teclados",
        imagem: tecladoImagem,
      })));
    }

    // Memórias
    if (apiData["memory"]) {
      produtosFormatados.push(...apiData["memory"].slice(0, 5).map((produto, index) => ({
        id: `memory-${index + 1}`,
        nome: `${produto.brand} ${produto.model}`,
        preco: parseFloat(produto.price[1]) || 0,
        categoria: "Memórias",
        imagem: memoriaImagem,
      })));
    }

    // Ratos
    if (apiData["mouse"]) {
      produtosFormatados.push(...apiData["mouse"].slice(0, 5).map((produto, index) => ({
        id: `mouse-${index + 1}`,
        nome: `${produto.brand} ${produto.model}`,
        preco: parseFloat(produto.price[1]) || 0,
        categoria: "Ratos",
        imagem: ratoImagem,
      })));
    }

    setProdutos(produtosFormatados); // Atualiza o estado com todos os produtos
    setProdutosFiltrados(produtosFormatados); // Inicialmente, mostra todos os produtos
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
