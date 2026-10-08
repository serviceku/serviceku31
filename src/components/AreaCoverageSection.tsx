import React from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { MapPin, Navigation, Clock, CheckCircle2, Phone } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

export const AreaCoverageSection: React.FC = () => {
  return (
    <section id="wilayah" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>CAKUPAN WILAYAH PANGGILAN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Teknisi Kami Siap Meluncur ke Lokasi Anda
          </h2>
          <p className="mt-3.5 text-slate-600 text-base sm:text-lg">
            Tidak perlu repot angkat barang berat. Cukup hubungi kami, teknisi Serviceku langsung datang ke rumah, ruko, toko, atau kantor Anda.
          </p>
        </div>

        {/* 3 City Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {APP_CONFIG.contact.areas.map((area, idx) => (
            <div
              key={idx}
              className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-sky-600">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Siap Datang
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  Wilayah {area.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {area.desc}
                </p>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200/80 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Waktu Kedatangan: 30 - 90 Menit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Perbaikan Langsung di Tempat</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Garansi 1 Bulan Berlaku Sama</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <a
                  href={createWhatsAppLink({ city: area.name, problem: `Saya di area ${area.name} butuh teknisi panggilan` })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-sky-600 hover:text-white text-slate-800 font-bold text-xs border border-slate-200 hover:border-sky-600 flex items-center justify-center gap-1.5 transition"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Panggil Teknisi ke {area.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Address & Workshop Card */}
        <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-sky-500/20 rounded-xl border border-sky-400/30 text-sky-400 flex-shrink-0">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                Pusat Operasional & Bengkel
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {APP_CONFIG.contact.address}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Melayani booking panggilan online setiap hari (07.30 - 20.00 WIB)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href={`tel:${APP_CONFIG.contact.whatsappRaw}`}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>Telepon Langsung</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
