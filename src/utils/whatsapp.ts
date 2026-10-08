import { APP_CONFIG } from '../../appConfig.js';

export interface BookingPayload {
  name?: string;
  phone?: string;
  city?: string;
  address?: string;
  appliance?: string;
  problem?: string;
  datePref?: string;
}

export function createWhatsAppLink(payload?: BookingPayload): string {
  const phone = APP_CONFIG.contact.whatsappRaw || '6287874417978';

  let message = `Halo ${APP_CONFIG.brandName}, saya ingin konsultasi & booking teknisi panggilan:`;

  if (payload) {
    if (payload.appliance) {
      message += `\n\n📌 Jenis Alat: ${payload.appliance}`;
    }
    if (payload.problem) {
      message += `\n🔧 Gejala / Kerusakan: ${payload.problem}`;
    }
    if (payload.city) {
      message += `\n📍 Wilayah: ${payload.city}`;
    }
    if (payload.address) {
      message += `\n🏠 Alamat Lengkap: ${payload.address}`;
    }
    if (payload.name) {
      message += `\n👤 Nama Pelanggan: ${payload.name}`;
    }
    if (payload.datePref) {
      message += `\n⏰ Waktu Kunjungan: ${payload.datePref}`;
    }
  }

  message += `\n\nMohon konfirmasi kedatangan teknisi dan perkiraan biayanya. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
