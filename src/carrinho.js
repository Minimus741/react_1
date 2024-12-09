import React from "react";

function Carrinho({ carrinho, removerDoCarrinho, atualizarQuantidade }) {
  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  };

  // Função para remover o produto automaticamente quando a quantidade for zero
  const handleQuantidade = (produto, quantidade) => {
    if (quantidade <= 0) {
      removerDoCarrinho(produto);
    } else {
      atualizarQuantidade(produto, quantidade);
    }
  };

  return (
    <div style={estilos.secaoCarrinho}>
      <h3>Carrinho</h3>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {carrinho.map((produto) => (
            <div key={produto.id} style={estilos.produtoCarrinho}>
              <img src={produto.imagem} alt={produto.nome} style={estilos.imagemProdutoCarrinho} />
              <p>{produto.nome}</p>
              <p>€{produto.preco.toFixed(2)}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <button onClick={() => handleQuantidade(produto, produto.quantidade - 1)} style={estilos.botaoAlterar}>-</button>
              <button onClick={() => handleQuantidade(produto, produto.quantidade + 1)} style={estilos.botaoAlterar}>+</button>
              <button onClick={() => removerDoCarrinho(produto)} style={estilos.botaoRemover}>Remover</button>
            </div>
          ))}
          <div style={estilos.total}>
            <p>Total: €{calcularTotal().toFixed(2)}</p>
            <button style={estilos.botaoFinalizar}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}

const estilos = {
  secaoCarrinho: { padding: "1rem", textAlign: "center" },
  produtoCarrinho: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", border: "1px solid #ddd", borderRadius: "10px", marginBottom: "10px" },
  imagemProdutoCarrinho: { width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" },
  botaoAlterar: { marginLeft: "10px", padding: "5px 10px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" },
  botaoRemover: { marginLeft: "10px", padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", border: "none", cursor: "pointer" },
  total: { marginTop: "20px" },
  botaoFinalizar: { padding: "10px", backgroundColor: "#28a745", color: "fff", border: "none", cursor: "pointer" }
};

export default Carrinho;
