import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importação do Link

function Produtos({ adicionarAoCarrinho }) {
  const todosOsProdutos = [
    { id: 1, nome: "PC Gaming RGB Full Leds", preco: 899, categoria: "Computadores", imagem: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg" },
    { id: 2, nome: "Laptop Todo XPTO", preco: 1100, categoria: "Laptops", imagem: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7" },
    { id: 3, nome: "Teclado Mecânico RGB", preco: 120, categoria: "Periféricos", imagem: "https://m.media-amazon.com/images/I/71FSIp+tDNL.jpg" },
    // Adicionar mais produtos aqui
  ];

  const [produtosFiltrados, setProdutosFiltrados] = useState(todosOsProdutos);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  const handleFiltroCategoria = (e) => {
    setCategoriaFiltro(e.target.value);
    if (e.target.value === "") {
      setProdutosFiltrados(todosOsProdutos);
    } else {
      setProdutosFiltrados(todosOsProdutos.filter(produto => produto.categoria === e.target.value));
    }
  };

  return (
    <div style={estilos.secaoProdutos}>
      <div style={estilos.filtro}>
        <h4>Filtrar por Categoria</h4>
        <select onChange={handleFiltroCategoria} value={categoriaFiltro}>
          <option value="">Todos</option>
          <option value="Computadores">Computadores</option>
          <option value="Laptops">Laptops</option>
          <option value="Periféricos">Periféricos</option>
        </select>
      </div>
      <div style={estilos.produtos}>
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} style={estilos.produto}>
            <Link to={`/produto/${produto.id}`} style={estilos.linkProduto}>
              <img src={produto.imagem} alt={produto.nome} style={estilos.imagemProduto} />
              <p>{produto.nome}</p>
              <p>€{produto.preco.toFixed(2)}</p>
            </Link>
            <button onClick={() => adicionarAoCarrinho(produto)} style={estilos.botaoAdicionar}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const estilos = {
  secaoProdutos: { padding: "1rem", display: "flex" },
  filtro: { width: "200px", marginRight: "20px" },
  produtos: { display: "flex", flexWrap: "wrap", gap: "20px" },
  produto: { border: "1px solid #ddd", padding: "10px", borderRadius: "10px", width: "200px", textAlign: "center" },
  linkProduto: { textDecoration: "none", color: "inherit" },
  imagemProduto: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" },
  botaoAdicionar: { marginTop: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px", cursor: "pointer" },

    // Outros estilos mantêm-se iguais
      botaoDetalhes: {
        display: "inline-block",
        padding: "10px 15px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        fontSize: "14px",
        fontWeight: "bold",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textDecoration: "none",
      },
      botaoDetalhesHover: {
        transform: "scale(1.03)",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      },
    };

export default Produtos;