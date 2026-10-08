import React from 'react';
import { createWhatsAppLink } from '../utils/whatsapp';
import { MessageCircle, Sparkles, FileText, Phone } from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';

interface MobileStickyBarProps {
  onOpenAiModal: () => void;
  onOpenPriceModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenAiModal,
  onOpenPriceModal,
}) => {
  return (
    <>
      {/* Mobile Sticky Bottom Bar (Visible on mobile screens) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          {/* Button 1: Tarif AC */}
          <button
            onClick={onOpenPriceModal}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition active:scale-95"
          >
            <FileText className="w-4 h-4 text-amber-600 mb-0.5" />
            <span>Tarif AC</span>
          </button>

          {/* Button 2: Tanya AI */}
          <button
            onClick={onOpenAiModal}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 text-[11px] font-bold border border-sky-200 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-sky-600 mb-0.5" />
            <span>Tanya AI</span>
          </button>

          {/* Button 3: WhatsApp Booking */}
          <a
            href={createWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow-md shadow-emerald-600/30 transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4 mb-0.5" />
            <span>Chat WA</span>
          </a>
        </div>
      </div>

      {/* Floating Desktop WhatsApp Button with Ping Animation */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-40">
        <a
          href={createWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-950/20 transition-all hover:scale-105 active:scale-95"
          aria-label="Hubungi WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span>Chat Teknisi ({APP_CONFIG.contact.phoneDisplay})</span>
        </a>
      </div>
    </>
  );
};
