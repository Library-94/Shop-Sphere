import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="font-sans text-xs">
      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4" onClick={() => setShowContact(false)}>
          <div className="bg-white text-black rounded-lg shadow-lg max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 font-bold text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-[#232F3E]">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#e47911]">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Customer Support</h3>
                  <p className="text-sm text-gray-600">8692955333</p>
                  <p className="text-sm text-gray-600">9321391550</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 text-[#e47911]">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-sm text-gray-600">komalraj18@gmail.com</p>
                  <p className="text-sm text-gray-600">ishee111022enterprises@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                 <div className="mt-1 text-[#e47911]">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Corporate Address</h3>
                  <p className="text-sm text-gray-600">
                    Ishee Enterprises Private Limited,<br/>
                    Dharavi Peela Bangla,<br/>
                    near Holi Maidan Dharavi,<br/>
                    Dharavi Mumbai-400017,<br/>
                    Maharashtra
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowContact(false)}
              className="mt-6 w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded py-2 text-sm shadow-sm font-medium text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-[#37475A] py-3 text-center text-sm font-medium text-white hover:bg-[#485769] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        Back to top
      </div>
      
      <div className="bg-[#172337] text-white py-10 border-b border-[#454d5e]">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row gap-8 px-4">
          {/* Links Section */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-[#878787] text-[12px] font-normal mb-3 uppercase tracking-wide">ABOUT</h3>
              <ul className="space-y-1 text-[12px] font-semibold text-white">
                <li className="hover:underline cursor-pointer" onClick={() => setShowContact(true)}>Contact Us</li>
                <li className="hover:underline cursor-pointer">About Us</li>
                <li className="hover:underline cursor-pointer">Careers</li>
                <li className="hover:underline cursor-pointer">Shop Sphere Stories</li>
                <li className="hover:underline cursor-pointer">Press</li>
                <li className="hover:underline cursor-pointer">Corporate Information</li>
              </ul>
            </div>
             <div>
              <h3 className="text-[#878787] text-[12px] font-normal mb-3 uppercase tracking-wide">HELP</h3>
              <ul className="space-y-1 text-[12px] font-semibold text-white">
                <li className="hover:underline cursor-pointer">Payments</li>
                <li className="hover:underline cursor-pointer">Shipping</li>
                <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
                <li className="hover:underline cursor-pointer">FAQ</li>
                <li className="hover:underline cursor-pointer">Report Infringement</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#878787] text-[12px] font-normal mb-3 uppercase tracking-wide">CONSUMER POLICY</h3>
              <ul className="space-y-1 text-[12px] font-semibold text-white">
                <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
                <li className="hover:underline cursor-pointer">Terms Of Use</li>
                <li className="hover:underline cursor-pointer">Security</li>
                <li className="hover:underline cursor-pointer">Privacy</li>
                <li className="hover:underline cursor-pointer">Sitemap</li>
                <li className="hover:underline cursor-pointer">Grievance Redressal</li>
                <li className="hover:underline cursor-pointer">EPR Compliance</li>
                <li className="hover:underline cursor-pointer">FSSAI Food Safety Connect App</li>
              </ul>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-[1px] bg-[#454d5e]"></div>

          {/* Address Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 text-[12px]">
             <div>
                <h3 className="text-[#878787] text-[12px] font-normal mb-3 uppercase tracking-wide">Mail Us:</h3>
                <p className="text-white leading-5">
                  Ishee Enterprises Private Limited,<br/>
                  Dharavi Peela Bangla,<br/>
                  near Holi Maidan Dharavi,<br/>
                  Dharavi Mumbai-400017,<br/>
                  Maharashtra, India
                </p>
             </div>
             <div>
                <h3 className="text-[#878787] text-[12px] font-normal mb-3 uppercase tracking-wide">Registered Office Address:</h3>
                <p className="text-white leading-5 mb-3">
                  Ishee Enterprises Private Limited,<br/>
                  Dharavi Peela Bangla,<br/>
                  near Holi Maidan Dharavi,<br/>
                  Dharavi Mumbai-400017,<br/>
                  Maharashtra, India<br/>
                  CIN : U51109KA2012PTC066107<br/>
                  Telephone: <span className="text-[#2874f0] font-medium">8692955333</span>
                </p>
                
                <div className="flex gap-4 mt-4">
                    <h3 className="text-[#878787] text-[12px] font-normal uppercase tracking-wide">Social:</h3>
                    <div className="flex gap-3 text-white">
                        <svg className="w-5 h-5 cursor-pointer hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        <svg className="w-5 h-5 cursor-pointer hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        <svg className="w-5 h-5 cursor-pointer hover:text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        <svg className="w-5 h-5 cursor-pointer hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-[#172337] py-8 border-t border-[#454d5e] flex flex-col items-center gap-4">
        <div className="flex items-center gap-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
                {/* Logo Icon SVG */}
                <div className="w-8 h-8 relative flex-shrink-0">
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
                    <span className="text-lg font-black tracking-wide text-[#FFD814] uppercase drop-shadow-md">Shop Sphere</span>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF4D6D] uppercase drop-shadow-sm">Apni Shopping</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-white">
            <div className="flex flex-wrap justify-center gap-4">
                <span className="hover:underline cursor-pointer">Conditions of Use & Sale</span>
                <span className="hover:underline cursor-pointer">Privacy Notice</span>
                <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
            </div>
            <p className="text-gray-400">© 2025, Shop Sphere, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};