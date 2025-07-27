import React, { useLayoutEffect, useRef } from "react";
import "./style/aboutSection.css";
import background from "../image/background.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do texto
      gsap.from(".about-text", {
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 90%", // começa logo que o topo entra quase no fim da viewport
          end: "bottom 30%", // termina quando a base estiver um pouco acima do meio da viewport
          toggleActions: "play reverse play reverse",
          markers: false, // só pro dev, tira depois
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".about-container img", {
        scrollTrigger: {
          trigger: ".about-container img",
          start: "top 90%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse",
          markers: false,
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" ref={sectionRef} id="about">
      <div className="about-container">
        <div className="about-text">
          <h2>Sobre nós</h2>
          <p>
            Desde 1971, a Starbucks vem oferecendo cafés de alta qualidade,
            feitos com paixão
            <br />
            e responsabilidade do grão à xícara.
            <br />
            <br />
            Nosso propósito vai além do café: queremos inspirar e nutrir o
            espírito humano,
            <br />
            uma pessoa, uma xícara e uma comunidade de cada vez.
          </p>
        </div>
        <img src={background} alt="Sobre nós" />
      </div>
    </section>
  );
};

export default AboutSection;
