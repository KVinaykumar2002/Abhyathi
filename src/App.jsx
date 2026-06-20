import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import TestimonialsPage from './pages/TestimonialsPage';
import Contact from './pages/Contact';
import About from './pages/About';
import Account from './pages/Account';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminSiteContentLayout from '@/components/admin/AdminSiteContentLayout';
import AdminContentHome from './pages/admin/content/AdminContentHome';
import AdminContentProducts from './pages/admin/content/AdminContentProducts';
import AdminContentAbout from './pages/admin/content/AdminContentAbout';
import AdminContentContact from './pages/admin/content/AdminContentContact';
import AdminContentStores from './pages/admin/content/AdminContentStores';
import AdminContentTestimonials from './pages/admin/content/AdminContentTestimonials';
import AdminContentSocial from './pages/admin/content/AdminContentSocial';
import AdminContentCatalogue from './pages/admin/content/AdminContentCatalogue';
import Stores from './pages/Stores';
import Catalogue from './pages/Catalogue';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <FloatingWhatsApp />
          <div className="min-h-screen min-w-0 overflow-x-hidden bg-surface-base font-primary text-text-primary">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/account" element={<Account />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="site-content" element={<AdminSiteContentLayout />}>
                  <Route index element={<Navigate to="home" replace />} />
                  <Route path="home" element={<AdminContentHome />} />
                  <Route path="products" element={<AdminContentProducts />} />
                  <Route path="catalogue" element={<AdminContentCatalogue />} />
                  <Route path="about" element={<AdminContentAbout />} />
                  <Route path="contact" element={<AdminContentContact />} />
                  <Route path="stores" element={<AdminContentStores />} />
                  <Route path="testimonials" element={<AdminContentTestimonials />} />
                  <Route path="social" element={<AdminContentSocial />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}
