import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollToTop } from './components/ScrollToTop';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { LanguageProvider, useLanguage } from './lib/language';

const Work = lazy(() => import('./pages/Work').then((m) => ({ default: m.Work })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const Studio = lazy(() => import('./pages/Studio').then((m) => ({ default: m.Studio })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));

function Main() {
  const { lang } = useLanguage();

  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <SmoothScroll>
          <ScrollToTop />
          <Nav />
          <Main />
          <Footer />
        </SmoothScroll>
      </BrowserRouter>
    </LanguageProvider>
  );
}
