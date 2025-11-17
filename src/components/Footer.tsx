import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const element = document.querySelector(path === '#hero' ? 'main' : path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-navy dark:bg-navy-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Robo Surge logo"
                className="h-12 w-auto transition-transform group-hover:scale-105"

                //className="h-12 w-auto object-contain p-2 bg-white/5 dark:bg-white/5 border border-white/10 shadow-sm"
              />
              <span className="sr-only">Robo Surge</span>
            </div>
            <p className="text-white/80 text-sm">
              AI Automation & Smart Workflows for Modern Businesses
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="text-white/80 hover:text-white transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="text-white/80 hover:text-white transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="text-white/80 hover:text-white transition-colors text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="text-white/80 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="text-white/80 hover:text-white transition-colors text-sm">
                  AI Automation
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="text-white/80 hover:text-white transition-colors text-sm">
                  Workflow Automation
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection(e, '#services')} className="text-white/80 hover:text-white transition-colors text-sm">
                  AI Tools Suite
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="h-4 w-4" />
                <a href="mailto:robosurge.automation@gmail.com" className="hover:text-white transition-colors">
                  robosurge.automation@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="h-4 w-4" />
                <a href="tel:+923213891041" className="hover:text-white transition-colors">
                  +92 321 3891041
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Linkedin className="h-4 w-4" />
                <a
                  href="https://www.linkedin.com/in/robo-surge-638a09398/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Twitter className="h-4 w-4" />
                <a
                  href="https://x.com/Robo_Surge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @Robo_Surge
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; {currentYear} Robo Surge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
