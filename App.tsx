
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WidgetCard } from './components/WidgetCard';
import { Footer } from './components/Footer';
import { HomeWidget, ViewState, Product } from './types';
import { ProductCard } from './components/ProductCard';
import { searchProductsWithGemini } from './services/geminiService';

// --- Helper Components (Moved outside App) ---

interface MobileBrandRowProps {
  title: string;
  products: any[];
}

const MobileBrandRow: React.FC<MobileBrandRowProps> = ({ title, products }) => (
  <div className="bg-white mb-4 shadow-sm">
    <div className="flex items-center justify-between p-4 border-b">
       <h2 className="text-xl font-medium text-gray-800">{title}</h2>
       <button className="bg-[#2874f0] text-white text-xs font-bold px-4 py-2 rounded-sm shadow-sm hover:bg-blue-600">VIEW ALL</button>
    </div>
    <div className="flex overflow-x-auto hide-scrollbar p-4 gap-4">
       {products.map((p, i) => (
         <div key={i} className="min-w-[200px] flex flex-col items-center text-center cursor-pointer group relative">
            <div className="absolute right-2 top-0 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <div className="h-[200px] flex items-center justify-center mb-2 w-full">
               <img src={p.image} alt={p.title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-200" />
            </div>
            <div className="flex flex-col items-center gap-1">
               <h3 className="text-sm text-gray-900 font-normal group-hover:text-blue-600 line-clamp-2">{p.title}</h3>
               <div className="flex items-center gap-2">
                  <span className="bg-[#388E3C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    {p.rating} <span className="text-white">★</span>
                  </span>
                  <span className="text-xs text-gray-500">({p.reviews})</span>
               </div>
               <div className="flex items-center gap-2 mt-1">
                  <span className="text-base font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-gray-500 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-[#388E3C] font-bold">{p.discount}% off</span>
               </div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

interface GreenDealCardProps {
    brand: string;
    tagline: string;
    model: string;
    price: number;
    image: string;
}

const GreenDealCard: React.FC<GreenDealCardProps> = ({ brand, tagline, model, price, image }) => (
    <div className="min-w-[280px] h-[180px] bg-gradient-to-r from-[#0f9d58] to-[#34a853] relative rounded-sm overflow-hidden cursor-pointer hover:shadow-lg p-4 flex justify-between items-center text-white">
        <div className="flex flex-col justify-center h-full z-10 w-1/2">
            <h4 className="text-lg font-bold mb-1">{brand}</h4>
            <p className="text-xs opacity-90 mb-2">{tagline}</p>
            <h3 className="text-xl font-bold mb-1 leading-tight">{model}</h3>
            <p className="text-sm font-medium">From ₹{price}</p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-end z-10">
             <img src={image} alt={model} className="h-[140px] object-contain drop-shadow-xl transform rotate-0" />
        </div>
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
    </div>
);

// --- Fresh View Components ---

const FreshProductCard: React.FC<{ product: any }> = ({ product }) => (
    <div className="bg-white border border-gray-100 rounded-md p-2 min-w-[170px] w-[170px] md:min-w-[190px] md:w-[190px] flex flex-col relative shadow-sm hover:shadow-md transition-shadow">
        {/* Discount */}
        {product.discount > 0 && (
            <div className="absolute top-2 left-0 bg-[#CC0C39] text-white text-[10px] font-bold px-1.5 py-0.5 z-10 rounded-r-sm">
                {product.discount}% OFF
            </div>
        )}
        
        {/* Image */}
        <div className="h-[140px] w-full flex items-center justify-center mb-2 bg-white rounded-t-md p-2">
            <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>

        {/* Veg icon */}
        <div className="mb-1">
             <div className="border border-green-600 w-3 h-3 flex items-center justify-center p-[1px] rounded-sm">
                 <div className="bg-green-600 w-full h-full rounded-full"></div>
             </div>
        </div>

        <h3 className="text-sm text-gray-800 line-clamp-2 leading-tight mb-1 font-medium min-h-[40px]">{product.title}</h3>
        <p className="text-xs text-gray-500 mb-1">{product.unit || '1 unit'}</p>

        {/* Rating */}
        <div className="flex items-center mb-2 text-xs">
             <span className="font-bold mr-1">{product.rating}</span>
             <div className="flex text-amazon-orange text-[10px]">
                {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                ))}
             </div>
             <span className="text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Price Area */}
        <div className="flex items-baseline gap-1 mt-auto mb-1">
             <span className="text-xs font-bold">₹</span>
             <span className="text-lg font-bold">{Math.floor(product.price)}</span>
             <span className="text-xs font-bold align-top">{(product.price % 1).toFixed(2).substring(2)}</span>
             <span className="text-xs text-gray-400 line-through ml-1">₹{product.mrp}</span>
        </div>
        <div className="text-[10px] text-gray-500 mb-3">
             Tomorrow by 8 PM
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-auto">
            <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full px-5 py-1 text-xs font-bold shadow-sm active:scale-95 transition-transform">
                Add
            </button>
        </div>
    </div>
);

const FreshSection: React.FC<{ title: string, linkText?: string, products: any[] }> = ({ title, linkText, products }) => (
    <div className="bg-white mb-4 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>
            {linkText && <a href="#" className="text-xs md:text-sm text-[#007185] hover:underline hover:text-[#C7511F]">{linkText} &gt;</a>}
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 relative">
            <button className="min-w-[35px] h-[60px] self-center border rounded-md hidden md:flex items-center justify-center bg-white shadow-md hover:bg-gray-50 z-10 absolute left-0 opacity-80 hover:opacity-100">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex gap-3 px-1 md:px-4">
                {products.map((p, i) => (
                    <FreshProductCard key={i} product={p} />
                ))}
            </div>
            <button className="min-w-[35px] h-[60px] self-center border rounded-md hidden md:flex items-center justify-center bg-white shadow-md hover:bg-gray-50 z-10 absolute right-0 opacity-80 hover:opacity-100">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    </div>
);

const FreshCategoryRow: React.FC<{ title: string, items: any[], color?: string }> = ({ title, items, color = "bg-[#E6F4EA]" }) => (
    <div className={`${color} py-6 px-4 mb-4 shadow-sm`}>
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar justify-start md:justify-center px-2">
            {items.map((item, i) => (
                <div key={i} className="flex flex-col items-center min-w-[100px] cursor-pointer group">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white overflow-hidden shadow-sm hover:shadow-md flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-gray-100">
                        <img src={item.image} alt={item.title} className="w-20 h-20 md:w-28 md:h-28 object-contain" />
                    </div>
                    <span className="text-sm font-medium text-center leading-tight text-gray-800">{item.title}</span>
                </div>
            ))}
        </div>
    </div>
);


// Mock Data for Home Page Widgets (Existing)
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

// --- Customer Service Mock Data ---
const serviceCards = [
    { title: "Your Orders", desc: ["Track packages", "Edit or cancel orders"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/order._CB407554721_.png" },
    { title: "Returns and Refunds", desc: ["Return or exchange items", "Print return mailing labels"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/fba._CB407556709_.png" },
    { title: "Manage Addresses", desc: ["Update your addresses", "Add address, landmark details"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/address._CB407554721_.png" },
    { title: "Manage Prime", desc: ["View your benefits", "Membership details"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/prime._CB407554721_.png" },
    { title: "Payment Settings", desc: ["Add or edit payment methods", "Change expired debit or credit card"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/payment._CB407556709_.png" },
    { title: "Account Settings", desc: ["Change your email or password", "Update login information"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/account._CB407554721_.png" },
    { title: "Digital Services and Device Support", desc: ["Find device help and support", "Troubleshoot device issues"], icon: "https://m.media-amazon.com/images/G/31/x-locale/cs/help/images/gateway/self-service/digital_devices._CB407554721_.png" }
];


export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'lowToHigh' | 'highToLow'>('featured');
  const [minRating, setMinRating] = useState(0); // 0 means no filter
  const [compareList, setCompareList] = useState<Product[]>([]);
  
  // Wishlist State with LocalStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load wishlist from local storage", e);
      return [];
    }
  });

  const toggleWishlist = (id: string) => {
    let newWishlist;
    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter(wId => wId !== id);
    } else {
      newWishlist = [...wishlist, id];
    }
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
        if (prev.find(p => p.id === product.id)) {
            return prev.filter(p => p.id !== product.id);
        }
        if (prev.length >= 4) {
            alert("You can only compare up to 4 products at a time.");
            return prev;
        }
        return [...prev, product];
    });
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const newItems = Array(quantity).fill(product);
    setCart([...cart, ...newItems]);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = (product: Product) => {
    setCart([product]);
    setView('signin');
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    setView('search');
    setSortOrder('featured'); // Reset sort on new search
    setMinRating(0); // Reset filter on new search
    // Call Gemini API
    const results = await searchProductsWithGemini(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  // --- Fresh View Mock Data ---
  const freshMockData = {
      popular: [
          { title: "Mamaearth Mineral Based Sunscreen Baby Lotion", image: "https://m.media-amazon.com/images/I/51r+2+9O+tL._AC_UL320_.jpg", price: 248.00, mrp: 299, discount: 17, rating: 4.1, reviews: 10442, unit: "100 ml" },
          { title: "KareIn Classic Underpads, Large 60 x 90 Cm", image: "https://m.media-amazon.com/images/I/71w+Z+9O+tL._AC_UL320_.jpg", price: 601.00, mrp: 4400, discount: 86, rating: 4.2, reviews: 3662, unit: "10 Count" },
          { title: "Pure & Sure Organic Maida 1 Kg", image: "https://m.media-amazon.com/images/I/61r+2+9O+tL._AC_UL320_.jpg", price: 120.00, mrp: 120, discount: 0, rating: 4.4, reviews: 283, unit: "1 kg" },
          { title: "Chicco Baby Liquid Laundry Detergent", image: "https://m.media-amazon.com/images/I/61w+2+9O+tL._AC_UL320_.jpg", price: 498.00, mrp: 599, discount: 17, rating: 4.5, reviews: 1963, unit: "1 L" },
           { title: "Little's Soft Cleansing Baby Wipes", image: "https://m.media-amazon.com/images/I/71r+2+9O+tL._AC_UL320_.jpg", price: 399.00, mrp: 1140, discount: 65, rating: 4.4, reviews: 136854, unit: "80 count" },
      ],
      fruitsVeg: [
          { title: "Fresh Onion, 1kg", image: "https://m.media-amazon.com/images/I/61yXL70-RaL._AC_UL320_.jpg", price: 28.00, mrp: 35, discount: 20, rating: 4.0, reviews: 400, unit: "1 kg" },
          { title: "Fresh Coriander Leaves, 100 g", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg", price: 18.00, mrp: 18, discount: 0, rating: 4.2, reviews: 200, unit: "100 g" },
          { title: "Fresh Carrot - Ooty, 500g", image: "https://m.media-amazon.com/images/I/71S6oQjgxwL._AC_UL320_.jpg", price: 41.00, mrp: 47, discount: 13, rating: 4.1, reviews: 150, unit: "500 g" },
          { title: "Fresh Cucumber, 500g", image: "https://m.media-amazon.com/images/I/41-W6oQjgxwL._AC_UL320_.jpg", price: 32.00, mrp: 32, discount: 0, rating: 4.3, reviews: 120, unit: "500 g" },
          { title: "Fresh Potato, 1kg", image: "https://m.media-amazon.com/images/I/313dtY-LoQL._AC_UL320_.jpg", price: 38.00, mrp: 42, discount: 10, rating: 4.0, reviews: 800, unit: "1 kg" },
          { title: "Fresh Tomato Hybrid, 1kg", image: "https://m.media-amazon.com/images/I/51+2+9O+tL._AC_UL320_.jpg", price: 64.00, mrp: 99, discount: 35, rating: 4.1, reviews: 500, unit: "1 kg" },
      ],
      trending: [
           { title: "24 Mantra Organic 100% Pure & RAW Honey", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 266.00, mrp: 380, discount: 30, rating: 4.1, reviews: 2881, unit: "500 g" },
           { title: "NIVEA MEN Shaving, Sensitive Shaving Foam", image: "https://m.media-amazon.com/images/I/51+2+9O+tL._AC_UL320_.jpg", price: 299.00, mrp: 375, discount: 20, rating: 4.4, reviews: 2837, unit: "250 ml" },
           { title: "Miltop Natural Jaggery, 875g*2", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg", price: 210.00, mrp: 210, discount: 0, rating: 4.2, reviews: 5556, unit: "875 g" },
           { title: "Axe Signature Champion No Gas Body Deodorant", image: "https://m.media-amazon.com/images/I/41+2+9O+tL._AC_UL320_.jpg", price: 170.00, mrp: 310, discount: 45, rating: 3.9, reviews: 14807, unit: "154 ml" },
           { title: "Pure & Sure Organic Castor Oil 500ml", image: "https://m.media-amazon.com/images/I/51+2+9O+tL._AC_UL320_.jpg", price: 247.00, mrp: 260, discount: 5, rating: 4.2, reviews: 6395, unit: "500 ml" },
      ],
      cereals: [
           { title: "Yogabar Wholegrain Breakfast Muesli - Dark Choco", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg", price: 234.00, mrp: 499, discount: 53, rating: 4.4, reviews: 11032, unit: "700 g" },
           { title: "Kellogg's Muesli Nuts Delight 240g", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg", price: 177.00, mrp: 177, discount: 0, rating: 4.3, reviews: 334, unit: "240 g" },
           { title: "Tata Sampann Panchmeva Mix", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 458.00, mrp: 525, discount: 13, rating: 4.5, reviews: 87, unit: "400 g" },
           { title: "Bagrry's Oat Bran 400gm Pouch", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg", price: 230.00, mrp: 235, discount: 2, rating: 4.4, reviews: 1016, unit: "400 g" },
      ],
      household: [
          { title: "Harpic Disinfectant Toilet Cleaner Liquid", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 393.00, mrp: 450, discount: 13, rating: 4.4, reviews: 56932, unit: "1 L (Pack of 2)" },
          { title: "Amazon Brand - Presto! Hygienic Flush Tabs", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg", price: 250.00, mrp: 417, discount: 40, rating: 3.9, reviews: 2607, unit: "50 g" },
          { title: "Harpic DrainXpert Drain Cleaner Powder", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 195.00, mrp: 225, discount: 13, rating: 4.2, reviews: 10582, unit: "Pack of 8" },
      ],
      breads: [
           { title: "English Oven Sandwich Bread, 400 g", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 40.00, mrp: 40, discount: 0, rating: 4.3, reviews: 500, unit: "400 g" },
           { title: "English Oven Zero Maida Whole Wheat Bread", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 55.00, mrp: 55, discount: 0, rating: 4.2, reviews: 300, unit: "400 g" },
           { title: "English Oven Burger Bun, 200 g", image: "https://m.media-amazon.com/images/I/51+2+9O+tL._AC_UL320_.jpg", price: 20.00, mrp: 20, discount: 0, rating: 4.1, reviews: 150, unit: "200 g" },
      ],
      eggs: [
           { title: "Table White Eggs, Pack of 12", image: "https://m.media-amazon.com/images/I/41+2+9O+tL._AC_UL320_.jpg", price: 120.00, mrp: 130, discount: 8, rating: 4.0, reviews: 100, unit: "12 Count" },
           { title: "Farm made foods Free Range Eggs", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 242.00, mrp: 289, discount: 16, rating: 4.5, reviews: 50, unit: "12 Count" },
           { title: "Eggoz Farm Fresh High Protein White Eggs", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg", price: 341.00, mrp: 397, discount: 14, rating: 4.4, reviews: 80, unit: "30 Count" },
      ],
      shopByStore: [
          { title: "Local delights", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg" },
          { title: "Premium & organic", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg" },
          { title: "Healthy eating", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg" },
          { title: "Gifting", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg" },
          { title: "Proteins", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg" },
          { title: "Dry fruits", image: "https://m.media-amazon.com/images/I/61+2+9O+tL._AC_UL320_.jpg" },
          { title: "Beauty", image: "https://m.media-amazon.com/images/I/51+2+9O+tL._AC_UL320_.jpg" },
          { title: "Pooja essentials", image: "https://m.media-amazon.com/images/I/71+2+9O+tL._AC_UL320_.jpg" },
      ]
  };


  // Filter & Sort Logic
  const filteredAndSortedResults = [...searchResults]
    .filter(p => p.rating >= minRating)
    .sort((a, b) => {
        if (sortOrder === 'lowToHigh') return a.price - b.price;
        if (sortOrder === 'highToLow') return b.price - a.price;
        return 0; // featured
  });


  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#E3E6E6]">
      <Header cartCount={cart.length} setView={setView} onSearch={handleSearch} />

      <div className="flex-1 w-full relative">
        {/* Floating Compare Bar */}
        {compareList.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-3 animate-slide-up">
                <div className="max-w-[1500px] mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-gray-700">Compare ({compareList.length}/4)</span>
                        <div className="flex gap-2">
                            {compareList.map(p => (
                                <div key={p.id} className="relative w-12 h-12 border rounded bg-white p-1">
                                    <img src={p.image} alt="" className="w-full h-full object-contain" />
                                    <button 
                                        onClick={() => toggleCompare(p)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3">
                         <button 
                            onClick={() => setCompareList([])}
                            className="text-sm text-gray-600 hover:text-gray-900 underline"
                        >
                            Clear All
                        </button>
                        {compareList.length >= 2 ? (
                            <button className="bg-amazon-orange hover:bg-[#e3912c] text-white px-4 py-2 rounded-sm font-bold text-sm shadow-sm">
                                Compare Now
                            </button>
                        ) : (
                             <button disabled className="bg-gray-300 text-gray-500 px-4 py-2 rounded-sm font-bold text-sm cursor-not-allowed">
                                Compare Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}

        {view === 'home' && (
          <div className="max-w-[1500px] mx-auto">
            <Hero />
            
            <div className="px-4 pb-8 -mt-16 sm:-mt-32 relative z-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {widgets.map(w => (
                  <WidgetCard key={w.id} widget={w} />
                ))}
              </div>
              
              {/* Deal of the Day Section */}
              <div className="mt-8 bg-white p-4 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Deal of the Day</h2>
                  <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
                      {[1,2,3,4,5,6].map((i) => (
                          <div key={i} className="min-w-[200px] cursor-pointer">
                              <div className="bg-[#F7F7F7] h-[200px] flex items-center justify-center mb-2">
                                  <img src={`https://picsum.photos/seed/deal${i}/200/200`} alt="Deal" className="max-h-full p-2" />
                              </div>
                              <div className="flex gap-2 items-center mb-1">
                                  <span className="bg-[#CC0C39] text-white text-xs px-2 py-1 rounded-sm font-bold">Up to 42% off</span>
                                  <span className="text-[#CC0C39] text-xs font-bold">Deal of the Day</span>
                              </div>
                              <p className="text-sm text-gray-700 truncate">Premium Products & More</p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
                 {/* Second Row of Widgets (Simulated) */}
                 <WidgetCard widget={{
                     id: '5',
                     title: 'Up to 60% off | Styles for men',
                     type: 'grid',
                     linkText: 'See all offers',
                     items: [
                         { title: 'Clothing', image: 'https://picsum.photos/seed/mencloth/150/150', linkText: '' },
                         { title: 'Footwear', image: 'https://picsum.photos/seed/menfoot/150/150', linkText: '' },
                         { title: 'Watches', image: 'https://picsum.photos/seed/watch/150/150', linkText: '' },
                         { title: 'Bags & Luggage', image: 'https://picsum.photos/seed/bag/150/150', linkText: '' },
                     ]
                 }} />
                 <WidgetCard widget={{
                     id: '6',
                     title: 'Automotive essentials | Up to 60% off',
                     type: 'grid',
                     linkText: 'See more',
                     items: [
                         { title: 'Cleaning accessories', image: 'https://picsum.photos/seed/clean/150/150', linkText: '' },
                         { title: 'Tyre & rim care', image: 'https://picsum.photos/seed/tyre/150/150', linkText: '' },
                         { title: 'Helmets', image: 'https://picsum.photos/seed/helmet/150/150', linkText: '' },
                         { title: 'Vacuum cleaner', image: 'https://picsum.photos/seed/vac/150/150', linkText: '' },
                     ]
                 }} />
                  <WidgetCard widget={{
                     id: '7',
                     title: 'Up to 50% off | Baby care & toys',
                     type: 'grid',
                     linkText: 'See all offers',
                     items: [
                         { title: 'Diapers & wipes', image: 'https://picsum.photos/seed/baby/150/150', linkText: '' },
                         { title: 'Ride ons', image: 'https://picsum.photos/seed/ride/150/150', linkText: '' },
                         { title: 'RC cars', image: 'https://picsum.photos/seed/rc/150/150', linkText: '' },
                         { title: 'Baby safety', image: 'https://picsum.photos/seed/safe/150/150', linkText: '' },
                     ]
                 }} />
                  <WidgetCard widget={{
                     id: '8',
                     title: 'Starting ₹199 | Shop Sphere Brands',
                     type: 'grid',
                     linkText: 'See more',
                     items: [
                         { title: 'Bedsheets', image: 'https://picsum.photos/seed/bed/150/150', linkText: '' },
                         { title: 'Curtains', image: 'https://picsum.photos/seed/curtain/150/150', linkText: '' },
                         { title: 'Ironing board', image: 'https://picsum.photos/seed/iron/150/150', linkText: '' },
                         { title: 'Home decor', image: 'https://picsum.photos/seed/decor/150/150', linkText: '' },
                     ]
                 }} />
              </div>
            </div>
          </div>
        )}

        {view === 'mobiles' && (
             <div className="px-4 py-4 bg-[#F1F3F3] max-w-[1500px] mx-auto">
                <div className="w-full h-[150px] bg-black text-white rounded-md mb-4 flex items-center justify-center overflow-hidden relative">
                     {/* Banner simulation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black z-0"></div>
                    <div className="z-10 text-center">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f260] to-[#0575E6]">Premium phones deals</h1>
                        <p className="text-gray-300 mt-2">Unbeatable prices on top brands</p>
                    </div>
                </div>

                <MobileBrandRow 
                    title="Poco smartphones"
                    products={[
                        { title: "POCO C71 - Locked with Airtel Prepaid (Desert Gold, 64 GB)", image: "https://m.media-amazon.com/images/I/717vL7rM78L._SL1500_.jpg", price: 5749, mrp: 8999, discount: 36, rating: 3.8, reviews: 48568 },
                        { title: "POCO C71 - Locked with Airtel Prepaid (Cool Blue, 64 GB)", image: "https://picsum.photos/seed/poco2/200/200", price: 5749, mrp: 8999, discount: 36, rating: 3.8, reviews: 48568 },
                        { title: "POCO C75 5G (Aqua Bliss, 64 GB)", image: "https://picsum.photos/seed/poco3/200/200", price: 7499, mrp: 10999, discount: 31, rating: 4.2, reviews: 132502 },
                        { title: "POCO C75 5G (Silver Stardust, 64 GB)", image: "https://picsum.photos/seed/poco4/200/200", price: 7499, mrp: 10999, discount: 31, rating: 4.2, reviews: 132502 },
                        { title: "POCO C75 5G (Enchanted Green, 64 GB)", image: "https://picsum.photos/seed/poco5/200/200", price: 7499, mrp: 10999, discount: 31, rating: 4.2, reviews: 132502 },
                    ]}
                />

                 <MobileBrandRow 
                    title="Google smartphones"
                    products={[
                        { title: "Google Pixel 9A (Obsidian, 256 GB)", image: "https://picsum.photos/seed/pixel1/200/200", price: 44999, mrp: 49999, discount: 10, rating: 4.4, reviews: 3899 },
                        { title: "Google Pixel 8a (Bay, 128 GB)", image: "https://picsum.photos/seed/pixel2/200/200", price: 34999, mrp: 52999, discount: 33, rating: 4.3, reviews: 10768 },
                        { title: "Google Pixel 10 (Obsidian, 256 GB)", image: "https://picsum.photos/seed/pixel3/200/200", price: 79999, mrp: 79999, discount: 0, rating: 4.5, reviews: 944 },
                        { title: "Google Pixel 9 (Peony, 256 GB)", image: "https://picsum.photos/seed/pixel4/200/200", price: 54999, mrp: 79999, discount: 31, rating: 4.6, reviews: 17118 },
                        { title: "Google Pixel 10 Pro (Obsidian, 256 GB)", image: "https://picsum.photos/seed/pixel5/200/200", price: 109999, mrp: 109999, discount: 0, rating: 4.6, reviews: 250 },
                    ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <GreenDealCard brand="vivo" tagline="Segment's Fastest with UFS 3.1" model="vivo T4x 5G" price={13749} image="https://picsum.photos/seed/vivo/200/200" />
                    <GreenDealCard brand="realme" tagline="7000mAh | 80W + 144Hz AMOLED" model="realme P4 5G" price={15999} image="https://picsum.photos/seed/realme/200/200" />
                    <GreenDealCard brand="oppo" tagline="Toughest 5G Phone under 12K*" model="OPPO K13x 5G" price={11249} image="https://picsum.photos/seed/oppo/200/200" />
                    <GreenDealCard brand="motorola" tagline="Powerful Snapdragon 7s Gen 2" model="moto g67 Power" price={14999} image="https://picsum.photos/seed/moto/200/200" />
                    <GreenDealCard brand="Ai+" tagline="Most Affordable 4G" model="Ai+ Pulse (4GB)" price={5999} image="https://picsum.photos/seed/ai/200/200" />
                    <GreenDealCard brand="vivo" tagline="Most Affordable 5G" model="vivo T4 Lite 5G" price={10249} image="https://picsum.photos/seed/vivolite/200/200" />
                </div>

                <MobileBrandRow 
                    title="Redmi smartphones"
                    products={[
                        { title: "REDMI A5 - Locked with Airtel Prepaid (Jaisalmer Gold, 64 GB)", image: "https://picsum.photos/seed/redmi1/200/200", price: 5999, mrp: 8999, discount: 33, rating: 4.1, reviews: 5390 },
                        { title: "REDMI A4 5G only on Jio SIM (Sparkle Purple, 64 GB)", image: "https://picsum.photos/seed/redmi2/200/200", price: 8190, mrp: 10999, discount: 25, rating: 4.3, reviews: 11590 },
                        { title: "REDMI A5 (Just Black, 128 GB)", image: "https://picsum.photos/seed/redmi3/200/200", price: 7499, mrp: 9999, discount: 25, rating: 4.2, reviews: 3988 },
                        { title: "REDMI Note 14 SE 5G (Mystique White, 128 GB)", image: "https://picsum.photos/seed/redmi4/200/200", price: 13499, mrp: 19999, discount: 32, rating: 4.3, reviews: 15672 },
                    ]}
                />
             </div>
        )}

        {view === 'fresh' && (
             <div className="bg-[#F3F3F3] min-h-screen">
                {/* Fresh Banner */}
                <div className="w-full bg-[#E5F7ED] border-b border-green-200 py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <img src="https://m.media-amazon.com/images/G/31/img18/Fresh/GW/Nov21/Fresh_Logo_new.jpg" alt="Fresh" className="h-8 object-contain mix-blend-multiply" />
                        <span className="text-xl font-medium text-gray-700 hidden sm:block">|</span>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold text-gray-800 leading-none">Get your groceries delivered as fast as today</span>
                        </div>
                    </div>
                    <button className="bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold py-2 px-6 rounded-md shadow-sm text-sm">
                        Sign in to shop
                    </button>
                </div>

                <div className="max-w-[1400px] mx-auto py-4 px-2 md:px-4">
                    <FreshSection title="Popular near you" products={freshMockData.popular} />
                    <FreshSection title="Fruits & Vegetables" linkText="See Fruits & Vegetables" products={freshMockData.fruitsVeg} />
                    <FreshSection title="Trending near you" products={freshMockData.trending} />
                    
                    {/* Store Categories */}
                    <div className="my-6">
                        <FreshCategoryRow title="Shop by store" items={freshMockData.shopByStore} />
                    </div>

                    <FreshSection title="Cereals & dry fruits" linkText="See Cereals & dry fruits" products={freshMockData.cereals} />
                    <FreshSection title="Household Cleaners" linkText="See Household Cleaners" products={freshMockData.household} />
                    
                    <div className="my-8 text-3xl font-bold text-gray-900 px-2">More products to explore</div>

                    <FreshSection title="Cleaning & household" linkText="See Cleaning & household" products={freshMockData.household} />
                    <FreshSection title="Breads" linkText="See all" products={freshMockData.breads} />
                    <FreshSection title="Eggs" linkText="See all" products={freshMockData.eggs} />
                </div>
             </div>
        )}

        {view === 'customerService' && (
          <div className="bg-white min-h-screen pb-10">
            <div className="max-w-[1000px] mx-auto px-4 pt-6">
                <h1 className="text-3xl font-normal mb-4">Hello. What can we help you with?</h1>
                <div className="border-b border-gray-300 mb-6"></div>
                
                <h2 className="text-2xl font-bold text-[#111] mb-4">Some things you can do here</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceCards.map((card, idx) => (
                        <div 
                            key={idx} 
                            className="border border-gray-300 rounded-lg p-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => {
                                if (card.title === "Your Orders" || card.title === "Returns and Refunds") {
                                    setView('signin');
                                }
                            }}
                        >
                            <div className="w-12 h-12 flex-shrink-0">
                               <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{card.title}</h3>
                                <div className="text-sm text-gray-600">
                                    {card.desc.map((d, i) => <div key={i}>{d}</div>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {view === 'orders' && (
            <div className="bg-white min-h-screen pb-10">
                <div className="max-w-[1000px] mx-auto px-4 pt-6">
                    <div className="flex items-center gap-2 text-sm text-[#565959] mb-4">
                        <span className="hover:underline cursor-pointer hover:text-[#C7511F]" onClick={() => setView('customerService')}>Your Account</span>
                        <span>›</span>
                        <span className="text-[#C7511F]">Your Orders</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-normal">Your Orders</h1>
                    </div>

                    {/* Mock Order Confirmation / Details View */}
                    <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden mb-8">
                        <div className="bg-[#F0F2F2] border-b border-gray-200 p-4">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="bg-green-600 rounded-full p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-bold text-[#007600]">Order Confirmed</h2>
                                    </div>
                                    <p className="text-sm text-gray-600">Order # <span className="font-bold">404-1234567-1234567</span></p>
                                </div>
                                <div className="text-right">
                                    <button className="text-sm text-[#007185] hover:underline hover:text-[#C7511F] font-medium">View Invoice</button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start gap-2 mb-6 bg-[#F0F2F2] p-3 rounded border border-green-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <p className="text-sm text-gray-800">
                                    Thank you! We've sent a confirmation email to <strong>komalraj18@gmail.com</strong>. We'll send another notification when your order ships.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Shipping Address */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Shipping Address</h3>
                                    <div className="text-sm text-gray-600 leading-relaxed">
                                        Ishee Enterprises Private Limited,<br/>
                                        Dharavi Peela Bangla,<br/>
                                        near Holi Maidan Dharavi,<br/>
                                        Dharavi Mumbai-400017,<br/>
                                        Maharashtra, India<br/>
                                        Phone: 8692955333
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Payment Method</h3>
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                                        <span>Ending in 1234</span>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Order Summary</h3>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <div className="flex justify-between">
                                            <span>Item(s) Subtotal:</span>
                                            <span>₹54,999.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping & Handling:</span>
                                            <span>₹0.00</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Promotion Applied:</span>
                                            <span>-₹500.00</span>
                                        </div>
                                        <div className="border-t border-gray-200 my-2"></div>
                                        <div className="flex justify-between font-bold text-gray-900 text-base">
                                            <span>Grand Total:</span>
                                            <span>₹54,499.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipment Section */}
                            <div className="mt-8 border border-gray-300 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">Arriving Tomorrow by 8 PM</h3>
                                        <p className="text-xs text-green-600 mt-1">On the way</p>
                                    </div>
                                    <button className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full px-4 py-1.5 text-sm font-medium shadow-sm">Track package</button>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative pt-6 pb-2 px-4">
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-600 w-3/4 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                                        <span>Ordered</span>
                                        <span>Shipped</span>
                                        <span className="text-green-700 font-bold">Out for Delivery</span>
                                        <span>Arriving</span>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="mt-6 flex gap-4">
                                    <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded p-2 flex items-center justify-center">
                                        <img src="https://picsum.photos/seed/pixel4/200/200" alt="Google Pixel 9" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div>
                                        <a href="#" className="text-[#007185] hover:underline hover:text-[#C7511F] font-medium text-sm">Google Pixel 9 (Peony, 256 GB)</a>
                                        <p className="text-xs text-gray-500 mt-1">Sold by: Appario Retail Private Ltd</p>
                                        <p className="text-sm font-bold mt-1">₹54,999.00</p>
                                        <div className="flex gap-2 mt-2">
                                            <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded px-3 py-1 text-xs shadow-sm">Buy it again</button>
                                            <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded px-3 py-1 text-xs shadow-sm">View your item</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Post Purchase Engagement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="border border-gray-300 rounded p-4">
                            <h4 className="font-bold text-sm mb-2">Need help with your item?</h4>
                            <a href="#" className="text-xs text-[#007185] hover:underline block mb-1">Contact Seller</a>
                            <a href="#" className="text-xs text-[#007185] hover:underline block mb-1">Request an invoice</a>
                            <a href="#" className="text-xs text-[#007185] hover:underline block">Return or replace items</a>
                        </div>
                        <div className="border border-gray-300 rounded p-4">
                             <h4 className="font-bold text-sm mb-2">Share your purchase</h4>
                             <div className="flex gap-4 mt-2">
                                <button className="text-xs bg-[#1877F2] text-white px-3 py-1 rounded hover:bg-blue-700">Facebook</button>
                                <button className="text-xs bg-[#1DA1F2] text-white px-3 py-1 rounded hover:bg-blue-500">Twitter</button>
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        )}

        {view === 'signin' && (
          <div className="flex flex-col items-center py-10 bg-white">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => setView('home')}>
                {/* Logo Icon SVG */}
                <div className="w-10 h-10 relative flex-shrink-0">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M15 80 Q 50 95 85 75" stroke="#00b894" strokeWidth="6" strokeLinecap="round" />
                        <path d="M85 75 Q 95 65 90 50" stroke="#ffeaa7" strokeWidth="6" strokeLinecap="round" />
                        <path d="M35 35 V 25 A 15 15 0 0 1 65 25 V 35" stroke="#e84393" strokeWidth="5" strokeLinecap="round" />
                        <rect x="25" y="35" width="50" height="45" rx="4" fill="#e84393" />
                        <circle cx="38" cy="45" r="3" fill="#ffeaa7" />
                        <circle cx="62" cy="45" r="3" fill="#ffeaa7" />
                        <path d="M15 45 L 18 38 L 21 45 L 28 48 L 21 51 L 18 58 L 15 51 L 8 48 Z" fill="#ffeaa7" />
                        <path d="M85 40 L 87 35 L 89 40 L 94 42 L 89 44 L 87 49 L 85 44 L 80 42 Z" fill="#ffeaa7" />
                    </svg>
                </div>
                <div className="flex flex-col justify-center leading-none">
                    <span className="text-2xl font-black tracking-wide text-black uppercase drop-shadow-sm">Shop Sphere</span>
                    <span className="text-xs font-bold tracking-[0.2em] text-[#FF4D6D] uppercase">Apni Shopping</span>
                </div>
            </div>

            <div className="bg-white border border-gray-300 rounded p-8 w-[350px]">
              <h2 className="text-3xl font-normal mb-4">Sign in</h2>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Enter mobile number or email</label>
                <input type="text" className="w-full border border-gray-400 rounded p-2 focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none transition-shadow" />
              </div>
              <button 
                onClick={() => setView('orders')}
                className="w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded p-2 text-sm shadow-sm transition-colors mb-4"
              >
                Continue
              </button>
              <p className="text-xs text-gray-600 mb-4">
                By continuing, you agree to Shop Sphere's <span className="text-blue-600 hover:underline hover:text-[#C7511F] cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline hover:text-[#C7511F] cursor-pointer">Privacy Notice</span>.
              </p>
              <div className="flex items-center text-xs text-blue-600 hover:underline hover:text-[#C7511F] cursor-pointer mb-6 group">
                <span className="mr-1 text-gray-500 group-hover:text-[#C7511F]">►</span> Need help?
              </div>
            </div>
            
            <div className="my-4 text-xs text-gray-500 w-[350px] text-center relative">
                 <div className="border-t border-gray-200 absolute w-full top-2"></div>
                 <span className="bg-white px-2 relative z-10 text-gray-600">New to Shop Sphere?</span>
            </div>
            <button className="w-[350px] bg-white hover:bg-gray-50 border border-gray-300 rounded p-2 text-sm shadow-sm transition-colors">Create your Shop Sphere account</button>
            
            <div className="mt-8 border-t border-gray-200 w-full pt-4 flex flex-col items-center gap-2 bg-[#FCFDFF] pb-10">
                 <div className="flex gap-8 text-xs text-blue-600">
                    <span className="hover:underline hover:text-[#C7511F] cursor-pointer">Conditions of Use</span>
                    <span className="hover:underline hover:text-[#C7511F] cursor-pointer">Privacy Notice</span>
                    <span className="hover:underline hover:text-[#C7511F] cursor-pointer">Help</span>
                 </div>
                 <span className="text-xs text-gray-500">© 2025, Shop Sphere, Inc. or its affiliates</span>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="flex flex-col md:flex-row p-4 gap-4 bg-white min-h-[500px] max-w-[1500px] mx-auto">
            <div className="flex-1 bg-white p-6">
              <h2 className="text-2xl font-normal border-b pb-2 mb-4">Shopping Cart</h2>
              {cart.length === 0 ? (
                <div className="flex items-center gap-6">
                   <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" className="w-40 h-40 opacity-70" alt="Empty Cart" />
                   <div>
                       <h3 className="text-xl font-bold mb-2">Your Shop Sphere Cart is empty</h3>
                       <p className="text-sm text-blue-600 hover:underline cursor-pointer mb-4">Shop today's deals</p>
                       <div className="flex gap-3">
                           <button onClick={() => setView('signin')} className="bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-md px-4 py-1.5 text-sm shadow-sm">Sign in to your account</button>
                           <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-4 py-1.5 text-sm shadow-sm">Sign up now</button>
                       </div>
                   </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 border-b pb-4">
                      <div className="w-32 h-32 flex items-center justify-center bg-gray-50">
                         <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer line-clamp-2">{item.title}</h3>
                        <p className="text-xs text-green-600 mt-1">In stock</p>
                        <div className="flex items-center gap-2 mt-1">
                             {item.isPrime && <span className="text-[#00A8E1] font-bold italic text-xs">prime</span>}
                             <span className="text-xs text-gray-500">Eligible for FREE Shipping</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                             <input type="checkbox" className="rounded text-amazon-orange focus:ring-amazon-orange" />
                             <span className="text-sm">This will be a gift</span>
                             <a href="#" className="text-sm text-blue-600 hover:underline ml-1">Learn more</a>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-[#007185]">
                            <span className="cursor-pointer hover:underline">Delete</span>
                            <span className="text-gray-300">|</span>
                            <span className="cursor-pointer hover:underline">Save for later</span>
                            <span className="text-gray-300">|</span>
                            <span className="cursor-pointer hover:underline">See more like this</span>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                  <div className="text-right text-lg">
                      Subtotal ({cart.length} items): <span className="font-bold">₹{cart.reduce((a, c) => a + c.price, 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'search' && (
          <div className="flex flex-col md:flex-row bg-white min-h-screen max-w-[1500px] mx-auto">
            {/* Left Sidebar Filters */}
            <div className="w-full md:w-[240px] p-4 border-r border-gray-200">
                <h3 className="font-bold text-sm mb-2">Customer Reviews</h3>
                <ul className="space-y-1">
                    {[4, 3, 2, 1].map(star => (
                        <li 
                            key={star} 
                            className={`flex items-center gap-1 cursor-pointer hover:text-amazon-orange ${minRating === star ? 'font-bold text-amazon-orange' : 'text-gray-600'}`}
                            onClick={() => setMinRating(star)}
                        >
                            <div className="flex text-amazon-orange text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i}>{i < star ? '★' : '☆'}</span>
                                ))}
                            </div>
                            <span className="text-sm">& Up</span>
                        </li>
                    ))}
                    <li 
                         className={`cursor-pointer hover:text-amazon-orange mt-2 text-sm ${minRating === 0 ? 'font-bold' : 'text-blue-600'}`}
                         onClick={() => setMinRating(0)}
                    >
                        Clear Filter
                    </li>
                </ul>
            </div>

            {/* Main Results Area */}
            <div className="flex-1 p-4">
                {/* Search Top Bar: Sort */}
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-lg font-bold">
                        {isSearching ? `Searching for "${searchQuery}"...` : `Results for "${searchQuery}"`}
                    </h2>
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                        <select 
                            id="sort" 
                            value={sortOrder} 
                            onChange={(e) => setSortOrder(e.target.value as any)}
                            className="text-sm border border-gray-300 rounded px-2 py-1 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amazon-orange"
                        >
                            <option value="featured">Featured</option>
                            <option value="lowToHigh">Price: Low to High</option>
                            <option value="highToLow">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {isSearching ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="animate-pulse bg-gray-100 h-80 rounded-sm"></div>
                        ))}
                    </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredAndSortedResults.length > 0 ? filteredAndSortedResults.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAdd={addToCart}
                        isWishlisted={wishlist.includes(product.id)}
                        onToggleWishlist={toggleWishlist}
                        isSelectedForCompare={compareList.some(p => p.id === product.id)}
                        onToggleCompare={toggleCompare}
                        onBuyNow={handleBuyNow}
                      />
                    )) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No results found. Try searching for "shoes", "mobiles", "watch", etc.
                        </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
