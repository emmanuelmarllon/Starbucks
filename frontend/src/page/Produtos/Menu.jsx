import React, { useEffect, useState } from "react";
import "./menu.css";
import CardList from "../../assets/components/CardList.jsx";
import CartPage from "../CartPage";

const Menu = ({ cart = [], setCart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [showCart] = useState(false);

  // Carrega os produtos
  useEffect(() => {
    fetch("http://localhost:3001/produtos")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        setProducts([]);
      });
  }, []);

  // Adiciona produto no carrinho (com controle de quantidade)
  // Função addToCart já é recebida via props, não precisa redeclarar aqui.

  // Atualiza quantidade no carrinho
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  // Remove do carrinho
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="menu-section">
      <div className="menu-header">
        <h2>Nosso Cardápio</h2>
        <p>Escolha seu favorito e personalize como quiser! ☕✨</p>
      </div>

      {/* Mostrar carrinho ou card list conforme toggle */}
      {showCart ? (
        <CartPage
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ) : (
        <div id="menu-products">
          <CardList products={products} cart={cart} addToCart={addToCart} />
        </div>
      )}
    </section>
  );
};

export default Menu;
