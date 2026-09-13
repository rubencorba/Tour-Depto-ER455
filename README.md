# Tour Virtual del Departamento

Recorrido virtual 360° de un departamento, construido con React + TypeScript + Vite + Pannellum + Tailwind CSS.

## Puesta en marcha

```bash
npm install
npm run dev
```

## Antes de compilar (`npm run build`)

Este proyecto **no incluye las imágenes reales** — hay que colocarlas manualmente:

- `src/assets/fachada.png` — foto de la puerta de entrada del edificio (landing page).
- `src/assets/panoramas/Living.png`
- `src/assets/panoramas/Banio.png`
- `src/assets/panoramas/Cocina.png`
- `src/assets/panoramas/Dormitorio1.png`
- `src/assets/panoramas/Dormitorio2.png`

Todas las panorámicas deben ser imágenes equirectangulares 360°.

Hasta que esas imágenes no estén, `npm run build` va a fallar al no encontrar los archivos — eso es esperado. Para validar el código sin necesidad de las imágenes, usá:

```bash
npx tsc --noEmit
```

## Estructura del proyecto

```
src/
├── assets/           # fachada.png + panoramas/
├── components/       # PanoramaViewer, RotateDevicePrompt
├── pages/            # Landing (vacía a propósito), Tour
├── data/             # roomsConfig.ts — única fuente de verdad de habitaciones y navegación
├── hooks/            # useOrientation, usePannellumViewer
├── services/         # pannellumService.ts — arma la config de Pannellum a partir de roomsConfig
├── types/            # Room, Hotspot, declaraciones ambientales
├── utils/            # detección de dispositivo/orientación
└── styles/           # Tailwind + estilos de hotspots + safe-area
```

## Landing page

`src/pages/Landing.tsx` se dejó intencionalmente vacía (según lo solicitado). Solo expone
la prop `onEnterTour: () => void` — llamala cuando el usuario elija entrar al tour para
que la app cambie a la vista del recorrido; no hace falta tocar nada más.

## Navegación entre habitaciones

Se define una sola vez en `src/data/roomsConfig.ts` (`ROOM_NAVIGATION`). Los hotspots de
cada panorámica se generan automáticamente a partir de ese grafo — no hay navegación
hardcodeada en ningún componente.

## Rotar el dispositivo

En teléfonos en modo vertical, `RotateDevicePrompt` se muestra automáticamente
(controlado por `useOrientation`) y vuelve a aparecer cada vez que el dispositivo
regresa a modo vertical.
