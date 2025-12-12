function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-icon">
          <span>&lt;/&gt;</span>
        </div>

        <h1 className="hero-title">
          <span>Chuletarium</span>
        </h1>

        <p className="hero-subtitle">Chuletas rápidas, claras y en castellano para no perder tiempo buscando entre mil tutoriales.</p>

        <div className="hero-cta">
          <button className="btn btn-primary">Ver chuletas →</button>
        </div>

        <div className="hero-stats">
          <div>
            <span className="hero-stat-value">50+</span>
            Chuletas
          </div>
          <div>
            <span className="hero-stat-value">10+</span>
            Lenguajes
          </div>
          <div>
            <span className="hero-stat-value">100%</span>
            Gratis
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
