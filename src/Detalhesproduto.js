import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams(); // Pega o ID da URL
  const products = [
    { id: 1, name: "PC gaming RGB full leds", price: 899, image: "https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8425402437674_1.jpg", description: "PC gaming com iluminação RGB para uma experiência imersiva." },
    { id: 2, name: "Laptop todo XPTO", price: 1100, image: "https://www.worten.pt/i/df10a575b683ef8dff505bcf7bf369aadf4b5ab7", description: "Laptop de alta performance para todas as necessidades." },
    { id: 3, name: "Rato gaming maris", price: 89, image: "https://servitek.pt/2145-large_default/rato-gaming-havit-gamenote-ms1003-rgb.jpg", description: "Rato gaming ergonómico e preciso." }
  ];

  const product = products.find(p => p.id === parseInt(id)); // Encontra o produto pelo ID

  if (!product) {
    return <h2>Produto não encontrado</h2>;
  }

  return (
    <div style={styles.section}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={styles.productImage} />
      <p>{product.description}</p>
      <p>€{product.price.toFixed(2)}</p>
    </div>
  );
}

const styles = {
  section: { padding: "1rem", textAlign: "center" },
  productImage: { width: "300px", height: "auto", objectFit: "cover" },
};

export default ProductDetail;