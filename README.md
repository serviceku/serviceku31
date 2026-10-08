# Serviceku - World-Class Business Website (Mobile-First & cPanel Ready)

Aplikasi web bisnis kelas atas (*Luxury & Enterprise-Grade*) untuk **Serviceku - Jasa Service Elektronik Profesional Panggilan** (AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser) di wilayah **Indramayu, Cirebon, dan Majalengka**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19+ (Vite), Tailwind CSS, Google Font "Plus Jakarta Sans", Lucide React Icons
- **Backend:** Express.js (Node.js ES Modules) + SDK Resmi Google Gen AI (`@google/genai`)
- **AI Engine:** Google Gemini Flash (`gemini-3.8-flash`) untuk konsultasi & diagnosa gejala elektronik
- **Konfigurasi Whitelabel:** Single Source of Truth melalui `appConfig.js`
- **Hosting Target:** cPanel Shared Hosting (Node.js Selector Satelitweb) & Google Cloud Run / AI Studio

---

## 📁 Struktur Monorepo

```
├── appConfig.js          # SSoT Konfigurasi Dinamis (Kontak, Produk, Tarif, Tema, FAQ, Testimoni)
├── apiHandler.js         # Logika Backend Integrasi Google Gen AI (@google/genai)
├── app.js                # Entry Point cPanel Node.js Selector & Express Server
├── server.js             # Entry Point server alias
├── package.json          # Root scripts & dependencies (Express, @google/genai, React, Vite)
├── index.html            # Entry Point HTML dengan Plus Jakarta Sans & SEO Meta
├── vite.config.ts        # Vite configuration + API Development Middleware
├── src/                  # Source Code Frontend Terpadu
│   ├── components/       # Komponen UI (Navbar, Hero, Services, Gallery, AI Modal, Tarif AC)
│   ├── utils/            # WhatsApp link builder & sanitizers
│   ├── App.tsx           # Aplikasi React Utama
│   └── main.tsx          # React Root Mounting
├── client/               # Salinan Client Mandiri (Sesuai Konvensi Monorepo)
│   ├── package.json
│   ├── index.html
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx
│       └── main.jsx
└── README.md             # Panduan Teknis & Deployment
```

---

## 🚀 Pengujian & Menjalankan di Komputer Lokal (Localhost)

### 1. Prasyarat:
- Node.js versi 18.x atau 20.x atau 22.x
- NPM versi 9+

### 2. Konfigurasi Variabel Lingkungan (.env):
Salin file `.env.example` menjadi `.env` lalu masukkan API Key Google Gemini:
```bash
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```

### 3. Instalasi Dependensi:
```bash
npm install
```

### 4. Menjalankan Server Pengembangan:
```bash
npm run dev
```
Akses aplikasi melalui peramban di: `http://localhost:3000`

---

## 🌐 Panduan Deployment di cPanel (Node.js Selector Satelitweb)

Sistem ini dirancang **100% cPanel Ready** tanpa perlu modifikasi kode:

### Langkah 1: Build Frontend Assets
Sebelum mengunggah ke cPanel, lakukan kompilasi aset statis frontend:
```bash
npm run build
```
Perintah ini akan menghasilkan folder `/dist`.

### Langkah 2: Unggah Berkas ke cPanel
1. Masuk ke **cPanel Satelitweb** -> Buka menu **File Manager**.
2. Buat direktori aplikasi, misalnya `/home/username/serviceku` atau di dalam `public_html` / subdomain.
3. Unggah seluruh berkas inti berikut:
   - `dist/` (hasil build frontend)
   - `app.js`
   - `server.js`
   - `apiHandler.js`
   - `appConfig.js`
   - `package.json`
   - `.env`

### Langkah 3: Setup Node.js Selector di cPanel
1. Di cPanel, cari dan klik menu **Setup Node.js App** (Node.js Selector).
2. Klik tombol **Create Application**.
3. Atur parameter berikut:
   - **Node.js version**: Pilih versi **18.x**, **20.x**, atau **22.x** (LTS).
   - **Application mode**: Pilih **Production**.
   - **Application root**: Masukkan path folder aplikasi Anda (contoh: `serviceku`).
   - **Application URL**: Pilih domain atau subdomain Anda.
   - **Application startup file**: Isi dengan `app.js`.
4. Klik tombol **Create**.

### Langkah 4: Install NPM Packages & Restart
1. Pada halaman aplikasi Node.js cPanel, klik tombol **Run NPM Install** (atau jalankan `npm install --omit=dev` via terminal SSH cPanel).
2. Di bagian **Environment Variables**, tambahkan:
   - `GEMINI_API_KEY` = *[API Key Gemini Anda]*
   - `NODE_ENV` = `production`
3. Klik tombol **Save** dan **Restart**.
4. Website Serviceku kini sudah aktif secara live di domain Anda!

---

## 🛡️ Fitur Unggulan Bisnis

1. **Mobile First Ultra Responsif:** Dioptimalkan secara sempurna untuk layar smartphone pelanggan dengan sticky bar konversi di bagian bawah (Tarif AC, Tanya AI, Chat WhatsApp).
2. **Konsultasi AI Cerdas:** Menggunakan model `gemini-3.8-flash` resmi dari `@google/genai` untuk mendiagnosa keluhan elektronik dan merekomendasikan estimasi tarif sebelum teknisi berangkat.
3. **Konversi WhatsApp 1-Klik:** Tombol pemesanan langsung memformat rincian alamat, jenis alat, dan kendala pelanggan ke WhatsApp `0878-7441-7978`.
4. **Zero Broken Image:** Dilengkapi komponen `SafeImage` dengan fallback otomatis ke aset cadangan berkualitas tinggi.
5. **Garansi 1 Bulan & Transparansi Tarif:** Seluruh rincian tarif AC (mulai Rp 75.000) dan ketentuan garansi tertulis secara transparan.

---

© 2026 Serviceku Elektronik Terbaik • Standard Satelitweb Production Grade.
