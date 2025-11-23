import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WidgetCard } from './components/WidgetCard';
import { Footer } from './components/Footer';
import { HomeWidget, ViewState, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { searchProductsWithGemini } from './services/geminiService';

// Mock Data for Home Page Widgets
const widgets: HomeWidget[] = [
  {
    id: '1',
    title: 'Revamp your home in style',
    type: 'grid',
    linkText: 'Explore all',
    items: [
      { title: 'Cushion covers', image: 'https://picsum.photos/seed/cushion/150/150', linkText: '' },
      { title: 'Figurines, vases', image: 'https://picsum.photos/seed/vases/150/150', linkText: '' },
      { title: 'Home storage', image: 'https://picsum.photos/seed/storage/150/150', linkText: '' },
      { title: 'Lighting solutions', image: 'https://picsum.photos/seed/light/150/150', linkText: '' },
    ]
  },
  {
    id: '2',
    title: 'Appliances for your home | Up to 55% off',
    type: 'grid',
    linkText: 'See more',
    items: [
      { title: 'Air conditioners', image: 'https://picsum.photos/seed/ac/150/150', linkText: '' },
      { title: 'Refrigerators', image: 'https://picsum.photos/seed/fridge/150/150', linkText: '' },
      { title: 'Microwaves', image: 'https://picsum.photos/seed/micro/150/150', linkText: '' },
      { title: 'Washing machines', image: 'https://picsum.photos/seed/washing/150/150', linkText: '' },
    ]
  },
  {
    id: '3',
    title: 'Starting ₹149 | Headphones',
    type: 'grid',
    linkText: 'See all offers',
    items: [
      { title: 'boAt', image: 'https://picsum.photos/seed/boat/150/150', linkText: '' },
      { title: 'boult', image: 'https://picsum.photos/seed/boult/150/150', linkText: '' },
      { title: 'Noise', image: 'https://picsum.photos/seed/noise/150/150', linkText: '' },
      { title: 'Zebronics', image: 'https://picsum.photos/seed/zeb/150/150', linkText: '' },
    ]
  },
  {
    id: '4',
    title: 'Sign in for your best experience',
    type: 'single',
    linkText: 'Sign in securely',
    items: [{ title: '', image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img19/Amazonservices/Blog/800x600._CB412341585_.jpg', linkText: '' }]
  }
];

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    alert('Added to cart!');
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    setView('search');
    // Call Gemini API
    const results = await searchProductsWithGemini(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  // Sign In View Component
  const SignInView = () => (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <div className="mb-6 cursor-pointer" onClick={() => setView('home')}>
         <span className="text-3xl font-bold">Shop Sphere</span><span className="text-lg">.in</span>
      </div>
      
      <div className="w-full max-w-[350px] p-6 border border-gray-300 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.05)]">
        <h1 className="text-3xl font-normal mb-4">Sign in or create account</h1>
        <label className="block font-bold text-sm mb-1">Enter mobile number or email</label>
        <input type="text" className="w-full border border-gray-400 rounded p-2 mb-4 focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:border-[#e77600] outline-none" />
        
        <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded shadow-sm py-1.5 text-sm font-normal mb-4">
          Continue
        </button>
        
        <p className="text-xs text-gray-600 mb-4">
          By continuing, you agree to Shop Sphere's <span className="text-blue-700 hover:underline hover:text-[#C7511F] cursor-pointer">Conditions of Use</span> and <span className="text-blue-700 hover:underline hover:text-[#C7511F] cursor-pointer">Privacy Notice</span>.
        </p>
        
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Buying for work?</span>
            </div>
        </div>
        
        <div className="text-sm text-blue-700 hover:underline hover:text-[#C7511F] cursor-pointer font-medium">
            Create a free business account
        </div>
      </div>
      
      <div className="mt-8 text-xs text-gray-600 space-x-4">
        <span className="text-blue-700 hover:underline cursor-pointer">Conditions of Use</span>
        <span className="text-blue-700 hover:underline cursor-pointer">Privacy Notice</span>
        <span className="text-blue-700 hover:underline cursor-pointer">Help</span>
      </div>
      <p className="mt-2 text-xs text-gray-600">© 1996-2025, Shop Sphere, Inc. or its affiliates</p>
    </div>
  );

  // Cart View Component
  const CartView = () => (
    <div className="bg-[#E3E6E6] min-h-screen pb-10">
       <div className="p-4 md:p-8 max-w-[1500px] mx-auto flex flex-col md:flex-row gap-6">
          <div className="bg-white p-6 flex-1 shadow-sm">
             {cart.length === 0 ? (
                 <div className="flex flex-col md:flex-row gap-8">
                     <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" className="w-64" alt="Empty Cart" />
                     <div>
                        <h2 className="text-2xl font-bold mb-2">Your Shop Sphere Cart is empty</h2>
                        <p className="text-sm text-[#007185] mb-6 hover:underline cursor-pointer">Shop today's deals</p>
                        <div className="flex gap-4">
                            <button 
                                onClick={() => setView('signin')}
                                className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg px-4 py-1.5 text-sm shadow-sm"
                            >
                                Sign in to your account
                            </button>
                            <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-4 py-1.5 text-sm shadow-sm">
                                Sign up now
                            </button>
                        </div>
                     </div>
                 </div>
             ) : (
                 <div>
                     <h2 className="text-2xl font-medium border-b pb-4 mb-4">Shopping Cart</h2>
                     {cart.map((item, index) => (
                         <div key={`${item.id}-${index}`} className="flex gap-4 border-b py-4 last:border-0">
                             <img src={item.image} alt={item.title} className="w-32 h-32 object-contain" />
                             <div className="flex-1">
                                 <h3 className="font-medium text-lg link text-blue-700 line-clamp-2">{item.title}</h3>
                                 <div className="text-[#B12704] font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</div>
                                 <div className="text-green-700 text-xs mt-1">In stock</div>
                                 <div className="text-xs text-gray-500 mt-1">Eligible for FREE Shipping</div>
                                 <button className="text-blue-700 text-sm mt-2 hover:underline" onClick={() => {
                                     const newCart = [...cart];
                                     newCart.splice(index, 1);
                                     setCart(newCart);
                                 }}>Delete</button>
                             </div>
                         </div>
                     ))}
                 </div>
             )}
          </div>
          {/* Subtotal Sidebar for Cart */}
          {cart.length > 0 && (
             <div className="bg-white p-6 h-fit w-full md:w-[300px] shadow-sm">
                 <div className="text-lg mb-4">
                     Subtotal ({cart.length} items): <span className="font-bold">₹{cart.reduce((a, b) => a + b.price, 0).toLocaleString('en-IN')}</span>
                 </div>
                 <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg py-2 text-sm shadow-sm">
                     Proceed to Buy
                 </button>
             </div>
          )}
       </div>
       {/* Saved for later/Recommendations would go here */}
    </div>
  );

  // Search Results View
  const SearchView = () => (
     <div className="bg-white min-h-screen">
        <div className="border-b shadow-sm p-3 text-sm">
            <span className="font-bold">1-{searchResults.length} of over {searchResults.length * 100} results for</span> <span className="text-[#C7511F] font-bold">"{searchQuery}"</span>
        </div>
        <div className="flex">
            {/* Sidebar Filter Mock */}
            <div className="hidden md:block w-[240px] border-r p-4 space-y-4">
                <h3 className="font-bold text-sm">Delivery Day</h3>
                <div className="flex items-center gap-2 text-sm"><input type="checkbox" /> Get It by Tomorrow</div>
                <h3 className="font-bold text-sm">Category</h3>
                <div className="text-sm ml-2 space-y-1 text-gray-600">
                    <p>Smartphones</p>
                    <p>Accessories</p>
                    <p>Cases</p>
                </div>
                <h3 className="font-bold text-sm">Avg. Customer Review</h3>
                <div className="text-amazon-orange text-sm">★★★★☆ & Up</div>
            </div>
            
            {/* Results Grid */}
            <div className="flex-1 bg-gray-50 p-4">
                {isSearching ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {searchResults.map(product => (
                            <ProductCard key={product.id} product={product} onAdd={addToCart} />
                        ))}
                        {searchResults.length === 0 && <div className="col-span-full text-center py-20">No results found. Try searching for "iphone", "shoes", or "books".</div>}
                    </div>
                )}
            </div>
        </div>
     </div>
  );

  if (view === 'signin') {
      return <SignInView />;
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-[#E3E6E6]">
      <Header cartCount={cart.length} setView={setView} onSearch={handleSearch} />
      
      {view === 'home' && (
        <>
          <Hero />
          {/* Main Content Overlapping Hero */}
          <div className="max-w-[1500px] mx-auto w-full px-4 -mt-20 sm:-mt-32 md:-mt-52 lg:-mt-72 relative z-30 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {widgets.map(widget => (
                <WidgetCard key={widget.id} widget={widget} />
              ))}
            </div>
            
            {/* Horizontal Scroll Section Mock */}
            <div className="bg-white p-4 mb-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Up to 60% off | Trending products</h2>
                <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                    {[1,2,3,4,5,6,7].map(i => (
                        <div key={i} className="min-w-[200px] cursor-pointer">
                            <img src={`https://picsum.photos/seed/trend${i}/200/200`} className="w-full h-48 object-contain bg-gray-50 p-2 mb-2" alt="trend" />
                            <div className="text-xs bg-[#CC0C39] text-white inline-block px-2 py-1 rounded-sm mr-2">20% off</div>
                            <div className="text-[#CC0C39] font-bold inline-block">Deal of the Day</div>
                            <div className="truncate text-sm mt-1">Trending Product Name {i}</div>
                        </div>
                    ))}
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {widgets.slice(0,4).reverse().map((widget, idx) => (
                  <WidgetCard key={`dup-${idx}`} widget={{...widget, title: `More ${widget.title}`, id: `dup-${widget.id}`}} />
              ))}
            </div>

          </div>
        </>
      )}

      {view === 'cart' && <CartView />}
      {view === 'search' && <SearchView />}

      <Footer />
    </div>
  );
}