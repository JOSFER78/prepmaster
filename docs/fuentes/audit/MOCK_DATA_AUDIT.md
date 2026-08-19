# 🧹 INVENTARIO DE MOCKS Y MATRIZ DE FUNCIONALIDADES

## 1. INVENTARIO DE DATOS SIMULADOS A PURGAR
- `src/lib/chefsData.ts` (L42-187): `MOCK_CHEFS`.
- `src/lib/chefsData.ts` (L343-462): `getInitialDemoBookings()`.
- `src/lib/supermarketEngine.ts` (L64-94, L190-214): Catálogo DIA y franjas simuladas.
- `src/lib/favoritesEngine.ts` (L9-200): Recetas y lotes semilla predefinidos.
- `src/data.ts` (L3-388): Datasets estáticos completos.
- Delays cosméticos `setTimeout`: `AIGeneratorView.tsx` (750ms), `SupermarketCheckoutView.tsx` (800ms), `CreateChefRequestModal.tsx` (600ms), `ProtectedChatModal.tsx` (1200ms).

## 2. MATRIZ DE ESTADO DE FUNCIONALIDADES
| Módulo | Clasificación | Diagnóstico Forense |
| :--- | :--- | :--- |
| **Auth Firebase** | **REAL** | Autenticación real con Firebase v10+ (Email/Password, Google OAuth). |
| **Diseño & RGPD** | **REAL** | Tema Dark/Light y banner RGPD granular. |
| **Batch Engine Base** | **REAL** | Algoritmo determinista de raciones y raciones en nevera/congelador. |
| **Memoria del Hogar** | **REAL** | Captura de fogones, horno, tuppers y alérgenos. |
| **Bóveda & Favoritos** | **REAL** | Compositor multi-receta con sincronización Firestore. |
| **Cocina Guiada** | **REAL** | Temporizadores concurrentes, síntesis de voz y Screen Wake Lock. |
| **Marketplace Chefs** | **MOCK** | Sustentado en `MOCK_CHEFS`. Requiere Chef Bootstrap Policy. |
| **Chat de Reservas** | **MOCK** | Mensajes simulados con `setTimeout`. Requiere Firestore SSOT. |
| **Food Safety** | **UNIMPLEMENTED** | Requiere creación de `FoodSafetyEngine.ts`. |
| **Kitchen Scheduler** | **UNIMPLEMENTED** | Requiere creación de `KitchenResourceScheduler.ts`. |
| **Supermercado DIA** | **MOCK** | Catálogo local estático. Requiere cesta real consolidada. |
| **Pasarela / Escrow** | **UNIMPLEMENTED** | Fórmulas anti-fuga listas, requiere conexión pasarela real. |
