
import React, { useState } from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  cartCount: number;
  setView: (view: ViewState) => void;
  onSearch: (query: string) => void;
}

const categories = [
  "All Categories",
  "Alexa Skills",
  " Devices",
  " Fashion",
  " Fresh",
  " Pharmacy",
  "Appliances",
  "Apps & Games",
  "Baby",
  "Beauty",
  "Books",
  "Car & Motorbike",
  "Clothing & Accessories",
  "Computers & Accessories",
  "Electronics",
  "Furniture",
  "Garden & Outdoors",
  "Gift Cards",
  "Grocery & Gourmet Foods",
  "Health & Personal Care",
  "Home & Kitchen",
  "Industrial & Scientific",
  "Jewellery",
  "Kindle Store",
  "Luggage & Bags",
  "Luxury Beauty",
  "Movies & TV Shows",
  "Music",
  "Musical Instruments",
  "Office Products",
  "Pet Supplies",
  "Prime Video",
  "Shoes & Handbags",
  "Software",
  "Sports, Fitness & Outdoors",
  "Tools & Home Improvement",
  "Toys & Games",
  "Video Games",
  "Watches"
];

export const Header: React.FC<HeaderProps> = ({ cartCount, setView, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50">
        {/* Top Navbar */}
        <div className="bg-amazon text-white flex items-center h-[60px] px-4 gap-2 sm:gap-4">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm gap-2"
            onClick={() => {
                window.scrollTo(0, 0);
                setView('home');
                setSearchQuery('');
            }}
          >
              {/* Logo Icon SVG */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Swoosh Green */}
                      <path d="M15 80 Q 50 95 85 75" stroke="#00b894" strokeWidth="6" strokeLinecap="round" />
                      {/* Swoosh Yellow */}
                      <path d="M85 75 Q 95 65 90 50" stroke="#ffeaa7" strokeWidth="6" strokeLinecap="round" />
                      
                      {/* Handle */}
                      <path d="M35 35 V 25 A 15 15 0 0 1 65 25 V 35" stroke="#e84393" strokeWidth="5" strokeLinecap="round" />
                      
                      {/* Bag */}
                      <rect x="25" y="35" width="50" height="45" rx="4" fill="#e84393" />
                      
                      {/* Dots */}
                      <circle cx="38" cy="45" r="3" fill="#ffeaa7" />
                      <circle cx="62" cy="45" r="3" fill="#ffeaa7" />
                      
                      {/* Sparkles */}
                      <path d="M15 45 L 18 38 L 21 45 L 28 48 L 21 51 L 18 58 L 15 51 L 8 48 Z" fill="#ffeaa7" />
                      <path d="M85 40 L 87 35 L 89 40 L 94 42 L 89 44 L 87 49 L 85 44 L 80 42 Z" fill="#ffeaa7" />
                  </svg>
              </div>
              
              {/* Logo Text */}
              <div className="flex flex-col justify-center leading-none">
                  <span className="text-lg sm:text-xl font-black tracking-wide text-[#FFD814] uppercase drop-shadow-md">Shop Sphere</span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#FF4D6D] uppercase drop-shadow-sm">Apni Shopping</span>
              </div>
          </div>

          {/* Location (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col text-xs ml-2 hover:outline hover:outline-1 hover:outline-white p-1 rounded-sm cursor-pointer">
            <span className="text-gray-300 ml-4">Delivering to Mumbai 400001</span>
            <div className="flex items-center font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Update location</span>
            </div>
          </div>

          {/* Search Bar */}
          <form className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-amazon-orange" onSubmit={handleSearch}>
              <div className="relative h-full bg-gray-100 hover:bg-gray-200 border-r border-gray-300 rounded-l-md flex items-center group cursor-pointer">
                  <select
                      className="appearance-none bg-transparent h-full px-3 text-xs text-gray-600 outline-none cursor-pointer border-none focus:ring-0 w-auto max-w-[50px] sm:max-w-[150px] truncate"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{ paddingRight: '1.5rem' }}
                  >
                      {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                      ))}
                  </select>
                  <svg className="w-2 h-2 text-gray-500 absolute right-2 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
              </div>
            <input 
              type="text" 
              className="flex-1 px-3 text-black focus:outline-none" 
              placeholder="Search Shop Sphere"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-amazon-orange hover:bg-[#e3912c] px-4 flex items-center justify-center rounded-r-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Language (Hidden on small screens) */}
          <div className="hidden lg:flex items-center p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-5 h-3 mr-1 border border-white" />
            <span className="font-bold text-sm">EN</span>
            <svg className="w-2 h-2 ml-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
          </div>

          {/* Account */}
          <div 
            className="flex flex-col p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer"
            onClick={() => setView('signin')}
          >
            <span className="text-xs leading-3">Hello, sign in</span>
            <div className="flex items-center">
              <span className="font-bold text-sm leading-4">Account & Lists</span>
              <svg className="w-2 h-2 ml-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>

          {/* Orders */}
          <div className="hidden md:flex flex-col p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer">
            <span className="text-xs leading-3">Returns</span>
            <span className="font-bold text-sm leading-4">& Orders</span>
          </div>

          {/* Cart */}
          <div 
            className="flex items-end p-2 hover:outline hover:outline-1 hover:outline-white rounded-sm cursor-pointer relative"
            onClick={() => setView('cart')}
          >
            <div className="relative">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#f08804] font-bold text-base">{cartCount}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="font-bold text-sm mb-1 hidden sm:inline">Cart</span>
          </div>
        </div>

        {/* Sub Header */}
        <div className="bg-amazon-light text-white text-sm flex items-center h-[40px] px-4 gap-4 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <div 
            className="flex items-center cursor-pointer hover:border hover:border-white p-1 font-bold"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All
          </div>
          {['Fresh', 'Sell', 'Bestsellers', 'Mobiles', "Today's Deals", 'Customer Service', 'Shop deals in Electronics', 'Electronics', 'New Releases', 'Home & Kitchen'].map((item) => (
            <span 
              key={item} 
              className="cursor-pointer hover:border hover:border-white p-1 px-2 rounded-sm"
              onClick={() => {
                if (item === 'Mobiles') setView('mobiles');
                else if (item === 'Fresh') setView('fresh');
                else if (item === 'Customer Service') setView('customerService');
              }}
            >
                {item}
            </span>
          ))}
          <div className="flex-1"></div>
          <img src="https://m.media-amazon.com/images/G/31/Events/img23/Jupiter23/KJ_Header_400x39.jpg" alt="Ad" className="h-full object-cover hidden md:block max-w-[300px]" />
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Overlay Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          
          {/* Sidebar Content */}
          <div className="relative bg-white w-[85%] max-w-[365px] h-full shadow-xl flex flex-col animate-slide-right overflow-hidden">
             
             {/* Close Button */}
             <button 
               onClick={() => setIsSidebarOpen(false)}
               className="absolute -right-10 top-2 text-white p-1"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
             </button>

             {/* Sidebar Header */}
             <div className="bg-[#232f3e] text-white p-3 pl-8 py-4 flex items-center gap-3 font-bold text-lg">
                <div className="bg-white text-[#232f3e] rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
                Hello, sign in
             </div>

             {/* Sidebar Scrollable Area */}
             <div className="overflow-y-auto flex-1 pb-10">
                
                {/* Section: Trending */}
                <div className="border-b border-gray-200 py-2">
                    <h3 className="font-bold text-lg text-[#111111] px-8 py-3">Trending</h3>
                    <ul className="text-sm text-[#111111]">
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer">Bestsellers</li>
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer">New Releases</li>
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer">Movers and Shakers</li>
                    </ul>
                </div>

                {/* Section: Digital Content */}
                <div className="border-b border-gray-200 py-2">
                    <h3 className="font-bold text-lg text-[#111111] px-8 py-3">Digital Content and Devices</h3>
                    <ul className="text-sm text-[#111111]">
                        {['Echo & Alexa', 'Fire TV', 'Kindle E-Readers & eBooks', 'Audible Audiobooks', 'Amazon Prime Video', 'Amazon Prime Music'].map(item => (
                            <li key={item} className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center group">
                                {item}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Section: Shop by Category */}
                <div className="border-b border-gray-200 py-2">
                    <h3 className="font-bold text-lg text-[#111111] px-8 py-3">Shop by Category</h3>
                    <ul className="text-sm text-[#111111]">
                         {['Mobiles, Computers', 'TV, Appliances, Electronics', "Men's Fashion", "Women's Fashion"].map(item => (
                            <li key={item} className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                                {item}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                        ))}
                         <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                             See all
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                             </svg>
                         </li>
                    </ul>
                </div>

                {/* Section: Programs & Features */}
                <div className="border-b border-gray-200 py-2">
                    <h3 className="font-bold text-lg text-[#111111] px-8 py-3">Programs & Features</h3>
                    <ul className="text-sm text-[#111111]">
                        {['Gift Cards & Mobile Recharges', 'Amazon Launchpad', 'Amazon Business', 'Handloom and Handicrafts'].map(item => (
                             <li key={item} className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                                {item}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                        ))}
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                             See all
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                             </svg>
                         </li>
                    </ul>
                </div>

                {/* Section: Help & Settings */}
                <div className="py-2">
                    <h3 className="font-bold text-lg text-[#111111] px-8 py-3">Help & Settings</h3>
                    <ul className="text-sm text-[#111111]">
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer">Your Account</li>
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer">Customer Service</li>
                        <li className="px-8 py-3 hover:bg-gray-100 cursor-pointer">Sign in</li>
                    </ul>
                </div>

             </div>
          </div>
        </div>
      )}
    </>
  );
};