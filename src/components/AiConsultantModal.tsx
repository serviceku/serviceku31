import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw,
  Bot,
  User
} from 'lucide-react';
import { APP_CONFIG } from '../../appConfig.js';
import { createWhatsAppLink } from '../utils/whatsapp';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [area, setArea] = useState('Indramayu');
  const [applianceType, setApplianceType] = useState('AC');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickSymptoms = [
    { label: 'AC Kurang Dingin / Netes Air', appliance: 'AC', desc: 'AC hidup tapi cuma keluar angin biasa dan indoor netes air ke lantai' },
    { label: 'Kulkas Bawah Tidak Dingin', appliance: 'Kulkas', desc: 'Freezer atas beku tapi ruang bawah sama sekali tidak dingin' },
    { label: 'Mesin Cuci Tidak Mau Memutar', appliance: 'Mesin Cuci', desc: 'Air masuk normal tapi tabung tidak mau berputar memeras atau bunyi dengung' },
    { label: 'Showcase Toko Mati / Kurang Dingin', appliance: 'Showcase', desc: 'Showcase display minuman tidak dingin dan kipas belakang mati' },
    { label: 'Dispenser Air Panas Tidak Bekerja', appliance: 'Dispenser', desc: 'Lampu indikator nyala tapi air panas keluar dingin' }
  ];

  const handleApplyQuickSymptom = (item: typeof quickSymptoms[0]) => {
    setApplianceType(item.appliance);
    setMessage(item.desc);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setErrorMsg('Mohon jelaskan gejala atau keluhan barang elektronik Anda.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setDiagnosisResult(null);

    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerName.trim() || 'Pelanggan',
          area,
          applianceType,
          message: message.trim()
        }),
      });

      const data = await response.json();
      if (data.success && data.recommendation) {
        setDiagnosisResult(data.recommendation);
      } else {
        throw new Error(data.error || 'Gagal memproses rekomendasi.');
      }
    } catch (err: unknown) {
      console.error(err);
      // Fallback message so user can still book smoothly
      setDiagnosisResult(
        `Halo ${customerName || 'Bapak/Ibu'}, terima kasih telah berkonsultasi!\n\n` +
        `Untuk keluhan ${applianceType} dengan gejala "${message}":\n` +
        `• Pengecekan teknis langsung disarankan untuk mengukur tekanan arus, kebocoran pipa/freon, atau kondisi modul motor.\n` +
        `• Estimasi awal sangat bersahabat dan teknisi kami siap langsung datang ke rumah Anda di wilayah ${area}.\n` +
        `• Pekerjaan bergaransi resmi 1 bulan untuk kerusakan yang sama.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDiagnosisResult(null);
    setErrorMsg(null);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Konsultasi & Diagnosa AI Serviceku
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/30 text-sky-300 text-[10px] font-bold tracking-wider uppercase">
                  Powered by Gemini
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Diagnosa kendala elektronik Anda & dapatkan estimasi solusi sebelum panggil teknisi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Quick Symptoms Chips */}
          {!diagnosisResult && (
            <div>
              <div className="text-xs font-bold text-slate-600 mb-2">
                Pilih Gejala Cepat (Opsional):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickSymptoms.map((qs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleApplyQuickSymptom(qs)}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 border border-slate-200 transition cursor-pointer text-left"
                  >
                    ⚡ {qs.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          {!diagnosisResult ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Anda:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Pak Budi"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                  />
                </div>

                {/* Appliance */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenis Elektronik:
                  </label>
                  <select
                    value={applianceType}
                    onChange={(e) => setApplianceType(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition font-medium"
                  >
                    <option value="AC">AC (Pendingin Ruangan)</option>
                    <option value="Kulkas">Kulkas (1/2 Pintu / Side by Side)</option>
                    <option value="Mesin Cuci">Mesin Cuci (Front / Top Load)</option>
                    <option value="Showcase">Showcase Minuman</option>
                    <option value="Freezer Box">Freezer Box Pembeku</option>
                    <option value="Dispenser">Dispenser Air Panas & Dingin</option>
                  </select>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Wilayah:
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition font-medium"
                  >
                    <option value="Indramayu">Indramayu & Sekitarnya</option>
                    <option value="Cirebon">Cirebon & Sekitarnya</option>
                    <option value="Majalengka">Majalengka & Sekitarnya</option>
                  </select>
                </div>
              </div>

              {/* Message / Symptoms */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsikan Gejala / Kerusakan: <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ceritakan detail kendalanya (misal: AC sudah 4 bulan belum dicuci dan tidak dingin, atau kulkas bawah mati dinginnya padahal mesin bunyi)..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none transition resize-none"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-slate-900 to-sky-900 hover:from-slate-800 hover:to-sky-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Konsultan AI Sedang Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Analisis Gejala & Dapatkan Solusi</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Result View */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-sky-600 text-white flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                  {diagnosisResult}
                </div>
              </div>

              {/* Direct WhatsApp Call to Action with pre-filled diagnosis */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-emerald-950">
                  <strong>Siap memanggil teknisi ke rumah Anda?</strong>
                  <div className="text-emerald-800 text-[11px] mt-0.5">
                    Hasil diagnosa di atas akan otomatis disertakan ke WhatsApp teknisi kami.
                  </div>
                </div>

                <a
                  href={createWhatsAppLink({
                    name: customerName,
                    city: area,
                    appliance: applianceType,
                    problem: `${message} (Diagnosa AI: ${diagnosisResult.slice(0, 120)}...)`
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Jadwalkan Teknisi via WhatsApp</span>
                </a>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Konsultasi Gejala Lain</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>{APP_CONFIG.brandName} • Garansi Service 1 Bulan</span>
          <span>Buka: 07.30 - 20.00 WIB</span>
        </div>

      </div>
    </div>
  );
};
