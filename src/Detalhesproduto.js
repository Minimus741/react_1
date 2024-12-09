import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para pegar o ID do produto da URL

function DetalhesProduto({ adicionarAoCarrinho }) {
  const { id } = useParams(); // Pega o ID do produto da URL
  const [produto, setProduto] = useState(null);

  const todosOsProdutos = [
    { id: 1, nome: "PC Gaming RGB Full Leds", preco: 899, categoria: "Computadores", descricao: "É só luz, parece um aeroporto", imagem: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg" },
    { id: 2, nome: "Laptop Todo XPTO", preco: 1100, categoria: "Laptops", descricao: "O machibombo para quimar pernas com o calor", imagem: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7" },
    { id: 3, nome: "Teclado Mecânico RGB", preco: 120, categoria: "Periféricos", descricao: "Teclado mecânico para fazer barulho", imagem: "https://m.media-amazon.com/images/I/71FSIp+tDNL.jpg" },
    // Adicionar mais produtos aqui
  ];

  // Encontra o produto pelo ID
  useEffect(() => {
    const produtoEncontrado = todosOsProdutos.find((produto) => produto.id === parseInt(id));
    setProduto(produtoEncontrado);
  }, [id]);

  if (!produto) {
    return <div>Produto não encontrado!</div>;
  }

  return (
    <div style={estilos.paginaDetalhes}>
      <h2>{produto.nome}</h2>
      <img src={produto.imagem} alt={produto.nome} style={estilos.imagemProduto} />
      <p><strong>Preço:</strong> €{produto.preco.toFixed(2)}</p>
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      <button onClick={() => adicionarAoCarrinho(produto)} style={estilos.botaoAdicionar}>Adicionar ao Carrinho</button>
    </div>
  );
}

const estilos = {
  paginaDetalhes: { padding: "2rem", textAlign: "center" },
  imagemProduto: { width: "300px", height: "200px", objectFit: "cover", borderRadius: "5px" },
  botaoAdicionar: { marginTop: "20px", backgroundColor: "#4CAF50", color: "white", border: "none", padding: "10px", cursor: "pointer" },
};

export default DetalhesProduto;