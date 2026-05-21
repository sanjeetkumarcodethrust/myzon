import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Categories } from './pages/Categories';
import { Deals } from './pages/Deals';
import { Brands } from './pages/Brands';
import { NewArrivals } from './pages/NewArrivals';
import { TrackOrder } from './pages/TrackOrder';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <TopBar />
        <Header />
        <Navigation />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="*" element={<div className="p-8 text-center">Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
