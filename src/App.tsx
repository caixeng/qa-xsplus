import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { FloatingContact } from './components/FloatingContact';
import { AIChatWidget } from './components/AIChatWidget';
import Tracking from './components/Tracking';

// Eager — above the fold, kritik cho LCP
import { Home } from './pages/Home';
import { ProductCatalog } from './pages/ProductCatalog';

// Lazy — các trang ít traffic hơn hoặc nặng
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const MaterialCalculator = lazy(() => import('./pages/MaterialCalculator').then(m => ({ default: m.MaterialCalculator })));
const TechnicalHub = lazy(() => import('./pages/TechnicalHub').then(m => ({ default: m.TechnicalHub })));
const DealerPortal = lazy(() => import('./pages/DealerPortal').then(m => ({ default: m.DealerPortal })));
const BlogHub = lazy(() => import('./pages/BlogHub').then(m => ({ default: m.BlogHub })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const PolicyPage = lazy(() => import('./pages/PolicyPage').then(m => ({ default: m.PolicyPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-brand-orange/30 border-t-brand-orange rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <Tracking />
      <Toaster position="top-right" toastOptions={{
        className: 'font-sans font-medium',
        style: { background: '#1a1c1c', color: '#fff' },
        success: { iconTheme: { primary: '#FF6600', secondary: '#fff' } },
      }} />
      <Layout>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
      <FloatingContact />
      <AIChatWidget />
    </Router>
  );
}

export default App;
