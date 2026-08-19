# 🗺️ MAPA DE ARQUITECTURA: ACTUAL VS DOMAIN-DRIVEN DESIGN (DDD)

## 1. ESTADO ACTUAL (MONOLITO FAT-VIEW / GOD COMPONENT)
- `App.tsx` (616 LOC): Gestiona 17 estados simultáneos, muta LocalStorage y Firestore directamente, contiene lógica de escalado de ingredientes, máquina de estados de compra y enrutamiento artesanal.
- `types.ts` (362 LOC): Monolito de tipos mezclando DTOs, vistas y modelos de negocio.
- `views/`: Vistas con lógica de cálculo y persistencia embebida.

## 2. ARQUITECTURA OBJETIVO DDD PROPUESTA
```
src/
├── app/                  # Providers, Route Guards, AppShell
├── domain/               # Modelos puros e invariantes de negocio
│    ├── batch/           # Porciones, Escalado no lineal, Estados de lote
│    ├── household/       # Fogones, Hornos, Robots, Capacidad Tuppers
│    ├── inventory/       # Despensa, Nevera, Congelador, Caducidades
│    ├── chef/            # Perfil profesional, Homologación, Especialidades
│    ├── booking/         # Broadcast matching, Estados de reserva, Timeline
│    ├── safety/          # FoodSafetyEngine, Cinética D/z, pH, Curvas frío
│    ├── scheduler/       # KitchenResourceScheduler (RCPSP, Atención <= 1.0)
│    └── pricing/         # AntiFugaEngine, Comisiones 15% -> 8% -> 5%, Escrow
├── services/             # Casos de uso desacoplados (8 servicios maestros)
├── repositories/         # Puertos y adaptadores (Firestore SSOT + Cache)
├── hooks/                # Custom Hooks reactivos delgados
├── components/           # Componentes UI presentacionales puros
└── views/                # Vistas desacopladas sin lógica de negocio
```
