import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
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

// Plugin to mount Express API router during Vite development
function apiDevPlugin(): Plugin {
  return {
    name: 'serviceku-api-dev-server',
    configureServer(server) {
      const apiApp = express();
      apiApp.use(express.json({ limit: '25mb' }));
      apiApp.use(express.urlencoded({ extended: true, limit: '25mb' }));

      // Serve uploaded files
      apiApp.use('/uploads', express.static(path.resolve(__dirname, 'public', 'uploads')));

      apiApp.get('/api/health', (req, res) => {
        res.json({
          status: 'ok',
          brand: APP_CONFIG.brandName,
          timestamp: new Date().toISOString()
        });
      });

      apiApp.get('/api/config', (req, res) => {
        res.json({ success: true, config: APP_CONFIG });
      });

      // AI Recommendation
      apiApp.post('/api/recommendation', handleRecommendationRequest);

      // Services CRUD
      apiApp.get('/api/services', handleGetServices);
      apiApp.post('/api/services', handleSaveService);
      apiApp.put('/api/services/:id', handleSaveService);
      apiApp.delete('/api/services/:id', handleDeleteService);

      // Banners CRUD
      apiApp.get('/api/banners', handleGetBanners);
      apiApp.post('/api/banners', handleSaveBanner);
      apiApp.put('/api/banners/:id', handleSaveBanner);
      apiApp.delete('/api/banners/:id', handleDeleteBanner);

      // Admin Auth
      apiApp.post('/api/auth/login', handleAdminLogin);
      apiApp.post('/api/auth/update', handleAdminUpdate);

      // Upload API
      apiApp.post('/api/upload', handleImageUpload);

      // SEO Settings
      apiApp.get('/api/seo', handleGetSeo);
      apiApp.post('/api/seo', handleSaveSeo);

      server.middlewares.use(apiApp);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
