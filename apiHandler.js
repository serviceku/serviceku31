import { GoogleGenAI } from '@google/genai';
import { APP_CONFIG } from './appConfig.js';
import { 
  getServices, 
  saveService, 
  deleteService, 
  getBanners, 
  saveBanner, 
  deleteBanner, 
  verifyAdmin, 
  updateAdminCredentials,
  saveBase64Image,
  getSeoSettings,
  saveSeoSettings
} from './dataManager.js';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Build dynamic system instructions from stored services
 */
export function buildSystemInstruction() {
  const currentServices = getServices();
  const productListText = currentServices.map((p, idx) => {
    return `${idx + 1}. ${p.name} (${p.category || 'Elektronik'}) - Harga: ${p.price}. Deskripsi: ${p.description}. Alamat: ${p.address || 'Panggilan'}. Rincian/Fitur: ${(p.features || []).join(', ')}`;
  }).join('\n');

  const advantagesText = APP_CONFIG.advantages.map(a => `- ${a.title}: ${a.description}`).join('\n');

  return `Anda adalah Konsultan Teknis & Customer Service Senior dari "${APP_CONFIG.brandName}" (${APP_CONFIG.businessType} - ${APP_CONFIG.tagline}).
Profil Usaha:
- Nama Brand: ${APP_CONFIG.brandName} (${APP_CONFIG.legalName})
- Slogan: ${APP_CONFIG.tagline}
- Deskripsi: ${APP_CONFIG.description}
- Wilayah Layanan Panggilan: Indramayu, Cirebon, Majalengka (langsung datang ke rumah/lokasi pelanggan)
- Alamat Workshop: ${APP_CONFIG.contact.address}
- WhatsApp Resmi: ${APP_CONFIG.contact.whatsapp}
- Garansi: ${APP_CONFIG.contact.warrantyTerms}
- Jam Operasional: ${APP_CONFIG.contact.operationalHours}

Katalog Layanan & Estimasi Harga Resmi Saat Ini:
${productListText}

Keunggulan Kami:
${advantagesText}

Peran & Sikap:
1. Bersikap ramah, empati, solutif, dan profesional.
2. Berikan analisa awal gejala kerusakan peralatan elektronik pelanggan.
3. Berikan estimasi harga referensi resmi Serviceku.
4. Tekankan bahwa teknisi siap datang langsung ke rumah di Indramayu, Cirebon, atau Majalengka bergaransi 1 bulan.`;
}

/**
 * Heuristic analysis fallback
 */
function generateDomainExpertAnalysis(customerName, area, applianceType, message) {
  const name = customerName || 'Bapak/Ibu';
  const targetArea = area || 'Indramayu, Cirebon, dan Majalengka';
  const appliance = applianceType || 'elektronik';

  let diagnosisDetail = 'Pemeriksaan menyeluruh pada sistem elektrikal, sirkulasi pendingin, dan sensor mekanis unit.';
  let priceEstimate = 'Mulai Rp 75.000 - Rp 150.000 (disesuaikan dengan hasil uji teknis di tempat)';

  const lowerMsg = (message || '').toLowerCase();
  const lowerApp = (applianceType || '').toLowerCase();

  if (lowerApp.includes('ac')) {
    if (lowerMsg.includes('bocor') || lowerMsg.includes('netes') || lowerMsg.includes('air')) {
      diagnosisDetail = 'Tersumbatnya talang pembuangan air kondensasi atau penumpukan lendir/debu tebal pada evaporator. Membutuhkan cuci rutin atau cuci overhaul turun unit.';
      priceEstimate = 'Cuci AC Rutin Rp 75.000 / unit (atau Cuci Overhaul Turun Unit Rp 350.000 jika lendir sangat tebal)';
    } else if (lowerMsg.includes('freon') || lowerMsg.includes('kurang dingin')) {
      diagnosisDetail = 'Kemungkinan penurunan tekanan refrigeran/freon atau kebocoran mikro pada sambungan neple/kondensor.';
      priceEstimate = 'Cuci & Cek Tekanan Rp 75.000 | Perbaikan Kebocoran & Isi Freon mulai Rp 750.000';
    } else if (lowerMsg.includes('mati') || lowerMsg.includes('modul') || lowerMsg.includes('pcb')) {
      diagnosisDetail = 'Potensi gangguan pada rangkaian modul PCB atau komponen relay power starter.';
      priceEstimate = 'Perbaikan Modul PCB Rp 350.000 | Ganti Modul Universal Rp 450.000';
    } else {
      diagnosisDetail = 'Perawatan rutin berkala pembersihan filter, blower indoor, dan kondensor outdoor.';
      priceEstimate = 'Cuci AC Rp 75.000 / unit';
    }
  } else if (lowerApp.includes('kulkas')) {
    diagnosisDetail = 'Kemungkinan kendala pada sistem defrost (bimetal/defrost timer/fuse), relay overload kompresor, atau sirkulasi freon.';
    priceEstimate = 'Estimasi pengecekan & perbaikan: Rp 150.000 - Rp 450.000';
  } else if (lowerApp.includes('mesin cuci')) {
    diagnosisDetail = 'Potensi keausan gearbox, dinamo kapasitor, water level sensor, atau v-belt longgar.';
    priceEstimate = 'Estimasi penanganan: Rp 150.000 - Rp 400.000';
  } else if (lowerApp.includes('showcase')) {
    diagnosisDetail = 'Kipas kondensor mati, sirkulasi udara terhambat, atau kompresor overheat karena akumulasi debu tebal.';
    priceEstimate = 'Estimasi servis showcase toko: Mulai Rp 200.000';
  } else if (lowerApp.includes('freezer')) {
    diagnosisDetail = 'Evaporator tersumbat, kebocoran kapiler freon, atau motor kompresor melemah.';
    priceEstimate = 'Estimasi servis freezer box: Mulai Rp 200.000';
  } else if (lowerApp.includes('dispenser')) {
    diagnosisDetail = 'Elemen pemanas tabung (heater) putus, modul pendingin peltier rusak, atau jalur selang silikon tersumbat kotoran.';
    priceEstimate = 'Estimasi servis dispenser: Mulai Rp 100.000 - Rp 300.000';
  }

  return `Halo ${name}! Terima kasih telah berkonsultasi dengan ${APP_CONFIG.brandName}.

🔍 Analisa Diagnosa Awal:
Untuk kendala ${appliance} dengan gejala "${message || 'pemeriksaan teknis'}":
• ${diagnosisDetail}

💰 Estimasi Biaya Resmi:
• ${priceEstimate}
• Biaya transparan dan selalu dikonfirmasi teknisi sebelum pengerjaan.

📍 Layanan Panggilan:
• Teknisi kami siap meluncur langsung ke rumah Anda di wilayah ${targetArea}.
• Dilindungi GARANSI 1 BULAN untuk jenis perbaikan dan komponen yang sama.`;
}

/**
 * Handle recommendation / AI diagnosis requests
 */
export async function handleRecommendationRequest(req, res) {
  try {
    const { message, applianceType, area, customerName } = req.body || {};

    if (!message && !applianceType) {
      return res.status(400).json({
        success: false,
        error: 'Mohon cantumkan keluhan atau jenis barang elektronik yang ingin dikonsultasikan.'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const fallbackResponse = generateDomainExpertAnalysis(customerName, area, applianceType, message);
      return res.json({
        success: true,
        recommendation: fallbackResponse,
        contact: APP_CONFIG.contact,
        isFallback: true
      });
    }

    const callPromise = (async () => {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemInstruction();

      const userPrompt = `Nama: ${customerName || 'Pelanggan'}
Wilayah: ${area || 'Indramayu / Cirebon / Majalengka'}
Jenis Alat: ${applianceType || 'Elektronik'}
Keluhan: ${message || 'Pemeriksaan rutin'}

Berikan diagnosa awal, estimasi biaya resmi Serviceku, dan ajakan booking WhatsApp dengan sopan & persuasif.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });

      return response.text;
    })();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT_EXCEEDED')), 4000);
    });

    let textOutput = '';
    try {
      textOutput = await Promise.race([callPromise, timeoutPromise]);
    } catch {
      textOutput = generateDomainExpertAnalysis(customerName, area, applianceType, message);
    }

    if (!textOutput) {
      textOutput = generateDomainExpertAnalysis(customerName, area, applianceType, message);
    }

    return res.json({
      success: true,
      recommendation: textOutput,
      contact: APP_CONFIG.contact
    });
  } catch (error) {
    console.error('Error generating recommendation:', error);
    const { customerName, area, applianceType, message } = req.body || {};
    const safeReply = generateDomainExpertAnalysis(customerName, area, applianceType, message);

    return res.json({
      success: true,
      recommendation: safeReply,
      contact: APP_CONFIG.contact,
      isEmergencyFallback: true
    });
  }
}

// REST Handlers for Services
export function handleGetServices(req, res) {
  const services = getServices();
  res.json({ success: true, services });
}

export function handleSaveService(req, res) {
  try {
    const data = req.body || {};
    if (!data.name || !data.price) {
      return res.status(400).json({ success: false, error: 'Nama jasa dan harga wajib diisi.' });
    }

    // Process photo if it is base64
    if (data.image && data.image.startsWith('data:image/')) {
      data.image = saveBase64Image(data.image, 'service');
    }

    const saved = saveService(data);
    res.json({ success: true, service: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export function handleDeleteService(req, res) {
  try {
    const id = req.params?.id || req.query?.id || req.body?.id;
    if (!id) {
      return res.status(400).json({ success: false, error: 'ID jasa tidak ditemukan.' });
    }
    deleteService(id);
    res.json({ success: true, message: 'Jasa berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// REST Handlers for Banners
export function handleGetBanners(req, res) {
  const banners = getBanners();
  res.json({ success: true, banners });
}

export function handleSaveBanner(req, res) {
  try {
    const data = req.body || {};
    if (!data.title || !data.serviceName) {
      return res.status(400).json({ success: false, error: 'Judul banner dan nama jasa wajib diisi.' });
    }

    if (data.image && data.image.startsWith('data:image/')) {
      data.image = saveBase64Image(data.image, 'banner');
    }

    const saved = saveBanner(data);
    res.json({ success: true, banner: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export function handleDeleteBanner(req, res) {
  try {
    const id = req.params?.id || req.query?.id || req.body?.id;
    if (!id) {
      return res.status(400).json({ success: false, error: 'ID banner tidak ditemukan.' });
    }
    deleteBanner(id);
    res.json({ success: true, message: 'Banner berhasil dihapus.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Auth Handlers
export function handleAdminLogin(req, res) {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username dan password wajib diisi.' });
  }
  const result = verifyAdmin(username.trim(), password);
  if (result.success) {
    res.json(result);
  } else {
    res.status(401).json(result);
  }
}

export function handleAdminUpdate(req, res) {
  const { newUsername, newPassword } = req.body || {};
  if (!newUsername || !newPassword) {
    return res.status(400).json({ success: false, error: 'Username dan password baru wajib diisi.' });
  }
  const result = updateAdminCredentials(newUsername.trim(), newPassword);
  res.json(result);
}

// Image upload standalone handler
export function handleImageUpload(req, res) {
  try {
    const { imageBase64, prefix } = req.body || {};
    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'Data gambar tidak ditemukan.' });
    }
    const savedUrl = saveBase64Image(imageBase64, prefix || 'upload');
    res.json({ success: true, url: savedUrl });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// SEO Settings Handlers
export function handleGetSeo(req, res) {
  const seo = getSeoSettings();
  res.json({ success: true, seo });
}

export function handleSaveSeo(req, res) {
  try {
    const data = req.body || {};
    if (!data.metaTitle) {
      return res.status(400).json({ success: false, error: 'Meta title tidak boleh kosong.' });
    }

    if (data.ogImage && data.ogImage.startsWith('data:image/')) {
      data.ogImage = saveBase64Image(data.ogImage, 'seo');
    }

    const updated = saveSeoSettings(data);
    if (APP_CONFIG) {
      APP_CONFIG.seo = updated;
    }
    res.json({ success: true, seo: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

