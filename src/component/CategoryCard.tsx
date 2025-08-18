import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: string;
  image: string;
}

export default function CategoryCard({ category, image }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${category}`}
      className="bg-base-300 rounded-lg p-4 flex flex-col items-center justify-center"
    >
      <img src={image} alt={category} className="w-24 h-24 mb-4" />
      <h3 className="text-lg font-semibold">{category}</h3>
    </Link>
  );
}
