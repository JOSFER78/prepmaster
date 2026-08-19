# 👨‍🍳 AUDITORÍA DEL MARKETPLACE Y CHEF BOOTSTRAP POLICY

## 1. DIAGNÓSTICO DE MOCKS DETECTADOS
- `MOCK_CHEFS`: 3 perfiles estáticos (Marcos Valbuena, Clara Santamaría, Alejandro Ribera) con 4.98★ y reseñas inventadas.
- `CreateChefRequestModal.tsx`: Inyección de candidatos ficticios automáticos en modo broadcast.
- `ProtectedChatModal.tsx`: Auto-respuesta simulada con `setTimeout(1200ms)`.

## 2. CHEF BOOTSTRAP POLICY
- **Eliminación Total de `MOCK_CHEFS`:** El directorio mostrará 0 chefs hasta que haya un chef homologado.
- **Chef Pionero Real Homologado:** `usajosefernan@gmail.com` con UID real en Firebase y documento en `/chefs/{chefId}`.
- **Cálculo Matemático de Ratings:**
  $$\text{Nuevo Rating} = \frac{(\text{Rating Actual} \times N) + \text{Nueva Puntuación}}{N + 1}$$
