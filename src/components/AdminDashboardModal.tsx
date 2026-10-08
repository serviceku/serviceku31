import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Key, 
  Eye, 
  EyeOff, 
  Globe,
  Search,
  Share2,
  MapPin,
  Tag,
  DollarSign,
  FileText, 
  RotateCcw,
  Loader2
} from 'lucide-react';
import { SafeImage } from './SafeImage';
import { BannerItem } from './InfographicBannerSlider';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNote?: string;
  description: string;
  address?: string;
  image: string;
  tag?: string;
  features?: string[];
  createdAt?: string;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  keywords: string;
  siteName: string;
}

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  services: ServiceItem[];
  banners: BannerItem[];
  onRefreshData: () => void;
  onUpdateSeo?: (seo: SeoSettings) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  services,
  banners,
  onRefreshData,
  onUpdateSeo
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'banners' | 'seo' | 'account'>('services');

  // Service Form State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Pendingin Ruangan');
  const [servicePrice, setServicePrice] = useState('Mulai Rp 75.000');
  const [servicePriceNote, setServicePriceNote] = useState('Panggilan hari ini');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceAddress, setServiceAddress] = useState('Panggilan Indramayu, Cirebon, & Majalengka');
  const [serviceImage, setServiceImage] = useState('');
  const [serviceFeatures, setServiceFeatures] = useState('Garansi 1 bulan\nTeknisi langsung ke lokasi\nSparepart original');
  const [isServiceSubmitting, setIsServiceSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageFileName, setImageFileName] = useState<string>('');

  // Banner Form State
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerServiceName, setBannerServiceName] = useState('Serviceku AC & Pendingin');
  const [bannerTag, setBannerTag] = useState('PROMO UNGGULAN');
  const [bannerImage, setBannerImage] = useState('');
  const [isBannerSubmitting, setIsBannerSubmitting] = useState(false);

  // SEO Settings State
  const [metaTitle, setMetaTitle] = useState('Serviceku - Jasa Service Elektronik Profesional Panggilan');
  const [metaDescription, setMetaDescription] = useState('Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser. Teknisi jujur, cepat & langsung datang ke rumah Anda di Indramayu, Cirebon, & Majalengka.');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop');
  const [keywords, setKeywords] = useState('service ac, service kulkas, service mesin cuci, indramayu, cirebon, majalengka, teknisi panggilan, serviceku');
  const [siteName, setSiteName] = useState('Serviceku');
  const [isSeoSubmitting, setIsSeoSubmitting] = useState(false);

  // Account State
  const [newUsername, setNewUsername] = useState('admin');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [accountMsg, setAccountMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Notification Toast State
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load SEO on open
  useEffect(() => {
    if (isOpen) {
      fetch('/api/seo')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.seo) {
            if (data.seo.metaTitle) setMetaTitle(data.seo.metaTitle);
            if (data.seo.metaDescription) setMetaDescription(data.seo.metaDescription);
            if (data.seo.ogImage) setOgImage(data.seo.ogImage);
            if (data.seo.keywords) setKeywords(data.seo.keywords);
            if (data.seo.siteName) setSiteName(data.seo.siteName);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Photo File Upload: Direct upload to public/uploads or generate instant preview
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>, target: 'service' | 'banner' | 'seo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setStatusMsg({ type: 'error', text: 'Ukuran file terlalu besar (maksimal 10MB).' });
      return;
    }

    if (target === 'service') {
      setImageFileName(file.name);
      setIsUploadingImage(true);
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Result = reader.result as string;
      
      if (target === 'service') {
        // Immediate preview so the admin can see the image right away
        setServiceImage(base64Result);
        
        try {
          // Upload directly to server's public/uploads directory
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: base64Result,
              prefix: 'service'
            })
          });
          const data = await res.json();
          if (data.success && data.url) {
            // Replace with server public/uploads path
            setServiceImage(data.url);
            setStatusMsg({ 
              type: 'success', 
              text: `Foto "${file.name}" berhasil diunggah ke server (${data.url}) dan siap disimpan!` 
            });
          }
        } catch (err: unknown) {
          console.warn('Fallback: foto tersimpan dalam format base64 lokal', err);
        } finally {
          setIsUploadingImage(false);
        }
      } else if (target === 'banner') {
        setBannerImage(base64Result);
      } else {
        setOgImage(base64Result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Service Form
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim() || !servicePrice.trim()) {
      setStatusMsg({ type: 'error', text: 'Nama jasa dan harga wajib diisi!' });
      return;
    }

    setIsServiceSubmitting(true);
    setStatusMsg(null);

    const payload = {
      id: editingServiceId || undefined,
      name: serviceName.trim(),
      category: serviceCategory,
      price: servicePrice.trim(),
      priceNote: servicePriceNote.trim(),
      description: serviceDesc.trim(),
      address: serviceAddress.trim(),
      image: serviceImage.trim() || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop',
      features: serviceFeatures.split('\n').map(f => f.trim()).filter(Boolean)
    };

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: `Jasa "${serviceName}" berhasil disimpan & dipublikasikan permanen!` });
        handleResetServiceForm();
        onRefreshData();
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Gagal menyimpan data jasa.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMsg({ type: 'error', text: 'Terjadi kesalahan jaringan: ' + message });
    } finally {
      setIsServiceSubmitting(false);
    }
  };

  const handleEditServiceClick = (item: ServiceItem) => {
    setEditingServiceId(item.id);
    setServiceName(item.name);
    setServiceCategory(item.category || 'Pendingin Ruangan');
    setServicePrice(item.price);
    setServicePriceNote(item.priceNote || '');
    setServiceDesc(item.description || '');
    setServiceAddress(item.address || 'Panggilan Indramayu, Cirebon, & Majalengka');
    setServiceImage(item.image || '');
    setImageFileName(item.image ? 'Foto saat ini tersimpan' : '');
    setIsUploadingImage(false);
    setServiceFeatures((item.features || []).join('\n'));
    setStatusMsg(null);
  };

  const handleDeleteServiceClick = async (id: string, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus jasa "${name}" secara permanen?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: `Jasa "${name}" telah dihapus.` });
        if (editingServiceId === id) handleResetServiceForm();
        onRefreshData();
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Gagal menghapus jasa.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMsg({ type: 'error', text: 'Gagal menghapus jasa: ' + message });
    }
  };

  const handleResetServiceForm = () => {
    setEditingServiceId(null);
    setServiceName('');
    setServiceCategory('Pendingin Ruangan');
    setServicePrice('Mulai Rp 75.000');
    setServicePriceNote('Panggilan hari ini');
    setServiceDesc('');
    setServiceAddress('Panggilan Indramayu, Cirebon, & Majalengka');
    setServiceImage('');
    setImageFileName('');
    setIsUploadingImage(false);
    setServiceFeatures('Garansi 1 bulan\nTeknisi langsung ke lokasi\nSparepart original');
  };

  // Submit Banner Form
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerTitle.trim() || !bannerServiceName.trim()) {
      setStatusMsg({ type: 'error', text: 'Judul banner dan nama jasa wajib diisi!' });
      return;
    }

    setIsBannerSubmitting(true);
    setStatusMsg(null);

    const payload = {
      id: editingBannerId || undefined,
      title: bannerTitle.trim(),
      subtitle: bannerSubtitle.trim(),
      serviceName: bannerServiceName.trim(),
      tag: bannerTag.trim() || 'PROMO RESMI',
      image: bannerImage.trim() || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop'
    };

    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: editingBannerId ? 'Perubahan slide banner berhasil disimpan!' : 'Slide banner infografis berhasil dipublikasikan permanen!' });
        handleResetBannerForm();
        onRefreshData();
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Gagal menyimpan banner.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMsg({ type: 'error', text: 'Gagal menyimpan banner: ' + message });
    } finally {
      setIsBannerSubmitting(false);
    }
  };

  const handleEditBannerClick = (banner: BannerItem) => {
    setEditingBannerId(banner.id);
    setBannerTitle(banner.title);
    setBannerSubtitle(banner.subtitle || '');
    setBannerServiceName(banner.serviceName);
    setBannerTag(banner.tag || 'PROMO RESMI');
    setBannerImage(banner.image);
    setStatusMsg(null);
  };

  const handleDeleteBannerClick = async (id: string, title: string) => {
    if (!window.confirm(`Yakin ingin menghapus slide banner "${title}"?`)) return;

    try {
      const res = await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: 'Slide banner berhasil dihapus.' });
        if (editingBannerId === id) handleResetBannerForm();
        onRefreshData();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMsg({ type: 'error', text: 'Gagal menghapus banner: ' + message });
    }
  };

  const handleResetBannerForm = () => {
    setEditingBannerId(null);
    setBannerTitle('');
    setBannerSubtitle('');
    setBannerServiceName('Serviceku AC & Pendingin');
    setBannerTag('PROMO UNGGULAN');
    setBannerImage('');
  };

  // Submit SEO Settings
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!metaTitle.trim()) {
      setStatusMsg({ type: 'error', text: 'Meta Title tidak boleh kosong!' });
      return;
    }

    setIsSeoSubmitting(true);
    setStatusMsg(null);

    const payload: SeoSettings = {
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      ogImage: ogImage.trim(),
      keywords: keywords.trim(),
      siteName: siteName.trim() || 'Serviceku'
    };

    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg({ type: 'success', text: 'Pengaturan SEO & Social Share Preview berhasil disimpan secara permanen!' });
        
        // Dynamically update document head immediately
        document.title = payload.metaTitle;
        const metaDescEl = document.querySelector('meta[name="description"]');
        if (metaDescEl) metaDescEl.setAttribute('content', payload.metaDescription);
        const ogTitleEl = document.querySelector('meta[property="og:title"]');
        if (ogTitleEl) ogTitleEl.setAttribute('content', payload.metaTitle);
        const ogDescEl = document.querySelector('meta[property="og:description"]');
        if (ogDescEl) ogDescEl.setAttribute('content', payload.metaDescription);
        
        let ogImgEl = document.querySelector('meta[property="og:image"]');
        if (!ogImgEl) {
          ogImgEl = document.createElement('meta');
          ogImgEl.setAttribute('property', 'og:image');
          document.head.appendChild(ogImgEl);
        }
        ogImgEl.setAttribute('content', payload.ogImage);

        if (onUpdateSeo) {
          onUpdateSeo(payload);
        }
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Gagal menyimpan pengaturan SEO.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setStatusMsg({ type: 'error', text: 'Gagal menyimpan SEO: ' + message });
    } finally {
      setIsSeoSubmitting(false);
    }
  };

  // Submit Change Password
  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword) {
      setAccountMsg({ type: 'error', text: 'Username dan Password baru wajib diisi!' });
      return;
    }

    try {
      const res = await fetch('/api/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUsername: newUsername.trim(), newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setAccountMsg({ type: 'success', text: 'Username & Password admin berhasil diperbarui!' });
        localStorage.setItem('serviceku_admin_user', newUsername.trim());
      } else {
        setAccountMsg({ type: 'error', text: 'Gagal memperbarui akun.' });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setAccountMsg({ type: 'error', text: 'Kesalahan: ' + message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 font-black shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-black text-white">
                  Dashboard Admin Serviceku
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  Online & Terhubung Permanen
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Publikasikan foto, jasa terbaru, banner, dan atur metadata SEO website secara dinamis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Status Alert */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-4 flex-wrap flex-shrink-0">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => { setActiveTab('services'); setStatusMsg(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Kelola Jasa ({services.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('banners'); setStatusMsg(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'banners'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Slide Banner ({banners.length})</span>
            </button>

            {/* NEW SEO SETTINGS TAB */}
            <button
              onClick={() => { setActiveTab('seo'); setStatusMsg(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'seo'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>SEO Settings</span>
            </button>

            <button
              onClick={() => { setActiveTab('account'); setStatusMsg(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'account'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Akun Admin</span>
            </button>
          </div>

          <button
            onClick={onLogout}
            className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
          >
            Keluar (Logout)
          </button>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div className={`px-6 py-2.5 text-xs font-semibold flex items-center gap-2 flex-shrink-0 ${
            statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200' : 'bg-red-50 text-red-800 border-b border-red-200'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Scrollable Main Workspace */}
        <div className="p-6 overflow-y-auto space-y-8 flex-grow">
          
          {/* TAB 1: KELOLA JASA */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              {/* Form Section */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
                      {editingServiceId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                      {editingServiceId ? 'Edit Jasa Elektronik' : 'Tambah & Publikasikan Jasa Baru'}
                    </h4>
                  </div>
                  {editingServiceId && (
                    <button
                      onClick={handleResetServiceForm}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Batal Edit (Tambah Baru)
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveService} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-sky-600" />
                        <span>Nama Jasa: <span className="text-red-500">*</span></span>
                      </label>
                      <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Contoh: Cuci AC Inverter Bersih Total"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-sky-500 font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5 text-sky-600" />
                        <span>Kategori:</span>
                      </label>
                      <select
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                      >
                        <option value="Pendingin Ruangan">Pendingin Ruangan (AC)</option>
                        <option value="Pendingin Makanan">Pendingin Makanan (Kulkas)</option>
                        <option value="Mesin Elektronik">Mesin Elektronik (Mesin Cuci)</option>
                        <option value="Pendingin Komersil">Pendingin Komersil (Showcase & Freezer)</option>
                        <option value="Elektronik Rumah Tangga">Elektronik Rumah Tangga (Dispenser dll)</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tarif / Harga: <span className="text-red-500">*</span></span>
                      </label>
                      <input
                        type="text"
                        value={servicePrice}
                        onChange={(e) => setServicePrice(e.target.value)}
                        placeholder="Contoh: Mulai Rp 75.000"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-bold text-emerald-700"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Catatan Biaya (Opsional):
                      </label>
                      <input
                        type="text"
                        value={servicePriceNote}
                        onChange={(e) => setServicePriceNote(e.target.value)}
                        placeholder="Contoh: Estimasi transparan di tempat"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-sky-600" />
                        <span>Alamat & Wilayah Penanganan:</span>
                      </label>
                      <input
                        type="text"
                        value={serviceAddress}
                        onChange={(e) => setServiceAddress(e.target.value)}
                        placeholder="Contoh: Jl. By Pass Binaria - Bondan (Panggilan Indramayu, Cirebon, Majalengka)"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Deskripsi Layanan & Kerusakan yang Ditangani:
                    </label>
                    <textarea
                      rows={2}
                      value={serviceDesc}
                      onChange={(e) => setServiceDesc(e.target.value)}
                      placeholder="Jelaskan detail apa saja yang diperbaiki teknisi..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
                          <span>Upload Foto Jasa ke Server (public/uploads):</span>
                        </span>
                        {isUploadingImage && (
                          <span className="text-[11px] font-bold text-sky-600 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Mengunggah...
                          </span>
                        )}
                      </label>

                      {/* Explicit File Input Field */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2">
                          <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-dashed border-sky-300 text-sky-900 text-xs font-bold cursor-pointer transition">
                            <Upload className="w-4 h-4 text-sky-600 flex-shrink-0" />
                            <span className="truncate">
                              {imageFileName ? `Dipilih: ${imageFileName}` : 'Pilih Foto Jasa dari Perangkat (Galeri / Kamera)'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageFileChange(e, 'service')}
                            />
                          </label>
                          {serviceImage && (
                            <button
                              type="button"
                              onClick={() => {
                                setServiceImage('');
                                setImageFileName('');
                              }}
                              className="p-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition cursor-pointer"
                              title="Hapus foto terpilih"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Format: JPG, PNG, WEBP (maks. 10MB). Foto langsung disimpan ke direktori server <code>/public/uploads/</code>.
                        </p>
                      </div>

                      {/* Path / URL field */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Path Foto di Server / URL Gambar Eksternal:
                        </label>
                        <input
                          type="text"
                          value={serviceImage}
                          onChange={(e) => setServiceImage(e.target.value)}
                          placeholder="Contoh: /uploads/service-xxx.jpg atau https://images.unsplash.com/..."
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 font-mono text-slate-700 focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Live Preview Box */}
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1.5 px-1">
                        <span>👁️ Live Preview Sebelum Disimpan:</span>
                        {serviceImage ? (
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                            Foto Siap
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Belum Ada Foto</span>
                        )}
                      </div>
                      
                      <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-200 flex items-center justify-center relative group">
                        {serviceImage ? (
                          <>
                            <SafeImage
                              src={serviceImage}
                              alt="Live Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-2 text-white text-[10px] font-medium">
                              <span className="truncate">{serviceImage.startsWith('data:') ? 'Pratinjau File Lokal' : serviceImage}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center text-center p-4 text-slate-400">
                            <ImageIcon className="w-8 h-8 stroke-1 text-slate-300 mb-1" />
                            <span className="text-[11px] font-medium">
                              Belum ada foto terpilih
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5">
                              Klik tombol di samping untuk mengunggah
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={handleResetServiceForm}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isServiceSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{editingServiceId ? 'Simpan Perubahan Jasa' : 'Publikasikan Jasa Ini'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List */}
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">
                  Daftar Jasa yang Sedang Aktif di Beranda ({services.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-32 w-full rounded-xl overflow-hidden mb-3 bg-slate-100">
                          <SafeImage src={srv.image} alt={srv.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                          {srv.category}
                        </span>
                        <h5 className="font-extrabold text-slate-900 text-sm mt-1">
                          {srv.name}
                        </h5>
                        <div className="text-xs font-black text-emerald-600 mt-1">
                          {srv.price}
                        </div>
                        {srv.address && (
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{srv.address}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditServiceClick(srv)}
                          className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteServiceClick(srv.id, srv.name)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KELOLA SLIDE BANNER */}
          {activeTab === 'banners' && (
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                      {editingBannerId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                      {editingBannerId ? 'Edit Slide Banner Infografis' : 'Tambah Slide Banner Infografis Baru'}
                    </h4>
                  </div>
                  {editingBannerId && (
                    <button
                      onClick={handleResetBannerForm}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Batal Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveBanner} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Judul Banner Infografis: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={bannerTitle}
                        onChange={(e) => setBannerTitle(e.target.value)}
                        placeholder="Contoh: Promo Cuci AC Hemat Hanya Rp 75.000"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Jasa Serviceku Terkait: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={bannerServiceName}
                        onChange={(e) => setBannerServiceName(e.target.value)}
                        placeholder="Contoh: Service & Cuci AC Berkala Serviceku"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-extrabold text-sky-700"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tag / Label Promo:
                      </label>
                      <input
                        type="text"
                        value={bannerTag}
                        onChange={(e) => setBannerTag(e.target.value)}
                        placeholder="Contoh: TERLARIS • BERGARANSI"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-bold text-amber-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Subjudul / Rincian Singkat:
                      </label>
                      <input
                        type="text"
                        value={bannerSubtitle}
                        onChange={(e) => setBannerSubtitle(e.target.value)}
                        placeholder="Pembersihan evaporator, blower & outdoor unit bersih tuntas..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Foto Latar Banner Infografis:
                      </label>
                      <div className="mb-2">
                        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition">
                          <Upload className="w-3.5 h-3.5 text-sky-600" />
                          <span>Pilih Foto Banner dari Galeri</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageFileChange(e, 'banner')}
                          />
                        </label>
                      </div>
                      <input
                        type="url"
                        value={bannerImage}
                        onChange={(e) => setBannerImage(e.target.value)}
                        placeholder="Atau masukkan URL foto Unsplash..."
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>

                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] font-bold text-slate-600 mb-1.5">
                        👁️ Live Preview Banner:
                      </div>
                      <div className="w-48 h-24 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 relative">
                        {bannerImage ? (
                          <>
                            <SafeImage src={bannerImage} alt="Banner Preview" className="w-full h-full object-cover opacity-70" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent p-2 flex flex-col justify-end text-white text-[9px] font-bold">
                              <span className="text-amber-300 text-[8px] truncate">{bannerTag}</span>
                              <span className="truncate">{bannerTitle || 'Judul Banner'}</span>
                              <span className="text-sky-300 text-[8px] truncate">Jasa: {bannerServiceName}</span>
                            </div>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium text-center p-2 flex items-center justify-center h-full">
                            Belum ada gambar
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    {editingBannerId && (
                      <button
                        type="button"
                        onClick={handleResetBannerForm}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        Batal
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isBannerSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{editingBannerId ? 'Simpan Perubahan Banner' : 'Publikasikan Banner Infografis'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* List Banners */}
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">
                  Daftar Slide Banner Aktif di Atas Beranda ({banners.length})
                </h4>

                <div className="space-y-3">
                  {banners.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <SafeImage src={b.image} alt={b.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            {b.tag}
                          </span>
                          <h5 className="font-extrabold text-slate-900 text-sm mt-0.5">
                            {b.title}
                          </h5>
                          <div className="text-xs text-sky-700 font-bold mt-0.5">
                            Nama Jasa di Bawah: <strong>{b.serviceName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleEditBannerClick(b)}
                          className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit Slide
                        </button>
                        <button
                          onClick={() => handleDeleteBannerClick(b.id, b.title)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus Slide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEO SETTINGS (DYNAMIC META TITLE, DESCRIPTION & SOCIAL PREVIEW) */}
          {activeTab === 'seo' && (
            <div className="space-y-8">
              
              {/* Intro Banner */}
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-sky-600 text-white rounded-xl shadow-xs">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-sky-950">
                      Pengaturan SEO & Social Media Share Card
                    </h4>
                    <p className="text-xs text-sky-800 mt-0.5">
                      Kelola judul web, deskripsi pencarian Google, dan foto preview saat link website dibagikan ke WhatsApp, Facebook, atau Twitter.
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-white rounded-lg border border-sky-300 text-[11px] font-bold text-sky-800 shadow-xs">
                  Sesuai Standar Google & OpenGraph
                </div>
              </div>

              {/* Form & Live Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form Column (Left) */}
                <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <form onSubmit={handleSaveSeo} className="space-y-5">
                    
                    {/* Meta Title */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Search className="w-3.5 h-3.5 text-sky-600" />
                          <span>Website Meta Title (&lt;title&gt;):</span>
                        </label>
                        <span className={`text-[10px] font-bold ${
                          metaTitle.length > 60 ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          {metaTitle.length}/60 karakter (Optimal: 40-60)
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="Contoh: Serviceku - Jasa Service Elektronik Profesional Panggilan"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white font-bold text-slate-900 focus:ring-2 focus:ring-sky-500"
                        required
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Judul yang muncul di tab peramban dan hasil pencarian Google teratas.
                      </p>
                    </div>

                    {/* Meta Description */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-sky-600" />
                          <span>Meta Description (&lt;meta name="description"&gt;):</span>
                        </label>
                        <span className={`text-[10px] font-bold ${
                          metaDescription.length > 160 ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          {metaDescription.length}/160 karakter (Optimal: 120-160)
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Ringkasan bisnis Anda yang menarik untuk diklik di hasil pencarian Google..."
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-sky-500 leading-relaxed resize-none"
                        required
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Deskripsi singkat yang tampil di bawah judul saat seseorang mencari di mesin pencari.
                      </p>
                    </div>

                    {/* Social Share Image (OG Image) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-sky-600" />
                        <span>Social Media Preview Image (og:image):</span>
                      </label>
                      <div className="flex items-center gap-2 mb-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold cursor-pointer transition">
                          <Upload className="w-3.5 h-3.5 text-sky-600" />
                          <span>Pilih Foto Share Card dari HP/PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageFileChange(e, 'seo')}
                          />
                        </label>
                      </div>
                      <input
                        type="url"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="Atau tempel URL gambar langsung..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                        required
                      />
                      <p className="text-[10px] text-slate-500 mt-1">
                        Foto yang otomatis muncul saat link website dikirimkan via WhatsApp, Facebook, atau medsos lain.
                      </p>
                    </div>

                    {/* Keywords & Site Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Nama Brand Situs (og:site_name):
                        </label>
                        <input
                          type="text"
                          value={siteName}
                          onChange={(e) => setSiteName(e.target.value)}
                          placeholder="Serviceku"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Kata Kunci Target (Keywords):
                        </label>
                        <input
                          type="text"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          placeholder="service ac, kulkas, indramayu, cirebon"
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    {/* Submit SEO */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSeoSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-md transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{isSeoSubmitting ? 'Menyimpan...' : 'Simpan & Terapkan SEO Permanen'}</span>
                      </button>
                    </div>

                  </form>
                </div>

                {/* Live Previews Column (Right) */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Google Search Result Preview */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-blue-600" />
                        <span>Pratinjau Hasil Pencarian Google</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                        Google Snippet
                      </span>
                    </div>

                    {/* Google Card Simulation */}
                    <div className="font-sans space-y-1 text-left">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold">🌐</div>
                        <span className="truncate">https://serviceku.com › layanan-elektronik</span>
                      </div>
                      <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-tight line-clamp-2">
                        {metaTitle || 'Judul Halaman Web'}
                      </div>
                      <div className="text-xs text-[#4d5156] leading-relaxed line-clamp-3 pt-0.5">
                        {metaDescription || 'Deskripsi halaman web akan muncul di sini...'}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Share Preview (WhatsApp / Facebook / Twitter Card) */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pratinjau Share WhatsApp & Medsos</span>
                      </div>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                        OpenGraph Card
                      </span>
                    </div>

                    {/* Social Card Simulation */}
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50">
                      <div className="h-36 w-full overflow-hidden bg-slate-200 relative">
                        {ogImage ? (
                          <SafeImage src={ogImage} alt="Social Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                            Belum ada foto share
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                          OG Image Preview
                        </span>
                      </div>
                      <div className="p-3">
                        <div className="text-[10px] font-bold uppercase text-slate-500">
                          {siteName ? siteName.toLowerCase() + '.com' : 'serviceku.com'}
                        </div>
                        <div className="text-xs font-black text-slate-900 mt-0.5 leading-snug line-clamp-1">
                          {metaTitle}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {metaDescription}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 4: AKUN ADMIN */}
          {activeTab === 'account' && (
            <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-5">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Ganti Username & Password Admin
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Amankan akses pengelolaan website Serviceku Anda.
                </p>
              </div>

              {accountMsg && (
                <div className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  accountMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {accountMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                  <span>{accountMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdateAccount} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username Baru:
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password Baru:
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan password baru"
                      className="w-full px-3.5 py-2 pr-10 text-xs rounded-xl border border-slate-300 bg-white font-bold"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Simpan Akun Baru
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 flex-shrink-0">
          <span>Data tersimpan permanen di server & dapat diakses dari perangkat berbeda.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition cursor-pointer"
          >
            Tutup Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
