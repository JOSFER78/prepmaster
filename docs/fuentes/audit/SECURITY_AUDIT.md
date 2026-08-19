# 🛡️ AUDITORÍA FORENSE DE SEGURIDAD Y FIRESTORE RULES P0

## 1. VULNERABILIDADES CRÍTICAS DETECTADAS
- `firestore.rules`: Permite lectura y escritura universal en `/users/{userId}` a cualquier usuario autenticado sin verificar `request.auth.uid == userId`.
- Cláusulas `if isAuthenticated() || ...` que cortocircuitan los controles de propiedad.
- Ausencia de validación en backend para la auto-asignación del rol de chef y superadmin.

## 2. REGLAS DE FIRESTORE P0 BLINDADAS
- Aislamiento estricto de `/users/{userId}` por `isOwner(userId)`.
- Control exclusivo del SuperAdmin (`josferestudio@gmail.com` con email verificado o Custom Claims) para homologación de cocineros (`isVerified: true`).
- Aislamiento de reservas: solo legibles por el cliente creador, el chef asignado o chefs aprobados en modo broadcast.
