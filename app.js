/**
 * Entry Point cPanel Node.js Selector & Express Server
 * Project: Serviceku - World-Class Business Website
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { 
  handleRecommendationRequest,
  handleGetServices,
  handleSaveService,
  handleDeleteService,
  handleGetBanners,
  handleSaveBanner,
  handleDeleteBanner,
  handleAdminLogin,
  handleAdminUpdate,
  handleImageUpload,
  handleGetSeo,
  handleSaveSeo
} from './apiHandler.js';
import { APP_CONFIG } from './appConfig.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (Large limit for base64 photo uploads)
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Basic Security & CORS Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Static Uploads Folder
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: APP_CONFIG.brandName,
    businessType: APP_CONFIG.businessType,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Dynamic Whitelabel Config endpoint
app.get('/api/config', (req, res) => {
  res.json({ success: true, config: APP_CONFIG });
});

// AI Gemini Recommendation & Diagnosis Endpoint
app.post('/api/recommendation', handleRecommendationRequest);

// Services CRUD
app.get('/api/services', handleGetServices);
app.post('/api/services', handleSaveService);
app.put('/api/services/:id', handleSaveService);
app.delete('/api/services/:id', handleDeleteService);

// Banners CRUD
app.get('/api/banners', handleGetBanners);
app.post('/api/banners', handleSaveBanner);
app.put('/api/banners/:id', handleSaveBanner);
app.delete('/api/banners/:id', handleDeleteBanner);

// Admin Auth
app.post('/api/auth/login', handleAdminLogin);
app.post('/api/auth/update', handleAdminUpdate);

// Upload API
app.post('/api/upload', handleImageUpload);

// SEO Settings
app.get('/api/seo', handleGetSeo);
app.post('/api/seo', handleSaveSeo);

// Determine static build directory (supports root /dist and monorepo /client/dist)
let staticPath = path.join(__dirname, 'dist');
if (!fs.existsSync(staticPath) && fs.existsSync(path.join(__dirname, 'client', 'dist'))) {
  staticPath = path.join(__dirname, 'client', 'dist');
}

// Serve static assets if build directory exists
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));

  // SPA Catch-All fallback to prevent 404 on refresh in cPanel
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>${APP_CONFIG.brandName} - Backend Running</title></head>
        <body style="font-family: sans-serif; padding: 40px; text-align: center; background: #FAF8F5;">
          <h1>${APP_CONFIG.brandName} Backend Service Active</h1>
          <p>${APP_CONFIG.tagline}</p>
          <p>Please run <code>npm run build</code> to compile the client application.</p>
        </body>
      </html>
    `);
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Serviceku Server] Listening on port ${PORT}`);
  console.log(`[Serviceku Server] Environment: ${process.env.NODE_ENV || 'production'}`);
});

export default app;
