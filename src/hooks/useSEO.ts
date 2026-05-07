import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const SITE_NAME = 'XS Plus';
const DEFAULT_OG_IMAGE = 'https://xsplus.vn/og-image.jpg';

export const useSEO = ({ title, description, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', value);
    };

    if (description) {
      setMeta('meta[name="description"]', description);
      setMeta('meta[property="og:description"]', description);
      setMeta('meta[property="twitter:description"]', description);
    }

    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="twitter:title"]', fullTitle);

    if (canonical) {
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute('href', canonical);
    }

    if (ogImage) {
      setMeta('meta[property="og:image"]', ogImage);
    } else {
      setMeta('meta[property="og:image"]', DEFAULT_OG_IMAGE);
    }

    return () => {
      document.title = 'Trần Nhôm XS Plus | Nhà Máy Sản Xuất Tại Hà Tĩnh - Phân Phối Toàn Quốc';
    };
  }, [title, description, canonical, ogImage]);
};
