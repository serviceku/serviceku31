import React from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { 
  ShieldCheck, 
  UserCheck, 
  Clock, 
  Cpu, 
  CheckCircle,
  ThumbsUp,
  Award
} from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-amber-500" />,
    UserCheck: <UserCheck className="w-8 h-8 text-sky-500" />,
    Clock: <Clock className="w-8 h-8 text-emerald-500" />,
    Cpu: <Cpu className="w-8 h-8 text-indigo-500" />
  };

  return (
    <section id="keunggulan" className="py-16 sm:py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>STANDAR LAYANAN SERVICEKU</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengapa Ribuan Keluarga & Pelaku Usaha Memilih Kami?
          </h2>
          <p className="mt-3.5 text-slate-600 text-base sm:text-lg">
            Kami menjamin rasa tenang dengan teknisi yang ramah, transparan, dan tidak pernah membebani biaya siluman.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {APP_CONFIG.advantages.map((adv, idx) => (
            <div
              key={adv.id}
              className="group relative bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[adv.icon] || <CheckCircle className="w-8 h-8 text-sky-500" />}
                  </div>
                  <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-800 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                    {adv.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-sky-700 transition-colors">
                  {adv.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>

              {/* Bottom Subtle Accent */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <ThumbsUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 transition" />
                <span>Pilar Mutu #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Garansi Resmi */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-400/20 rounded-xl border border-amber-400/30 flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">
                Garansi 30 Hari: Perbaikan Ulang Tanpa Biaya Teknisi
              </h4>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Setiap invoice atau kwitansi pengerjaan kami sertakan garansi resmi 1 bulan untuk kerusakan dan suku cadang yang sama. Kepuasan Anda adalah prioritas utama Serviceku.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
              100% Proteksi Konsumen
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
