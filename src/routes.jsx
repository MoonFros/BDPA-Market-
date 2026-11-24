import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ShopsPage from './pages/ShopsPage';
import ShopStorefront from './pages/ShopStorefront';
import ProductDetail from './pages/ProductDetail';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import OwnersPage from './pages/OwnersPage';
import NotFound from './pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shops" element={<ShopsPage />} />
        <Route path="shops/:shopSlug" element={<ShopStorefront />} />
        <Route path="shops/:shopSlug/product/:productId" element={<ProductDetail />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="owners" element={<OwnersPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
