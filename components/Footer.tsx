import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-white">
      <div className="bg-[#37475A] py-4 text-center text-sm font-medium hover:bg-[#485769] cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        Back to top
      </div>
      
      <div className="bg-[#232F3E] py-12 border-b border-gray-600">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          <div>
            <h3 className="font-bold mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Shop Sphere Science</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Connect with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Shop Sphere</li>
              <li className="hover:underline cursor-pointer">Sell under Accelerator</li>
              <li className="hover:underline cursor-pointer">Protect and Build Your Brand</li>
              <li className="hover:underline cursor-pointer">Global Selling</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Fulfilment by Shop Sphere</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:underline cursor-pointer">COVID-19 and Shop Sphere</li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#232F3E] py-8 border-t border-gray-600 flex flex-col items-center gap-4">
        <div className="flex items-center gap-20">
            <div className="text-2xl font-bold">Shop Sphere</div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
             <div className="border border-gray-500 rounded px-2 py-1 flex items-center gap-1 text-sm text-gray-300 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10h16v11H4V10z"></path></svg>
                English
             </div>
             <div className="border border-gray-500 rounded px-2 py-1 flex items-center gap-1 text-sm text-gray-300 cursor-pointer">
                <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" className="w-5 h-3" alt="India" />
                India
             </div>
        </div>
      </div>

      <div className="bg-[#101e33] py-8 text-xs text-center text-gray-300">
        <div className="grid grid-cols-4 max-w-[1000px] mx-auto gap-4 mb-8 text-left px-4">
           <div>
               <h5 className="font-bold text-white hover:underline cursor-pointer">AbeBooks</h5>
               <p className="hover:underline cursor-pointer">Books, art<br/>& collectibles</p>
           </div>
           <div>
               <h5 className="font-bold text-white hover:underline cursor-pointer">Web Services</h5>
               <p className="hover:underline cursor-pointer">Scalable Cloud<br/>Computing Services</p>
           </div>
           <div>
               <h5 className="font-bold text-white hover:underline cursor-pointer">Audible</h5>
               <p className="hover:underline cursor-pointer">Download<br/>Audio Books</p>
           </div>
           <div>
               <h5 className="font-bold text-white hover:underline cursor-pointer">IMDb</h5>
               <p className="hover:underline cursor-pointer">Movies, TV<br/>& Celebrities</p>
           </div>
        </div>
        
        <div className="flex flex-col gap-1">
            <div className="space-x-4">
                <span className="hover:underline cursor-pointer">Conditions of Use & Sale</span>
                <span className="hover:underline cursor-pointer">Privacy Notice</span>
                <span className="hover:underline cursor-pointer">Interest-Based Ads</span>
            </div>
            <p>© 1996-2025, Shop Sphere, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};