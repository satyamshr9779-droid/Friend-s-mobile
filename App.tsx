
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero3D from './components/Hero3D';
import { Page, MobileBrand, Condition } from './types';
import { MOCK_PHONES } from './constants';
import { editMobileImage } from './services/geminiService';

const CURRENCIES = [
  { code: 'INR', symbol: '₹', rate: 1 },
  { code: 'USD', symbol: '$', rate: 0.012 },
  { code: 'EUR', symbol: '€', rate: 0.011 },
  { code: 'GBP', symbol: '£', rate: 0.0094 }
];

const VALID_CREDENTIALS = {
  email: 'admin@friends.com',
  password: 'admin123'
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [filterBrand, setFilterBrand] = useState<string>('All');
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [user, setUser] = useState<{ email: string; name?: string; provider?: string } | null>(null);
  
  // Cart State
  const [cart, setCart] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);

  // Auth Form State
  const [isSignUp, setIsSignUp] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // AI Edit State
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleGoogleSignIn = () => {
    setIsAuthLoading(true);
    setLoginError(null);
    // Simulate Google OAuth Delay
    setTimeout(() => {
      setUser({ email: 'google.user@gmail.com', name: 'Google User', provider: 'google' });
      setIsAuthLoading(false);
      setCurrentPage('home');
      triggerToast('Signed in with Google successfully!');
    }, 2000);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      if (isSignUp) {
        if (!loginName || !loginEmail || !loginPassword) {
          setLoginError('Please fill in all fields.');
          setIsAuthLoading(false);
          return;
        }
        setUser({ email: loginEmail, name: loginName });
        setCurrentPage('home');
        triggerToast(`Welcome to the family, ${loginName}!`);
      } else {
        if (loginEmail === VALID_CREDENTIALS.email && loginPassword === VALID_CREDENTIALS.password) {
          setUser({ email: loginEmail });
          setCurrentPage('home');
          triggerToast('Logged in successfully!');
        } else {
          setLoginError('Invalid email or password.');
          setIsAuthLoading(false);
          return;
        }
      }
      setIsAuthLoading(false);
      setLoginEmail('');
      setLoginPassword('');
      setLoginName('');
    }, 1200);
  };

  const handleAddToCart = (id: string, model: string) => {
    setCart(prev => [...prev, id]);
    triggerToast(`${model} added to cart!`);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentPage('home');
    triggerToast('Logged out successfully.');
  };

  const formatPrice = (price: number) => {
    const converted = price * currency.rate;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 0
    }).format(converted);
  };

  const renderHome = () => (
    <div className="pt-20">
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            {user && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm">
                <i className="fas fa-sparkles"></i> Hello, {user.name || user.email.split('@')[0]}
              </div>
            )}
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              Trusted <span className="gradient-text">Old Mobiles</span> <br/>Premium Quality
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              Don't compromise on quality for price. Get 100% certified pre-owned mobiles with original warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => setCurrentPage('mobiles')}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-2xl hover:-translate-y-1 active:scale-95"
              >
                Start Shopping
              </button>
              {!user && (
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="bg-white text-slate-800 px-10 py-5 rounded-2xl font-bold text-lg border border-slate-200 hover:border-blue-400 transition-all"
                >
                  Join Community
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <Hero3D />
          </div>
        </div>
      </section>
    </div>
  );

  const renderMobiles = () => {
    const filteredMobiles = MOCK_PHONES.filter(p => filterBrand === 'All' || p.brand === filterBrand);

    return (
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Refurbished Phones</h2>
              <p className="text-slate-600 font-medium">Certified 50+ Quality Checks Passed</p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Currency</label>
                <select 
                  className="block bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-bold outline-none text-slate-700"
                  value={currency.code}
                  onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
                >
                  {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Brand</label>
                <select 
                  className="block bg-white border border-slate-200 rounded-xl px-4 py-2.5 font-medium outline-none"
                  value={filterBrand}
                  onChange={(e) => setFilterBrand(e.target.value)}
                >
                  <option>All</option>
                  {Object.values(MobileBrand).map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMobiles.map(phone => (
              <div key={phone.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group card-hover border border-slate-100 flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <img src={phone.image} alt={phone.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 uppercase">
                      {phone.condition}
                    </span>
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold">
                      {phone.warranty}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{phone.model}</h3>
                  <p className="text-slate-500 text-xs font-medium uppercase mb-4">{phone.brand} • {phone.storage}</p>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-slate-900">{formatPrice(phone.price)}</span>
                        <span className="text-xs text-slate-400 line-through">{formatPrice(phone.originalPrice)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(phone.id, phone.model)}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <i className="fas fa-shopping-cart text-sm"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLogin = () => (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-slate-500 text-sm mt-2">{isSignUp ? 'Sign up to start saving on mobiles' : 'Sign in to your account'}</p>
        </div>
        
        <div className="space-y-6">
          {/* Google Sign In */}
          <button 
            onClick={handleGoogleSignIn}
            disabled={isAuthLoading}
            className="w-full bg-white border border-slate-200 py-3.5 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            {isAuthLoading && user?.provider === 'google' ? (
              <i className="fas fa-spinner animate-spin"></i>
            ) : (
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] font-bold uppercase">or email</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          <form className="space-y-4" onSubmit={handleAuth}>
            {loginError && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold border border-red-100">
                {loginError}
              </div>
            )}

            {isSignUp && (
              <input 
                type="text" 
                required
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="Full Name" 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
            )}

            <input 
              type="email" 
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email address" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />

            <input 
              type="password" 
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="Password" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
            />

            {!isSignUp && (
              <div className="text-right">
                <button type="button" className="text-[10px] font-bold text-blue-600 hover:underline">Forgot password?</button>
              </div>
            )}

            <button 
              type="submit"
              disabled={isAuthLoading}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${isAuthLoading ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {isAuthLoading && !user?.provider ? <i className="fas fa-spinner animate-spin"></i> : (isSignUp ? 'Create Free Account' : 'Sign In')}
            </button>
          </form>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
           <button 
            onClick={() => { setIsSignUp(!isSignUp); setLoginError(null); }}
            className="text-slate-500 text-sm font-medium hover:text-blue-600 transition-colors"
           >
             {isSignUp ? 'Already have an account? Sign In' : 'New to Friend\'s Mobile? Create Account'}
           </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'mobiles': return renderMobiles();
      case 'login': return renderLogin();
      case 'features': 
        return (
          <div className="pt-32 pb-24 max-w-7xl mx-auto px-4">
             <h2 className="text-4xl font-extrabold text-center mb-16">The <span className="text-blue-600">Friend's</span> Guarantee</h2>
             <div className="grid md:grid-cols-3 gap-12">
                {[
                  { title: 'Quality Control', icon: 'fa-shield-check', desc: '50-point diagnostic software test on every logic board and display.' },
                  { title: 'Secure Payment', icon: 'fa-lock-alt', desc: 'Industry leading payment gateways with zero-cost EMI options.' },
                  { title: 'Fast Delivery', icon: 'fa-truck-fast', desc: 'Free express shipping on all orders above ₹20,000.' }
                ].map((f, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-center card-hover">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mx-auto mb-6">
                      <i className={`fas ${f.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'ai-edit': 
        return (
          <div className="pt-32 pb-24 min-h-screen max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold">Professional <span className="text-purple-600">Retouch</span></h2>
              <p className="text-slate-600 mt-2">Use Gemini AI to enhance your mobile photos for resale.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
              <div className="space-y-6">
                <div className="aspect-square bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {aiImage ? <img src={aiImage} className="w-full h-full object-contain" /> : <i className="fas fa-camera-viewfinder text-slate-200 text-6xl"></i>}
                </div>
                <input type="file" className="hidden" id="studio-up" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f) { const r = new FileReader(); r.onload = () => setAiImage(r.result as string); r.readAsDataURL(f); }
                }} />
                <label htmlFor="studio-up" className="block w-full bg-slate-900 text-white p-4 rounded-2xl text-center font-bold cursor-pointer">Select Image</label>
              </div>
              <div className="space-y-6">
                <textarea value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} placeholder="E.g. Remove background, brighten the screen, cinematic lighting..." className="w-full bg-slate-50 p-6 rounded-2xl min-h-[150px] outline-none border border-slate-100" />
                <button 
                  disabled={isAiProcessing || !aiImage}
                  onClick={async () => {
                    setIsAiProcessing(true);
                    try { const res = await editMobileImage(aiImage!, aiPrompt); setAiImage(res); triggerToast("AI Enhancement Complete!"); } catch(e) { triggerToast("Error processing image."); }
                    setIsAiProcessing(false);
                  }}
                  className="w-full bg-purple-600 text-white py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2"
                >
                  {isAiProcessing ? <i className="fas fa-sync animate-spin"></i> : <i className="fas fa-magic"></i>}
                  Process with Gemini
                </button>
              </div>
            </div>
          </div>
        );
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-10">
          <i className="fas fa-check-circle text-green-400"></i>
          <span className="font-bold text-sm">{showToast}</span>
        </div>
      )}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user} 
        onLogout={handleLogout} 
        cartCount={cart.length}
      />
      <main className="flex-grow bg-slate-50/50">
        {renderContent()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
