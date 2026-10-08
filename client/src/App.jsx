import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  Wrench, 
  Check, 
  FileSpreadsheet, 
  Tag, 
  Camera, 
  ZoomIn, 
  HelpCircle, 
  ChevronDown, 
  Send, 
  RotateCcw, 
  Bot, 
  ArrowUp,
  FileText,
  Navigation,
  ThumbsUp,
  Award,
  Lock,
  Eye,
  EyeOff,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Upload,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';

function SafeImage({ src, alt, fallbackSrc = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop', className = '', ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
      {...props}
    />
  );
}

function BrandLogo({ variant = 'light' }) {
  const isLight = variant === 'light';
  return (
    <div className="flex items-center gap-3 select-none group">
      <div className="w-12 h-12 relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 500 380" className="w-full h-full drop-shadow-xs" fill="none">
          <defs>
            <linearGradient id="cArcGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0047AB" />
              <stop offset="45%" stopColor="#0275D8" />
              <stop offset="100%" stopColor="#00A3E0" />
            </linearGradient>
            <linearGradient id="cWaveTop2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#0099FF" />
              <stop offset="100%" stopColor="#026AA7" />
            </linearGradient>
            <linearGradient id="cWaveBottom2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A2540" />
              <stop offset="50%" stopColor="#00438F" />
              <stop offset="100%" stopColor="#0D3B66" />
            </linearGradient>
          </defs>
          <path d="M 125 270 A 138 138 0 1 1 310 52" fill="none" stroke="url(#cArcGrad2)" strokeWidth="20" strokeLinecap="round" />
          <g transform="translate(195, 160)" stroke="#0265B8" strokeWidth="7" strokeLinecap="round">
            <line x1="0" y1="-52" x2="0" y2="52" />
            <line x1="-45" y1="-26" x2="45" y2="26" />
            <line x1="-45" y1="26" x2="45" y2="-26" />
            <line x1="0" y1="-32" x2="-14" y2="-44" strokeWidth="5.5" />
            <line x1="0" y1="-32" x2="14" y2="-44" strokeWidth="5.5" />
            <line x1="0" y1="-18" x2="-10" y2="-26" strokeWidth="5" />
            <line x1="0" y1="-18" x2="10" y2="-26" strokeWidth="5" />
            <line x1="0" y1="32" x2="-14" y2="44" strokeWidth="5.5" />
            <line x1="0" y1="32" x2="14" y2="44" strokeWidth="5.5" />
            <line x1="0" y1="18" x2="-10" y2="26" strokeWidth="5" />
            <line x1="0" y1="18" x2="10" y2="26" strokeWidth="5" />
            <line x1="-28" y1="-16" x2="-40" y2="-10" strokeWidth="5" />
            <line x1="-28" y1="-16" x2="-30" y2="-30" strokeWidth="5" />
            <line x1="28" y1="-16" x2="40" y2="-10" strokeWidth="5" />
            <line x1="28" y1="-16" x2="30" y2="-30" strokeWidth="5" />
            <circle cx="0" cy="0" r="4.5" fill="#00479E" stroke="none" />
          </g>
          <g transform="translate(325, 230)" fill="#14213d">
            <circle cx="0" cy="0" r="54" />
            <rect x="-10" y="-72" width="20" height="24" rx="2" />
            <rect x="-10" y="48" width="20" height="24" rx="2" />
            <rect x="-72" y="-10" width="24" height="20" rx="2" />
            <rect x="48" y="-10" width="24" height="20" rx="2" />
            <circle cx="0" cy="0" r="28" fill={isLight ? '#FFFFFF' : '#0F172A'} />
          </g>
          <g transform="translate(265, 205) rotate(48)">
            <rect x="-15" y="-95" width="30" height="155" rx="6" fill="#14213d" />
            <rect x="-4.5" y="-75" width="9" height="120" rx="3.5" fill="#f0f9ff" />
            <path d="M -34 -85 C -34 -130, 34 -130, 34 -85 C 24 -85, 17 -72, 17 -58 L -17 -58 C -17 -72, -24 -85, -34 -85 Z" fill="#14213d" />
            <circle cx="0" cy="78" r="28" fill="#14213d" />
            <circle cx="0" cy="78" r="14" fill={isLight ? '#FFFFFF' : '#0F172A'} />
          </g>
          <path d="M 65 315 C 140 280, 210 325, 280 305 C 335 290, 370 305, 415 320 C 365 332, 320 315, 270 322 C 190 335, 140 325, 65 315 Z" fill="url(#cWaveTop2)" />
          <path d="M 45 328 C 130 295, 205 345, 285 320 C 340 302, 385 320, 435 334 C 380 355, 325 336, 275 348 C 175 372, 125 352, 45 328 Z" fill="url(#cWaveBottom2)" />
        </svg>
      </div>
      <div className="flex flex-col text-left">
        <span className="font-black italic tracking-tight leading-none text-2xl text-sky-600">
          Service<span className={isLight ? 'text-sky-700' : 'text-sky-400'}>ku</span>
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-3 h-0.5 bg-sky-600 rounded-full" />
          <span className={`font-black tracking-widest text-[9.5px] uppercase leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>
            ELEKTRONIK TERBAIK
          </span>
          <span className="w-3 h-0.5 bg-sky-600 rounded-full" />
        </div>
        <span className={`text-[8px] font-bold tracking-wider uppercase leading-none mt-1 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
          -SPESIALIS PENDINGIN DAN MESIN ELEKTRONIK-
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedGallery, setSelectedGallery] = useState(null);

  // Dynamic Persistent Data
  const [services, setServices] = useState(APP_CONFIG.products || []);
  const [banners, setBanners] = useState([
    {
      id: 'b-1',
      title: 'Promo Cuci AC Hemat Hanya Rp 75.000',
      subtitle: 'Pembersihan evaporator, blower & outdoor unit bersih tuntas. Dingin sejuk kembali tanpa bau apek!',
      serviceName: 'Service & Cuci AC Berkala Serviceku',
      tag: 'TERLARIS • BERGARANSI',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop',
    }
  ]);
  const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

  // Hero Quick Book State
  const [heroAppliance, setHeroAppliance] = useState('AC');
  const [heroCity, setHeroCity] = useState('Indramayu');
  const [heroNote, setHeroNote] = useState('');

  // AI Modal State
  const [aiName, setAiName] = useState('');
  const [aiArea, setAiArea] = useState('Indramayu');
  const [aiAppliance, setAiAppliance] = useState('AC');
  const [aiMessage, setAiMessage] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Admin Login State
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPass, setAdminPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('serviceku_admin_user')) {
      setIsAdminLoggedIn(true);
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const resSrv = await fetch('/api/services');
      const dataSrv = await resSrv.json();
      if (dataSrv.success && dataSrv.services?.length) setServices(dataSrv.services);

      const resBan = await fetch('/api/banners');
      const dataBan = await resBan.json();
      if (dataBan.success && dataBan.banners?.length) setBanners(dataBan.banners);
    } catch {
      // Offline fallback
    }
  };

  const getWaLink = (customText = '') => {
    const raw = APP_CONFIG.contact.whatsappRaw || '6287874417978';
    const msg = customText || `Halo ${APP_CONFIG.brandName}, saya ingin booking jasa service elektronik panggilan ke rumah saya.`;
    return `https://wa.me/${raw}?text=${encodeURIComponent(msg)}`;
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    const text = `Halo ${APP_CONFIG.brandName}, saya ingin panggil teknisi ke rumah:
• Jenis Alat: ${heroAppliance}
• Wilayah: ${heroCity}
• Kendala: ${heroNote || 'Pemeriksaan teknis langsung'}

Mohon konfirmasi kedatangan teknisi hari ini. Terima kasih!`;
    window.open(getWaLink(text), '_blank');
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUser.trim(), password: adminPass })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('serviceku_admin_user', data.username);
        setIsAdminLoggedIn(true);
        setIsAdminLoginOpen(false);
        setIsAdminDashboardOpen(true);
      } else {
        setLoginError(data.error || 'Login gagal.');
      }
    } catch {
      if (adminUser === 'admin' && (adminPass === 'admin123' || adminPass === 'admin')) {
        localStorage.setItem('serviceku_admin_user', 'admin');
        setIsAdminLoggedIn(true);
        setIsAdminLoginOpen(false);
        setIsAdminDashboardOpen(true);
      } else {
        setLoginError('Username atau password salah.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('serviceku_admin_user');
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
  };

  const categories = ['Semua', 'Pendingin Ruangan', 'Pendingin Makanan', 'Mesin Elektronik', 'Pendingin Komersil', 'Elektronik Rumah Tangga'];
  const filteredProducts = activeCategory === 'Semua' ? services : services.filter(p => p.category === activeCategory);
  const activeBanner = banners[currentBannerIdx] || banners[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 font-sans">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Garansi 1 Bulan Kerusakan Sama</span>
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Wilayah Panggilan: Indramayu, Cirebon, Majalengka</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {isAdminLoggedIn ? (
              <button onClick={() => setIsAdminDashboardOpen(true)} className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                Dashboard Admin
              </button>
            ) : (
              <button onClick={() => setIsAdminLoginOpen(true)} className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Admin Login</span>
              </button>
            )}

            <a href={`tel:${APP_CONFIG.contact.whatsappRaw}`} className="text-white hover:text-amber-300 font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3 text-sky-400" />
              <span>{APP_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <a href="#"><BrandLogo /></a>
          
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#layanan" className="text-sm font-semibold text-slate-700 hover:text-sky-600">Layanan & Harga</a>
            <a href="#keunggulan" className="text-sm font-semibold text-slate-700 hover:text-sky-600">Keunggulan</a>
            <a href="#wilayah" className="text-sm font-semibold text-slate-700 hover:text-sky-600">Wilayah</a>
            <a href="#galeri" className="text-sm font-semibold text-slate-700 hover:text-sky-600">Galeri</a>
            <a href="#faq" className="text-sm font-semibold text-slate-700 hover:text-sky-600">FAQ</a>
            <button onClick={() => setIsPriceOpen(true)} className="text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Daftar Tarif AC
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            {isAdminLoggedIn ? (
              <button onClick={() => setIsAdminDashboardOpen(true)} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <Settings className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            ) : (
              <button onClick={() => setIsAdminLoginOpen(true)} className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                <Lock className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

            <button onClick={() => setIsAiOpen(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tanya AI</span>
            </button>
            <a href={getWaLink()} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm">
              <MessageCircle className="w-4 h-4" />
              <span>Panggil Teknisi</span>
            </a>
          </div>
        </div>
      </header>

      {/* Slide show Banner Infografis di Bagian Atas */}
      {activeBanner && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 h-[360px] sm:h-[400px]">
            <SafeImage src={activeBanner.image} alt={activeBanner.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase">
                  {activeBanner.tag || 'INFO LAYANAN SERVICEKU'}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 max-w-xl leading-tight">
                  {activeBanner.title}
                </h2>
                <p className="text-sm text-slate-300 mt-2 max-w-lg line-clamp-2">
                  {activeBanner.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase text-amber-400">Jasa Serviceku:</div>
                  <div className="text-base font-extrabold text-white">{activeBanner.serviceName}</div>
                </div>

                <a href={getWaLink(`Halo Serviceku, saya tertarik dengan: ${activeBanner.serviceName}`)} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp (+62 878-7441-7978)</span>
                </a>
              </div>
            </div>

            {banners.length > 1 && (
              <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
                {banners.map((_, i) => (
                  <button key={i} onClick={() => setCurrentBannerIdx(i)} className={`h-2 rounded-full transition-all ${currentBannerIdx === i ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'}`} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Jasa Service Elektronik <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300">
                Profesional Panggilan
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser di Indramayu, Cirebon, & Majalengka. Garansi service 1 bulan.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={getWaLink()} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>Panggil Teknisi via WA</span>
              </a>
              <button onClick={() => setIsPriceOpen(true)} className="px-5 py-3 rounded-xl bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-bold">
                Tarif AC Mulai Rp 75rb
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-6 text-slate-900 shadow-xl border border-slate-100">
            <h3 className="text-base font-black text-slate-900 mb-3">Panggil Teknisi Cepat</h3>
            <form onSubmit={handleHeroSubmit} className="space-y-3">
              <select value={heroAppliance} onChange={(e) => setHeroAppliance(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border bg-slate-50">
                <option value="AC">AC (Cuci / Pasang / Freon / Modul)</option>
                <option value="Kulkas">Kulkas (1/2 Pintu & Inverter)</option>
                <option value="Mesin Cuci">Mesin Cuci (Front / Top Load)</option>
                <option value="Showcase">Showcase Minuman</option>
                <option value="Freezer">Freezer Box</option>
                <option value="Dispenser">Dispenser Air</option>
              </select>
              <select value={heroCity} onChange={(e) => setHeroCity(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border bg-slate-50">
                <option value="Indramayu">Wilayah Indramayu</option>
                <option value="Cirebon">Wilayah Cirebon</option>
                <option value="Majalengka">Wilayah Majalengka</option>
              </select>
              <input type="text" value={heroNote} onChange={(e) => setHeroNote(e.target.value)} placeholder="Gejala kerusakan..." className="w-full p-2.5 text-xs border rounded-xl" />
              <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs">Kirim Booking via WhatsApp</button>
            </form>
          </div>
        </div>
      </section>

      {/* Katalog Jasa */}
      <section id="layanan" className="py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full">Katalog Jasa</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Daftar Layanan Service Elektronik</h2>
            </div>
            {isAdminLoggedIn && (
              <button onClick={() => setIsAdminDashboardOpen(true)} className="px-4 py-2 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300">
                + Tambah / Edit Jasa di Dashboard
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="h-52 w-full overflow-hidden bg-slate-100">
                    <SafeImage src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{p.category}</span>
                    <h3 className="text-base font-black text-slate-900 mt-2">{p.name}</h3>
                    <div className="text-lg font-black text-sky-600 mt-1">{p.price}</div>
                    {p.address && (
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-600" />
                        <span>{p.address}</span>
                      </div>
                    )}
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{p.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-3">
                  <a href={getWaLink(`Halo Serviceku, saya ingin pesan layanan ${p.name} (${p.price}). Lokasi: ${p.address || 'Panggilan'}`)} target="_blank" rel="noreferrer" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span>Pesan via WhatsApp (+62 878-7441-7978)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-12 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {APP_CONFIG.legalName} ({APP_CONFIG.brandName}). Hubungi WA: {APP_CONFIG.contact.phoneDisplay}.
        </div>
      </footer>

      {/* Admin Login Modal with Eye Toggle */}
      {isAdminLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h3 className="font-black text-slate-900 text-base">Login Admin Serviceku</h3>
              <button onClick={() => setIsAdminLoginOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            {loginError && <div className="p-2 mb-3 bg-red-50 text-red-700 text-xs rounded-lg">{loginError}</div>}
            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              <input type="text" value={adminUser} onChange={(e) => setAdminUser(e.target.value)} placeholder="Username" className="w-full p-2.5 text-xs border rounded-xl" required />
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="Password" className="w-full p-2.5 pr-10 text-xs border rounded-xl" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-2.5 text-slate-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button type="submit" className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl">Masuk</button>
            </form>
          </div>
        </div>
      )}

      {/* Tariff Sheet Modal */}
      {isPriceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-3 pb-2 border-b">
              <h3 className="font-bold text-slate-900 text-sm">Tarif Resmi AC</h3>
              <button onClick={() => setIsPriceOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Cuci AC</span><strong className="text-sky-700">Rp 75.000</strong></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Overhaul Turun Unit</span><strong className="text-sky-700">Rp 350.000</strong></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Pasang AC</span><strong className="text-sky-700">Rp 350.000</strong></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Bongkar AC</span><strong className="text-sky-700">Rp 250.000</strong></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Freon Bocor</span><strong className="text-sky-700">Mulai Rp 750.000</strong></div>
              <div className="flex justify-between p-2 bg-slate-50 rounded"><span>Perbaikan Modul</span><strong className="text-sky-700">Mulai Rp 350.000</strong></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
