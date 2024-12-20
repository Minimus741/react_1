import React from "react";

// Componente do Carrinho
function Carrinho({ carrinho, removerDoCarrinho, atualizarQuantidade }) {
  // Calcula o total do carrinho somando o preço vezes a quantidade de cada produto
  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  };

  // Função para ajustar a quantidade de um produto
  const handleQuantidade = (produto, quantidade) => {
    // Remove o produto se a quantidade for menor ou igual a zero
    if (quantidade <= 0) {
      removerDoCarrinho(produto);
    } else {
      // Atualiza a quantidade do produto no carrinho
      atualizarQuantidade(produto, quantidade);
    }
  };

  return (
    <div style={estilos.secaoCarrinho}>
      <h3>Carrinho</h3>
      {/* Verifica se o carrinho está vazio */}
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p> // Mostra uma mensagem se não houver produtos
      ) : (
        <div>
          {/* Renderiza cada produto no carrinho */}
          {carrinho.map((produto) => (
            <div key={produto.id} style={estilos.produtoCarrinho}>
              {/* Imagem do produto */}
              <img src={produto.imagem} alt={produto.nome} style={estilos.imagemProdutoCarrinho} />
              {/* Nome do produto */}
              <p>{produto.nome}</p>
              {/* Preço do produto */}
              <p>€{produto.preco.toFixed(2)}</p>
              {/* Quantidade do produto */}
              <p>Quantidade: {produto.quantidade}</p>
              {/* Botões para diminuir e aumentar a quantidade */}
              <button onClick={() => handleQuantidade(produto, produto.quantidade - 1)} style={estilos.botaoAlterar}>-</button>
              <button onClick={() => handleQuantidade(produto, produto.quantidade + 1)} style={estilos.botaoAlterar}>+</button>
              {/* Botão para remover o produto */}
              <button onClick={() => removerDoCarrinho(produto)} style={estilos.botaoRemover}>Remover</button>
            </div>
          ))}
          <div style={estilos.total}>
            {/* Mostra o total do carrinho */}
            <p>Total: €{calcularTotal().toFixed(2)}</p>
            {/* Botão para finalizar a compra */}
            <button style={estilos.botaoFinalizar}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos para o carrinho e produtos
const estilos = {
  secaoCarrinho: { padding: "1rem", textAlign: "center" }, // Estilo da secção do carrinho
  produtoCarrinho: { 
    display: "flex", justifyContent: "space-between", alignItems: "center", 
    padding: "10px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "10px" 
  }, // Estilo de cada produto no carrinho
  imagemProdutoCarrinho: { 
    width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" 
  }, // Estilo para a imagem do produto
  botaoAlterar: { 
    marginLeft: "10px", padding: "5px 10px", backgroundColor: "#007BFF", color: "#fff", 
    border: "none", cursor: "pointer" 
  }, // Botões de aumentar/diminuir quantidade
  botaoRemover: { 
    marginLeft: "10px", padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", 
    border: "none", cursor: "pointer" 
  }, // Botão para remover produtos
  total: { marginTop: "20px" }, // Estilo para o total do carrinho
  botaoFinalizar: { 
    padding: "10px", backgroundColor: "#28a745", color: "fff", border: "none", 
    cursor: "pointer" 
  } // Botão de finalizar compra
};

export default Carrinho;
