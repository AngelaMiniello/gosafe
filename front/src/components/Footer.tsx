export default function Footer() {
  return (
  <footer className="w-full bg-[#e9e7e4] px-4 sm:px-6 md:px-10 lg:px-20 py-8 sm:py-10 md:py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 items-start">
      
      {/* Marca */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold">GoSafe</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Conecta con la aventura
        </p>
      </div>

      {/* Nosotros */}
      <div className="text-center sm:text-left">
        <h4 className="font-bold mb-3 text-sm sm:text-base">Nosotros</h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Sobre nosotros</li>
          <li>Trabaja con nosotros</li>
        </ul>
      </div>

      {/* Contacto */}
      <div className="text-center sm:text-left">
        <h4 className="font-bold mb-3 text-sm sm:text-base">Contacto</h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Ayuda / FAQ</li>
          <li>Afiliados</li>
        </ul>
      </div>

      {/* Más */}
      <div className="text-center sm:text-left">
        <h4 className="font-bold mb-3 text-sm sm:text-base">Más</h4>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>Términos y condiciones</li>
        </ul>
      </div>

      {/* Redes */}
      <div className="text-center sm:text-left">
        <h4 className="font-bold mb-3 text-sm sm:text-base">Seguinos</h4>

        <div className="flex justify-center sm:justify-start gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow transition hover:scale-105">
f
</div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow text-sm">
            ig
          </div>

          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow text-sm">
            tw
          </div>
        </div>
      </div>
    </div>

    <div className="text-center text-gray-500 text-xs sm:text-sm mt-8 sm:mt-10 leading-relaxed">
      Todos los derechos reservados <br className="sm:hidden" /> GoSafe
    </div>
  </footer>
);
}