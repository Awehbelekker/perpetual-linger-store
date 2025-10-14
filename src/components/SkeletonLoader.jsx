import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-800 rounded-lg mb-4"></div>
      
      {/* Title skeleton */}
      <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
      
      {/* Category skeleton */}
      <div className="h-4 bg-gray-800 rounded w-1/2 mb-3"></div>
      
      {/* Notes skeleton */}
      <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-800 rounded w-5/6 mb-4"></div>
      
      {/* Description skeleton */}
      <div className="h-3 bg-gray-800 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-800 rounded w-4/5 mb-4"></div>
      
      {/* Price skeleton */}
      <div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
      
      {/* Button skeleton */}
      <div className="h-12 bg-gray-800 rounded w-full"></div>
    </div>
  );
};

export const CheckoutSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-800 rounded w-1/2 mb-6"></div>
      <div className="h-12 bg-gray-800 rounded w-full mb-4"></div>
      <div className="h-12 bg-gray-800 rounded w-full mb-4"></div>
      <div className="h-12 bg-gray-800 rounded w-full mb-4"></div>
      <div className="h-12 bg-gray-800 rounded w-full mb-6"></div>
      <div className="h-14 bg-gray-800 rounded w-full"></div>
    </div>
  );
};

export default ProductCardSkeleton;

