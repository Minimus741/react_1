import React from "react";
import { Link } from "react-router-dom";

function Products({ addToCart }) {
  const products = [
    { id: 1, name: "PC gaming RGB full leds", price: 899, onhover:  ,image: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg", description: "PC gaming com iluminação RGB para uma experiência imersiva." },
    { id: 2, name: "Laptop todo XPTO", price: 1100, image: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7", description: "Laptop de alta performance para todas as necessidades." },
    { id: 3, name: "Rato gaming maris", price: 89, image: "https://servitek.pt/2145-large_default/rato-gaming-havit-gamenote-ms1003-rgb.jpg", description: "Rato gaming ergonómico e preciso." }
  ];

  return (
    <div style={styles.section}>
      <h2>Produtos</h2>
      <div style={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productItem}>
            <Link to={`/produto/${product.id}`} style={styles.link}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <p>{product.description}</p>
            </Link>
            <h3>{product.name}</h3>
            <p>€{product.price.toFixed(2)}</p>
            <button id= "adicionar" onClick={() => addToCart(product)} style={styles.button}>Adicionar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  section: { padding: "1rem", textAlign: "center" },
  productGrid: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "20px",
  },
  productItem: {
    width: "250px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  button: { marginTop: "10px", padding: "5px 10px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px" },
  link: { textDecoration: "none", color: "inherit" },
};

export default Products;