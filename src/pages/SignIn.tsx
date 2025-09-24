import { motion } from "framer-motion";
import { useState } from "react";
import Sign from "../assets/undraw_enter-password_1kl4.svg";
import { Link } from "react-router-dom";
import { supabase } from "@/supabase-client";
export default function SignIn() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function HandleError() {
    setError("block");
  }
  function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-center px-10 md:gap-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <div className="hidden lg:flex h-full">
        <img src={`${Sign}`} className="w-[550px]" />
      </div>
      <div className="flex flex-col items-center justify-start md:justify-center min-h-dvh gap-5 md:gap-10 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Sign-In</h1>
        <div className="md:min-w-svh bg-base-300 flex flex-col p-10 rounded-xl px-[20px]">
          <form className="flex flex-col gap-4" onSubmit={HandleSubmit}>
            <div className="flex flex-col gap-4 w-full">
              <h1>Email Address</h1>
              <input
                className="input validator input-xl lg:w-lg text-lg"
                type="email"
                required
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className={`validator-hint hidden ${error}`}>
                Enter valid email address
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <h1>Password</h1>
              <input
                type="password"
                className="input validator input-xl lg:w-lg text-lg"
                required
                placeholder="Enter your password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onError={HandleError}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className={`validator-hint hidden ${error}`}>
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </div>
            <button className="bg-white btn btn-md text-primary w-3xs md:w-xs rounded-4xl">
              Sign In
            </button>
            <span>
              Not a user?
              <Link
                to={"/signup"}
                style={{ textDecoration: "underline", marginInline: "2px" }}
              >
                SignUp
              </Link>
            </span>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
