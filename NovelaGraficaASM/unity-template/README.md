# Plantilla de integración Unity ↔ React

Esta carpeta contiene lo necesario para que la novela hecha en Unity se comunique con la web.

## 1. Copiar a tu proyecto de Unity

| Archivo de esta carpeta | Destino en Unity |
|---|---|
| `Assets/Plugins/WebGL/ReactBridge.jslib` | `Assets/Plugins/WebGL/` |
| `Assets/Scripts/ReactBridge.cs` | `Assets/Scripts/` |

En la **escena inicial** crea un GameObject vacío llamado exactamente **`ReactBridge`** y añádele el script `ReactBridge.cs`.
En el Inspector, relaciona cada capítulo con su escena (`Cap1_Inundacion`, `Cap2_Terremoto`, `Cap3_Incendio`).
Agrega esas escenas en *File ▸ Build Settings*.

## 2. Comunicación

**React → Unity** (automático): al abrir `/#/novela?capitulo=incendio` la web llama a
`ReactBridge.LoadChapter("incendio")`.

**Unity → React** (desde tus scripts):

```csharp
ReactBridge.ChapterCompleted("incendio"); // marca el capítulo como completado en la web
ReactBridge.OpenMap("incendio");          // vuelve al mapa filtrado por incendios
ReactBridge.OpenChapterInfo("incendio");  // abre la guía "¿Cómo actuar?"
```

## 3. Exportar para WebGL

1. *File ▸ Build Settings ▸ WebGL ▸ Switch Platform*.
2. *Player Settings ▸ Product Name*: `NovelaCali` (o cambia `buildName` en `src/config/unity.js`).
3. *Player Settings ▸ Resolution and Presentation*: plantilla **Minimal** (la web ya aporta la interfaz).
4. *Publishing Settings ▸ Compression Format*:
   - **Disabled** → `compression: ''` (lo más sencillo para pruebas locales), o
   - **Gzip** → `compression: '.gz'` y activa **Decompression Fallback**.
5. *Build* y copia:
   - `Build/*` → `public/unity/Build/`
   - `StreamingAssets/*` (si existe) → `public/unity/StreamingAssets/`
6. Ejecuta `npm run dev` y abre la sección **Novela**.

## 4. Responsive

En *Player Settings ▸ Resolution* desactiva "Run in background" si no lo necesitas y usa un **Canvas Scaler**
con *Scale With Screen Size* (referencia 1920×1080, *Match* 0.5) para que la UI se adapte a móviles y escritorio.

Para mantener la unidad visual, usa en Unity: Roboto Light, los colores `#D91F26` (rojo UAO), `#AE002D`, `#32373C`
y blanco, botones redondeados sin degradados e íconos de línea de [Material Symbols](https://fonts.google.com/icons) (estilo *Outlined*).

