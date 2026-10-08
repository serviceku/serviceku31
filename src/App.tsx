/**
 * Serviceku - World-Class Business Website
 * Jasa Service Elektronik Profesional Panggilan
 * 100% Responsif, Mobile First & Production-Grade
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InfographicBannerSlider, BannerItem } from './components/InfographicBannerSlider';
import { HeroSection } from './components/HeroSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ServicesGrid } from './components/ServicesGrid';
import { AreaCoverageSection } from './components/AreaCoverageSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PriceTableModal } from './components/PriceTableModal';
import { AiConsultantModal } from './components/AiConsultantModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal, ServiceItem, SeoSettings } from './components/AdminDashboardModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { APP_CONFIG } from '../appConfig.js';

function setMetaContent(selector: string, content: string) {
  let el = document.querySelector(selector);
  if (!el) {
    const isOg = selector.includes('property="');
    const attrName = isOg ? 'property' : 'name';
    const tagMatch = selector.match(/["'](.*?)["']/);
    const attrValue = tagMatch ? tagMatch[1] : '';
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function applySeoToDocument(seo: SeoSettings) {
  if (seo.metaTitle) {
    document.title = seo.metaTitle;
    setMetaContent('meta[property="og:title"]', seo.metaTitle);
    setMetaContent('meta[name="twitter:title"]', seo.metaTitle);
  }
  if (seo.metaDescription) {
    setMetaContent('meta[name="description"]', seo.metaDescription);
    setMetaContent('meta[property="og:description"]', seo.metaDescription);
    setMetaContent('meta[name="twitter:description"]', seo.metaDescription);
  }
  if (seo.ogImage) {
    setMetaContent('meta[property="og:image"]', seo.ogImage);
    setMetaContent('meta[name="twitter:image"]', seo.ogImage);
  }
  if (seo.keywords) {
    setMetaContent('meta[name="keywords"]', seo.keywords);
  }
}

export default function App() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Dynamic Persistent Data
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);

  // Check login state on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('serviceku_admin_user');
    if (savedUser) {
      setIsAdminLoggedIn(true);
    }
    loadServices();
    loadBanners();
    loadSeo();
  }, []);

  const loadSeo = async () => {
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      if (data.success && data.seo) {
        applySeoToDocument(data.seo);
      } else if (APP_CONFIG.seo) {
        applySeoToDocument(APP_CONFIG.seo as SeoSettings);
      }
    } catch {
      if (APP_CONFIG.seo) {
        applySeoToDocument(APP_CONFIG.seo as SeoSettings);
      }
    }
  };

  const loadServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success && Array.isArray(data.services) && data.services.length > 0) {
        setServices(data.services);
      } else {
        setServices(APP_CONFIG.products as ServiceItem[]);
      }
    } catch {
      setServices(APP_CONFIG.products as ServiceItem[]);
    }
  };

  const loadBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      if (data.success && Array.isArray(data.banners) && data.banners.length > 0) {
        setBanners(data.banners);
      } else {
        // Fallback default banners
        setBanners([
          {
            id: 'b-default-1',
            title: 'Promo Cuci AC Hemat Hanya Rp 75.000',
            subtitle: 'Pembersihan evaporator, blower & outdoor unit bersih tuntas. Dingin sejuk kembali tanpa bau apek!',
            serviceName: 'Service & Cuci AC Berkala Serviceku',
            tag: 'TERLARIS • BERGARANSI',
            image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop',
          },
          {
            id: 'b-default-2',
            title: 'Service Kulkas 1 & 2 Pintu Langsung di Lokasi',
            subtitle: 'Atasi kulkas mati total, tidak beku, atau kompresor berdengung dengan teknisi jujur dan sparepart original.',
            serviceName: 'Spesialis Pendingin Kulkas & Inverter',
            tag: 'PANGGILAN HARI INI',
            image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1600&auto=format&fit=crop',
          }
        ]);
      }
    } catch {
      // Keep existing
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('serviceku_admin_user');
    localStorage.removeItem('serviceku_admin_token');
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900">
      
      {/* Sticky Header Navbar */}
      <Navbar
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenPriceModal={() => setIsPriceModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Slide show Banner Infografis di bagian atas dengan nama Jasa Serviceku */}
        <InfographicBannerSlider
          banners={banners}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        />

        {/* Luxury Hero Section */}
        <HeroSection
          onOpenAiModal={() => setIsAiModalOpen(true)}
          onOpenPriceModal={() => setIsPriceModalOpen(true)}
        />

        {/* 4 Core Pillars of Service */}
        <AdvantagesSection />

        {/* Dynamic Catalog of Services with Transparent Pricing & WhatsApp Integration */}
        <ServicesGrid
          services={services}
          isAdminLoggedIn={isAdminLoggedIn}
          onOpenPriceModal={() => setIsPriceModalOpen(true)}
          onOpenAiModal={() => setIsAiModalOpen(true)}
          onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        />

        {/* Indramayu, Cirebon, Majalengka Service Coverage */}
        <AreaCoverageSection />

        {/* Real Work Proof & Gallery */}
        <GallerySection />

        {/* FAQ Accordion */}
        <FaqSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Interactive Modals */}
      <PriceTableModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
      />

      <AiConsultantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      {/* Admin Login Modal with Eye Toggle */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Admin Dashboard Modal (CRUD Services, Banners & Account) */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleLogout}
        services={services}
        banners={banners}
        onRefreshData={() => {
          loadServices();
          loadBanners();
        }}
        onUpdateSeo={applySeoToDocument}
      />

      {/* Mobile-first bottom conversion bar & floating CTA */}
      <MobileStickyBar
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenPriceModal={() => setIsPriceModalOpen(true)}
      />
    </div>
  );
}
