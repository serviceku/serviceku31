/**
 * Configuration-Driven Whitelabel System (appConfig.js)
 * Serviceku - Jasa Service Elektronik Profesional Panggilan
 */

export const APP_CONFIG = {
  brandName: "Serviceku",
  legalName: "Serviceku Elektronik Terbaik",
  businessType: "Jasa Service Elektronik",
  tagline: "Jasa Service Elektronik Profesional Panggilan",
  description: "Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser. Teknisi jujur, cepat & langsung datang ke rumah Anda di Indramayu, Cirebon, & Majalengka.",
  subTagline: "Spesialis Pendingin & Mesin Elektronik Bergaransi 1 Bulan",
  
  themeColor: {
    primary: "#0F172A",     // Dark Executive Slate
    secondary: "#1E293B",   // Deep Navy Accent
    accent: "#D4AF37",      // Gold Luxury Accent
    accentBlue: "#0284C7",  // Cobalt Electric Blue
    bgLight: "#FAF8F5",     // Warm Neutral Ivory
    cardBg: "#FFFFFF"       // Clean White
  },

  contact: {
    whatsapp: "+62 878-7441-7978",
    whatsappRaw: "6287874417978",
    phoneDisplay: "0878-7441-7978",
    email: "serviceku31@gmail.com",
    address: "Jl. By Pass Binaria - Bondan (Panggilan Indramayu, Cirebon, Majalengka)",
    areas: [
      { name: "Indramayu", desc: "Kota, Jatibarang, Karangampel, Haurgeulis & sekitarnya" },
      { name: "Cirebon", desc: "Kota & Kabupaten Cirebon, Kedawung, Sumber, Arjawinangun & sekitarnya" },
      { name: "Majalengka", desc: "Kota, Jatiwangi, Kadipaten, Kertajati & sekitarnya" }
    ],
    operationalHours: "Senin - Minggu: 07.30 - 20.00 WIB (Siap Panggilan Hari Ini)",
    warrantyTerms: "Garansi service 1 bulan untuk kerusakan yang sama"
  },

  heroImage: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1600&auto=format&fit=crop",

  // SEO & Social Media Metadata Settings
  seo: {
    metaTitle: "Serviceku - Jasa Service Elektronik Profesional Panggilan",
    metaDescription: "Melayani Perbaikan AC, Kulkas, Mesin Cuci, Showcase, Freezer Box & Dispenser. Teknisi jujur, cepat & langsung datang ke rumah Anda di Indramayu, Cirebon, & Majalengka.",
    ogImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    keywords: "service ac, service kulkas, service mesin cuci, indramayu, cirebon, majalengka, teknisi panggilan, serviceku",
    siteName: "Serviceku"
  },
  
  // Keunggulan Layanan / Value Propositions
  advantages: [
    {
      id: "garansi",
      title: "Garansi Service 1 Bulan",
      description: "Jaminan proteksi pengerjaan penuh selama 30 hari untuk kerusakan yang sama tanpa biaya teknisi tambahan.",
      badge: "Garansi Pasti",
      icon: "ShieldCheck"
    },
    {
      id: "teknisi",
      title: "Teknisi Jujur & Berpengalaman",
      description: "Teknisi ahli bersertifikasi, sopan, amanah, dan selalu mengutamakan perbaikan komponen terbaik tanpa tipu-tipu.",
      badge: "Terpercaya",
      icon: "UserCheck"
    },
    {
      id: "responsif",
      title: "Cepat & Langsung Datang",
      description: "Layanan panggilan cepat langsung ke rumah, kantor, toko, atau resto Anda di Indramayu, Cirebon, & Majalengka.",
      badge: "On Time",
      icon: "Clock"
    },
    {
      id: "sparepart",
      title: "Sparepart Original Berkualitas",
      description: "Kami hanya menyediakan suku cadang asli dan grade terbaik agar peralatan elektronik Anda awet jangka panjang.",
      badge: "100% Original",
      icon: "Cpu"
    }
  ],

  // Produk / Layanan Utama
  products: [
    {
      id: "ac-service",
      category: "Pendingin Ruangan",
      name: "Service & Perawatan AC Lengkap",
      tag: "Best Seller",
      price: "Mulai Rp 75.000",
      priceNote: "Cuci rutin Rp 75.000 | Overhaul turun unit Rp 350.000",
      description: "Solusi lengkap AC kurang dingin, bocor air, bau apek, berisik, atau mati total. Melayani AC Split, Inverter, Cassette, & Standing.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Cuci AC Berkala Rp 75.000",
        "Cuci Overhaul Turun Unit Rp 350.000",
        "Pasang AC Rp 350.000 / Bongkar AC Rp 250.000",
        "Perbaikan Kebocoran & Isi Freon Rp 750.000",
        "Perbaikan Module PCB AC Rp 350.000",
        "Ganti Modul Universal Rp 450.000"
      ]
    },
    {
      id: "kulkas-service",
      category: "Pendingin Makanan",
      name: "Service Kulkas 1 Pintu, 2 Pintu & Side by Side",
      tag: "Spesialis Kompresor",
      price: "Mulai Rp 150.000",
      priceNote: "Pengecekan teknis akurat di tempat",
      description: "Perbaikan kulkas tidak dingin, freezer membeku sebagian, bau terbakar, kompresor macet, dan pengisian freon R134a / R600a.",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Pengecekan Kebocoran Jalur Freon",
        "Penggantian Relay, Overload & Defrost Timer",
        "Service Kompresor Kulkas & Inverter",
        "Pergantian Karet Pintu & Thermostat Suhu",
        "Pengerjaan Langsung di Lokasi Anda"
      ]
    },
    {
      id: "mesin-cuci-service",
      category: "Mesin Elektronik",
      name: "Service Mesin Cuci Front & Top Loading",
      tag: "Semua Merk",
      price: "Mulai Rp 150.000",
      priceNote: "Tergantung komponen & model unit",
      description: "Menangani mesin cuci mati total, error digital, tidak mau berputar/memeras, air tidak mengalir masuk, atau pembuangan bocor.",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Mesin Cuci Front Loading & Top Loading Otomatis",
        "Mesin Cuci 2 Tabung (Manual)",
        "Ganti Gearbox, Dinamo, Kapasitor & Water Level Sensor",
        "Perbaikan Modul Komputer / PCB Kontrol",
        "Pembersihan Kerak Tabung Dalam (Deep Cleaning)"
      ]
    },
    {
      id: "showcase-service",
      category: "Pendingin Komersil",
      name: "Service Showcase Pendingin Minuman",
      tag: "Solusi Usaha",
      price: "Mulai Rp 200.000",
      priceNote: "Cepat agar bisnis minuman tetap jalan",
      description: "Perbaikan showcase display toko/minimarket yang tidak dingin, kipas fan mati, kaca berembun parah, atau kompresor overheat.",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Service Cepat untuk Kebutuhan Toko & Cafe",
        "Flushing Pipa Kondensor & Ganti Filter Drier",
        "Penggantian Kipas Blower & Kipas Kondensor",
        "Isi Freon & Setting Thermostat Digital",
        "Prioritas Panggilan Darurat Usaha"
      ]
    },
    {
      id: "freezer-service",
      category: "Pendingin Beku",
      name: "Service Freezer Box / Deep Freezer",
      tag: "Heavy Duty",
      price: "Mulai Rp 200.000",
      priceNote: "Penanganan cepat cegah stok daging/es rusak",
      description: "Perbaikan chest freezer dan standing freezer untuk daging, es krim, ASI, atau seafood. Mengatasi kompresor macet & kebocoran evaporator.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Perbaikan Pembekuan yang Tidak Maksimal",
        "Pengelasan Kebocoran Evaporator Alumunium / Tembaga",
        "Ganti Kompresor Baru Bergaransi",
        "Vakum Ulang & Pengisian Freon Standar Pabrik",
        "Tes Uji Tekanan & Arus Ampere Listrik"
      ]
    },
    {
      id: "dispenser-service",
      category: "Elektronik Rumah Tangga",
      name: "Service Dispenser Galon Bawah & Atas",
      tag: "Higienis",
      price: "Mulai Rp 100.000",
      priceNote: "Pembersihan pipa & perbaikan elektrik",
      description: "Perbaikan air panas tidak mendidih, air dingin tidak dingin, kran air menetes/bocor, suara dengung bising, atau pompa galon bawah mati.",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
      features: [
        "Dispenser Galon Atas & Galon Bawah Modern",
        "Penggantian Elemen Pemanas / Heater Tabung",
        "Service Pendingin Kompresor & Modul Peltier",
        "Pergantian Pompa Air Otomatis & Selang Silikon Food-Grade",
        "Sterilisasi Pipa & Tangki Higienis"
      ]
    }
  ],

  // Galeri Dokumentasi Pekerjaan
  gallery: [
    {
      id: "gal-1",
      title: "Perawatan Cuci AC Rumah & Kantor",
      category: "Service AC",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      caption: "Pembersihan evaporator AC bertekanan tinggi dengan perlindungan terpal anti-bocor di ruangan."
    },
    {
      id: "gal-2",
      title: "Diagnosa Kelistrikan & Kompresor Kulkas",
      category: "Service Kulkas",
      image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=1200&auto=format&fit=crop",
      caption: "Pengecekan akurat tekanan freon dan sistem defrost kulkas 2 pintu inverter."
    },
    {
      id: "gal-3",
      title: "Perbaikan Modul & Mekanikal Mesin Cuci",
      category: "Mesin Cuci",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1200&auto=format&fit=crop",
      caption: "Penggantian modul dan perbaikan bearing mesin cuci front-loading pelanggan di Cirebon."
    },
    {
      id: "gal-4",
      title: "Service Kompresor Showcase Minimarket",
      category: "Showcase & Freezer",
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1200&auto=format&fit=crop",
      caption: "Flushing jalur pendingin dan pengisian freon showcase minuman dingin cepat."
    },
    {
      id: "gal-5",
      title: "Teknisi Profesional dengan Peralatan Lengkap",
      category: "Teknisi Handal",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1200&auto=format&fit=crop",
      caption: "Peralatan manifold digital, las tembaga, dan vacuum pump berstandar industri."
    },
    {
      id: "gal-6",
      title: "Uji Tekanan & Kalibrasi Suhu Digital",
      category: "Quality Control",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
      caption: "Pengecekan suhu akhir dan watt meter sebelum serah terima kepada pemilik rumah."
    }
  ],

  // Testimoni Pelanggan
  testimonials: [
    {
      id: "testi-1",
      name: "Hj. Siti Rohmah",
      location: "Jatibarang, Indramayu",
      service: "Cuci AC & Perbaikan Freon",
      rating: 5,
      comment: "AC di kamar utama bocor air dan tidak dingin sama sekali. Teknisi Serviceku datang cepat 30 menit setelah saya WA. Pengerjaannya sangat bersih, rapi, dan sekarang dinginnya nusuk lagi. Harganya transparan sesuai kesepakatan!",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "testi-2",
      name: "Bpk. Hendra Gunawan",
      location: "Kedawung, Cirebon",
      service: "Service Kulkas 2 Pintu Inverter",
      rating: 5,
      comment: "Kulkas dua pintu mati dingin bagian bawah, sempat bingung panggil teknisi mana. Rekomendasi tetangga pakai Serviceku. Teknisi ramah, jujur jelasin kerusakan defrost, dan ada garansi 1 bulan tertulis. Sangat memuaskan!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "testi-3",
      name: "Ibu Rina Kartika",
      location: "Kadipaten, Majalengka",
      service: "Service Mesin Cuci Front Loading",
      rating: 5,
      comment: "Mesin cuci front loading error kode OE dan bergetar hebat. Ditangani oleh mas teknisi yang sangat profesional. Sparepart diganti yang original di depan saya langsung. Sekarang cuci baju lancar lagi tanpa khawatir.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: "testi-4",
      name: "Ko Asep Wijaya",
      location: "Karangampel, Indramayu",
      service: "Service Showcase Toko Kelontong",
      rating: 5,
      comment: "Showcase minuman di warung mati mendadak saat siang hari. Langsung respon cepat datang ke lokasi, diganti relay dan diisi freon baru. Bisnis minuman terselamatkan, terima kasih Serviceku!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
    }
  ],

  // Frequently Asked Questions (FAQ)
  faq: [
    {
      id: "faq-1",
      question: "Berapa lama teknisi Serviceku bisa tiba di lokasi rumah saya?",
      answer: "Untuk wilayah Indramayu, Cirebon, dan Majalengka, teknisi kami siap datang dalam waktu 30 hingga 90 menit setelah jadwal pemesanan dikonfirmasi via WhatsApp (tergantung antrean dan jarak tempuh)."
    },
    {
      id: "faq-2",
      question: "Bagaimana ketentuan garansi 1 bulan Serviceku?",
      answer: "Kami memberikan garansi pengerjaan selama 30 hari penuh untuk jenis kerusakan dan komponen yang sama. Jika muncul keluhan yang sama dalam masa garansi, teknisi kami akan datang dan memperbaiki kembali tanpa biaya teknisi tambahan."
    },
    {
      id: "faq-3",
      question: "Berapa rincian biaya cuci dan perbaikan AC?",
      answer: "Cuci AC berkala Rp 75.000, cuci overhaul turun unit Rp 350.000, pasang AC Rp 350.000, bongkar AC Rp 250.000, perbaikan kebocoran freon mulai Rp 750.000, dan perbaikan modul PCB mulai Rp 350.000. Teknisi selalu menginfokan estimasi biaya sebelum mulai pengerjaan."
    },
    {
      id: "faq-4",
      question: "Apakah peralatan elektronik harus dibawa ke bengkel?",
      answer: "Sebagian besar perbaikan (95%) dikerjakan langsung di tempat (rumah, kantor, ruko) Anda di depan Anda secara transparan. Unit hanya perlu dibawa ke workshop apabila memerlukan overhaul turun unit total atau perbaikan jalur pipa khusus."
    },
    {
      id: "faq-5",
      question: "Bagaimana cara memesan teknisi panggilan Serviceku?",
      answer: "Sangat mudah! Cukup klik tombol 'Hubungi WhatsApp' atau gunakan fitur Konsultasi AI di website ini. Kirimkan foto/video kendala barang elektronik Anda dan alamat lengkap, kami segera jadwalkan kedatangan teknisi."
    }
  ]
};
