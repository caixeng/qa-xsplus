import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './pages/Home';
import { MaterialCalculator } from './pages/MaterialCalculator';
import { TechnicalHub } from './pages/TechnicalHub';
import { ProductCatalog } from './pages/ProductCatalog';
import { ProductDetail } from './pages/ProductDetail';
import { DealerPortal } from './pages/DealerPortal';
import { NotFound } from './pages/NotFound';
import { BlogHub } from './pages/BlogHub';
import { BlogPost } from './pages/BlogPost';
import { PolicyPage } from './pages/PolicyPage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import Tracking from './components/Tracking';
import { AIChatWidget } from './components/AIChatWidget';

function App() {
  return (
    <Router>
      <Tracking />
      <Toaster position="top-right" toastOptions={{
        className: 'font-sans font-medium',
        style: {
          background: '#1a1c1c',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#FF6600',
            secondary: '#fff',
          },
        },
      }} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/san-pham/:id" element={<ProductDetail />} />
          <Route path="/calculator" element={<MaterialCalculator />} />
          <Route path="/technical" element={<TechnicalHub />} />
          <Route path="/portal" element={<DealerPortal />} />
          <Route path="/tin-tuc" element={<BlogHub />} />
          <Route path="/tin-tuc/:id" element={<BlogPost />} />
          <Route path="/chinh-sach" element={<PolicyPage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/du-an" element={<ProjectsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <FloatingContact />
      <AIChatWidget />
    </Router>
  );
}

export default App;
