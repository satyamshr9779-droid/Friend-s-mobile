
import React, { useState } from 'react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  user: any;
  onLogout: () => void;
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, user, onLogout, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'Old Mobiles', value: 'mobiles' },
    { label: 'Features', value: 'features' },
    { label: 'About', value: 'about' },
    { label: 'Contact', value: 'contact' },
    { label: 'AI Studio', value: 'ai-edit' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-200">
              <i className="fas fa-mobile-alt text-xl"></i>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Friend's <span className="text-blue-600">Mobile</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 mr-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setCurrentPage(item.value)}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    currentPage === item.value 
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-blue-500'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              {/* Cart Icon */}
              <div className="relative group cursor-pointer" onClick={() => setCurrentPage('mobiles')}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors">
                  <i className="fas fa-shopping-bag text-slate-600"></i>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold uppercase">
                      {user.email.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">{user.email}</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="text-red-500 font-bold text-sm hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all hover:shadow-lg active:scale-95"
                >
                  Join Us
                </button>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <div className="relative" onClick={() => setCurrentPage('mobiles')}>
                <i className="fas fa-shopping-bag text-slate-600 text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 text-2xl">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setCurrentPage(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentPage === item.value ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {user ? (
              <button 
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-red-50 text-red-600 py-3 rounded-xl font-bold"
              >
                Sign Out ({user.email})
              </button>
            ) : (
              <button 
                onClick={() => {
                  setCurrentPage('login');
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-bold"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
