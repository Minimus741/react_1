import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Para obter o ID do produto da URL

// Componente para mostrar os detalhes de um produto
function DetalhesProduto({ adicionarAoCarrinho }) {
  const { id } = useParams(); // Obtém o ID do produto da rota
  const [produto, setProduto] = useState(null); // Estado para guardar o produto encontrado

  // Lista de todos os produtos disponíveis
  const todosOsProdutos = [
    { id: 1, nome: "PC Gaming RGB Full Leds", preco: 899, categoria: "Computadores", descricao: "Fixo giro", imagem: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg" },
    { id: 2, nome: "Laptop Todo XPTO", preco: 1100, categoria: "Laptops", descricao: "Portátil fixe", imagem: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7" },
    { id: 3, nome: "Teclado Mecânico RGB", preco: 120, categoria: "Periféricos", descricao: "Teclado com luzes", imagem: "https://m.media-amazon.com/images/I/71FSIp+tDNL.jpg" },
    // Adicionar mais produtos aqui
  ];

  // Encontra o produto pelo ID fornecido
  useEffect(() => {
    const produtoEncontrado = todosOsProdutos.find((produto) => produto.id === parseInt(id)); // Procura o produto na lista
    setProduto(produtoEncontrado); // Atualiza o estado com o produto encontrado
  }, [id]); // Executa sempre que o ID mudar

  // Mostra mensagem caso o produto não seja encontrado
  if (!produto) {
    return <div>Produto não encontrado!</div>;
  }

  return (
    <div style={estilos.paginaDetalhes}>
      {/* Nome do produto */}
      <h2>{produto.nome}</h2>
      {/* Imagem do produto */}
      <img src={produto.imagem} alt={produto.nome} style={estilos.imagemProduto} />
      {/* Preço do produto */}
      <p><strong>Preço:</strong> €{produto.preco.toFixed(2)}</p>
      {/* Descrição do produto */}
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      {/* Botão para adicionar o produto ao carrinho */}
      <button onClick={() => adicionarAoCarrinho(produto)} style={estilos.botaoAdicionar}>Adicionar ao Carrinho</button>
    </div>
  );
}

// Estilos para os detalhes do produto
const estilos = {
  paginaDetalhes: { 
    padding: "2rem", textAlign: "center" // Centraliza o conteúdo e dá espaçamento
  },
  imagemProduto: { 
    width: "300px", height: "200px", objectFit: "cover", borderRadius: "5px" // Estilo para a imagem do produto
  },
  botaoAdicionar: { 
    marginTop: "20px", backgroundColor: "#4CAF50", color: "white", border: "none", 
    padding: "10px", cursor: "pointer" // Estilo para o botão de adicionar ao carrinho
  },
};

export default DetalhesProduto;
