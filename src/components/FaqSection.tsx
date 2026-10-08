import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>PERTANYAAN UMUM (FAQ)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hal yang Sering Ditanyakan Pelanggan
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Informasi lengkap seputar prosedur panggilan, biaya, waktu kedatangan, dan klaim garansi.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {APP_CONFIG.faq.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-600 transition cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-600 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 bg-sky-50 text-sky-600' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Punya kendala elektronik lain yang belum terjawab?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Konsultasikan langsung dengan teknisi kami via chat WhatsApp sekarang.
            </p>
          </div>
          <a
            href={createWhatsAppLink({ problem: 'Saya ingin konsultasi kerusakan elektronik' })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat CS Teknisi</span>
          </a>
        </div>

      </div>
    </section>
  );
};
