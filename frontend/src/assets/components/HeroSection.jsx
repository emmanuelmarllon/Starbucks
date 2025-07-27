import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../image/logo.png";
import greanCup from "../image/img1.png";
import redCup from "../image/img2.png";
import pinkCup from "../image/img3.png";
import greanCupThumb from "../image/thumb1.png";
import redCupThumb from "../image/thumb2.png";
import pinkCupThumb from "../image/thumb3.png";
import "./style/HeroSection.css"; // Cria se ainda não existir

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef(null);
  const imgs = [greanCup, redCup, pinkCup];
  const [imgAtual, setImgAtual] = useState(imgs[0]);
  const bgGradients = [
    "linear-gradient(135deg, #004225, #007c38)",
    "linear-gradient(135deg, #4a0b0b, #b91c1c)",
    "linear-gradient(135deg, #4b0f3c, #c026d3)",
  ];
  const [bgImage, setBgImage] = useState(bgGradients[0]);

  const thumbnails = [greanCupThumb, redCupThumb, pinkCupThumb];

  function trocarImagem(index) {
    setImgAtual(imgs[index]);
    setBgImage(bgGradients[index]);
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animando de cima pra baixo
      gsap.from(".hero-logo", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // Título vindo da esquerda
      gsap.from(".hero-title", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });

      // Parágrafo fade in
      gsap.from(".hero-text", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      });

      // Copo principal com zoom
      gsap.from(".hero-main-img", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 1.3,
        ease: "power2.out",
      });

      // Thumbnails com animação em sequência
      gsap.to(".hero-thumb", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert(); // Limpeza
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <img src={logo} alt="imagem-logo-starbucks" className="hero-logo" />
      <h1 className="hero-title">
        It's not just Coffee <br /> It's Starbucks
      </h1>
      <p className="hero-text">
        Experimente mais do que um café. Descubra sabores marcantes, aromas
        envolventes e uma experiência única em cada xícara. Seja na correria do
        dia a dia ou naquele momento de pausa, o Starbucks tá com você.
      </p>
      <div className="hero-main">
        <img
          src={imgAtual}
          alt="Copo Starbucks"
          className="hero-main-img"
          style={{ backgroundImage: bgImage }}
        />
      </div>
      <div className="hero-thumbs">
        {thumbnails.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Copo Starbucks"
            onClick={() => trocarImagem(i)}
            className="hero-thumb"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
