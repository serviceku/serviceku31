import React from 'react';
import { X, CheckCircle2, MessageCircle, ShieldCheck, Snowflake } from 'lucide-react';
import { createWhatsAppLink } from '../utils/whatsapp';

interface PriceTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceTableModal: React.FC<PriceTableModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const acPriceList = [
    { no: 1, service: 'Cuci AC Rutin / Berkala', price: 'Rp 75.000', note: 'Pembersihan filter, evaporator & outdoor unit' },
    { no: 2, service: 'Cuci Overhaul Turun Unit', price: 'Rp 350.000', note: 'Pembersihan mendalam total untuk unit berlendir parah' },
    { no: 3, service: 'Pasang AC Baru / Bekas', price: 'Rp 350.000', note: 'Instalasi rapi indoor & outdoor + uji vakum' },
    { no: 4, service: 'Bongkar AC', price: 'Rp 250.000', note: 'Pelepasan unit aman dengan penguncian freon (pump down)' },
    { no: 5, service: 'Perbaikan Kebocoran Freon AC', price: 'Mulai Rp 750.000', note: 'Tergantung kapasitas PK & tingkat kesulitan las pipa' },
    { no: 6, service: 'Perbaikan Module PCB AC', price: 'Mulai Rp 350.000', note: 'Tergantung tipe AC (Standard / Inverter)' },
    { no: 7, service: 'Penggantian Module Universal AC', price: 'Rp 450.000', note: 'Sudah termasuk remote baru + instalasi kabel' }
  ];

  const generalEstimate = [
    { item: 'Service Kulkas 1 Pintu / 2 Pintu', range: 'Rp 150.000 - Rp 450.000', desc: 'Tidak dingin, ganti overload/relay, isi freon' },
    { item: 'Service Mesin Cuci Top/Front Load', range: 'Rp 150.000 - Rp 450.000', desc: 'Macet, air bocor, modul PCB, dinamo/v-belt' },
    { item: 'Service Showcase Toko / Warung', range: 'Rp 200.000 - Rp 650.000', desc: 'Kurang dingin, kipas fan mati, kompresor' },
    { item: 'Service Freezer Box Pembeku', range: 'Rp 200.000 - Rp 700.000', desc: 'Tidak beku, freon bocor, kompresor macet' },
    { item: 'Service Dispenser Air Minum', range: 'Rp 100.000 - Rp 350.000', desc: 'Air tidak panas/dingin, bocor kran, ganti pipa' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Snowflake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                Daftar Tarif Resmi Serviceku
              </h3>
              <p className="text-xs text-slate-400">
                Transparan, Bergaransi 1 Bulan & Sesuai Standar Mutu
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

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* AC Official Price List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                Rincian Tarif Service AC (Air Conditioner)
              </h4>
              <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                Daftar Resmi
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3 w-10 text-center">No</th>
                    <th className="py-2.5 px-3">Jenis Pekerjaan</th>
                    <th className="py-2.5 px-3 text-right">Tarif Biaya</th>
                    <th className="py-2.5 px-3 hidden sm:table-cell text-slate-500">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {acPriceList.map((item) => (
                    <tr key={item.no} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 text-center font-bold text-slate-500">{item.no}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        {item.service}
                        <div className="text-[11px] text-slate-500 font-normal sm:hidden mt-0.5">
                          {item.note}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right font-black text-sky-700 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500 hidden sm:table-cell">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Appliances Estimates */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Estimasi Perangkat Elektronik Lainnya
              </h4>
              <span className="text-[11px] text-slate-500">Pemeriksaan di Tempat</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {generalEstimate.map((ge, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{ge.item}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{ge.desc}</div>
                  </div>
                  <div className="mt-2 text-xs font-black text-amber-700">
                    Estimasi: {ge.range}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Garansi Resmi 1 Bulan:</strong> Berlaku untuk komponen dan jenis perbaikan yang sama. Teknisi kami selalu mengonfirmasi estimasi sebelum memulai pekerjaan fisik.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Ingin memesan atau menanyakan jenis kerusakan spesifik?
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
            >
              Tutup
            </button>
            <a
              href={createWhatsAppLink({ problem: 'Saya ingin memesan service berdasarkan daftar tarif resmi Serviceku' })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pesan via WA</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
