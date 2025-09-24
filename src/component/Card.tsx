import { useState } from "react";
import type { Products } from "@/types/Products";

export default function Card({ product }: { product: Products }) {
  const [imageHover, setImageHover] = useState(product.images[0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="flex flex-col itmes-center">
      <div className="card bg-base-300 w-full shadow-sm flex flex-col itmes-center">
        <figure className="aspect-square overflow-hidden h-[200px]">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className="bg-base-300 animate-pulse w-full flex flex-col items-center justify-center">
              <span className="text-gray-400 loading loading-spinner text-primary"></span>
            </div>
          )}

          {/* Error placeholder */}
          {imageError && (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}

          {/* Main image with key prop for forced re-render */}
          <img
            key={`${product.id}-${imageHover}`} // Force re-render when image changes
            src={imageHover}
            alt={product.title}
            className={`w-[100px] h-[150px] object-cover transition-opacity duration-300 cursor-pointer ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onMouseEnter={() =>
              setImageHover(
                product.images[1] ? product.images[1] : product.images[0]
              )
            }
            onMouseLeave={() => setImageHover(product.images[0])}
            loading="eager" // Load images immediately
          />
        </figure>
        <div className="card-body w-full h-[250px]">
          <h2 className="card-title">{product.title}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary bg-white border-none text-primary">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
