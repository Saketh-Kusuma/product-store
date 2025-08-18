import type { Products } from "@/types/Products";
import { useNavigate } from "react-router-dom";
export default function MiniCard({ product }: { product: Products }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product-details/${product.id}`)}
      className="card bg-base-300 w-60 h-[280px] shadow-sm"
    >
      <figure className=" pt-[10px] flex flex-row justify-start items-start">
        <img
          src={product.images[0]}
          alt={product.title}
          width={100}
          height={100}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body gap-3 items-start text-start">
        <h2 className="card-title text-sm">{product.title}</h2>
        <p>${product.price}</p>
        <div className="card-actions">
          <button className="btn btn-primary bg-white border-none shadow-none text-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
