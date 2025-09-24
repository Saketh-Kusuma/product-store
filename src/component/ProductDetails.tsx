import {
  useGetProductsByCategoryQuery,
  useGetProductsByIdQuery,
} from "@/api/categories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  FavouriteFreeIcons,
  TruckReturnIcon,
  VanIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MiniCard from "./Mini-Card";
import { useParams } from "react-router-dom";
import { supabase } from "@/supabase-client";
export default function ProductDetails() {
  const params = useParams();
  const { data } = useGetProductsByIdQuery(params?.id);
  const [noOfImg, setNoOfImg] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const { data: RelatedData } = useGetProductsByCategoryQuery(data?.category);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setNoOfImg(data?.images.length || 0);
    if (!api) {
      return;
    }
    supabase.auth.getUser().then((res) => {
      setUserId(res.data.user?.id || "");
    });
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  function HandleCartAdd() {
    return;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="flex flex-col gap-4 sm:gap-8 min-h-screen"
    >
      {/* Header Section */}
      <div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4 px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">
          Product Details
        </h1>
        <div className="breadcrumbs text-xs sm:text-sm md:text-base">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/"}>Category</Link>
            </li>
            <li>1</li>
          </ul>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4 md:px-8 xl:px-16">
        {/* Image Section */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
            {data?.images.map((image, index) => (
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-cover rounded-lg cursor-pointer flex-shrink-0"
                src={image}
                key={index}
                alt={data?.title}
                onClick={() => setImgSrc(image)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow flex items-center justify-center">
            <img
              className="bg-base-300 rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
              src={imgSrc === "" ? data?.images[0] : imgSrc}
              alt={data?.title}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold break-words">
              {data?.title} ({data?.brand})
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
              <div className="flex">
                {Array.from({ length: Math.round(data?.rating || 0) }).map(
                  (_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  )
                )}
              </div>
              <span>({data?.reviews.length} Reviews)</span>
              <span>|</span>
              <span className="text-green-600">{data?.availabilityStatus}</span>
            </div>

            <div className="text-xl sm:text-2xl font-bold text-primary">
              ${data?.price}
            </div>

            <p className="text-sm sm:text-base text-gray-600 break-words">
              {data?.description}
            </p>

            <div className="text-sm sm:text-base">
              <span className="font-bold">Category: </span>
              <Link
                to={`/category/${data?.category}`}
                className="text-primary hover:underline"
              >
                {data?.category
                  ? data.category.charAt(0).toUpperCase() +
                    data.category.slice(1).toLowerCase()
                  : ""}
              </Link>
            </div>

            <div className="text-sm sm:text-base">
              <span className="font-bold">Discount: </span>
              <span className="text-red-500">{data?.discountPercentage}%</span>
            </div>
          </div>

          <hr className="my-2" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button className="px-3 py-2 hover:bg-gray-100 transition-colors">
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">0</span>
              <button className="px-3 py-2 hover:bg-gray-100 transition-colors">
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={HandleCartAdd}
                className="btn btn-outline btn-sm sm:btn-md flex-1 sm:flex-initial"
              >
                Add to cart
              </button>
              <button className="btn btn-primary btn-sm sm:btn-md flex-1 sm:flex-initial">
                Buy Now
              </button>
              <button className="btn btn-ghost btn-sm sm:btn-md">
                <HugeiconsIcon size={20} icon={FavouriteFreeIcons} />
              </button>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="card bg-base-100 border border-gray-200 mt-4">
            <div className="card-body p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-4">
                <HugeiconsIcon
                  size={32}
                  icon={VanIcon}
                  className="text-primary"
                />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Free Delivery
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              <hr />

              <div className="flex items-center gap-4">
                <HugeiconsIcon
                  size={32}
                  icon={TruckReturnIcon}
                  className="text-primary"
                />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    Return Policy
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 break-words">
                    {data?.returnPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-4 sm:mb-6">
          Reviews
        </h2>

        <hr className="mb-4 sm:mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data?.reviews.map((review, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-gray-200 shadow-sm"
            >
              <div className="card-body p-4">
                <div className="flex gap-3 items-start mb-3">
                  <div className="avatar">
                    <div className="w-10 sm:w-12 rounded-full">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                        alt="Reviewer avatar"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base truncate">
                      {review?.reviewerName}
                    </h4>
                    <p className="text-xs text-gray-600 truncate">
                      {review?.reviewerEmail}
                    </p>
                    <p className="text-xs text-gray-500">
                      {review?.date.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="mb-2">
                  {Array.from({ length: Math.round(review?.rating || 0) }).map(
                    (_, i) => (
                      <span key={i} className="text-yellow-400">
                        ⭐
                      </span>
                    )
                  )}
                </div>

                <p className="text-sm break-words">{review?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-4 sm:mb-6">
          Related Products
        </h2>

        <hr className="mb-4 sm:mb-6" />

        <div className="relative">
          <Carousel
            className="w-full"
            setApi={setApi}
            draggable={true}
            opts={{
              align: "start",
              dragFree: false,
            }}
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {RelatedData?.products?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 sm:pl-4 basis-[85%] xs:basis-[75%] sm:basis-[50%] md:basis-[40%] lg:basis-[33%] xl:basis-[25%] 2xl:basis-[20%]"
                >
                  <MiniCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 sm:left-2" />
            <CarouselNext className="right-0 sm:right-2" />
          </Carousel>
        </div>
      </div>
    </motion.div>
  );
}
