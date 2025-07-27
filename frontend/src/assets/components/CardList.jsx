"use client";
import React from "react";
import "./style/cardList.css";

const CardList = ({ products = [], cart = [], addToCart }) => {
  if (!products.length) {
    return <p>Carregando produtos, aguarde...</p>;
  }

  const handleAddToCart = (product) => {
    if (typeof addToCart === "function") {
      addToCart(product);
    } else {
      console.warn("addToCart não foi passado ou não é uma função!");
    }
  };

  return (
    <div className="cards">
      {products.map((product) => {
        const isInCart = cart.some((item) => item.id === product.id);

        return (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.name} />
            <h3 id="name">{product.name}</h3>
            <p id="description">{product.description}</p>
            <div className="info-extra">
              <table id="info">
                <tbody>
                  {product.info?.map((infoItem, i) => (
                    <tr key={i}>
                      <td>{infoItem.label}</td>
                      <td>{infoItem.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p id="price">
                {product.price?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }) || "Preço indisponível"}
              </p>

              <button
                disabled={isInCart}
                onClick={() => handleAddToCart(product)}
              >
                {isInCart ? "No carrinho" : "Adicionar"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;
