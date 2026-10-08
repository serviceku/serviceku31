import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { APP_CONFIG } from './appConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');
const BANNERS_FILE = path.join(DATA_DIR, 'banners.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const SEO_FILE = path.join(DATA_DIR, 'seo.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

function readJsonFile(filePath, defaultValue = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), 'utf-8');
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultValue;
  }
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Services CRUD
export function getServices() {
  return readJsonFile(SERVICES_FILE, []);
}

export function saveService(serviceData) {
  const services = getServices();
  const id = serviceData.id || `srv-${Date.now()}`;
  const newService = {
    ...serviceData,
    id,
    createdAt: serviceData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const existingIndex = services.findIndex(s => s.id === id);
  if (existingIndex >= 0) {
    services[existingIndex] = { ...services[existingIndex], ...newService };
  } else {
    services.unshift(newService);
  }

  writeJsonFile(SERVICES_FILE, services);
  return newService;
}

export function deleteService(id) {
  const services = getServices();
  const filtered = services.filter(s => s.id !== id);
  writeJsonFile(SERVICES_FILE, filtered);
  return true;
}

// Banners CRUD
export function getBanners() {
  return readJsonFile(BANNERS_FILE, []);
}

export function saveBanner(bannerData) {
  const banners = getBanners();
  const id = bannerData.id || `banner-${Date.now()}`;
  const newBanner = {
    ...bannerData,
    id,
    createdAt: bannerData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const existingIndex = banners.findIndex(b => b.id === id);
  if (existingIndex >= 0) {
    banners[existingIndex] = { ...banners[existingIndex], ...newBanner };
  } else {
    banners.unshift(newBanner);
  }

  writeJsonFile(BANNERS_FILE, banners);
  return newBanner;
}

export function deleteBanner(id) {
  const banners = getBanners();
  const filtered = banners.filter(b => b.id !== id);
  writeJsonFile(BANNERS_FILE, filtered);
  return true;
}

// Admin Auth
export function verifyAdmin(username, password) {
  const admin = readJsonFile(ADMIN_FILE, { username: 'admin', password: 'admin123' });
  if (admin.username === username && admin.password === password) {
    return { success: true, username: admin.username, token: `auth-${Date.now()}-${Math.random().toString(36).slice(2)}` };
  }
  return { success: false, error: 'Username atau Password salah!' };
}

export function updateAdminCredentials(newUsername, newPassword) {
  const admin = {
    username: newUsername || 'admin',
    password: newPassword || 'admin123',
    updatedAt: new Date().toISOString()
  };
  writeJsonFile(ADMIN_FILE, admin);
  return { success: true, username: admin.username };
}

// Upload image handler (supports Base64 data strings)
export function saveBase64Image(base64Data, filenamePrefix = 'img') {
  try {
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      // Return as is if already a normal URL
      if (base64Data.startsWith('http://') || base64Data.startsWith('https://')) {
        return base64Data;
      }
      return base64Data;
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    let ext = 'jpg';
    if (mimeType.includes('png')) ext = 'png';
    else if (mimeType.includes('webp')) ext = 'webp';
    else if (mimeType.includes('gif')) ext = 'gif';

    const filename = `${filenamePrefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${filename}`;
  } catch (err) {
    console.error('Error saving image:', err);
    return base64Data;
  }
}

// SEO Settings CRUD
export function getSeoSettings() {
  const defaultSeo = APP_CONFIG?.seo || {
    metaTitle: "Serviceku - Jasa Service Elektronik Profesional Panggilan",
    metaDescription: "Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser. Teknisi jujur, cepat & langsung datang ke rumah Anda di Indramayu, Cirebon, & Majalengka.",
    ogImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    keywords: "service ac, service kulkas, service mesin cuci, indramayu, cirebon, majalengka, teknisi panggilan, serviceku",
    siteName: "Serviceku"
  };
  const loaded = readJsonFile(SEO_FILE, defaultSeo);
  if (APP_CONFIG) {
    APP_CONFIG.seo = loaded;
  }
  return loaded;
}

export function saveSeoSettings(seoData) {
  const current = getSeoSettings();
  const updated = {
    ...current,
    ...seoData,
    updatedAt: new Date().toISOString()
  };
  writeJsonFile(SEO_FILE, updated);
  if (APP_CONFIG) {
    APP_CONFIG.seo = updated;
  }
  return updated;
}

