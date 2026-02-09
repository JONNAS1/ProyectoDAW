# DEFINICIONES DE QUE ES CADA COSA
.angular/        → caché interna de Angular (no tocar)
.vscode/         → configuración del editor
node_modules/    → dependencias (NO se sube a GitHub)
public/          → recursos estáticos (favicon, imágenes públicas)
src/             → AQUÍ VIVES TÚ (Todo lo importante está en src/, especialmente en src/app.)

=========================================================

src/
├─ index.html        → HTML base (1 solo <app-root>)
├─ main.ts           → Arranque real de Angular
├─ styles.scss       → Estilos globales
└─ app/              → LA APLICACIÓN


# FLUJO MENTAL DE ANGULAR
index.html
   ↓
main.ts
   ↓
AppComponent (app.ts)
   ↓
Layout (app.html)
   ↓
Router (app.routes.ts)
   ↓
Páginas / Componentes
   ↓
Datos / Servicios


## INDEX.HTML (src/index.html)
<body>
  <app-root></app-root>
</body>

- <app-root> es una etiqueta inventada por Angular (Angular inyecta todo ahí dentro)
- Nunca pongas contenido aquí, solo estructura base (title, meta, favicon).
❌ NO es una página
❌ NO lleva contenido
✔️ Solo sirve para que Angular “inyecte” la app
<app-root> conecta con AppComponent

## main.ts (punto de arranque real)
- src/main.ts -> “Arranca Angular y usa este componente como raíz”

 bootstrapApplication(AppComponent, appConfig);

 - Aquí Angular se inicia
 - Aquí se conecta todo
 - No se toca casi nunca

## app.ts → EL CEREBRO (AppComponent)
- src/app/app.ts -> Este archivo es el componente raíz.
- selector: 'app-root' -> Coincide con <app-root> del index.html
- templateUrl -> Qué HTML se renderiza
- styleUrl -> Estilos SOLO de este componente

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}

- AppComponent no debe tener lógica, Es solo un contenedor

Rol mental de AppComponent
❌ No lógica de negocio
❌ No datos
✔️ Layout general
✔️ Header + router-outlet + footer

## app.html (layout principal)
- src/app/app.html
- Aquí normalmente pondremos: <app-header></app-header>  //  <router-outlet></router-outlet> // <app-footer></app-footer>
-router-outlet ->  Es donde Angular pinta las páginas según la URL
📌 router-outlet es la pantalla -> Home, Login, Programming, Ficha, etc.

## app.routes.ts (MAPA DE NAVEGACIÓN)
- src/app/app.routes.ts -> Aquí defines qué componente se ve según la ruta.
Este archivo responde a una sola pregunta: ¿Qué componente se ve para cada URL?
   📌 Importante:
✔️ Aquí solo van componentes de página
❌ NO componentes reutilizables
❌ NO modelos
❌ NO servicios

##  Estructura completa
src/
├─ app/
│  ├─ data/
│  │  └─ fichas.data.ts
│  │
│  ├─ ficha/
│  │  ├─ ficha.html
│  │  ├─ ficha.scss
│  │  ├─ ficha.spec.ts
│  │  └─ ficha.ts
│  │
│  ├─ ficha-item/
│  │  ├─ ficha-item.html
│  │  ├─ ficha-item.scss
│  │  ├─ ficha-item.spec.ts
│  │  └─ ficha-item.ts
│  │
│  ├─ ficha-list/
│  │  ├─ ficha-list.html
│  │  ├─ ficha-list.scss
│  │  ├─ ficha-list.spec.ts
│  │  └─ ficha-list.ts
│  │
│  ├─ guards/
│  │  └─ auth.guard.ts
│  │
│  ├─ models/
│  │  └─ ficha.model.ts
│  │
│  ├─ pages/
│  │  ├─ about/
│  │  │  ├─ about.html
│  │  │  ├─ about.scss
│  │  │  ├─ about.spec.ts
│  │  │  └─ about.ts
│  │  │
│  │  ├─ categories/
│  │  │  ├─ categories.html
│  │  │  ├─ categories.scss
│  │  │  ├─ categories.spec.ts
│  │  │  └─ categories.ts
│  │  │
│  │  ├─ databases/
│  │  │  ├─ databases.html
│  │  │  ├─ databases.scss
│  │  │  └─ databases.ts
│  │  │
│  │  ├─ home/
│  │  │  ├─ home.html
│  │  │  ├─ home.scss
│  │  │  ├─ home.spec.ts
│  │  │  └─ home.ts
│  │  │
│  │  ├─ login/
│  │  │  ├─ login.html
│  │  │  ├─ login.scss
│  │  │  └─ login.ts
│  │  │
│  │  ├─ programming/
│  │  │  ├─ programming.html
│  │  │  ├─ programming.scss
│  │  │  └─ programming.ts
│  │  │
│  │  ├─ register/
│  │  │  ├─ register.html
│  │  │  ├─ register.scss
│  │  │  └─ register.ts
│  │  │
│  │  ├─ snippets/
│  │  │  ├─ snippets.html
│  │  │  ├─ snippets.scss
│  │  │  ├─ snippets.spec.ts
│  │  │  └─ snippets.ts
│  │  │
│  │  ├─ terminal/
│  │  │  ├─ terminal.html
│  │  │  ├─ terminal.scss
│  │  │  └─ terminal.ts
│  │  │
│  │  └─ user/
│  │     ├─ user.html
│  │     ├─ user.scss
│  │     └─ user.ts
│  │
│  ├─ services/
│  │  ├─ auth.service.ts
│  │  └─ favorites.service.ts
│  │
│  ├─ shared/
│  │  └─ components/
│  │     ├─ footer/
│  │     │  ├─ footer.html
│  │     │  ├─ footer.scss
│  │     │  ├─ footer.spec.ts
│  │     │  └─ footer.ts
│  │     │
│  │     └─ header/
│  │        ├─ header.html
│  │        ├─ header.scss
│  │        ├─ header.spec.ts
│  │        └─ header.ts
│  │
│  ├─ app.config.server.ts
│  ├─ app.config.ts
│  ├─ app.html
│  ├─ app.routes.server.ts
│  ├─ app.routes.ts
│  ├─ app.scss
│  ├─ app.spec.ts
│  └─ app.ts
│
├─ index.html
├─ main.server.ts
├─ main.ts
├─ server.ts
└─ styles.scss


