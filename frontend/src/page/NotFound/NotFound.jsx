import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p className="desc">Ops! Parece que o café esfriou ☕</p>
      <p className="sub">
        A página que você procura foi moída, coada e sumiu no vapor...
      </p>
      <a href="/" className="btn-voltar">
        Voltar para o Início
      </a>
    </div>
  );
};

export default NotFound;
