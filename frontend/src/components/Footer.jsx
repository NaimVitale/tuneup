export default function Footer() {
  return (
    <footer className="bg-[#C122ED] text-white">
      <div className="w-[90%] mx-auto sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-8 py-8">
          {/* Logo + Social */}
          <div className="col-span-1 lg:col-span-2 text-white rounded">
            <h4 className="text-3xl mb-4 font-medium">TuneUp</h4>
            <p className="mb-6 sm:mb-8 w-full sm:w-[80%]">
              La mejor forma de descubrir y comprar entradas para conciertos en toda España. Seguinos y no te pierdas nada.
            </p>
            <ul className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg></li> <li><svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg></li> <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-youtube"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 3a5 5 0 0 1 5 5v8a5 5 0 0 1 -5 5h-12a5 5 0 0 1 -5 -5v-8a5 5 0 0 1 5 -5zm-9 6v6a1 1 0 0 0 1.514 .857l5 -3a1 1 0 0 0 0 -1.714l-5 -3a1 1 0 0 0 -1.514 .857z" /></svg></li> <li><svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" /></svg></li> <li><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg></li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-2xl mb-3 font-medium">Ayuda</h4>
            <ul className="flex flex-col gap-2">
              <li>FAQs</li>
              <li>Contacto</li>
              <li>Términos y condiciones</li>
              <li>Métodos de pago</li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-2xl mb-3 font-medium">Nosotros</h4>
            <ul className="flex flex-col gap-2">
              <li>Historia</li>
              <li>Valores</li>
            </ul>
          </div>

          {/* Explora */}
          <div>
            <h4 className="text-2xl mb-3 font-medium">Explora</h4>
            <ul className="flex flex-col gap-2">
              <li>Entradas</li>
              <li>Artistas</li>
              <li>Ciudades</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white mt-6 mb-4"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 gap-4 sm:gap-0">
          <div>
            <ul className="flex flex-col sm:flex-row gap-2 sm:gap-3 font-medium">
              <li>Condiciones Generales</li>
              <li className="hover:underline">Políticas de Privacidad</li>
              <li className="hover:underline">Políticas de Cookies</li>
              <li className="hover:underline">Gestionar mis cookies</li>
            </ul>
          </div>
          <div className="font-medium text-start sm:text-end">
            &copy; {new Date().getFullYear()} TuneUp. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
