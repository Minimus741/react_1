import React from "react";

function Cart({ cart, removeFromCart }) {
  return (
    <div style={styles.section}>
      <h2>O teu carrinho</h2>
      {cart.length === 0 ? (
        <p>O teu carrinho está vazio!</p>
      ) : (
        <ul style={styles.cartList}>
          {cart.map((product, index) => (
            <li key={index} style={styles.cartItem}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={styles.cartImage} 
              />
              <div style={styles.productInfo}>
                <p>{product.name}</p>
                <p>€{product.price.toFixed(2)}</p>
              </div>
              <button
                id = "remover" 
                onClick={() => removeFromCart(product)} 
                style={styles.button}>
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  section: { padding: "1rem", textAlign: "center" },
  cartList: { listStyle: "none", padding: 0 },
  cartItem: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    margin: "10px 0", 
    borderBottom: "1px solid #ddd", 
    padding: "10px 0" 
  },
  cartImage: { 
    width: "50px", 
    height: "50px", 
    objectFit: "cover", 
    marginRight: "10px", 
    borderRadius: "5px" 
  },
  productInfo: { 
    flex: 1, 
    textAlign: "left" 
  },
  button: { 
    backgroundColor: "#FF4136", 
    color: "#fff", 
    border: "none", 
    borderRadius: "5px", 
    padding: "5px 10px" 
  },
};

export default Cart;