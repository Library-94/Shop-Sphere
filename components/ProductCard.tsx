
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAdd: (p: Product, quantity: number) => void;
    isWishlisted?: boolean;
    onToggleWishlist?: (id: string) => void;
    isSelectedForCompare?: boolean;
    onToggleCompare?: (p: Product) => void;
    onBuyNow?: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
    product, 
    onAdd, 
    isWishlisted = false, 
    onToggleWishlist,
    isSelectedForCompare = false,
    onToggleCompare,
    onBuyNow
}) => {
    const [quantity, setQuantity] = useState(1);
    const titleId = `product-title-${product.id}`;

    return (
        <div 
            className="bg-white border border-gray-200 hover:border-gray-300 rounded-sm flex flex-col p-4 hover:shadow-xl transition-all duration-500 cursor-pointer h-full relative group"
            role="article"
            aria-labelledby={titleId}
        >
            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleWishlist) onToggleWishlist(product.id);
                }}
                className="absolute top-2 right-2 z-20 p-2 rounded-full bg-gray-100 hover:bg-white hover:shadow-md transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-colors ${isWishlisted ? 'fill-[#CC0C39] text-[#CC0C39]' : 'text-gray-400 hover:text-[#CC0C39]'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={isWishlisted ? 0 : 2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            {/* Discount Badge */}
            {product.discount > 10 && (
                <div 
                    className="absolute top-2 left-2 bg-[#CC0C39] text-white text-xs font-bold px-2 py-1 rounded-sm z-10 shadow-sm"
                    aria-hidden="true"
                >
                    {product.discount}% off
                </div>
            )}

            <div className="flex-1 flex items-center justify-center bg-gray-50 p-2 mb-4 h-48 overflow-hidden rounded-sm" aria-hidden="true">
                 <img src={product.image} alt="" className="max-h-full object-contain mix-blend-multiply transition-transform duration-500 ease-in-out group-hover:scale-110" />
            </div>
            
            {/* Title */}
            <h3 id={titleId} className="font-medium text-base text-gray-900 line-clamp-3 mb-1 hover:text-amazon-orange leading-tight transition-colors">
                {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center mb-1">
                <div className="flex text-amazon-orange text-sm" role="img" aria-label={`Rated ${product.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                        <span key={i} aria-hidden="true">{i < Math.round(product.rating) ? '★' : '☆'}</span>
                    ))}
                </div>
                <span className="text-xs text-cyan-700 ml-1 hover:text-amazon-orange hover:underline cursor-pointer">
                    <span className="sr-only">{product.reviewCount} reviews</span>
                    <span aria-hidden="true">{product.reviewCount}</span>
                </span>
            </div>

            {/* Price */}
            <div className="mb-2">
                <span className="text-xs align-top relative top-0.5" aria-hidden="true">₹</span>
                <span className="text-2xl font-medium">
                    <span className="sr-only">Current Price: {product.price} rupees</span>
                    <span aria-hidden="true">{product.price.toLocaleString('en-IN')}</span>
                </span>
                <span className="text-xs text-gray-500 line-through ml-2">
                    <span className="sr-only">Original Price: {product.mrp} rupees</span>
                    <span aria-hidden="true">M.R.P: ₹{product.mrp.toLocaleString('en-IN')}</span>
                </span>
                <span className="sr-only">{product.discount}% discount</span>
                <span className="text-xs font-bold ml-2 text-[#CC0C39]" aria-hidden="true">({product.discount}% off)</span>
            </div>

            {/* Review Section */}
            <div className="mb-3 p-2 bg-[#F7F7F7] rounded-sm border border-gray-100">
                <p className="text-xs font-bold text-gray-700 mb-1">Top Review</p>
                <div className="flex items-center gap-1 mb-1">
                    <div className="flex text-amazon-orange text-[10px]">
                        {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < Math.round(product.rating) ? '★' : '☆'}</span>
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-500">Verified Purchase</span>
                </div>
                <p className="text-xs text-gray-600 italic line-clamp-2">
                    "Value for money. The product quality is amazing for this price point. Highly recommended!"
                </p>
            </div>

            {/* Delivery Info */}
            <div className="mb-2 flex flex-wrap items-center gap-1 text-xs text-gray-500">
                {product.isPrime && (
                    <span className="text-[#00A8E1] font-bold italic text-sm mr-1" aria-label="Prime delivery">prime</span>
                )}
                <span>
                    Get it by <span className="font-bold text-gray-800">{product.deliveryDate || 'Tomorrow'}</span>
                </span>
            </div>

            <div className="mt-auto flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-[#F0F2F2] border border-[#D5D9D9] hover:bg-[#E3E6E6] rounded-md shadow-sm text-sm py-1 pl-2 pr-1 focus:ring-2 focus:ring-[#e77600] focus:border-[#e77600] outline-none cursor-pointer h-[34px]"
                        aria-label="Select Quantity"
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>Qty: {num}</option>
                        ))}
                    </select>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(product, quantity);
                        }}
                        className="flex-1 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-full py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F7CA00] focus:ring-offset-1 transition-colors h-[34px]"
                        aria-label={`Add ${quantity} of ${product.title} to cart`}
                    >
                        Add to Cart
                    </button>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onBuyNow && onBuyNow(product);
                    }}
                    className="w-full bg-[#FA8900] hover:bg-[#e87f00] border border-[#ca6e00] rounded-full py-1.5 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FA8900] focus:ring-offset-1 transition-colors h-[34px]"
                    aria-label={`Buy Now: ${product.title}`}
                >
                    Buy Now
                </button>
            </div>

            {/* Compare Checkbox */}
            {onToggleCompare && (
                <div className="mt-3 flex items-center gap-2 group/compare justify-end">
                    <input
                        type="checkbox"
                        id={`compare-${product.id}`}
                        checked={isSelectedForCompare}
                        onChange={(e) => {
                             e.stopPropagation();
                             onToggleCompare(product);
                        }}
                        className="cursor-pointer w-3.5 h-3.5 text-amazon-orange rounded border-gray-400 focus:ring-amazon-orange"
                        aria-label={`Compare ${product.title}`}
                    />
                    <label
                        htmlFor={`compare-${product.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="text-xs text-gray-500 hover:text-amazon-orange cursor-pointer select-none"
                    >
                        Compare
                    </label>
                </div>
            )}
        </div>
    );
};
