import Delivery from "../assets/undraw_order-delivered_puaw.svg";
import Security from "../assets/undraw_security-on_btwg.svg";
import Gifts from "../assets/undraw_gifts_4gy3.svg";
import Cart from "../assets/undraw_on-the-way_ahi2.svg";
import Pay from "../assets/undraw_pay-with-credit-card_77g6.svg";
import Discount from "../assets/undraw_discount_igfl.svg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const HeroData = [
    {
      id: 1,
      image: Delivery,
      title: "Fast Delivery",
      description:
        "Swift deliveries straight to your doorstep, wherever you are!",
    },
    {
      id: 2,
      image: Security,
      title: "Top-notch Security",
      description:
        "Top-notch security measures ensure your personal information is safe.",
    },
    {
      id: 3,
      image: Gifts,
      title: "Rewards and Gifts",
      description:
        "Earn rewards for every purchase and enjoy exclusive gift offers.",
    },
    {
      id: 4,
      image: Cart,
      title: "Free Shipping",
      description:
        "Add items to your cart and enjoy free shipping on orders over $50.",
    },
    {
      id: 6,
      image: Pay,
      title: "Fast Transactions",
      description:
        "Pay with ease using your preferred payment methods and enjoy fast transactions.",
    },
    {
      id: 7,
      image: Discount,
      title: "Discounts and Offers",
      description:
        "Earn rewards for every purchase and enjoy exclusive gift offers.",
    },
  ];

  return (
    <div className="">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnFocusIn: true,
          }),
        ]}
      >
        <CarouselContent className="w-100vw  bg-base-200">
          {HeroData.map((item) => (
            <CarouselItem key={item.id} className="h-fit">
              <div className="text-center font-bold text-4xl md:text-5xl pt-[20px]">
                Start Purchasing Now
              </div>

              <div className="hero py-[50px] px-[0px] h-[550px] md:h-[400px]">
                <div className="hero-content flex-col md:flex-row-reverse md:justify-around text-wrap">
                  <img
                    src={item.image}
                    className="max-w-[300px] md:max-w-[400px] md:max-w-xs lg:max-w-sm rounded-lg bg-base text-wrap"
                  />
                  <div>
                    <h1 className="text-2xl md:text-5xl font-bold">
                      {item.title}
                    </h1>
                    <p className="py-6 text-wrap">{item.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
