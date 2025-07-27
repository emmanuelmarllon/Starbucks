import { useLayoutEffect, useRef, useState, useEffect } from "react";
import "./style/ProductsSection.css";
import CardList from "./CardList.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { Link } from "react-router-dom";
import { api } from "../services/api";
import greanCup from "../image/img1.png"; // fallback imagem

function getPeriodo(hora) {
  if (hora >= 0 && hora < 6) return "boa madrugada";
  if (hora < 12) return "bom dia";
  if (hora < 18) return "boa tarde";
  return "boa noite";
}

function saudacaoPura(periodo) {
  switch (periodo) {
    case "boa madrugada":
      return "Boa madrugada! Hora de desacelerar, relaxar e deixar o aroma do café te acompanhar nessa calmaria.";
    case "bom dia":
      return "Bom dia! Que tal transformar sua manhã em um momento inesquecível?";
    case "boa tarde":
      return "Boa tarde! Transforme sua pausa em um momento inesquecível com sabores que inspiram.";
    case "boa noite":
      return "Boa noite! Feche seu dia com uma experiência saborosa que só um café especial pode oferecer.";
    default:
      return `${periodo}, seja bem-vindo(a)!`;
  }
}

function ProductsSection({ cart, addToCart }) {
  const sectionRef = useRef(null);

  const [temperatura, setTemperatura] = useState(null);
  const [cidade, setCidade] = useState("");
  const [hora, setHora] = useState(new Date().getHours());
  const [mensagem, setMensagem] = useState(() => {
    const periodo = getPeriodo(hora);
    return saudacaoPura(periodo);
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Atualiza hora a cada minuto
  useEffect(() => {
    const interval = setInterval(() => setHora(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Pega clima via API
  useEffect(() => {
    const getClima = async (latitude, longitude) => {
      try {
        const res = await api.get(`/weather?lat=${latitude}&lon=${longitude}`);
        const temp = res.data?.temperatura;
        const cidadeApi = res.data?.cidade;

        if (typeof temp !== "number" || !cidadeApi) {
          setTemperatura(null);
          setCidade("");
          return;
        }

        setTemperatura(temp);
        setCidade(cidadeApi);
      } catch {
        setTemperatura(null);
        setCidade("");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => getClima(coords.latitude, coords.longitude),
        () => {
          setTemperatura(null);
          setCidade("");
        }
      );
    } else {
      setTemperatura(null);
      setCidade("");
    }
  }, []);

  // Mensagem dinâmica de saudação + clima
  useEffect(() => {
    const periodo = getPeriodo(hora);

    if (temperatura === null || !cidade) {
      setMensagem(saudacaoPura(periodo));
      return;
    }

    const mensagemClima =
      temperatura < 25
        ? `Que tal um cafézinho nesse friozinho de ${Math.round(
            temperatura
          )}°C em ${cidade}?`
        : `Que tal um milkshake nesse calorão de ${Math.round(
            temperatura
          )}°C em ${cidade}?`;

    setMensagem(`${periodo}, ${mensagemClima}`);
  }, [hora, temperatura, cidade]);

  // Carrega todos os produtos do JSON local (pode ajustar o caminho)
  useEffect(() => {
    fetch("https://starbucks-zr6n.onrender.com/produtos")
      .then((res) => res.json())
      .then((data) => {
        const produtosComImagem = data.map((item) => ({
          ...item,
          image: item.image || greanCup,
        }));
        setAllProducts(produtosComImagem);
      })
      .catch((err) => {
        console.error("Erro ao carregar produtos:", err);
        setAllProducts([]);
      });
  }, []);

  // Filtra os produtos conforme temperatura e hora, max 4 itens
  useEffect(() => {
    if (!allProducts.length) {
      setFilteredProducts([]);
      return;
    }

    if (temperatura === null || hora === null) {
      // Se não tiver info, mostra tudo, mas só 4 produtos
      setFilteredProducts(allProducts.slice(0, 4));
      return;
    }

    const climaTag = temperatura < 25 ? "frio" : "calor";

    let turnoTag = "";
    if (hora >= 0 && hora < 6) turnoTag = "madrugada";
    else if (hora < 12) turnoTag = "manhã";
    else if (hora < 18) turnoTag = "tarde";
    else turnoTag = "noite";

    const filtrados = allProducts.filter((p) => {
      if (!Array.isArray(p.tags)) return false;

      const tagsLower = p.tags.map((tag) => tag.toLowerCase().trim());
      return tagsLower.includes(climaTag) && tagsLower.includes(turnoTag);
    });

    setFilteredProducts(
      filtrados.length > 0 ? filtrados.slice(0, 4) : allProducts.slice(0, 4)
    );
  }, [allProducts, temperatura, hora]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".products-section h2", {
        scrollTrigger: {
          trigger: ".products-section h2",
          start: "top 50%",
          end: "bottom 25%",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.utils.toArray(".card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 60%",
              toggleActions: "play reverse play reverse",
              markers: false,
            },
          }
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <section ref={sectionRef} className="products-section" id="produtos">
      <h2>{mensagem}</h2>
      <Link to="/Menu">
        <button className="ver-todos">ver todos os produtos</button>
      </Link>
      <CardList products={filteredProducts} cart={cart} addToCart={addToCart} />
    </section>
  );
}

export default ProductsSection;
