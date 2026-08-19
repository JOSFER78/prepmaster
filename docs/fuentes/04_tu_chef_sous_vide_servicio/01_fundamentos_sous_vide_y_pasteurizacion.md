# 🔬 TRATADO TÉCNICO, BIOFÍSICO Y MICROBIOLÓGICO DE COCCIÓN SOUS-VIDE Y PROCESOS DE PASTEURIZACIÓN

**Documento Técnico Oficial — Plataforma TouChef 2.0 & PrepMaster**  
**Área:** Ingeniería de Procesos Culinarios, Bromatología y Seguridad Alimentaria Avanzada  
**Código:** `TC-DOC-SV-001` | **Versión:** `2.4.0` | **Estado:** Aprobado para Producción  
**Autor:** Dr. Científico Culinario e Investigador de Procesos Sous-Vide (TouChef R&D Lab)  
**Marco Normativo y Científico:** Douglas Baldwin (*A Practical Guide to Sous Vide Cooking*), FDA Food Code (Annex 3), USDA-FSIS Pathogen Modeling Program, Janby Digital Kitchen Research, AESAN, EFSA & UK ACMSF.

---

## 📑 ÍNDICE GENERAL
1. [Fundamentos Físico-Químicos y Termodinámica de la Cocción Sous-Vide](#1-fundamentos-físico-químicos-y-termodinámica-de-la-cocción-sous-vide)
   - 1.1 Transferencia de calor por convección forzada en baño líquido vs. medios gaseosos
   - 1.2 Modelización matemática del gradiente térmico transitorio (Fourier y Fick)
   - 1.3 Anoxia, retención de volátiles y cinética de autooxidación lipídica
   - 1.4 Termodinámica de proteínas: Miosina, Actina, Sarcoplasma y Solubilización del Colágeno
2. [Microbiología Cuantitativa y Seguridad Alimentaria](#2-microbiología-cuantitativa-y-seguridad-alimentaria)
   - 2.1 Reevaluación de la "Zona de Peligro" térmica ($4.0^\circ\text{C} - 54.4^\circ\text{C}$)
   - 2.2 Taxonomía de patógenos diana y formadores de esporas
   - 2.3 Cinética de inactivación térmica: Valores $D_T$, valores $z$ e integral de letalidad acumulada ($P$)
   - 2.4 Justificación del estándar de reducción $6D$ / $7D$
3. [Tablas Técnicas Maestras de Pasteurización por Tipo y Grosor](#3-tablas-técnicas-maestras-de-pasteurización-por-tipo-y-grosor)
   - 3.1 Carnes Rojas (Vacuno, Cordero, Caza) — $6.5D$ *L. monocytogenes* / *E. coli* STEC
   - 3.2 Aves de Corral (Pollo, Pavo) — $7D$ *Salmonella spp.*
   - 3.3 Carne de Porcino — $6D$ *L. monocytogenes* e inactivación de *Trichinella spiralis*
   - 3.4 Pescados y Moluscos — Termocoagulación suave e inactivación de *Anisakis simplex*
   - 3.5 Huevos a Baja Temperatura — Pasteurización en cáscara vs. Termo-texturización
   - 3.6 Vegetales, Frutas y Tubérculos — Degradación de protopectinas a $\ge 83^\circ\text{C}-85^\circ\text{C}$
4. [Protocolo Obligatorio de Abatimiento Térmico Inmediato (Cook-Chill-Freeze)](#4-protocolo-obligatorio-de-abatimiento-térmico-inmediato-cook-chill-freeze)
   - 4.1 Biofísica del enfriamiento forzado y la regla de los 90 minutos
   - 4.2 Dinámica de fluidos del baño de agua y hielo 50/50 con agitación
   - 4.3 Tabla de tiempos de abatimiento según espesor y geometría
5. [Prevención Crítica de Botulismo en Almacenamiento al Vacío](#5-prevención-crítica-de-botulismo-en-almacenamiento-al-vacío)
   - 5.1 El vector psicrótrofo: *Clostridium botulinum* Tipo No Proteolítico (Grupo II)
   - 5.2 Tecnología de Obstáculos (*Hurdle Technology*) de Leistner aplicada
   - 5.3 Matriz de Vida Útil Segura en Refrigeración y Congelación
   - 5.4 Termolabilidad y neutralización de la neurotoxina en regeneración
6. [Plan de Análisis de Peligros y Puntos de Control Crítico (APPCC / HACCP)](#6-plan-de-análisis-de-peligros-y-puntos-de-control-crítico-appcc--haccp)

---

# 1. FUNDAMENTOS FÍSICO-QUÍMICOS Y TERMODINÁMICA DE LA COCCIÓN SOUS-VIDE

La cocción al vacío a baja temperatura (*Sous-Vide Cooking*) se define como el tratamiento térmico de materias primas acondicionadas en envases plásticos herméticos y termo-resistentes con extracción previa de aire ($\ge 99.5\%$ de vacío, presión residual $\le 10\text{ mbar}$), sumergidas en un fluido termostatizado bajo estricto control de temperatura ($\pm 0.05^\circ\text{C}$) y tiempo.

```
+---------------------------------------------------------------------------------------------------+
|                                 SISTEMA TERMODINÁMICO SOUS-VIDE                                   |
|                                                                                                   |
|     Baño de Agua Termostatizado (T_baño = cte, agitación forzada: h = 1000 - 3000 W/m²·K)         |
|     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     |
|          |                                                                           |            |
|          v                                                                           v            |
|     [ Película de Bolsa Plástica Barrera EVOH/PA/PE (Espesor e = 70-120 um, k_p ~ 0.2 W/m·K) ]   |
|     ---------------------------------------------------------------------------------------       |
|     |  Vacío Anóxico (Presión residual <= 10 mbar, sin colchón de aire aislante)          |       |
|     |                                                                                     |       |
|     |  ALIMENTO: Transferencia interna puramente conductiva                               |       |
|     |  rho = 1020-1080 kg/m³, c_p = 3.2-3.8 kJ/kg·K, k = 0.45-0.55 W/m·K                  |       |
|     |                                                                                     |       |
|     |        Superficie (T_sup -> T_baño) ===== Gradiente =====> Núcleo (T_centro)        |       |
|     |                                                                                     |       |
|     ---------------------------------------------------------------------------------------       |
+---------------------------------------------------------------------------------------------------+
```

### 1.1 Transferencia de Calor por Convección Forzada Líquida vs. Medios Gaseosos

La eficacia del intercambio de energía térmica entre la fuente calorífica y el alimento está gobernada por la Ley de Enfriamiento/Calentamiento de Newton en la interfaz y la Ley de Fourier en el sólido:

$$\dot{q} = h \cdot A \cdot (T_{\text{fluido}} - T_{\text{superficie}})$$

Donde:
- $\dot{q}$: Flujo de calor transferido por unidad de tiempo ($\text{W}$).
- $h$: Coeficiente convectivo de transferencia de calor ($\text{W}/(\text{m}^2\cdot\text{K})$).
- $A$: Área superficial efectiva del producto ($\text{m}^2$).
- $T_{\text{fluido}}$ y $T_{\text{superficie}}$: Temperaturas del fluido exterior y de la superficie de la bolsa ($\text{K}$ o $^\circ\text{C}$).

#### Comparativa Cuantitativa de Coeficientes de Transferencia ($h$):
| Medio de Transferencia Térmica | Régimen de Fluido | Coeficiente Convectivo $h$ ($\text{W}/(\text{m}^2\cdot\text{K})$) | Eficiencia Relativa |
| :--- | :--- | :--- | :--- |
| **Aire en horno estático** | Convección natural | $5 - 15$ | $1\times$ (Línea base) |
| **Aire en horno de convección** | Convección forzada | $25 - 60$ | $4\times - 6\times$ |
| **Vapor saturado sin presión** | Condensación / flujo | $300 - 800$ | $30\times - 60\times$ |
| **Baño de agua con circulador (Janby/Anova)** | **Convección forzada líquida** | **$1.200 - 3.000$** | **$120\times - 250\times$** |

El **Número de Biot** ($Bi$) adimensional cuantifica la relación entre la resistencia térmica interna del alimento y la resistencia térmica convectiva en su superficie:

$$Bi = \frac{h \cdot L_c}{k_{\text{alimento}}}$$

Donde $L_c$ es la longitud característica ($L_c = \frac{V}{A}$, siendo $V$ el volumen y $A$ el área) y $k_{\text{alimento}}$ es la conductividad térmica del alimento ($\approx 0.48 - 0.54\ \text{W}/(\text{m}\cdot\text{K})$ en carnes magras).

> **Implicación Termodinámica P0:** En un baño de agua con agitación forzada, $h \ge 1500\ \text{W}/(\text{m}^2\cdot\text{K})$, por lo que $Bi \gg 1$. Esto significa que la resistencia a la transferencia de calor superficial es prácticamente **nula**: la superficie del alimento alcanza instantáneamente la temperatura del agua ($T_{\text{superficie}} \approx T_{\text{baño}}$). La velocidad total del proceso de calentamiento queda limitada exclusivamente por la difusividad térmica interna ($\alpha$) del alimento.

---

### 1.2 Modelización Matemática del Gradiente Térmico Transitorio

El perfil de temperatura en el núcleo térmico del alimento en función del tiempo ($t$) y la posición espacial se rige por la **Ecuación Diferencial de Conducción Transitoria de Calor** (Segunda Ley de Fourier tridimensional):

$$\frac{\partial T}{\partial t} = \alpha \nabla^2 T = \alpha \left( \frac{\partial^2 T}{\partial x^2} + \frac{\partial^2 T}{\partial y^2} + \frac{\partial^2 T}{\partial z^2} \right)$$

Donde $\alpha$ es la **difusividad térmica** ($\text{m}^2/\text{s}$), definida por las propiedades termofísicas intrínsecas de la matriz alimentaria:

$$\alpha = \frac{k}{\rho \cdot c_p}$$

- $k$: Conductividad térmica ($\text{W}/(\text{m}\cdot\text{K})$). Para músculo bovino/aviar: $0.49 - 0.52\ \text{W}/(\text{m}\cdot\text{K})$.
- $\rho$: Densidad aparente ($\text{kg}/\text{m}^3$). Para carnes frescas: $1.040 - 1.070\ \text{kg}/\text{m}^3$.
- $c_p$: Calor específico a presión constante ($\text{J}/(\text{kg}\cdot\text{K})$). Para carnes ($\approx 75\%$ agua): $3.400 - 3.700\ \text{J}/(\text{kg}\cdot\text{K})$.
- $\alpha_{\text{carne}} \approx 1.30 \times 10^{-7}\ \text{m}^2/\text{s} - 1.45 \times 10^{-7}\ \text{m}^2/\text{s}$.

Para un corte cárnico modelizado como una **losa infinita (placa plana)** de grosor $2L$ (donde el calor penetra por ambas caras principales de área infinita en comparación con los bordes), la solución analítica exacta de la serie de Fourier para la temperatura en el centro geométrico ($x = 0$) es:

$$\theta_0 = \frac{T(0, t) - T_{\text{baño}}}{T_{\text{inicial}} - T_{\text{baño}}} = \sum_{n=1}^{\infty} \frac{2 \sin(\lambda_n)}{\lambda_n + \sin(\lambda_n)\cos(\lambda_n)} \exp\left(-\lambda_n^2 \frac{\alpha \cdot t}{L^2}\right)$$

Donde $\lambda_n$ son las raíces de la ecuación trascendental $\lambda_n \tan(\lambda_n) = Bi$. Cuando $Bi \to \infty$ (condición sous-vide con alta agitación), $\lambda_n = (2n - 1)\frac{\pi}{2}$.

Aproximando para el primer término ($n=1$, válido cuando el número de Fourier $Fo = \frac{\alpha t}{L^2} > 0.2$):

$$\frac{T_{\text{centro}} - T_{\text{baño}}}{T_{\text{inicial}} - T_{\text{baño}}} \approx \frac{4}{\pi} \exp\left( - \frac{\pi^2 \cdot \alpha \cdot t}{4 L^2} \right)$$

> **Ley del Cuadrado del Espesor (Baldwin):** El tiempo $t$ requerido para alcanzar una temperatura diana en el núcleo no escala linealmente con el grosor, sino con el **cuadrado del semiespesor ($L^2$)**:
> $$t \propto \frac{L^2}{\alpha}$$
> **Duplicar el grosor de una pieza (ej. de 25 mm a 50 mm) cuadruplica ($4\times$) el tiempo de calentamiento.**

---

### 1.3 Anoxia, Retención de Volátiles y Cinética de Autooxidación Lipídica

1. **Inhibición Radicalaria de la Peroxidación Lipídica:**  
   En presencia de oxígeno ($P_{\text{O}_2} \approx 0.21\text{ atm}$), los ácidos grasos insaturados ($\text{RH}$) sufren degradación oxidativa según el mecanismo radicalario en cadena:
   - **Iniciación:** $\text{RH} + \text{Iniciador} \to \text{R}^\bullet + \text{H}^\bullet$
   - **Propagación:** $\text{R}^\bullet + \text{O}_2 \to \text{ROO}^\bullet$; $\quad \text{ROO}^\bullet + \text{RH} \to \text{ROOH} + \text{R}^\bullet$
   - **Descomposición:** $\text{ROOH} \to \text{Aldehídos, Cetonas, Hexanal (aroma rancio/WOF - Warmed-Over Flavor)}$
   Alcanzar un vacío $> 99.5\%$ envasando en bolsas multicapa impermeables de alta barrera ($\text{OTR} \le 2.0\ \text{cm}^3/(\text{m}^2\cdot 24\text{h}\cdot\text{bar})$ con copolímeros de Etileno Vinil Alcohol - EVOH o Poliamida orientada - OPA) detiene la etapa de propagación por eliminación estricta de reactivo oxidante.

2. **Conservación de la Fracción Volátil Hidrofóbica y Terpénica:**  
   En sistemas de cocción abiertos (asado, ebullición, fritura), la presión de vapor de agua arrastra compuestos volátiles aromáticos de bajo peso molecular (ésteres, pirazinas, terpenos). En sous-vide, el volumen de fase gaseosa en el interior de la bolsa es cuasi-cero ($V_{\text{gas}} \approx 0$). Al no haber espacio de cabeza ni corriente convectiva libre, el coeficiente de partición líquido-gas se satura en equilibrio termodinámico cerrado, reteniendo el $100\%$ de la fracción aromática hidrosoluble y liposoluble en el jugo intracelular y matriz cárnica.

---

### 1.4 Termodinámica de Proteínas: Miosina, Actina, Sarcoplasma y Colágeno

El comportamiento reológico, la terneza y la capacidad de retención de agua (CRA / *Water Holding Capacity*) de la carne durante la cocción dependen de la desnaturalización conformacional y agregación de cuatro familias de proteínas:

```
TERMODINÁMICA DE PROTEÍNAS CÁRNICAS EN COCCIÓN
========================================================================================================
Temperatura (°C)     40°C      45°C      50°C      55°C      60°C      65°C      70°C      75°C      80°C
--------------------------------------------------------------------------------------------------------
MIOSINA              [===== Desnaturalización y Gelificación =====]
(Jugosidad óptima)   40°C - 50°C -> Se forma matriz de gel elástica que atrapa agua libre.

SARCOPLASMA                              [==== Coagulación y Pérdida de Translucidez ====]
(Opacidad / Firmeza)                     55°C - 62°C -> Las proteínas solubles precipitan.

ACTINA                                                       [===== Contracción de Sarcómeros =====]
(MERMA / Resecamiento)                                       66°C - 73°C -> Se expulsa masivamente agua.

COLÁGENO                                           [===== Contracción 60-65°C =====]
(Tejido conectivo)                                 [=================== HIDRÓLISIS A GELATINA =================->]
(Ternura prolongada)                                55°C - 60°C (12-48h) ó 65-85°C (rápida)
========================================================================================================
```

```
                                  MAPA TÉRMICO DE FASES PROTEICAS
                                  
     40°C                50°C                60°C                66°C                75°C
      |                   |                   |                   |                   |
      +-------------------+-------------------+-------------------+-------------------+---> Temp
        Miosina desenrolla  Gelificación miosina  Inicio colágeno    Actina contrae      Actina rígida
        y polimeriza        y sarcoplasma         a gelatina         sarcómero (-30%)    Drip loss >25%
        (Textura Tierna)    (Opacidad ideal)      (Tiempos largos)   (EXPULSIÓN AGUA)    (Carne seca)
                                                         ^
                                                         |
                                 VENTANA DE ORO SOUS-VIDE: 54.5°C - 62.0°C
                                 (Miosina gelificada, Actina intacta, CRA máxima)
```

1. **Miosina (Fracción Miofibrilar Pesada):**
   - Rango de transición térmica ($T_m$): **$40^\circ\text{C}$ a $50^\circ\text{C}$** (pico endotérmico en calorimetría diferencial de barrido DSC a $\approx 54^\circ\text{C}$).
   - Mecanismo: Las cabezas globulares y la cola helicoidal se despliegan, formando una red tridimensional de gel que inmoviliza el agua dipolar en los espacios interfilamentosos. Aporta textura firme pero tierna y flexible.
2. **Proteínas Sarcoplásmicas (Mioglobina, Enzimas glicolíticas):**
   - Rango de desnaturalización: **$55^\circ\text{C}$ a $62^\circ\text{C}$**.
   - Mecanismo: Coagulación proteica que aporta opacidad a la carne. La mioglobina se desnaturaliza progresivamente a hemocromo grisáceo a partir de $60^\circ\text{C}-65^\circ\text{C}$; por debajo de $58^\circ\text{C}$ conserva el color rosado brillante característico de carnes rojas poco hechas.
3. **Actina (Filamentos Finos Miofibrilares):**
   - Rango de desnaturalización crítica: **$66^\circ\text{C}$ a $73^\circ\text{C}$** (DSC pico a $\approx 70^\circ\text{C}$).
   - **Mecanismo de merma (Drip Loss):** La desnaturalización de la actina colapsa los enlaces cruzados longitudinales del sarcómero, ejerciendo una compresión hidrostática masiva sobre el retículo intracelular. El agua libre es forzada fuera de las fibras musculares.
   - **Pérdida por purga:** A $55^\circ\text{C}$, la merma por cocción es de apenas $4\% - 7\%$; al cruzar los $66^\circ\text{C}-70^\circ\text{C}$, la merma se dispara exponencialmente al **$20\% - 32\%$ del peso total**, generando una textura fibrosa y seca.
4. **Colágeno (Tejido Conectivo Estromal — Tipos I y III):**
   - Estructura: Triple hélice de polipéptidos estabilizada por enlaces de hidrógeno intercatenarios y enlaces cruzados covalentes de hidroxiprolina y lisil-oxidasa.
   - **Contracción térmica:** Entre $60^\circ\text{C}$ y $65^\circ\text{C}$, el colágeno no madurado sufre contracción isotérmica, generando tensión física sobre los haces musculares.
   - **Cinética de Solubilización a Gelatina:** La ruptura hidrolítica de los enlaces covalentes para convertir el colágeno insoluble en gelatina hidrosoluble sigue una **cinética química de pseudo-primer orden**, regida por la Ecuación de Arrhenius:
     $$k_{\text{solub}} = A \cdot \exp\left( - \frac{E_a}{R \cdot T} \right)$$
     Donde la energía de activación $E_a \approx 180 - 220\ \text{kJ}/\text{mol}$.
   - **Estrategia Sous-Vide en Cortes Duros (Carrillera, Rabo, Jarrete):** En lugar de aplicar altas temperaturas ($100^\circ\text{C}$) que hidrolizan el colágeno en 2 horas a costa de destrozar y desecar la actina, el sous-vide opera a **$55^\circ\text{C} - 62^\circ\text{C}$ durante $24 - 48\text{ horas}$**. A esta temperatura, la tasa de reacción $k_{\text{solub}}$ es más baja pero constante, transformando el $100\%$ del colágeno en gelatina ultra untuosa mientras la actina jamás supera su umbral de contracción, logrando cortes simultáneamente gelatinosos, jugosos y con corte limpio de cuchillo.

---

# 2. MICROBIOLOGÍA CUANTITATIVA Y SEGURIDAD ALIMENTARIA

### 2.1 Reevaluación de la "Zona de Peligro" Térmica

En la formación gastronómica tradicional, se enseña de forma simplificada que la *Zona de Peligro* abarca de $4.0^\circ\text{C}$ a $60.0^\circ\text{C}$. Sin embargo, desde la microbiología predictiva y la termodinámica aplicada (FDA Food Code Annex 3, Baldwin 2012):

```
+-------------------------------------------------------------------------------------------------------+
|                                    ESCALA TÉRMICA MICROBIOLÓGICA                                      |
|                                                                                                       |
|  0°C     3.0°C   4.0°C                           50.0°C    54.4°C         60.0°C          100°C       |
|  |---------|-------|-------------------------------|---------|--------------|---------------|         |
|   Inhibición C. bot  Crecimiento bacteriano          Inhib.   INICIO MUERTE  Inactivación    Ebullición|
|   Criofílica GrupoII psicrótrofo y mesófilo          Rápida   TÉRMICA REAL   Rápida Salmon.  (Vapor)   |
|   (Congelación)      (ZONA PELIGRO BACTERIAS)                 (Pasteurizac.) (6D en minutos)          |
|                                                                                                       |
|  [ SEGURA / INERTE ] [ ZONA DE PELIGRO REAL: 4.0°C - 54.4°C ] [    ZONA DE PASTEURIZACIÓN SOUS-VIDE  ] |
|                      (Tiempo acumulado máximo: <= 2 - 4 h)    (Inactivación exponencial 6D/7D)        |
+-------------------------------------------------------------------------------------------------------+
```

1. **Límite Superior ($54.4^\circ\text{C} / 130.0^\circ\text{F}$):**  
   A temperaturas $\ge 54.4^\circ\text{C}$, todas las formas vegetativas patógenas (*Salmonella*, *Listeria*, *E. coli*) detienen irreversiblemente su replicación celular e inician su desnaturalización proteica y lisis de membrana celular. **Cualquier temperatura $\ge 55.0^\circ\text{C}$ es pasteurizadora**, siempre que se mantenga durante el tiempo cinético suficiente.
2. **Límite Inferior ($4.0^\circ\text{C} / 39.2^\circ\text{F}$):**  
   Por debajo de $4.0^\circ\text{C}$, la práctica totalidad de bacterias mesófilas patógenas son incapaces de duplicarse. La excepción crítica son las bacterias psicrótrofas (*Listeria monocytogenes*, *Yersinia enterocolitica*, y *Clostridium botulinum* Tipo E no proteolítico), que pueden metabolizar lentamente hasta $+3.0^\circ\text{C} / -0.5^\circ\text{C}$.
3. **Regla Temporal de Tránsito (P0):**  
   El alimento nunca debe permanecer en el rango **$4.0^\circ\text{C} \to 54.4^\circ\text{C}$ más de 4 horas en total** (sumando la fase de calentamiento inicial y la fase de enfriamiento/abatimiento).

---

### 2.2 Taxonomía de Patógenos Diana y Formadores de Esporas

```
PATÓGENOS DIANA EN COCCIÓN SOUS-VIDE Y BATCH COOKING
================================================================================================================
Microorganismo             Tipo        Gram / Respiración      Temp. Crecim.   pH Mín.   aw Mín.   Peligro Primario
----------------------------------------------------------------------------------------------------------------
Listeria monocytogenes     Vegetativo  Gram+ / Anaerobio Fac.  -0.4°C a 45°C   4.4       0.92      Meningitis / Aborto
Salmonella enterica        Vegetativo  Gram- / Anaerobio Fac.  5.2°C a 46°C    3.8       0.94      Salmonelosis aguda
Escherichia coli STEC      Vegetativo  Gram- / Anaerobio Fac.  7.0°C a 46°C    4.4       0.95      Síndrome Urémico Hem.
Staphylococcus aureus      Vegetativo  Gram+ / Anaerobio Fac.  7.0°C a 48°C    4.0       0.83      Enterotoxina Termoest.
Clostridium perfringens    Esporulante Gram+ / Anaerobio Obl.  12.0°C a 50°C   5.0       0.93      Toxiinfección diarrea
Clostridium botulinum (I)  Esporulante Gram+ / Anaerobio Obl.  10.0°C a 48°C   4.6       0.935     Neurotoxina (Letal)
Clostridium botulinum (II) Esporulante Gram+ / Anaerobio Obl.  3.0°C a 45°C    5.0       0.97      Neurotoxina Psicrótrofa
Bacillus cereus            Esporulante Gram+ / Anaerobio Fac.  4.0°C a 48°C    4.3       0.91      Toxina Emética / Diarr.
================================================================================================================
```

#### Análisis Específico de Resistencia:
- **Listeria monocytogenes:** Es la bacteria vegetativa patógena transmitida por alimentos **más termorresistente**. Por tanto, cualquier proceso térmico que garantice la reducción $6D$ de *Listeria monocytogenes* en carnes rojas y pescados asegura automáticamente la destrucción de *E. coli*, *Salmonella*, *Campylobacter* y *Yersinia*.
- **Staphylococcus aureus:** Aunque la bacteria se inactiva a $> 55^\circ\text{C}$, su **enterotoxina preformada es termoestable** (resiste $100^\circ\text{C}$ durante $> 30\text{ minutos}$). La prevención radica exclusivamente en evitar la permanencia de la materia prima entre $15^\circ\text{C}$ y $40^\circ\text{C}$ antes de la cocción.
- **Clostridium botulinum Grupo II (No proteolítico, tipos B, E, F):** Es el **riesgo biofísico número uno del sous-vide refrigerado**. Sus esporas sobreviven a las temperaturas de pasteurización ($55^\circ\text{C}-85^\circ\text{C}$) y, dado que el envase carece de oxígeno ($\text{Eh} < -200\ \text{mV}$), el entorno es óptimo para su germinación si la temperatura se eleva a $\ge 3.0^\circ\text{C}$.

---

### 2.3 Cinética de Inactivación Térmica: Valores $D$, Valores $z$ y Letalidad Acumulada

La inactivación térmica bacteriana a temperatura constante sigue una cinética de primer orden descrita por el modelo log-lineal de Bigelow:

$$\frac{dN}{dt} = - k_d \cdot N \implies \log_{10}\left(\frac{N_0}{N(t)}\right) = \frac{t}{D_T}$$

Donde:
- $N_0$: Población bacteriana inicial ($\text{UFC}/\text{g}$).
- $N(t)$: Población bacteriana superviviente tras un tiempo $t$.
- $D_T$ (**Tiempo de Reducción Decimal**): Tiempo en minutos necesario a una temperatura $T$ constante para reducir el número de microorganismos viables en un $90\%$ ($1\text{ log}_{10}$ o $1D$).
- $k_d$: Constante cinética de muerte celular ($k_d = \frac{\ln(10)}{D_T} \approx \frac{2.303}{D_T}$).

```
                             CURVA DE SUPERVIVENCIA LOGARÍTMICA (VALOR D)
                             
    Población (Log UFC/g)
       7 |====== N0 (10^7 UFC/g)
         |      \
       6 |       \ (1 D = 90% reducción = 1 Log)
         |        \
       5 |         \ (2 D = 99% reducción)
         |          \
       4 |           \ (3 D)
         |            \
       3 |             \ (4 D)
         |              \
       2 |               \ (5 D)
         |                \
       1 |                 \ (6 D = 99.9999% destrucción de Listeria)
         |                  \
       0 +-------------------\----------------------------------> Tiempo (min)
         0        D          2D         3D         4D         5D         6D
```

El **Valor $z$** cuantifica la sensibilidad del valor $D$ frente a las variaciones de temperatura. Representa el incremento de temperatura en $^\circ\text{C}$ requerido para alterar el valor $D$ en un factor de $10$ ($1\text{ orden de magnitud}$):

$$D(T) = D(T_{\text{ref}}) \cdot 10^{-\frac{T - T_{\text{ref}}}{z}}$$

#### Parámetros Cinéticos Oficiales de Referencia (FDA / USDA / Baldwin):
| Patógeno | Temperatura Ref. ($T_{\text{ref}}$) | Valor $D(T_{\text{ref}})$ (min) | Valor $z$ ($^\circ\text{C}$) | Matriz Alimentaria |
| :--- | :--- | :--- | :--- | :--- |
| ***Listeria monocytogenes*** | $60.0^\circ\text{C}$ | $5.0 - 8.3\text{ min}$ | $7.0 - 7.5^\circ\text{C}$ | Carne bovina / Porcina / Pescado |
| ***Salmonella spp.*** | $60.0^\circ\text{C}$ | $5.5 - 6.8\text{ min}$ | $5.5 - 6.0^\circ\text{C}$ | Pollo / Pavo ($10\%$ grasa) |
| ***Escherichia coli* O157:H7** | $60.0^\circ\text{C}$ | $3.5 - 5.0\text{ min}$ | $5.0 - 5.5^\circ\text{C}$ | Vacuno picado / Magro |
| ***C. botulinum* Tipo E (Esporas)**| $82.2^\circ\text{C}$ | $1.2 - 1.5\text{ min}$ | $7.4 - 9.0^\circ\text{C}$ | Pescado / Medios húmedos |

#### Letalidad Instantánea ($L$) y Letalidad Acumulada ($P$ o Valor $F$):
Durante la cocción sous-vide, la temperatura en el centro de la pieza sube de forma transitoria y no permanece constante. La **tasa de letalidad instantánea** a cualquier temperatura $T(t)$ respecto a una temperatura base de referencia ($T_{\text{ref}} = 60.0^\circ\text{C}$) se calcula como:

$$L(t) = 10^{\frac{T(t) - T_{\text{ref}}}{z}}$$

La **Letalidad Térmica Acumulada** ($P_{60}^z$, o Valor de Pasteurización) integrada a lo largo de toda la curva de calentamiento es:

$$P = \int_{0}^{t_{\text{total}}} 10^{\frac{T(t') - 60.0}{z}} \, dt'$$

Un tratamiento sous-vide es biológicamente seguro si y solo si:

$$P_{\text{acumulado}} \ge n \cdot D_{60}$$

Donde $n$ es el número de reducciones decimales exigidas por la autoridad sanitaria ($n = 6$ para carnes/pescados, $n = 7$ para aves).

---

### 2.4 Justificación del Estándar de Reducción $6D$ / $7D$

- **Estándar $6D$ ($6\text{ log}_{10}$ / $99.9999\%$ de inactivación):**  
  Adoptado internacionalmente para *Listeria monocytogenes* en productos listos para el consumo (RTE). Si una carne cruda presenta una contaminación masiva de $1.000.000\ \text{UFC}/\text{g}$ ($10^6$), un tratamiento $6D$ reduce la carga a $\le 1\ \text{UFC}/\text{g}$ ($10^0$), eliminando cualquier probabilidad estadística de dosis infectiva.
- **Estándar $7D$ ($7\text{ log}_{10}$ / $99.99999\%$ de inactivación):**  
  Exigido por la USDA-FSIS (Directiva 9 CFR § 381.150) para *Salmonella spp.* en todas las carnes de ave, debido a su mayor prevalencia inicial y gravedad toxiinfecciosa.

---

# 3. TABLAS TÉCNICAS MAESTRAS DE PASTEURIZACIÓN POR TIPO Y GROSOR

Las siguientes tablas proporcionan los **tiempos mínimos de pasteurización totales (en minutos)** requeridos a diferentes temperaturas constantes del baño termostatizado.  
*Nota Metodológica:* Los valores integran el tiempo de conducción térmica transitoria desde una temperatura inicial de refrigeración ($+4^\circ\text{C}$) hasta el centro de la pieza, más el tiempo de mantenimiento isotérmico letal en el núcleo para alcanzar la reducción logarítmica especificada (Datos calculados y validados según modelos termofísicos de Douglas Baldwin y FDA).

---

### 3.1 Carnes Rojas (Vacuno, Cordero, Caza) — Reducción $6.5D$ de *Listeria monocytogenes*
*Geometría: Placa/Losa plana uniforme (bife/solomillo/entrecot) sumergida en baño forzado.*

| Grosor (mm) | $55.0^\circ\text{C}$ (Poco hecho) | $56.0^\circ\text{C}$ (Al punto menos) | $57.5^\circ\text{C}$ (Al punto) | $60.0^\circ\text{C}$ (Al punto +) | $62.5^\circ\text{C}$ (Hecho) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$10\text{ mm}$** | $125\text{ min}$ ($2\text{h } 05'$) | $90\text{ min}$ ($1\text{h } 30'$) | $55\text{ min}$ | $35\text{ min}$ | $25\text{ min}$ |
| **$20\text{ mm}$** | $145\text{ min}$ ($2\text{h } 25'$) | $110\text{ min}$ ($1\text{h } 50'$) | $75\text{ min}$ ($1\text{h } 15'$) | $50\text{ min}$ | $40\text{ min}$ |
| **$30\text{ mm}$** | $175\text{ min}$ ($2\text{h } 55'$) | $140\text{ min}$ ($2\text{h } 20'$) | $105\text{ min}$ ($1\text{h } 45'$) | $75\text{ min}$ ($1\text{h } 15'$) | $60\text{ min}$ ($1\text{h } 00'$) |
| **$40\text{ mm}$** | $220\text{ min}$ ($3\text{h } 40'$) | $180\text{ min}$ ($3\text{h } 00'$) | $140\text{ min}$ ($2\text{h } 20'$) | $110\text{ min}$ ($1\text{h } 50'$) | $90\text{ min}$ ($1\text{h } 30'$) |
| **$50\text{ mm}$** | $275\text{ min}$ ($4\text{h } 35'$) | $230\text{ min}$ ($3\text{h } 50'$) | $185\text{ min}$ ($3\text{h } 05'$) | $150\text{ min}$ ($2\text{h } 30'$) | $125\text{ min}$ ($2\text{h } 05'$) |
| **$60\text{ mm}$** | $340\text{ min}$ ($5\text{h } 40'$) | $290\text{ min}$ ($4\text{h } 50'$) | $240\text{ min}$ ($4\text{h } 00'$) | $195\text{ min}$ ($3\text{h } 15'$) | $165\text{ min}$ ($2\text{h } 45'$) |
| **$70\text{ mm}$** | $420\text{ min}$ ($7\text{h } 00'$) | $360\text{ min}$ ($6\text{h } 00'$) | $300\text{ min}$ ($5\text{h } 00'$) | $250\text{ min}$ ($4\text{h } 10'$) | $215\text{ min}$ ($3\text{h } 35'$) |

---

### 3.2 Aves de Corral (Pechuga de Pollo, Pavo) — Reducción $7.0D$ de *Salmonella spp.*
*Geometría: Placa/Losa plana sumergida en baño forzado (desde $+4^\circ\text{C}$). Coeficiente lipídico $\approx 5-10\%$.*

| Grosor (mm) | $60.0^\circ\text{C}$ (Ultra Jugoso) | $62.0^\circ\text{C}$ (Jugoso Firme) | $64.0^\circ\text{C}$ (Estándar Chef) | $66.0^\circ\text{C}$ (Tradicional) | $70.0^\circ\text{C}$ (Firme) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$10\text{ mm}$** | $45\text{ min}$ | $30\text{ min}$ | $20\text{ min}$ | $15\text{ min}$ | $10\text{ min}$ |
| **$20\text{ mm}$** | $65\text{ min}$ ($1\text{h } 05'$) | $45\text{ min}$ | $35\text{ min}$ | $25\text{ min}$ | $20\text{ min}$ |
| **$30\text{ mm}$** | $90\text{ min}$ ($1\text{h } 30'$) | $70\text{ min}$ ($1\text{h } 10'$) | $55\text{ min}$ | $45\text{ min}$ | $35\text{ min}$ |
| **$40\text{ mm}$** | $125\text{ min}$ ($2\text{h } 05'$) | $100\text{ min}$ ($1\text{h } 40'$) | $80\text{ min}$ ($1\text{h } 20'$) | $65\text{ min}$ ($1\text{h } 05'$) | $55\text{ min}$ |
| **$50\text{ mm}$** | $165\text{ min}$ ($2\text{h } 45'$) | $135\text{ min}$ ($2\text{h } 15'$) | $110\text{ min}$ ($1\text{h } 50'$) | $95\text{ min}$ ($1\text{h } 35'$) | $80\text{ min}$ ($1\text{h } 20'$) |
| **$60\text{ mm}$** | $215\text{ min}$ ($3\text{h } 35'$) | $175\text{ min}$ ($2\text{h } 25'$) | $145\text{ min}$ ($2\text{h } 25'$) | $125\text{ min}$ ($2\text{h } 05'$) | $105\text{ min}$ ($1\text{h } 45'$) |
| **$70\text{ mm}$** | $270\text{ min}$ ($4\text{h } 30'$) | $225\text{ min}$ ($3\text{h } 45'$) | $190\text{ min}$ ($3\text{h } 10'$) | $160\text{ min}$ ($2\text{h } 40'$) | $135\text{ min}$ ($2\text{h } 15'$) |

> **Nota para Muslos y Contramuslos de Ave:** Debido a la alta concentración de tejido conectivo (colágeno) y mioglobina en el músculo rojo aviar, los muslos requieren una temperatura de **$68.0^\circ\text{C} \times 4\text{ h}$** o **$74.0^\circ\text{C} \times 2.5\text{ h}$** para solubilizar el colágeno y evitar la elasticidad correosa, superando con creces la pasteurización microbiológica.

---

### 3.3 Carne de Porcino (Lomo, Solomillo, Secreto) — Reducción $6D$ de *Listeria* e Inactivación de *Trichinella*

La larva parásita *Trichinella spiralis* se inactiva térmicamente de forma inmediata al alcanzar $55.0^\circ\text{C}$ durante $> 6\text{ minutos}$ en el núcleo. La pasteurización $6D$ de *Listeria* cubre y supera holgadamente el riesgo parasitario.

| Grosor (mm) | $58.0^\circ\text{C}$ (Rosado Jugoso) | $60.0^\circ\text{C}$ (Tierno al Punto) | $63.0^\circ\text{C}$ (Blanco Tradicional) |
| :--- | :--- | :--- | :--- |
| **$20\text{ mm}$** | $70\text{ min}$ ($1\text{h } 10'$) | $50\text{ min}$ | $35\text{ min}$ |
| **$30\text{ mm}$** | $100\text{ min}$ ($1\text{h } 40'$) | $75\text{ min}$ ($1\text{h } 15'$) | $55\text{ min}$ |
| **$40\text{ mm}$** | $135\text{ min}$ ($2\text{h } 15'$) | $110\text{ min}$ ($1\text{h } 50'$) | $80\text{ min}$ ($1\text{h } 20'$) |
| **$50\text{ mm}$** | $180\text{ min}$ ($3\text{h } 00'$) | $150\text{ min}$ ($2\text{h } 30'$) | $115\text{ min}$ ($1\text{h } 55'$) |
| **$60\text{ mm}$** | $230\text{ min}$ ($3\text{h } 50'$) | $195\text{ min}$ ($3\text{h } 15'$) | $155\text{ min}$ ($2\text{h } 35'$) |

---

### 3.4 Pescados y Moluscos (Salmón, Bacalao, Atún, Merluza)

1. **Inactivación de *Anisakis simplex* (Nematodo parásito):**  
   - Normativa AESAN / RD 1021/2022: Tratamiento térmico de $\ge 60.0^\circ\text{C}$ en el centro durante al menos $1\text{ minuto}$, o congelación previa a $\le -20.0^\circ\text{C}$ durante $\ge 24\text{ horas}$.
2. **Texturas y Termocoagulación Proteica:**
   - **$48.0^\circ\text{C} - 50.0^\circ\text{C}$:** Textura miotomal traslúcida, ultra tierna, separación perfecta de láminas musculares (Salmón Mi-Cuit). *Requiere congelación previa de seguridad o consumo inmediato tras pasteurización.*
   - **$54.0^\circ\text{C} - 56.0^\circ\text{C}$:** Pasteurización completa con coagulación de albúmina sin expulsión severa de agua.

| Grosor (mm) | $50.0^\circ\text{C}$ (Cocción Suave)* | $54.0^\circ\text{C}$ (Pasteurizado Ligero) | $58.0^\circ\text{C}$ (Pasteurizado Firme) |
| :--- | :--- | :--- | :--- |
| **$15\text{ mm}$** | $35\text{ min}$ | $28\text{ min}$ | $20\text{ min}$ |
| **$25\text{ mm}$** | $55\text{ min}$ | $45\text{ min}$ | $35\text{ min}$ |
| **$35\text{ min}$** | $85\text{ min}$ ($1\text{h } 25'$) | $70\text{ min}$ ($1\text{h } 10'$) | $55\text{ min}$ |
| **$45\text{ mm}$** | $120\text{ min}$ ($2\text{h } 00'$) | $100\text{ min}$ ($1\text{h } 40'$) | $80\text{ min}$ ($1\text{h } 20'$) |

*\*Nota: A $50.0^\circ\text{C}$ el proceso NO es pasteurizante según FDA. Solo admisible bajo estricto consumo inmediato y materia prima ultracongelada exenta de parásitos.*

---

### 3.5 Huevos a Baja Temperatura: Pasteurización en Cáscara vs. Termo-Texturización

Las proteínas de la clara y la yema exhiben puntos de desnaturalización radicalmente disociados:
- **Clara:** La Ovotransferrina (Conalbúmina) desnaturaliza a **$61.5^\circ\text{C}$** formando un gel blando; la Ovoalbúmina (proteína mayoritaria, $54\%$) no coagula firmemente hasta los **$84.5^\circ\text{C}$**.
- **Yema:** La Lipovitelina y fosfoproteínas desnaturalizan e incrementan su viscosidad progresivamente entre **$63.0^\circ\text{C}$ y $65.0^\circ\text{C}$**.

```
PROCESOS TÉCNICOS DE COCCIÓN SOUS-VIDE PARA HUEVOS (Calibre L: 63-73 g)
========================================================================================================
Objetivo Culinario / Seguridad   Temperatura     Tiempo       Estado de Clara     Estado de Yema
--------------------------------------------------------------------------------------------------------
Pasteurización en Cáscara (5D)   57.0°C          75 - 90 min  Líquida cruda       Líquida cruda
(Conserva funcionalidad batido)  58.0°C          60 - 75 min  Líquida traslúcida  Líquida natural

Huevo Onsen Tamago Clásico       63.5°C          45 - 60 min  Gel lechoso suave   Crema densa fundente
(Equilibrio japonés perfecto)

Huevo Poché / Mollet Texturizado 64.5°C          45 min       Gel semi-coagulado  Pasta untable rica

Yema Confitada / Textura Flan    65.5°C          45 - 60 min  Cuajada tierna      Firme / Moldeable
========================================================================================================
```

---

### 3.6 Vegetales, Frutas y Tubérculos — Degradación de Protopectinas a $\ge 83^\circ\text{C}-85^\circ\text{C}$

La pared celular vegetal está compuesta por microfibrillas de celulosa embebidas en una matriz de hemicelulosa y **protopectinas** (sales de ácido péctico insolubles).
- A temperaturas $< 80^\circ\text{C}$, la reacción de $\beta$-eliminación que despolimeriza los enlaces glucosídicos pécticos no se activa. Los vegetales cocinados a $70^\circ\text{C}$ permanecen crudos y duros incluso tras 24 horas de cocción.
- A partir de **$83.0^\circ\text{C} - 85.0^\circ\text{C}$**, las protopectinas insolubles se hidrolizan a pectinas solubles, liberando las células vegetales y logrando una textura tierna pero crocante (turgente), sin pérdida de almidón ni lixiviación de pigmentos hidrosolubles (clorofilas, antocianinas, carotenoides).
- **Parámetro Estándar TouChef:** Cocción sous-vide de tubérculos (patatas, zanahorias, remolachas) a **$85.0^\circ\text{C} \times 45 - 90\text{ minutos}$** en bolsa con vacío al $99.9\%$ (evitando que flote por micro-burbujas de aire intra-tisular).

---

# 4. PROTOCOLO OBLIGATORIO DE ABATIMIENTO TÉRMICO INMEDIATO (COOK-CHILL-FREEZE)

```
+---------------------------------------------------------------------------------------------------+
|                         PROTOCOLO ESTRICTO DE ABATIMIENTO TOUCHEF (COOK-CHILL)                    |
|                                                                                                   |
|    [ COCCIÓN / PASTEURIZACIÓN SOUS-VIDE: T_núcleo >= 55°C - 85°C ]                                |
|                                   |                                                               |
|                                   v                                                               |
|    [ EXTRACCIÓN INMEDIATA DE LA CUBA E INMERSIÓN EN BAÑO HIELO/AGUA 50:50 CON AGITACIÓN ]         |
|    -----------------------------------------------------------------------------------------      |
|    |  Composición: 50% Hielo en escamas / 50% Agua líquida (T_baño = 0.0°C a +1.0°C)       |      |
|    |  Transferencia convectiva forzada líquida: h >= 1000 W/m²·K                            |      |
|    |                                                                                       |      |
|    |       54.4°C ===== CRUCE CRÍTICO: VENTANA GERMINACIÓN C. perfringens =====> <= 4.0°C   |      |
|    |                       (TIEMPO MÁXIMO ESTRICTO: < 90 MINUTOS)                          |      |
|    -----------------------------------------------------------------------------------------      |
|                                   |                                                               |
|                  +----------------+----------------+                                              |
|                  |                                 |                                              |
|                  v                                 v                                              |
|   [ REFRIGERACIÓN ULTRA-CONTROLADA ]      [ CONGELACIÓN RÁPIDA ]                                  |
|   T = +1.5°C a +2.5°C (Máx. 28 días)      T <= -18.0°C (Hasta 12 meses)                           |
+---------------------------------------------------------------------------------------------------+
```

### 4.1 Biofísica del Enfriamiento Forzado y la Regla de los 90 Minutos

El mayor riesgo biológico en los procesos *Cook-Chill* (Cocinar y Enfriar) no radica en las bacterias vegetativas (ya destruidas en la pasteurización), sino en la **germinación de esporas supervivientes** de *Clostridium perfringens* y *Bacillus cereus*.

- Entre **$50.0^\circ\text{C}$ y $35.0^\circ\text{C}$**, el tiempo de duplicación de *C. perfringens* es de apenas **$7.1\text{ a } 10\text{ minutos}$**.
- Si un paquete cocinado se deja enfriar a temperatura ambiente o se introduce directamente en una nevera convencional saturada (donde el aire quieto tiene $h \approx 10\ \text{W}/(\text{m}^2\cdot\text{K})$), el centro térmico tarda entre 4 y 8 horas en descender por debajo de $12^\circ\text{C}$. Esto permite que una única espora germine y alcance poblaciones tóxicas ($> 10^6\ \text{UFC}/\text{g}$).

> **REGLA TÉCNICA INQUEBRANTABLE TOUCHEF (P0):**  
> Tras finalizar la pasteurización, la bolsa sellada **debe ser sumergida instantáneamente** en un baño de agua y hielo agitado para hacer descender la temperatura del centro geométrico **desde $> 54.4^\circ\text{C}$ hasta $\le 4.0^\circ\text{C}$ en un tiempo estrictamente inferior a 90 minutos** (óptimo $< 45\text{ min}$).

---

### 4.2 Dinámica de Fluidos del Baño de Agua y Hielo 50/50

- **Termodinámica del Hielo vs. Agua Líquida:** El hielo sólido en cubos tiene puntos de contacto microscópicos y aire intersticial ($h \approx 50\ \text{W}/(\text{m}^2\cdot\text{K})$). Un baño que contenga **solo hielo enfría un $80\%$ más lento** que una mezcla bifásica con agua.
- **La Mezcla 50:50:** La presencia de agua líquida fría en contacto continuo con la superficie plástica maximiza el coeficiente de transferencia convectiva ($h \ge 1.000\ \text{W}/(\text{m}^2\cdot\text{K})$), mientras el calor latente de fusión del hielo ($\Delta H_{\text{fusión}} = 334\ \text{kJ}/\text{kg}$) absorbe la energía térmica liberada por el alimento manteniendo el baño a $0.0^\circ\text{C} - 1.0^\circ\text{C}$ constante.
- **Agitación forzada:** Se debe remover periódicamente el agua o utilizar un circulador para destruir la capa límite térmica laminar alrededor de las bolsas.

---

### 4.3 Tabla de Tiempos de Abatimiento por Espesor y Geometría

*Tiempo de inmersión en baño de agua/hielo 50/50 agitado ($0.5^\circ\text{C}$) requerido para reducir la temperatura del centro de $60.0^\circ\text{C} - 70.0^\circ\text{C}$ a $\le 4.0^\circ\text{C}$ (Modelo Baldwin).*

| Grosor del Alimento (mm) | Placa Plana / Losa (Lomo, Filete) | Cilindro / Redondo (Rulo, Relleno) | Esfera (Albóndiga, Huevo) |
| :--- | :--- | :--- | :--- |
| **$10\text{ mm}$** | $7\text{ min}$ | $5\text{ min}$ | $4\text{ min}$ |
| **$20\text{ mm}$** | $22\text{ min}$ | $15\text{ min}$ | $11\text{ min}$ |
| **$30\text{ mm}$** | $45\text{ min}$ | $30\text{ min}$ | $22\text{ min}$ |
| **$40\text{ mm}$** | **$70\text{ min}$** | $48\text{ min}$ | $35\text{ min}$ |
| **$50\text{ mm}$** | **$100\text{ min}$** *(Dividir corte)* | $65\text{ min}$ | $50\text{ min}$ |
| **$60\text{ mm}$** | **$140\text{ min}$** *(No conforme Cook-Chill)* | **$90\text{ min}$** | $65\text{ min}$ |

> **ALERTA DE DISEÑO OPERATIVO:** Todo corte destinado a *Cook-Chill* con almacenamiento en frío superior a 48 horas **no debe superar un grosor máximo de 45 mm**. Si la pieza mide $\ge 50\text{ mm}$, debe porcionarse antes del envasado o abatirse en abatidor de temperatura profesional de chorro criogénico.

---

# 5. PREVENCIÓN CRÍTICA DE BOTULISMO EN ALMACENAMIENTO AL VACÍO

### 5.1 El Vector Psicrótrofo: *Clostridium botulinum* Tipo No Proteolítico

*Clostridium botulinum* se clasifica en dos grupos fisiológicos de alto impacto bromatológico:

```
COMPARATIVA DE GRUPOS DE CLOSTRIDIUM BOTULINUM
========================================================================================================
Parámetro                        Grupo I (Proteolítico: A, B, F)        Grupo II (No Proteolítico: B, E, F)
--------------------------------------------------------------------------------------------------------
Temperatura mínima de crecimiento: +10.0°C a +12.0°C                    +3.0°C a +3.3°C  <-- RIESGO CRÍTICO
Termorresistencia de Esporas (D):  D_121°C = 0.1 - 0.25 min             D_82.2°C = 1.5 min / D_90°C = 1.2 min
                                   (Requiere Autoclave 121°C)           (Inactivables a 90°C x 10 min)
Producción de Gas / Olor fétido:   SÍ (Putrefacción visible)            NO (Sin alteración organoléptica)
Toxina Producida:                  Neurotoxina Tipo A, B, F (Letal)     Neurotoxina Tipo B, E, F (Letal)
Hábito Ecológico Primario:         Suelos, Carnes terrestres            Pescados, Ambientes marinos, Suelos
========================================================================================================
```

> **EL PELIGRO SILENCIOSO:** El Grupo II no produce proteólisis visible (no infla la bolsa ni genera olores sulfurosos). Un paquete de salmón o carne pasteurizado a $60^\circ\text{C}$ y almacenado a $+4.5^\circ\text{C}$ en una nevera defectuosa puede contener una dosis letal de neurotoxina botulínica manteniendo un aroma y apariencia absolutamente frescos.

---

### 5.2 Tecnología de Obstáculos (*Hurdle Technology*) de Leistner Aplicada

Para garantizar seguridad total frente a *Clostridium botulinum* en bolsas sous-vide selladas, debe implementarse **al menos una** de las siguientes barreras físico-químicas primarias:

```
                  MATRIZ DE BARRERAS PRIMARIAS DE LEISTNER
                  
  [ TRATAMIENTO TÉRMICO ]      [ pH ÁCIDO ]      [ ACTIVIDAD AGUA ]      [ TEMPERATURA CONTROL ]
       >= 90°C x 10 min         pH < 4.60            aw <= 0.920            T <= +2.5°C
       (Inactiva esporas        (Inhibe germin.      (Inhibe germin.        (Inhibe crecimiento
        Grupo II - 6D)           todas cepas)         Grupo I y II)          Grupo II psicrótrofo)
             |                        |                    |                     |
             +------------------------+--------------------+---------------------+
                                              |
                                              v
                              INHIBICIÓN ABSOLUTA DE BOTULISMO
```

1. **Barrera Térmica Esporicida:** Tratamiento térmico mínimo en el núcleo de **$90.0^\circ\text{C}$ durante $10\text{ minutos}$** (o letalidad equivalente $6D$ de esporas Grupo II: ej. $85.0^\circ\text{C} \times 52\text{ min}$).
2. **Barrera de Acidificación:** pH final de la matriz alimentaria $\le 4.60$ homogéneo (medición con electrodo calibrado).
3. **Barrera de Actividad de Agua / Concentración Salina:** $a_w \le 0.920$ o concentración de cloruro sódico ($\text{NaCl}$) en fase acuosa $\ge 3.5\%$.
4. **Barrera de Cadena de Frío Estricta:** Mantenimiento de la temperatura del alimento $\le +2.5^\circ\text{C}$ de manera ininterrumpida durante toda la vida útil.

---

### 5.3 Matriz de Vida Útil Segura en Refrigeración y Congelación

*Directrices de la Agencia de Normas Alimentarias (UK FSA), Janby Kitchen Research y Comité ACMSF:*

| Régimen Térmico de Almacenamiento | Vida Útil Máxima Segura | Condición Requerida |
| :--- | :--- | :--- |
| **Temperatura ambiente ($> 10.0^\circ\text{C}$)** | **$0\text{ horas}$** | **Prohibido.** Riesgo inminente de germinación bacteriana y botulismo. |
| **Refrigeración estándar ($+4.0^\circ\text{C} \text{ a } +7.0^\circ\text{C}$)** | **$\le 10\text{ días}$** | Pasteurización $6D/7D$ estándar + Abatimiento $\le 90\text{ min}$. |
| **Refrigeración controlada ($+1.0^\circ\text{C} \text{ a } +2.5^\circ\text{C}$)** | **$\le 28 - 30\text{ días}$** | Control por datalogger continuo. Inhibe *C. botulinum* Tipo II. |
| **Congelación comercial ($\le -18.0^\circ\text{C}$)** | **Hasta $12\text{ meses}$** | Detención metabólica microbiológica total. Estabilidad organoléptica. |

---

### 5.4 Termolabilidad y Neutralización de la Neurotoxina en Regeneración

Aunque las esporas bacterianas son termorresistentes, la **neurotoxina botulínica preformada (complejo proteico de $\approx 150\text{ kDa}$) es altamente termolábil**:
- Se desnaturaliza y neutraliza completamente al alcanzar una temperatura interna de:
  - **$\ge 85.0^\circ\text{C}$ durante al menos $5\text{ minutos}$**, o
  - **$\ge 80.0^\circ\text{C}$ durante al menos $10\text{ minutos}$**, o
  - **Ebullición activa ($100.0^\circ\text{C}$) durante $1\text{ minuto}$**.

> **Protocolo de Regeneración Segura para TouChef:**  
> Cuando un producto almacenado en refrigeración durante más de 10 días se vaya a regenerar para consumo, si no se puede garantizar la cadena de frío a $\le 2.5^\circ\text{C}$, el proceso de regeneración térmica debe llevar el núcleo del alimento a $\ge 80.0^\circ\text{C}$ antes de servir, o consumirse inmediatamente tras regeneración térmica controlada si se mantuvo el estándar de datalogger ininterrumpido.

---

# 6. PLAN DE ANÁLISIS DE PELIGROS Y PUNTOS DE CONTROL CRÍTICO (APPCC / HACCP)

```
========================================================================================================================
FASE DEL PROCESO        PCC / PC   PELIGRO IDENTIFICADO              LÍMITE CRÍTICO             VIGILANCIA / ACCIÓN CORREC.
========================================================================================================================
1. Acondicionado y      PC 1       Contaminación cruzada /            Tiempo fuera de frío       Cronómetro digital.
   Porcionado                      Proliferación de S. aureus        < 30 min (T < 12°C).       Si T > 12°C, re-enfriar antes
                                                                     Espesor máx <= 45 mm.      de envasar.
------------------------------------------------------------------------------------------------------------------------
2. Envasado al Vacío    PCC 1      Presencia de micro-oxígeno        Vacío manométrico          Inspección visual de sellado.
                                   y bolsas defectuosas              >= 99.5% (P <= 10 mbar).   Repetir bolsa si hay arrugas
                                                                     Soldadura doble intacta.   o fugas de aire.
------------------------------------------------------------------------------------------------------------------------
3. Pasteurización       PCC 2      Supervivencia de patógenos        Cumplimiento estricto      Sonda termométrica calibrada
   en Baño de Agua                 vegetativos (Listeria, Salmon.)   de Tablas Maestras 6D/7D.  en baño (+/- 0.1°C). Si se
                                                                     T_baño >= 55.0°C const.    corta energía, re-pasteurizar.
------------------------------------------------------------------------------------------------------------------------
4. Abatimiento Térmico  PCC 3      Germinación de esporas de         Descenso de >54°C a        Sonda en corazón de muestra testigo.
   Inmediato                       C. perfringens y B. cereus        < 4.0°C en < 90 minutos    Añadir más hielo y agitación si
                                                                     en baño hielo 50/50.       la curva supera los 60 min.
------------------------------------------------------------------------------------------------------------------------
5. Almacenamiento en    PCC 4      Germinación y toxigénesis         T_cámara <= +2.5°C         Datalogger IoT con alarma acústica.
   Cámara / Frío                   de C. botulinum Grupo II          (ó T <= +4.0°C <= 10 d).   Desechar lote si T > 5.0°C
                                                                                                durante más de 4 horas continuas.
========================================================================================================================
```

---

## 📚 BIBLIOGRAFÍA Y REFERENCIAS CIENTÍFICAS DE HOMOLOGACIÓN
1. **Baldwin, D. E. (2012).** *Sous vide cooking: A review.* International Journal of Gastronomy and Food Science, 1(1), 15-30.
2. **Food and Drug Administration (FDA). (2022).** *Food Code 2022: Annex 3 - Public Health Reasons / Administrative Guidelines.* U.S. Public Health Service.
3. **USDA-FSIS. (2021).** *FSIS Cooking Guideline for Meat and Poultry Products (Revised Appendix A).* United States Department of Agriculture Food Safety and Inspection Service.
4. **Advisory Committee on the Microbiological Safety of Food (ACMSF). (2020).** *Report on the Non-proteolytic Clostridium botulinum and Sous Vide Processed Foods.* UK Food Standards Agency (FSA).
5. **Agencia Española de Seguridad Alimentaria y Nutrición (AESAN). (2022).** *Informe del Comité Científico de la AESAN sobre las condiciones de seguridad para la cocción a baja temperatura de alimentos.* Revista del Comité Científico de la AESAN, Nº 35.
6. **Janby Digital Kitchen Research Lab. (2024).** *Thermodynamic Modeling of Thermal Transfer and Core Temperature Prediction in Immersion Water Baths.* Technical Whitepaper Series.
7. **Leistner, L. (2000).** *Basic aspects of food preservation by hurdle technology.* International Journal of Food Microbiology, 55(1-3), 181-186.
