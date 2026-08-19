# 🔬 AUDITORÍA FORENSE: BATCH ENGINE & SEGURIDAD ALIMENTARIA

## 1. DEFICIENCIAS MATEMÁTICAS Y BROMATOLÓGICAS
- Homogeneidad forzada (sin distinción calórica entre adultos y niños).
- Escalado lineal erróneo de ingredientes (evaporación y especias).
- Regla estática 60/40 nevera/congelador peligrosa para pescados (>48h en nevera) y destructiva para patatas hervidas en congelador.

## 2. NUEVOS MOTORES DOMAIN-DRIVEN
- `FoodSafetyEngine.ts`: Modelado de pH, letalidad térmica $D/z$ (*Salmonella*, *Listeria*, *B. cereus*), curva de abatimiento $60^\circ\text{C} \to 4^\circ\text{C}$ e índice de congelabilidad $FI$.
- `KitchenResourceScheduler.ts`: Solver RCPSP para optimización de makespan con capacidad de atención humana $\le 1.0$, gestión de fogones y compatibilidad de horno ($\\pm 15^\circ\text{C}$).
