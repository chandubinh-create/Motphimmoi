
import React, { useState, useEffect } from 'react';
// Add Link to the imports from react-router-dom to fix errors on lines 69, 79-82
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('motphim_user');
    return savedUser ? JSON.parse(savedUser) : { username: '', isLoggedIn: false, favorites: [] };
  });

  useEffect(() => {
    localStorage.setItem('motphim_user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (username: string) => {
    setUser(prev => ({ ...prev, username, isLoggedIn: true }));
  };

  const handleLogout = () => {
    setUser({ username: '', isLoggedIn: false, favorites: [] });
  };

  const handleToggleFavorite = (slug: string) => {
    if (!user.isLoggedIn) {
      alert("Bạn cần đăng nhập để sử dụng tính năng này!");
      return;
    }
    
    setUser(prev => {
      const isFav = prev.favorites.includes(slug);
      const newFavs = isFav 
        ? prev.favorites.filter(s => s !== slug) 
        : [...prev.favorites, slug];
      return { ...prev, favorites: newFavs };
    });
  };

  const isFavorite = (slug: string) => {
      return user.favorites.includes(slug);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 md:px-8 py-8 md:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:slug" element={<Detail onToggleFavorite={handleToggleFavorite} isFavorite={isFavorite} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/favorites" element={<Favorites favoriteSlugs={user.favorites} />} />
            {/* Generic categories can lead back to home or a dedicated listing for this demo */}
            <Route path="/category/:slug" element={<Home />} />
          </Routes>
        </main>

        <footer className="bg-black/80 border-t border-white/5 py-12 px-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col gap-4">
                     <Link to="/" className="text-3xl font-bold text-[#ff2e63] tracking-tighter">
                        MOT<span className="text-white">PHIM</span>
                     </Link>
                     <p className="text-gray-500 text-sm leading-relaxed">
                        Nền tảng xem phim trực tuyến chất lượng cao, cập nhật phim mới nhanh nhất mỗi ngày.
                     </p>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-white/40">Liên kết</h4>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li><Link to="/" className="hover:text-[#ff2e63] transition-colors">Trang chủ</Link></li>
                        <li><Link to="/category/phim-le" className="hover:text-[#ff2e63] transition-colors">Phim Lẻ</Link></li>
                        <li><Link to="/category/phim-bo" className="hover:text-[#ff2e63] transition-colors">Phim Bộ</Link></li>
                        <li><Link to="/category/hoat-hinh" className="hover:text-[#ff2e63] transition-colors">Hoạt Hình</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-white/40">Hỗ trợ</h4>
                    <ul className="flex flex-col gap-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-[#ff2e63] transition-colors">Điều khoản dịch vụ</a></li>
                        <li><a href="#" className="hover:text-[#ff2e63] transition-colors">Chính sách bảo mật</a></li>
                        <li><a href="#" className="hover:text-[#ff2e63] transition-colors">Khiếu nại bản quyền</a></li>
                        <li><a href="#" className="hover:text-[#ff2e63] transition-colors">Liên hệ quảng cáo</a></li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-white/40">Kết nối</h4>
                    <div className="flex gap-4">
                         <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#ff2e63] transition-all cursor-pointer">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" /></svg>
                         </div>
                         <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#ff2e63] transition-all cursor-pointer">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
                         </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <span>© 2024 MOTPHIM - All Rights Reserved.</span>
                <span className="flex items-center gap-2">
                    Cung cấp bởi <span className="text-white">OPhim API</span>
                </span>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
