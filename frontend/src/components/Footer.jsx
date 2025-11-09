import { Instagram, Youtube, Linkedin } from "lucide-react";
import { Link } from 'react-router-dom'

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "X (Twitter)", icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>, url: "#" },
    { name: "YouTube", icon: Youtube, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "TikTok", icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" /></svg>, url: "#" }
  ];

  return (
    <footer className="bg-[#C122ED] text-white">
      <div className="w-[90%] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-10 pb-6">
          
          {/* Logo + Social */}
          <div className="lg:col-span-2">
            <h4 className="text-4xl font-bold mb-4 text-white">TuneUp</h4>
            <p className="text-white/90 mb-6 leading-relaxed max-w-lg">
              La mejor forma de descubrir y comprar entradas para conciertos en toda España. Síguenos y no te pierdas nada.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2.5 rounded-full transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Ayuda</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Métodos de pago</a></li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Nosotros</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Historia</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Valores</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Equipo</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

          {/* Explora */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Explora</h4>
            <ul className="space-y-2.5">
              <li><Link to={'/conciertos'} className="text-white/80 hover:text-white transition-colors">Conciertos</Link></li>
              <li><Link to={'/artistas'} className="text-white/80 hover:text-white transition-colors">Artistas</Link></li>
              <li><Link to={'/ciudades'} className="text-white/80 hover:text-white transition-colors">Ciudades</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Condiciones Generales</a>
            <span className="text-white/40 hidden md:inline">•</span>
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Políticas de Privacidad</a>
            <span className="text-white/40 hidden md:inline">•</span>
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Políticas de Cookies</a>
            <span className="text-white/40 hidden md:inline">•</span>
            <a href="#" className="text-white/80 hover:text-white hover:underline transition-colors">Gestionar cookies</a>
          </div>
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} TuneUp. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
