# Nuestra casa compartida: Cali frente a los desastres naturales

Aplicación web (React + Vite) del curso **Arquitectura de Sistemas Multimedia** – Universidad Autónoma de Occidente (UAO).

Incluye un **mapa navegable de Cali** con las zonas más expuestas a **inundaciones, terremotos e incendios forestales**,
diferenciadas por nivel de amenaza (bajo, medio, alto), la **temporada crítica** del año, **puntos de encuentro** y
**rutas de evacuación**. Desde el mapa se accede a los **capítulos** de la novela gráfica hecha en **Unity (WebGL)**.

## Ejecutar

```bash
npm install
npm run dev      # desarrollo → http://localhost:5173
npm run build    # producción → carpeta dist/
npm run preview  # previsualizar el build
```

## Estructura

```
src/
├─ theme.js                  Tema Material Design con colores UAO y Roboto Light
├─ App.jsx                   Rutas (HashRouter)
├─ config/unity.js           ⚙️ Configuración del build de Unity
├─ data/
│  ├─ phenomena.js           Fenómenos, niveles, temporadas, medidas antes/durante/después
│  ├─ zones.js               Polígonos de zonas de amenaza
│  ├─ meetingPoints.js       Puntos de encuentro y rutas de evacuación
│  └─ chapters.js            Capítulos de la novela y progreso
├─ components/
│  ├─ Layout.jsx             Barra superior con logo UAO, menú responsive y pie
│  ├─ map/                   RiskMap (Leaflet), leyenda, detalle de zona, franja de temporada
│  └─ unity/UnityPlayer.jsx  Cargador del build WebGL + puente React ↔ Unity
└─ pages/                    Inicio, Mapa, Capítulos, Capítulo, Novela, Acerca de
public/
├─ brand/                    Logotipos UAO
└─ unity/Build/              👉 Aquí va el build WebGL de Unity
unity-template/              Scripts para tu proyecto de Unity (ReactBridge.cs + .jslib)
```

## Integrar la novela de Unity

Consulta [`unity-template/README.md`](unity-template/README.md). En resumen:

1. Copia `ReactBridge.cs` y `ReactBridge.jslib` a tu proyecto de Unity y crea el GameObject `ReactBridge`.
2. Exporta para WebGL con el nombre `NovelaCali`.
3. Copia la carpeta `Build/` a `public/unity/Build/`.
4. La sección **Novela** detecta el build automáticamente y abre el capítulo elegido en el mapa.

## Reemplazar los datos del mapa

Las geometrías de `src/data/zones.js` y `src/data/meetingPoints.js` son **aproximadas** (fines académicos).
Reemplázalas con capas oficiales (GeoJSON) de:

- [Datos Abiertos Cali / IDESC](https://datos.cali.gov.co)
- [Servicio Geológico Colombiano](https://www.sgc.gov.co) – microzonificación sísmica
- [IDEAM](https://www.ideam.gov.co)

Cada zona solo necesita `phenomenon`, `level`, `name`, `area`, `description`, `meetingPoints` y `coords` (`[lat, lng]`).

## Identidad visual

- Material Design 3 mediante [MUI](https://mui.com), íconos de línea (*Outlined*).
- Fuente **Roboto Light (300)**.
- Colores sólidos UAO: rojo `#D91F26`, rojo oscuro `#AE002D`, gris carbón `#32373C`, blanco.

## Licencias

- Código: **MIT** (ver `LICENSE`).
- Recursos multimedia propios: **CC BY 4.0**.
- Cartografía © OpenStreetMap contributors (ODbL).
- Logotipo UAO: propiedad de la Universidad Autónoma de Occidente, uso académico.
