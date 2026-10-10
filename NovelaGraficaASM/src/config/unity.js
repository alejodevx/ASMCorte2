/**
 * Configuración de la novela gráfica exportada desde Unity (WebGL).
 *
 * CÓMO INTEGRAR TU BUILD:
 * 1. En Unity: File ▸ Build Settings ▸ WebGL ▸ Build. Usa como nombre de carpeta/producto
 *    el valor de `buildName` (por defecto "NovelaCali").
 * 2. Copia el contenido de la carpeta `Build/` generada a `public/unity/Build/`
 *    (y `StreamingAssets/` a `public/unity/StreamingAssets/` si existe).
 * 3. Si en Player Settings ▸ Publishing Settings usas compresión Gzip o Brotli,
 *    cambia `compression` a '.gz' o '.br' y activa "Decompression Fallback"
 *    (o configura los encabezados Content-Encoding en tu servidor).
 * 4. Añade a tu escena inicial un GameObject llamado igual que `bridgeObject`
 *    con el script `ReactBridge.cs` (ver carpeta /unity-template del repositorio).
 */
const BASE = import.meta.env.BASE_URL

export const UNITY_CONFIG = {
  buildFolder: `${BASE}unity/Build`,
  streamingAssetsUrl: `${BASE}unity/StreamingAssets`,
  buildName: 'NovelaCali',
  compression: '', // '' | '.gz' | '.br'
  companyName: 'UAO - Arquitectura de Sistemas Multimedia',
  productName: 'Nuestra casa compartida',
  productVersion: '0.1.0',
  /** GameObject de Unity que recibe los mensajes enviados desde React. */
  bridgeObject: 'ReactBridge',
  /** Nombre del evento DOM que emite el .jslib de Unity hacia React. */
  eventName: 'unity-event',
}

export const unityFiles = (cfg = UNITY_CONFIG) => {
  const base = `${cfg.buildFolder}/${cfg.buildName}`
  return {
    loaderUrl: `${base}.loader.js`,
    dataUrl: `${base}.data${cfg.compression}`,
    frameworkUrl: `${base}.framework.js${cfg.compression}`,
    codeUrl: `${base}.wasm${cfg.compression}`,
  }
}

