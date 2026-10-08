import React from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { ServicekuLogo } from './ServicekuLogo';
import { createWhatsAppLink } from '../utils/whatsapp';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <ServicekuLogo variant="dark" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md pt-2">
              {APP_CONFIG.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-amber-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>{APP_CONFIG.contact.warrantyTerms}</span>
            </div>
            <div className="pt-1 text-xs text-slate-500">
              Spesialis Pendingin: AC, Kulkas, Showcase, Freezer Box & Mesin Elektronik.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#layanan" className="hover:text-white transition">Service AC & Cuci AC</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">Service Kulkas 1 & 2 Pintu</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">Service Mesin Cuci</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">Service Showcase Minuman</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">Service Freezer Box</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">Service Dispenser Air</a>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Wilayah Panggilan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Indramayu & Sekitarnya</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Cirebon & Sekitarnya</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Majalengka & Sekitarnya</span>
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Kontak & Alamat
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>{APP_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href={`tel:${APP_CONFIG.contact.whatsappRaw}`} 
                  className="hover:text-white transition font-semibold text-slate-200"
                >
                  {APP_CONFIG.contact.phoneDisplay}
                </a>
              </div>
              {APP_CONFIG.contact.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <a href={`mailto:${APP_CONFIG.contact.email}`} className="hover:text-white transition">
                    {APP_CONFIG.contact.email}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{APP_CONFIG.contact.operationalHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat WhatsApp Sekarang</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} {APP_CONFIG.legalName} ({APP_CONFIG.brandName}). Seluruh hak cipta dilindungi.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold py-1 px-3 rounded-lg bg-slate-900 border border-slate-800 transition cursor-pointer"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
