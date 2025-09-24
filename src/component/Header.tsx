import {
  FavouriteFreeIcons,
  ShoppingBag01FreeIcons,
  Store01FreeIcons,
  UserAdd01FreeIcons,
  UserCheck01Icon,
} from "@hugeicons/core-free-icons";
import { useGetCategoryQuery } from "@/api/categories";

import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/supabase-client";
export default function Header() {
  const { data, isLoading, isError, isSuccess } =
    useGetCategoryQuery("getCategory");
  const [cartNumber, setCartNumber] = useState(0);

  const [useDetails, setUserDetails] = useState({
    email: "",
    display_name: "",
  });
  function HandleSignout() {
    supabase.auth.signOut({
      scope: "local",
    });
  }

  async function getCartNumber(id: string) {
    if (!id) return;

    await supabase
      .from("cart")
      .select("*")
      .eq("user_id", id)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setCartNumber(res.data.length);
        }
      });
  }
  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      setUserDetails({
        email: res.data.user?.email || "",
        display_name: res.data.user?.user_metadata?.display_name || "",
      });
    });

    supabase.auth.getUser().then((res) => {
      const id = res.data.user?.id || "";

      // Only call getCartNumber if we have a valid user ID
      if (id) {
        getCartNumber(id);
      }
    });

    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUserDetails({
          email: "",
          display_name: "",
        });
      }
    });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      {isLoading && (
        <div className="flex flex-col justify-center gap-4 items-center min-h-screen">
          <span className="flex flex-row gap-1 xl:gap-2 items-center">
            {" "}
            <span>
              <HugeiconsIcon
                icon={Store01FreeIcons}
                className="w-[26px] h-[26px] xl:w-[20px] h-[20px]"
              />{" "}
            </span>
            <span className="text-xl font-bold text-nowrap">Product-Store</span>
          </span>
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
      {isSuccess && (
        <div className={`navbar px-[10px] sticky z-[9999]`}>
          <div className={`navbar-start`}>
            <span>
              <Link
                to={"/"}
                className="flex flex-row gap-1 xl:gap-2 items-center"
              >
                <span>
                  <HugeiconsIcon
                    icon={Store01FreeIcons}
                    className="w-[20px] h-[20px]"
                  />{" "}
                </span>
                <span className="text-xl md:text-sm xl:text-xl font-bold text-nowrap">
                  Product-Store
                </span>
              </Link>
            </span>
          </div>
          <div className="navbar-center gap-2 xl:gap-4 hidden md:flex md:flex-row">
            <label className="input md:input-sm xl:input-lg rounded-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                className="grow input-primary"
                placeholder="Search"
              />
            </label>
            <span className="flex flex-row md:gap-4 xl:gap-8 md:text-sm xl:text-lg">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
              <div className="dropdown md:dropdown-center xl:dropdown-center xl:dropdown-bottom dropdown-hover cursor-pointer">
                <div tabIndex={0} role="button">
                  Categories
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[9999] menu bg-base-100 grid grid-flow-col grid-rows-10 md:w-sm xl:w-md xl:w-lg rounded-box p-2 shadow-sm"
                >
                  {data?.map((category, key) => (
                    <li className="" key={key}>
                      <Link to={`/category/${category}`}>{category}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </span>
          </div>
          <div className="navbar-end hidden md:flex md:flex-row md:gap-1 xl:gap-2">
            <div className="flex flex-row md:gap-1 xl:gap-2">
              <Link to={"/product-details"}>
                <HugeiconsIcon
                  className="md:h-[20px] xl:h-[30px]"
                  icon={FavouriteFreeIcons}
                />
              </Link>
              <div className="indicator">
                <span className="indicator-item text-[13px] font-bold">
                  {cartNumber}
                </span>
                <HugeiconsIcon
                  className="md:h-[20px] xl:h-[30px]"
                  icon={ShoppingBag01FreeIcons}
                />
              </div>
              <div className="dropdown dropdown-bottom dropdown-left">
                <div tabIndex={0}>
                  <HugeiconsIcon
                    className="md:h-[20px] xl:h-[30px]"
                    icon={
                      useDetails.email === ""
                        ? UserAdd01FreeIcons
                        : UserCheck01Icon
                    }
                  />
                </div>
                <div
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  {useDetails.email == "" ? (
                    <div className="flex flex-col items-center justify-center">
                      <Link
                        to="/signin"
                        className="bg-base-100 btn-md btn p-2 rounded-[10px] cursor-pointer text-center"
                      >
                        Sign in
                      </Link>
                      <p>
                        Not a user{" "}
                        <Link
                          to={"/signup"}
                          style={{ textDecoration: "underline" }}
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <span>{useDetails.display_name}</span>
                      <span>{useDetails.email}</span>
                      <button
                        onClick={HandleSignout}
                        className="bg-base-100 p-2 rounded-[10px] cursor-pointer text-center"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <label className="toggle text-base-content md:w-[30px] md:h-[20px] xl:w-[40px] xl:h-[25px]">
              <input
                type="checkbox"
                value="acid"
                className="theme-controller"
              />

              <svg
                aria-label="sun"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </g>
              </svg>

              <svg
                aria-label="moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </g>
              </svg>
            </label>
          </div>
          <div className="navbar-end flex flex-row gap-2 md:hidden px-[10px]">
            <div>
              <label className="toggle text-base-content">
                <input
                  type="checkbox"
                  value="acid"
                  className="theme-controller"
                />

                <svg
                  aria-label="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </g>
                </svg>

                <svg
                  aria-label="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </g>
                </svg>
              </label>
            </div>
            <div className="indicator">
              <span className="indicator-item text-[13px]">2</span>
              <HugeiconsIcon icon={ShoppingBag01FreeIcons} />
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div
          role="alert"
          className="alert alert-error alert-soft flex flex-col gap-0 items-start font-bold"
        >
         Something went wrong
        </div>
      )}
    </motion.div>
  );
}
