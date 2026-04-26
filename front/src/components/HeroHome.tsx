export default function HeroHome() {
  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* FONDO VERDE FULL WIDTH */}
      <div
  className="
  hidden md:block
    absolute right-0 top-0
    w-[70%] h-[400px]
    md:w-[60%] md:h-[500px]
    lg:w-[50%]
    bg-[url('/greenBlob.png')]
    bg-no-repeat bg-contain
    pointer-events-none
  "
/>

      {/* CONTENIDO CENTRADO */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 lg:py-20 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 lg:gap-10">

        {/* TEXTO */}
        <div className="w-full md:w-[55%] lg:w-[45%] max-w-xl text-center md:text-left shrink-0">
          <p className="font-poppins font-semibold text-amber-600 tracking-wide text-xs sm:text-sm md:text-base">
            ENCUENTRA LOS MEJORES INSTRUCTORES
          </p>

          <h1 className="font-manjari text-4xl sm:text-5xl md:text-6xl text-gray-900 mt-3 sm:mt-4 leading-tight">
            Viaja, disfruta <br />
            y mantente seguro
          </h1>

          <p className="font-manjari text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 leading-relaxed">
            Vuélvete parte de nuestra comunidad, <br />
            conéctate con instructores apasionados <br />
            y experiencias inolvidables.
          </p>

          <button className="mt-6 sm:mt-8 bg-[#F2B705] active:bg-amber-400 hover:bg-[#CA8A04] text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow">
            Descubre más
          </button>
        </div>

        {/* IMAGEN */}
        <div className="hidden md:flex relative z-10 w-full justify-center lg:justify-end">
        <img
          src="/Person1.png"
          alt="Person"
          className="relative max-h-[520px]"
        />
        </div>

      </div>

    </section>
  );
}