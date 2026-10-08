import React, { useState } from 'react';
import { APP_CONFIG } from '../../appConfig.js';
import { SafeImage } from './SafeImage';
import { Camera, X, ZoomIn, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof APP_CONFIG.gallery[0] | null>(null);

  return (
    <section id="galeri" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>DOKUMENTASI PEKERJAAN ASLI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Bukti Nyata Hasil Kerja Teknisi Kami
          </h2>
          <p className="mt-3.5 text-slate-600 text-base sm:text-lg">
            Transparansi dan standar profesional tinggi dalam setiap penanganan pendingin dan mesin elektronik.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {APP_CONFIG.gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm text-slate-900 text-[11px] font-bold shadow-xs">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] bg-slate-900 overflow-hidden flex items-center justify-center">
              <SafeImage
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 bg-white">
              <span className="text-[11px] font-bold uppercase text-sky-600 bg-sky-50 px-2.5 py-1 rounded">
                {selectedImage.category}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                {selectedImage.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
