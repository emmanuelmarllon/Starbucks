import "./style.css";
import HeroSection from "../../assets/components/HeroSection";
import ProductSection from "../../assets/components/ProductsSection";
import AboutSection from "../../assets/components/AboutSection";

function Home({ cart, addToCart, products }) {
  return (
    <main>
      <HeroSection />
      <ProductSection cart={cart} products={products} addToCart={addToCart} />
      <AboutSection />
    </main>
  );
}

export default Home;
