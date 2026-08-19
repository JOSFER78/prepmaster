# 🔄 FLUJO DE DATOS Y PERSISTENCIA: SINGLE SOURCE OF TRUTH (SSOT)

## 1. DIAGNÓSTICO DE DIVERGENCIA ACTUAL
- **Fractura de Estados:** LocalStorage y Firestore actúan como fuentes en conflicto.
- **Graveyard Writes:** Favoritos guardados en Firestore no se leen al iniciar sesión.
- **Silos Locales:** Modificaciones en el portal de chefs no llegan al cliente por guardarse solo en LocalStorage local.

## 2. ESPECIFICACIÓN DE LOS 8 SERVICIOS MAESTROS (FIRESTORE SSOT)
1. `UserService`: Autenticación, roles (`superadmin`, `chef`, `customer`), migración de invitados.
2. `HouseholdService`: Memoria técnica de cocina unificada en `users/{uid}/settings/household`.
3. `InventoryService`: Despensa y nevera en `users/{uid}/inventory/{itemId}`.
4. `BatchProjectService`: Lotes activos e históricos en subcolecciones y documentos raíz.
5. `ChefService`: Directorio de chefs homologados en `/chefs/{chefId}`.
6. `BookingService`: Máquina de estados de reservas en `/bookings/{bookingId}`.
7. `ReviewService`: Reseñas verificadas con recálculo matemático de rating.
8. `PaymentService`: Cotización Anti-Fuga, comisiones y custodia Escrow.
