// pannellum's package only ships build/pannellum.js (a plain global script,
// no ES module exports). @types/pannellum declares the resulting
// `window.pannellum` / `window.libpannellum` globals; this just allows the
// side-effect import itself to resolve under TypeScript.
declare module 'pannellum/build/pannellum.js';
