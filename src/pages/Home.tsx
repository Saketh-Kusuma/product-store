import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Hero from "../component/Hero";
import { motion } from "framer-motion";
import { useGetCategoryQuery, useGetProductsQuery } from "@/api/categories";
import MiniCard from "@/component/Mini-Card";
import { useEffect, useState } from "react";

import CategoryCard from "@/component/CategoryCard";
import beauty from "@/assets/beauty.svg";
import fragrance from "@/assets/fragrance.svg";
import furniture from "@/assets/furniture.svg";
import groceries from "@/assets/groceries.svg";
import homeDecoration from "@/assets/home-decoration.svg";
import kitchenAccessories from "@/assets/kitchen-accessories.svg";
import laptops from "@/assets/laptops.svg";
import mensShirts from "@/assets/mens-shirts.svg";
import mensShoes from "@/assets/mens-shoes.svg";
import mensWatches from "@/assets/mens-watches.svg";
import motorcycle from "@/assets/motorcycle.svg";
import skinCare from "@/assets/skin-care.svg";
import smartphones from "@/assets/smartphones.svg";
import sportsAccessories from "@/assets/sports-accessories.svg";
import sunglasses from "@/assets/sunglasses.svg";
import tablets from "@/assets/tablets.svg";
import tops from "@/assets/tops.svg";
import vehicle from "@/assets/vehicle.svg";
import womanDress from "@/assets/womans-dress.svg";
import womenBags from "@/assets/women-bags.svg";
import womensJewellery from "@/assets/womens-jewellery.svg";
import womensWatches from "@/assets/womens-watches.svg";
import womensShoes from "@/assets/womens-shoes.svg";
import mobileAcceessories from "@/assets/mobile-accessories.svg";
const categoryImageMap: { [key: string]: string } = {
  beauty: beauty,
  fragrances: fragrance,
  furniture: furniture,
  groceries: groceries,
  "home-decoration": homeDecoration,
  "kitchen-accessories": kitchenAccessories,
  laptops: laptops,
  "mens-shirts": mensShirts,
  "mens-shoes": mensShoes,
  "mens-watches": mensWatches,
  motorcycle: motorcycle,
  "skin-care": skinCare,
  smartphones: smartphones,
  "sports-accessories": sportsAccessories,
  sunglasses: sunglasses,
  tablets: tablets,
  tops: tops,
  vehicle: vehicle,
  "womens-dresses": womanDress,
  "womens-bags": womenBags,
  "womens-jewellery": womensJewellery,
  "womens-watches": womensWatches,
  "womens-shoes": womensShoes,
  "mobile-accessories": mobileAcceessories,
};

export default function Home() {
  const { data } = useGetProductsQuery("getProducts");
  const { data: categories } = useGetCategoryQuery("getCategory");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
      className="font-roboto"
    >
      <Hero />
      <div className="text-center text-5xl font-bold py-[25px]">
        <h1>Products</h1>
        <div className="relative overflow-hidden font-poppins">
          <Carousel
            className="pt-[40px] w-full max-w-none mx-auto"
            setApi={setApi}
            draggable={true}
            opts={{
              align: "center",
              dragFree: false,
            }}
          >
            <CarouselContent className="-ml-0 md:-ml-1">
              {data?.products?.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-10 md:pl-4 basis-[80%] ss:basis-[70%] ls:basis-[50%] ssm:basis-[40%] md:basis-[35%] slg:basis-[30%] lg:basis-[25%] xl:basis-[18%]"
                >
                  <div className="">
                    <MiniCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
      <div className="text-center text-5xl font-bold py-[25px]">
        <h1>Browse By Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 px-4">
          {categories?.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              image={categoryImageMap[category]}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
