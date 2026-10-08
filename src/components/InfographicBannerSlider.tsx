import React, { useState, useEffect } from 'react';
import { SafeImage } from './SafeImage';
import { createWhatsAppLink } from '../utils/whatsapp';
import { 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Settings,
  Tag,
  ArrowRight
} from 'lucide-react';

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  serviceName: string;
  tag?: string;
  image: string;
  gradient?: string;
  createdAt?: string;
}

interface InfographicBannerSliderProps {
  banners: BannerItem[];
  isAdminLoggedIn?: boolean;
  onOpenAdminDashboard?: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const InfographicBannerSlider: React.FC<InfographicBannerSliderProps> = ({
  banners,
  isAdminLoggedIn = false,
  onOpenAdminDashboard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slider every 5 seconds
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  if (!banners || banners.length === 0) return null;

  const current = banners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-950">
        
        {/* Background Image with Fallback */}
        <div className="relative h-[360px] sm:h-[400px] md:h-[440px] w-full overflow-hidden">
          <SafeImage
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover transition-transform duration-700 scale-105"
          />

          {/* Luxury Infographic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(2,132,199,0.3),transparent_70%)]" />

          {/* Slide Content */}
          <div className="absolute inset-0 p-6 sm:p-10 md:p-12 flex flex-col justify-between z-10">
            
            {/* Top Tag & Admin Quick Action */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{current.tag || 'INFO LAYANAN UTAMA'}</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800/80 text-sky-300 text-xs font-semibold backdrop-blur-sm border border-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  <span>Garansi Resmi 1 Bulan</span>
                </span>
              </div>

              {isAdminLoggedIn && onOpenAdminDashboard && (
                <button
                  onClick={onOpenAdminDashboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/90 text-amber-300 hover:bg-slate-700 text-xs font-bold border border-amber-400/40 cursor-pointer transition shadow-xs"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Kelola Slide Ini</span>
                </button>
              )}
            </div>

            {/* Middle: Title & Subtitle */}
            <div className="max-w-2xl space-y-3 my-auto">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] drop-shadow-sm">
                {current.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl">
                {current.subtitle}
              </p>
            </div>

            {/* Bottom Bar: NAMA JASA SERVICEKU & Direct WhatsApp Action */}
            <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Highlight Nama Jasa Serviceku */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Jasa Serviceku Resmi:
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {current.serviceName}
                  </div>
                </div>
              </div>

              {/* Direct Booking to WhatsApp +62 878-7441-7978 */}
              <div className="flex items-center gap-2">
                <a
                  href={createWhatsAppLink({
                    appliance: current.serviceName,
                    problem: `Saya tertarik dengan promo banner: "${current.title}" (${current.serviceName})`
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all active:scale-95 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Chat WhatsApp Teknisi</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Slide Sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 transition z-20 cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Slide Selanjutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 transition z-20 cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Ke slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-7 bg-amber-400' 
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
