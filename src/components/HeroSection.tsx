import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { SafeImage } from './SafeImage';
import { createWhatsAppLink } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  Sparkles, 
  MessageCircle, 
  MapPin, 
  Wrench, 
  ChevronRight, 
  Star, 
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAiModal: () => void;
  onOpenPriceModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiModal, onOpenPriceModal }) => {
  const [selectedAppliance, setSelectedAppliance] = useState('AC');
  const [selectedCity, setSelectedCity] = useState('Indramayu');
  const [problemBrief, setProblemBrief] = useState('');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    const link = createWhatsAppLink({
      appliance: selectedAppliance,
      city: selectedCity,
      problem: problemBrief || 'Perlu pengecekan teknisi panggilan di lokasi'
    });
    window.open(link, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Subtle luxury ambient lights & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(2,132,199,0.25),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>GARANSI SERVICE 1 BULAN UNTUK KERUSAKAN YANG SAMA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Jasa Service Elektronik <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
                Profesional Panggilan
              </span>
            </h1>

            {/* Subheading / Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Melayani Perbaikan <strong className="text-white font-semibold">AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser</strong>. 
              Teknisi jujur, cepat & langsung datang ke rumah Anda di <span className="text-sky-300 font-semibold underline decoration-sky-500/40">Indramayu, Cirebon, & Majalengka</span>.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Teknisi Jujur</div>
                  <div className="text-[11px] text-slate-400 leading-tight">Amanah & ramah</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Langsung Datang</div>
                  <div className="text-[11px] text-slate-400 leading-tight">Panggilan hari ini</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white leading-tight">Sparepart Ori</div>
                  <div className="text-[11px] text-slate-400 leading-tight">Kualitas terbaik</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 justify-center lg:justify-start">
              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all active:scale-95 group"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Panggil Teknisi via WhatsApp</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </a>

              <button
                onClick={onOpenAiModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Konsultasi AI (Gratis)</span>
              </button>

              <button
                onClick={onOpenPriceModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-amber-300 font-semibold text-xs border border-amber-500/30 transition cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Tarif AC Rp 75rb</span>
              </button>
            </div>

            {/* Social Proof Star Rating */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span><strong>4.9 / 5.0</strong> dari 850+ pelanggan di Wilayah 3 Cirebon</span>
            </div>
          </div>

          {/* Right Column: Interactive Quick Booking Card & Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-900 border border-slate-100">
              {/* Header Box */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                    Layanan Prioritas
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    Booking Panggilan Teknisi
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
                  <Wrench className="w-5 h-5 text-amber-600" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleQuickBook} className="mt-5 space-y-4">
                {/* Appliance Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Jenis Peralatan Elektronik:
                  </label>
                  <select
                    value={selectedAppliance}
                    onChange={(e) => setSelectedAppliance(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none focus:bg-white transition"
                  >
                    <option value="AC (Air Conditioner)">AC (Cuci, Pasang, Freon, Modul)</option>
                    <option value="Kulkas (1 Pintu, 2 Pintu, Side by Side)">Kulkas (Tidak Dingin, Freon, Defrost)</option>
                    <option value="Mesin Cuci (Front / Top Loading)">Mesin Cuci (Mati, Dinamo, Tidak Berputar)</option>
                    <option value="Showcase Pendingin Minuman">Showcase Minuman Toko / Cafe</option>
                    <option value="Freezer Box (Pembeku Daging / Es)">Freezer Box (Beku Tidak Rata, Freon)</option>
                    <option value="Dispenser (Galon Atas & Bawah)">Dispenser Air Panas & Dingin</option>
                  </select>
                </div>

                {/* City Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" />
                    <span>Kota / Wilayah Anda:</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none focus:bg-white transition"
                  >
                    <option value="Indramayu (Kota, Jatibarang, Karangampel, Bondan)">Indramayu & Sekitarnya</option>
                    <option value="Cirebon (Kota, Kedawung, Sumber, Arjawinangun)">Cirebon & Sekitarnya</option>
                    <option value="Majalengka (Kota, Kadipaten, Jatiwangi, Kertajati)">Majalengka & Sekitarnya</option>
                  </select>
                </div>

                {/* Complaint Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Gejala / Kerusakan (Opsional):
                  </label>
                  <input
                    type="text"
                    value={problemBrief}
                    onChange={(e) => setProblemBrief(e.target.value)}
                    placeholder="Contoh: AC kurang dingin, Kulkas bawah mati..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none focus:bg-white transition"
                  />
                </div>

                {/* Submit to WhatsApp */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Kirim & Panggil Teknisi Sekarang</span>
                </button>
              </form>

              {/* Guarantees Footer inside Card */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Garansi 1 Bulan
                </span>
                <span className="flex items-center gap-1 text-sky-700 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Siap Datang Hari Ini
                </span>
              </div>
            </div>

            {/* Decorative Floating Preview Image on the side */}
            <div className="hidden lg:block absolute -bottom-8 -left-12 w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-xl z-20">
              <SafeImage
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop"
                alt="Teknisi Serviceku AC"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
