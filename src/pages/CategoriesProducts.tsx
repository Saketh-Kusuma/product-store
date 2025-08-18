import { useGetProductsByCategoryQuery } from "@/api/categories";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/component/Card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Store01FreeIcons } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
interface CategoryName {
  categoryName: string;
}
export default function CategoriesProducts() {
  const params = useParams<{ categoryName: string }>();
  const { data, isError, isSuccess, error, isFetching } =
    useGetProductsByCategoryQuery(params?.categoryName);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      {isFetching && (
        <div className="flex flex-col justify-center gap-4 items-center max-h-1vh">
          <span className="flex flex-row gap-1 lg:gap-2 items-center">
            {" "}
            <span>
              <HugeiconsIcon
                icon={Store01FreeIcons}
                className="w-[26px] h-[26px] lg:w-[20px] h-[20px]"
              />
            </span>
            <span className="text-xl font-bold text-nowrap">Product-Store</span>
          </span>
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
      {isSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
          className="px-4"
        >
          <div className="breadcrumbs text-sm md:text-md">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/"}>Category</Link>
              </li>
              <li>
                <Link to={`/category/${params?.categoryName}`}>
                  {params?.categoryName?.charAt(0).toUpperCase() +
                    params?.categoryName?.substring(1).toLowerCase()}
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-[20px]">
            {data?.products?.map((product) => (
              <Link to={`/product-details/${product.id}`} key={product.id}>
                <Card product={product} />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
      {isError && (
        <div
          role="alert"
          className="alert alert-error alert-soft flex flex-col gap-0 items-start font-bold"
        >
          <span>{error.status || ""}</span>
          <span>{error.data.message || ""}</span>
        </div>
      )}
    </motion.div>
  );
}
