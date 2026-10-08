import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { SafeImage } from './SafeImage';
import { createWhatsAppLink } from '../utils/whatsapp';
import { ServiceItem } from './AdminDashboardModal';
import { 
  Check, 
  MessageCircle, 
  Sparkles, 
  FileSpreadsheet, 
  Tag, 
  MapPin, 
  Edit3,
  ArrowRight
} from 'lucide-react';

interface ServicesGridProps {
  services?: ServiceItem[];
  isAdminLoggedIn?: boolean;
  onOpenPriceModal: () => void;
  onOpenAiModal: () => void;
  onOpenAdminDashboard?: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ 
  services,
  isAdminLoggedIn = false,
  onOpenPriceModal, 
  onOpenAiModal,
  onOpenAdminDashboard
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Pendingin Ruangan',
    'Pendingin Makanan',
    'Mesin Elektronik',
    'Pendingin Komersil',
    'Elektronik Rumah Tangga'
  ];

  // Use dynamic services if available, else fallback
  const rawList = (services && services.length > 0) ? services : (APP_CONFIG.products as ServiceItem[]);

  const filteredProducts = activeCategory === 'Semua'
    ? rawList
    : rawList.filter(p => p.category === activeCategory);

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Tag className="w-3.5 h-3.5 text-amber-700" />
              <span>KATALOG LAYANAN ELEKTRONIK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Spesialis Panggilan Rumah & Usaha Anda
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-2xl">
              Daftar jasa yang dipublikasikan secara resmi dengan harga transparan, teknisi jujur, dan bergaransi 1 bulan.
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            {isAdminLoggedIn && onOpenAdminDashboard && (
              <button
                onClick={onOpenAdminDashboard}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 hover:bg-amber-200 shadow-xs transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-800" />
                <span>+ Tambah / Edit Jasa</span>
              </button>
            )}

            <button
              onClick={onOpenPriceModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs border border-slate-300 hover:border-sky-500 hover:text-sky-600 shadow-xs transition cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Daftar Tarif AC Lengkap</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const waText = `Halo Serviceku, saya ingin booking jasa service:
• Nama Jasa: ${product.name}
• Biaya: ${product.price}
• Wilayah: ${product.address || 'Indramayu / Cirebon / Majalengka'}

Mohon konfirmasi kedatangan teknisi ke lokasi saya. Terima kasih!`;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-sky-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image with Safe Fallback */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-extrabold shadow-sm">
                        {product.category}
                      </span>
                      {product.tag && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black uppercase">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {isAdminLoggedIn && onOpenAdminDashboard && (
                      <button
                        onClick={onOpenAdminDashboard}
                        title="Edit Jasa di Dashboard"
                        className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-white text-slate-800 shadow-sm transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title & Price Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-black text-sky-600">
                          {product.price}
                        </span>
                        {product.priceNote && (
                          <span className="text-xs text-slate-500 font-medium">
                            ({product.priceNote})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Alamat / Area Penanganan */}
                    {product.address && (
                      <div className="mb-3 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                        <span className="truncate">{product.address}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features List */}
                    {product.features && product.features.length > 0 && (
                      <div className="space-y-2 mb-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Keunggulan & Rincian:
                        </div>
                        {product.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex flex-col gap-2.5">
                  <a
                    href={`https://wa.me/6287874417978?text=${encodeURIComponent(waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Pesan via WhatsApp (+62 878-7441-7978)</span>
                  </a>

                  <button
                    onClick={onOpenAiModal}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Tanya AI Diagnosa Gejala Ini</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Promo Bar / Callout */}
        <div className="mt-12 p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">❄️</span>
            <div>
              <div className="font-extrabold text-sm sm:text-base">
                Butuh Cuci AC Berkala atau Overhaul Turun Unit?
              </div>
              <div className="text-xs text-amber-800">
                Cuci AC hanya Rp 75.000 / unit. Dikerjakan bersih dengan plastik pelindung rapi tanpa mengotori dinding & lantai rumah.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenPriceModal}
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition cursor-pointer shadow-sm"
          >
            <span>Buka Rincian Biaya AC</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
