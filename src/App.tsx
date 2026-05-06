import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './pages/Home';
import { MaterialCalculator } from './pages/MaterialCalculator';
import { TechnicalHub } from './pages/TechnicalHub';
import { ProductCatalog } from './pages/ProductCatalog';
import { DealerPortal } from './pages/DealerPortal';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/calculator" element={<MaterialCalculator />} />
          <Route path="/technical" element={<TechnicalHub />} />
          <Route path="/portal" element={<DealerPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <FloatingContact />
    </Router>
  );
}

export default App;
