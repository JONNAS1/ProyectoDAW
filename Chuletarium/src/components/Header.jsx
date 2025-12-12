function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Logo / Marca */}
        <a href="#" className="brand">
          <span>&lt; Chuletarium</span>
          <span>/&gt;</span>
        </a>

        {/* Navegación principal */}
        <nav className="main-nav">
          <a href="#inicio">Inicio</a>
          <a href="#categorias">Categorías</a>
          <a href="#snippets">Snippets</a>
          <a href="#sobre">Sobre el proyecto</a>
        </nav>

        {/* Buscador */}
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <input type="search" placeholder="Buscar chuleta o lenguaje..." aria-label="Buscar chuleta o lenguaje" />
        </form>

        {/* Acciones */}
        <div className="header-actions">
          <button className="btn btn-ghost">Iniciar sesión</button>
          <button className="btn btn-primary">Registrarse</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
