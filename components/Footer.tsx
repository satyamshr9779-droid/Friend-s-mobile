
import React from 'react';
import { Page } from '../types';

interface FooterProps {
    setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <span className="text-xl font-bold text-white">Friend's Mobile</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The most trusted platform for high-quality certified pre-owned mobile devices and accessories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-blue-400">Home</button></li>
              <li><button onClick={() => setCurrentPage('mobiles')} className="hover:text-blue-400">Old Mobiles</button></li>
              <li><button onClick={() => setCurrentPage('features')} className="hover:text-blue-400">Features</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-blue-400">About Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-400">Warranty Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Easy Returns</a></li>
              <li><a href="#" className="hover:text-blue-400">Secure Payments</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-blue-500"></i>
                123 Mobile Street, Tech City
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-blue-500"></i>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-blue-500"></i>
                support@friendsmobile.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Friend's Mobile Centre. All rights reserved. Designed for excellence.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
