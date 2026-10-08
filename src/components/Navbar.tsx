import React, { useState, useEffect } from 'react';
import { ServicekuLogo } from './ServicekuLogo';
import { APP_CONFIG } from '../../appConfig.js';
import { createWhatsAppLink } from '../utils/whatsapp';
import { 
  Sparkles, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight,
  Lock,
  UserCheck,
  Settings,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  onOpenAiModal: () => void;
  onOpenPriceModal: () => void;
  isAdminLoggedIn?: boolean;
  onOpenAdminLogin?: () => void;
  onOpenAdminDashboard?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAiModal, 
  onOpenPriceModal,
  isAdminLoggedIn = false,
  onOpenAdminLogin,
  onOpenAdminDashboard,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Layanan & Biaya', href: '#layanan' },
    { label: 'Keunggulan', href: '#keunggulan' },
    { label: 'Wilayah Layanan', href: '#wilayah' },
    { label: 'Galeri Pengerjaan', href: '#galeri' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <ServicekuLogo size="md" variant="light" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenPriceModal}
              className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer"
            >
              Daftar Tarif AC
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin Action Button in Main Nav */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenAdminDashboard}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition cursor-pointer shadow-xs"
                >
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  <span>Admin Panel</span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Logout Admin"
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Admin Login</span>
              </button>
            )}

            {/* AI Consultant Button */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>Konsultasi AI</span>
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={createWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Panggil Teknisi</span>
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden items-center gap-1.5">
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="p-2 rounded-lg bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1"
                aria-label="Admin Dashboard"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1"
                aria-label="Admin Login"
              >
                <Lock className="w-3.5 h-3.5 text-slate-600" />
              </button>
            )}

            <button
              onClick={onOpenAiModal}
              className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold flex items-center gap-1"
              aria-label="Konsultasi AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-5 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPriceModal();
              }}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold bg-amber-50 text-amber-900 border border-amber-200"
            >
              <span>📋 Lihat Daftar Tarif AC Lengkap</span>
              <ChevronRight className="w-4 h-4 text-amber-700" />
            </button>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              {isAdminLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminDashboard && onOpenAdminDashboard();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-100 text-amber-900 font-bold text-sm border border-amber-300"
                >
                  <Settings className="w-4 h-4 text-amber-700" />
                  <span>Dashboard Admin (Kelola Jasa & Banner)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin && onOpenAdminLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300"
                >
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span>Admin Login</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Konsultasi Diagnosa AI</span>
              </button>

              <a
                href={createWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi WhatsApp Langsung ({APP_CONFIG.contact.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
