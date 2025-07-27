import React from "react";
import "./style/footer.css";
import logo from "../image/logo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src={logo} alt="Starbucks Logo" />
          <h3>Starbucks</h3>
        </div>

        <div className="footer-links">
          <div>
            <h4>Empresa</h4>
            <ul>
              <li>
                <a href="#">Sobre Nós</a>
              </li>
              <li>
                <a href="#">Carreiras</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Ajuda</h4>
            <ul>
              <li>
                <a href="#">Contato</a>
              </li>
              <li>
                <a href="#">Suporte</a>
              </li>
              <li>
                <a href="#">Privacidade</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Social</h4>
            <div className="social-icons">
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Starbucks Clone. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
