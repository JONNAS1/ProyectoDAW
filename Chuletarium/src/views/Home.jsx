import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div ClassName="page">
      <Header />  {/* Con <Header /> pintamos os cambios del archivo Header.jsx */}

      <main>
        <Hero /> {/* Con <Hero /> pintamos os cambios del archivo Hero.jsx */}

        <section classname="container">
          <h1>Chuletarium</h1>
          <p>Bienvenido a tu web de chuletas de programación 😎</p>
        </section>
      </main>
    </div>
  );
}
