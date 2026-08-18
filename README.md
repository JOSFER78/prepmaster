# 🍳 TouChef — Cocina de Alta Eficiencia & Batch Cooking Inteligente

> **Cocina 1 solo día a la semana. Come con calidad de restaurante cada día.**

TouChef es un sistema operativo culinario inteligente diseñado para planificar, coordinar y ejecutar sesiones de **Batch Cooking** con precisión milimétrica. Calcula raciones exactas, cruza los ingredientes con tu despensa viva para evitar compras duplicadas y orquesta tus fogones, horno y robots en paralelo.

---

## 🌟 Características Principales

- **🧮 Motor Matemático de Raciones Adaptativo:**
  - Dimensionamiento dinámico para $P$ personas, $D$ días y $T$ tomas diarias (Almuerzos, Cenas o Cobertura Total).
  - Distribución variable de recetas (evitando repeticiones excesivas) con balance de macronutrientes.
  - Asignación de estaciones térmicas simultáneas (*Horno, Fuego 1, Fuego 2, Olla Exprés, Wok*).

- **🧺 Cesta de Compra Inteligente Descontada:**
  - Deducción automática contra el inventario vivo de despensa y nevera (cero desperdicio).
  - Agrupación automática por pasillos y categorías de supermercado.

- **⏱️ Asistente de Cocina Simultánea:**
  - Cronología coordinada paso a paso para cocinar todas las recetas de la semana en ~90-120 minutos.
  - Protocolo de conservación bio-organoléptica: días 1-3 en nevera (4°C) y días 4+ al congelador.

- **🏡 Perfil de Hogar & Hardware Culinario:**
  - Inventario de equipamiento disponible (fuegos activos, freidora de aire, olla rápida, robot de cocina, tuppers de cristal herméticos).
  - Sincronización en la nube mediante Firebase Firestore y autenticación con Google / Email.

- **🎨 Diseño Haute Gastronomie (2026 Standards):**
  - Paleta curada: Cobre Culinario (`#E07A5F`, `#F4A261`), Salvia Ahumado (`#52796F`, `#84A98C`), Linen (`#F4F1DE`) y Warm Obsidian (`#0C0D0E`).
  - Dark Glassmorphism, tipografía Inter / Outfit / JetBrains Mono y navegación háptica 100% responsiva (Desktop + Mobile).

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide Icons, Framer Motion.
- **Backend & Cloud:** Firebase Auth (Google Sign-In), Cloud Firestore, LocalStorage Persistence.
- **Producción:** Node.js, Express, PM2 Process Manager (`touchef`), Nginx Reverse Proxy.

---

## 🚀 Instalación y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/JOSFER78/prepmaster.git touchef
cd touchef

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

---

## 📂 Estructura del Proyecto

```
touchef/
├── src/
│   ├── components/       # Componentes de UI (Layout, TouChefLogo, AuthModal...)
│   ├── lib/              # Motores lógicos (batchEngine.ts, firebase.ts, theme.ts...)
│   ├── views/            # Vistas principales (LandingView, HomeView, AIGeneratorView...)
│   ├── types.ts          # Definiciones TypeScript
│   ├── data.ts           # Catálogos base de recetas, despensa y equipamiento
│   ├── App.tsx           # Router principal y orquestador de estado
│   └── main.tsx          # Punto de entrada Vite
├── public/               # Assets estáticos y favicons
├── package.json
└── vite.config.ts
```

---

## 📄 Licencia

Desarrollado para **TouChef** — Todos los derechos reservados.
