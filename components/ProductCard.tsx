import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAdd: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
    return (
        <div 
            className="bg-white border border-gray-200 hover:border-gray-300 rounded-sm flex flex-col p-4 hover:shadow-xl transition-all duration-200 cursor-pointer h-full relative group"
            role="article"
            aria-label={`Product: ${product.title}`}
        >
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-2 mb-4 h-48 overflow-hidden rounded-sm">
                 <img src={product.image} alt={product.title} className="max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
            </div>
            
            {/* Title */}
            <h3 className="font-medium text-base text-gray-900 line-clamp-3 mb-1 hover:text-amazon-orange leading-tight transition-colors">
                {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-1">
                <div className="flex text-amazon-orange text-sm" role="img" aria-label={`Rated ${product.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                        <span key={i} aria-hidden="true">{i < Math.round(product.rating) ? '★' : '☆'}</span>
                    ))}
                </div>
                <span className="text-xs text-cyan-700 ml-1 hover:text-amazon-orange hover:underline cursor-pointer" aria-label={`${product.reviewCount} reviews`}>
                    {product.reviewCount}
                </span>
            </div>

            {/* Price */}
            <div className="mb-2">
                <span className="text-xs align-top relative top-0.5" aria-hidden="true">₹</span>
                <span className="text-2xl font-medium">
                    <span className="sr-only">Price: {product.price} rupees</span>
                    <span aria-hidden="true">{product.price.toLocaleString('en-IN')}</span>
                </span>
                <span className="text-xs text-gray-500 line-through ml-2" aria-label={`List Price: ${product.mrp} rupees`}>
                    <span aria-hidden="true">M.R.P: ₹{product.mrp.toLocaleString('en-IN')}</span>
                </span>
                <span className="text-xs font-bold ml-2" aria-label={`${product.discount}% discount`}>({product.discount}% off)</span>
            </div>

            {/* Prime */}
            {product.isPrime && (
                 <div className="mb-2 flex items-center">
                    <span className="text-[#00A8E1] font-bold italic text-sm" aria-label="Prime delivery">prime</span>
                    <span className="text-xs text-gray-500 ml-1">Get it by {product.deliveryDate || 'Tomorrow'}</span>
                 </div>
            )}

            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onAdd(product);
                }}
                className="mt-2 w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F7CA00] focus:ring-offset-1 transition-colors"
                aria-label={`Add ${product.title} to cart`}
            >
                Add to Cart
            </button>
        </div>
    );
};