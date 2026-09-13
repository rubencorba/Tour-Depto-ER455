import fachada from "../assets/fachada.webp";

interface LandingProps {
  onEnterTour: () => void;
}

export default function Landing({ onEnterTour }: LandingProps) {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black text-white">
      {/* Imagen de fondo */}
      <img
        src={fachada}
        alt="Fachada del edificio"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay para mejorar la legibilidad del contenido */}
      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />

      {/* Overlay inferior muy sutil */}
      <div className="absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="max-w-3xl">
          {/* Ubicación */}
          <div className="mb-4 flex items-center gap-3 text-sm tracking-[0.2em] text-white/90 sm:mb-5 sm:text-base">
            {/* Pin */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-5.686 7-12a7 7 0 1 0-14 0c0 6.314 7 12 7 12Z"
              />
              <circle cx="12" cy="9" r="2.25" />
            </svg>

            <span>Entre Rios 455</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl font-light leading-[0.95] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            DEPARTAMENTO
          </h1>

          {/* Descripción */}
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/90 sm:mt-6 sm:text-lg md:text-xl">
            Conocé cada rincón de tu próximo hogar.
          </p>

          {/* Características */}
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 text-sm sm:mt-10 sm:gap-x-6 sm:text-base">
            {/* Dormitorios */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6 sm:h-7 sm:w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 11.5h18v7H3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 11.5V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9h4M14 9h4M5 18.5v2M19 18.5v2"
                />
              </svg>

              <span>2 Dormitorios</span>
            </div>

            {/* Separador */}
            <div className="hidden h-7 w-px bg-white/40 sm:block" />

            {/* Baños */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6 sm:h-7 sm:w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 11h14M7 11V6a3 3 0 0 1 5.121-2.121L13.5 5.5M5 11v2a5 5 0 0 0 5 5h4a5 5 0 0 0 5-5v-2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 18v2M16 18v2"
                />
              </svg>

              <span>1 Baño</span>
            </div>

            {/* Separador */}
            <div className="hidden h-7 w-px bg-white/40 sm:block" />

            {/* Superficie */}
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-6 w-6 sm:h-7 sm:w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4l5 5M20 4l-5 5M4 20l5-5M20 20l-5-5"
                />
              </svg>

              <span>85 m²</span>
            </div>
          </div>

          {/* Botón de entrada */}
          <button
            type="button"
            onClick={onEnterTour}
            className="cursor-pointer group mt-9 inline-flex h-14 items-center justify-between gap-8 rounded-full border border-white/80 px-7 text-xs font-medium tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:mt-10 sm:h-16 sm:min-w-75 sm:px-9 sm:text-sm"
          >
            <span>ENTRAR AL TOUR 360°</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}