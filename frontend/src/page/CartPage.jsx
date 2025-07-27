import React from "react";
import "./cartPage.css";

const CartPage = ({ cart, updateQuantity, removeFromCart, toggleCart }) => {
  if (cart.length === 0)
    return <p className="empty-cart-msg">Seu carrinho tá vazio 😢</p>;

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  return (
    <section className="cart-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Seu Carrinho</h2>
        <p
          onClick={toggleCart}
          style={{ cursor: "pointer", margin: "0 2rem", marginBottom: "1rem" }}
        >
          x
        </p>
      </div>
      <ul className="cart-list">
        {cart.map((product) => (
          <li key={product.id} className="cart-item">
            <img
              src={product.image}
              alt={product.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{product.name}</h3>
              <p>Preço unitário: R$ {parseFloat(product.price).toFixed(2)}</p>
              <p>Quantidade: {product.quantity}</p>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    updateQuantity(product.id, product.quantity - 1)
                  }
                >
                  -
                </button>
                <button
                  onClick={() =>
                    updateQuantity(product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
                <button onClick={() => removeFromCart(product.id)}>
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
    </section>
  );
};

export default CartPage;
