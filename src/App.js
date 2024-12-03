import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./produtos";
import ProductDetail from "./Detalhesproduto";
import Cart from "./carrinho";
import "./produtos.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) => prevCart.filter((product) => product !== productToRemove));
  };

  return (
    <Router>
      <div style={styles.navbar}>
        <Link to="/" style={styles.logoLink}>
          <h1 style={styles.logo}>InfoByte</h1>
        </Link>
        <nav>
          <Link to="/" style={styles.link}>Página Principal</Link>
          <Link to="/produtos" style={styles.link}>Produtos</Link>
          <Link to="/carrinho" style={styles.link}>Carrinho ({cart.length})</Link>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Products addToCart={addToCart} />} />
        <Route path="/produto/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/carrinho" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "PC Gaming RGB Full Leds",
      price: 899,
      image: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg",
    },
    {
      id: 2,
      name: "Laptop Todo XPTO",
      price: 1100,
      image: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7",
    },
  ];

  return (
    <div style={styles.section}>
      <div style={styles.banner}>
        <div style={styles.bannerOverlay}></div>
        <div style={styles.bannerContent}>
          <h2 style={styles.bannerText}>Bem-vindo à InfoByte!</h2>
          <p style={styles.bannerSubtext}>
            Encontra as melhores ofertas de tecnologia aqui!
          </p>
          <Link to="/produtos" style={styles.bannerButton}>
            Ver Produtos
          </Link>
        </div>
      </div>
      <h3>Produtos em Destaque</h3>
      <div style={styles.featuredContainer}>
        {featuredProducts.map((product) => (
          <div key={product.id} style={styles.featuredProduct}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.featuredImage}
            />
            <p>{product.name}</p>
            <p>€{product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "#333",
    color: "#fff",
  },
  logoLink: {
    textDecoration: "none",
    color: "inherit",
  },
  logo: { margin: 0 },
  link: { margin: "0 10px", color: "#fff", textDecoration: "none" },
  section: { padding: "1rem", textAlign: "center" },
  bannerText: { fontSize: "2rem", margin: 0 },
  bannerSubtext: { fontSize: "1.2rem", margin: "10px 0 0" },
  featuredContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  featuredProduct: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
  },
  featuredImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "5px",
    
  },
};



export default App;