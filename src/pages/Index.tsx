import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
// import About from "./About";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProductDetails from "@/component/ProductDetails";
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));
const Blog = lazy(() => import("./Blog"));
const CategoriesProducts = lazy(() => import("./CategoriesProducts"));
export default function Index() {
  return (
    <section className="font-roboto">
      <section>
        <Header />
      </section>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/category/:categoryName"
            element={<CategoriesProducts />}
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
      </section>
      <section>
        <Footer />
      </section>
    </section>
  );
}
