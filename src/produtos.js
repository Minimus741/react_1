import React, { useState } from "react";
import { Link } from "react-router-dom"; // Para criar links entre as páginas

// Componente para listar os produtos
function Produtos({ adicionarAoCarrinho }) {
  // Lista de todos os produtos disponíveis
  const todosOsProdutos = [
    { id: 1, nome: "PC Gaming RGB Full Leds", preco: 899, categoria: "Computadores", imagem: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg" },
    { id: 2, nome: "Laptop Todo XPTO", preco: 1100, categoria: "Laptops", imagem: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7" },
    { id: 3, nome: "Teclado Mecânico RGB", preco: 120, categoria: "Periféricos", imagem: "https://m.media-amazon.com/images/I/71FSIp+tDNL.jpg" },
    // Podes adicionar mais produtos aqui
  ];

  // Estado para guardar os produtos filtrados
  const [produtosFiltrados, setProdutosFiltrados] = useState(todosOsProdutos);
  // Estado para guardar a categoria selecionada no filtro
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  // Função para filtrar os produtos com base na categoria
  const handleFiltroCategoria = (e) => {
    setCategoriaFiltro(e.target.value); // Atualiza o estado da categoria
    if (e.target.value === "") {
      setProdutosFiltrados(todosOsProdutos); // Mostra todos os produtos se nenhuma categoria for selecionada
    } else {
      setProdutosFiltrados(
        todosOsProdutos.filter((produto) => produto.categoria === e.target.value) // Filtra produtos pela categoria
      );
    }
  };

  return (
    <div style={estilos.secaoProdutos}>
      {/* Secção para o filtro de categorias */}
      <div style={estilos.filtro}>
        <h4>Filtrar por Categoria</h4>
        <select onChange={handleFiltroCategoria} value={categoriaFiltro}>
          <option value="">Todos</option>
          <option value="Computadores">Computadores</option>
          <option value="Laptops">Laptops</option>
          <option value="Periféricos">Periféricos</option>
        </select>
      </div>
      
      {/* Secção para listar os produtos */}
      <div style={estilos.produtos}>
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} style={estilos.produto}>
            {/* Link para a página de detalhes do produto */}
            <Link to={`/produto/${produto.id}`} style={estilos.linkProduto}>
              <img src={produto.imagem} alt={produto.nome} style={estilos.imagemProduto} />
              <p>{produto.nome}</p>
              <p>€{produto.preco.toFixed(2)}</p>
            </Link>
            {/* Botão para adicionar ao carrinho */}
            <button onClick={() => adicionarAoCarrinho(produto)} style={estilos.botaoAdicionar}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Estilos para o layout e design do componente
const estilos = {
  secaoProdutos: { 
    padding: "1rem", display: "flex" // Secção principal com filtro e produtos
  },
  filtro: { 
    width: "200px", marginRight: "20px" // Estilos para a secção do filtro
  },
  produtos: { 
    display: "flex", flexWrap: "wrap", gap: "20px" // Produtos organizados numa grelha
  },
  produto: { 
    border: "1px solid #ddd", padding: "10px", borderRadius: "10px", 
    width: "200px", textAlign: "center" // Cada produto individual
  },
  linkProduto: { 
    textDecoration: "none", color: "inherit" // Remove estilos do link e mantém cores
  },
  imagemProduto: { 
    width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" // Estilo para a imagem do produto
  },
  botaoAdicionar: { 
    marginTop: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", 
    padding: "10px", cursor: "pointer" // Botão de adicionar ao carrinho
  },
};

export default Produtos;
