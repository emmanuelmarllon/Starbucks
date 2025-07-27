import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../image/logo.png";
import "./style/header.css";
import CartPage from "../../page/CartPage";

const Header = ({ cartCount, cart, updateQuantity, removeFromCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const location = useLocation();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function toggleCart() {
    setShowCart(!showCart);
  }

  const isHome = location.pathname === "/";
  const isMenu = location.pathname === "/Menu"; // ajustar aqui se a rota do menu for diferente

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>

        <nav className="desktop-nav">
          <ul>
            {isMenu && (
              <>
                <li>
                  <Link to="/">Início</Link>
                </li>
                <li>
                  <a href="#menu-products">Produtos</a>
                </li>
                <li>
                  <button className="hero-btn">Peça agora</button>
                </li>
                <li>
                  <div className="cart-container" onClick={toggleCart}>
                    <i className="fa-solid cart-icon fa-cart-shopping"></i>
                    {cartCount > 0 && (
                      <span className="cart-badge">
                        {cartCount > 9 ? "+9" : cartCount}
                      </span>
                    )}
                  </div>
                </li>
              </>
            )}

            {isHome && (
              <>
                <li>
                  <Link to="/">Início</Link>
                </li>
                <li>
                  <a href="#produtos">Produtos</a>
                </li>
                <li>
                  <a href="#about">Sobre</a>
                </li>
                <li>
                  <button className="hero-btn">Peça agora</button>
                </li>
                <li>
                  <div className="cart-container" onClick={toggleCart}>
                    <i className="fa-solid cart-icon fa-cart-shopping"></i>
                    {cartCount > 0 && (
                      <span className="cart-badge">
                        {cartCount > 9 ? "+9" : cartCount}
                      </span>
                    )}
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav id="menu" className={menuOpen ? "open" : ""}>
          <ul>
            {isMenu && (
              <>
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    Início
                  </Link>
                </li>
                <li>
                  <a href="#menu-products" onClick={toggleMenu}>
                    Produtos
                  </a>
                </li>
                <li>
                  <button className="hero-btn" onClick={toggleMenu}>
                    Peça agora
                  </button>
                </li>
                <li>
                  <div
                    className="cart-container"
                    onClick={() => {
                      toggleCart();
                      toggleMenu();
                    }}
                  >
                    <i className="fa-solid cart-icon fa-cart-shopping"></i>
                    {cartCount > 0 && (
                      <span className="cart-badge">
                        {cartCount > 9 ? "+9" : cartCount}
                      </span>
                    )}
                  </div>
                </li>
              </>
            )}

            {isHome && (
              <>
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    Início
                  </Link>
                </li>
                <li>
                  <a href="#produtos" onClick={toggleMenu}>
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={toggleMenu}>
                    Sobre
                  </a>
                </li>
                <li>
                  <button className="hero-btn" onClick={toggleMenu}>
                    Peça agora
                  </button>
                </li>
                <li>
                  <div
                    className="cart-container"
                    onClick={() => {
                      toggleCart();
                      toggleMenu();
                    }}
                  >
                    <i className="fa-solid cart-icon fa-cart-shopping"></i>
                    {cartCount > 0 && (
                      <span className="cart-badge">
                        {cartCount > 9 ? "+9" : cartCount}
                      </span>
                    )}
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {showCart && (
        <CartPage
          toggleCart={toggleCart}
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      )}
    </header>
  );
};

export default Header;
