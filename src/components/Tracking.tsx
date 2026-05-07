import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ─── Global helpers ────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Gửi một sự kiện tùy chỉnh lên GA4 + Meta Pixel — dùng từ bất kỳ component nào */
export const trackEvent = (action: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', action, params);
  window.fbq?.('trackCustom', action, params);
};

/** Track Lead / Quote request */
export const trackLead = (source: string) => {
  window.gtag?.('event', 'generate_lead', { source });
  window.fbq?.('track', 'Lead', { source });
};

/** Track xem sản phẩm */
export const trackViewProduct = (productId: string, productName: string) => {
  trackEvent('view_item', { item_id: productId, item_name: productName, item_category: 'Trần Nhôm' });
};

/** Track mở Quote Modal */
export const trackOpenQuoteModal = (source: string) => {
  trackEvent('open_quote_modal', { source });
  window.fbq?.('track', 'InitiateCheckout', { source });
};

/** Track dùng Calculator */
export const trackCalculatorUsed = (areM2: number, productType: string) => {
  trackEvent('calculator_used', { area_m2: areM2, product_type: productType });
};

/** Track mở AI Chat */
export const trackAIChatOpened = () => {
  trackEvent('ai_chat_opened');
};

/** Track mở Zalo */
export const trackZaloClick = (source: string) => {
  trackEvent('zalo_click', { source });
  window.fbq?.('track', 'Contact', { method: 'zalo', source });
};

// ─── Main Tracking Component ───────────────────────────────────────────────
export default function Tracking() {
  const location = useLocation();

  // Inject scripts once on mount
  useEffect(() => {
    // Google Analytics 4
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaId && !document.querySelector(`script[src*="${gaId}"]`)) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { send_page_view: false });
      `;
      document.head.appendChild(script2);
    }

    // Meta Pixel
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (pixelId && !window.fbq) {
      const script3 = document.createElement('script');
      script3.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
      `;
      document.head.appendChild(script3);
    }
  }, []);

  // Track pageview on every route change
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const path = location.pathname + location.search;

    // GA4 page_view
    if (gaId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
      });
    }

    // Meta Pixel PageView
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
}

