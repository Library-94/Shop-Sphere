import React from 'react';
import { HomeWidget } from '../types';

export const WidgetCard: React.FC<{ widget: HomeWidget }> = ({ widget }) => {
  return (
    <div className="bg-white p-4 z-20 h-full flex flex-col justify-between shadow-sm">
      <h2 className="text-lg/6 font-bold mb-3 text-gray-900">{widget.title}</h2>
      
      {widget.type === 'grid' && (
        <div className="grid grid-cols-2 gap-3 mb-3">
          {widget.items.map((item, idx) => (
            <div key={idx} className="cursor-pointer">
              <div className="overflow-hidden bg-[#F7F7F7] mb-1 flex items-center justify-center h-[100px]">
                 <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain p-1" />
              </div>
              <p className="text-xs text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>
      )}

      {widget.type === 'single' && (
         <div className="flex-1 mb-3 cursor-pointer bg-[#F7F7F7] flex items-center justify-center overflow-hidden">
            <img src={widget.items[0].image} alt={widget.title} className="h-full w-full object-cover" />
         </div>
      )}

      <a href="#" className="text-xs sm:text-sm text-[#007185] hover:text-[#C7511F] hover:underline mt-auto block">
        {widget.linkText}
      </a>
    </div>
  );
};