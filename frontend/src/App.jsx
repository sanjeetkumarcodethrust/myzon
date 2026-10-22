import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PincodeModal } from './components/PincodeModal';
import { LoginModal } from './components/LoginModal';
import { AmazonDrawer } from './components/AmazonDrawer';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Categories } from './pages/Categories';
import { Deals } from './pages/Deals';
import { Brands } from './pages/Brands';
import { NewArrivals } from './pages/NewArrivals';
import { TrackOrder } from './pages/TrackOrder';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { ProductDetail } from './pages/ProductDetail';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0b0e] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
        <TopBar />
        <Header />
        <Navigation />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<div className="p-16 text-center text-lg font-bold">Page Not Found</div>} />
          </Routes>
        </main>
        
        <Footer />
        <PincodeModal />
        <LoginModal />
        <AmazonDrawer />
        <Toast />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
