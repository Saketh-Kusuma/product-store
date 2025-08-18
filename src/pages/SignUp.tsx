import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Sign from "../assets/undraw_secure-login_m11a.svg";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/supabase-client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Store01FreeIcons } from "@hugeicons/core-free-icons";

export default function SignUp() {
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Redirect to sign in page after successful signup with delay
  useEffect(() => {
    let redirectTimer: number;
    if (isSuccess) {
      redirectTimer = window.setTimeout(() => {
        navigate("/signin");
      }, 3000);
    }
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [isSuccess, navigate]);

  function HandleError() {
    setError("block");
  }

  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Reset previous errors
    setSubmitError("");
    setConfirmMessage("");

    if (password !== confirmPassword) {
      setSubmitError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: name,
          },
        },
      });
      if (error) {
        setSubmitError(error.message);
        setIsSuccess(false);
        return;
      }

      // Check if user was created successfully
      if (data && data.user) {
        setIsSuccess(true);

        // Check if email confirmation is needed
        if (data.user.identities && data.user.identities.length === 0) {
          setConfirmMessage(
            "Please check your email for the confirmation link"
          );
        } else {
          setConfirmMessage("Signup successful! Confirm your email and login");
        }
      }
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      setSubmitError("An unexpected error occurred");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center gap-4 items-center max-h-lvh">
          <span className="flex flex-row gap-1 lg:gap-2 items-center">
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
      {!isLoading && (
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
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Sign-In
            </h1>
            <div className="md:min-w-svh bg-base-300 flex flex-col p-10 rounded-xl px-[20px]">
              <form className="flex flex-col gap-4" onSubmit={HandleSubmit}>
                <div className="flex flex-col gap-4 w-full">
                  <input
                    type="text"
                    className="input validator input-xl lg:w-lg text-lg"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minLength={3}
                    maxLength={30}
                    onChange={(e) => setName(e.target.value)}
                    title="Only letters, numbers or dash"
                  />
                  <p className={`validator-hint hidden ${error}`}>
                    Must be 3 to 30 characters
                    <br />
                    containing only letters, numbers or dash
                  </p>
                </div>
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
                <div className="flex flex-col gap-4 w-full">
                  <h1>Confirm Password</h1>
                  <input
                    type="password"
                    className="input validator input-xl lg:w-lg text-lg"
                    required
                    placeholder="Confirm password"
                    minLength={8}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    onError={HandleError}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <p
                    className={`validator-hint ${
                      password === confirmPassword ? "hidden" : "block"
                    }`}
                  >
                    Not matching with the password
                  </p>
                </div>
                <button className="bg-white btn btn-md text-primary w-3xs md:w-xs rounded-4xl">
                  Sign Up
                </button>
                <span>
                  Already a user?
                  <Link
                    to={"/signin"}
                    style={{ textDecoration: "underline", marginInline: "2px" }}
                  >
                    Sign In
                  </Link>
                </span>
              </form>
            </div>
          </div>
          {isSuccess && (
            <div className="toast toast-end">
              <div className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{confirmMessage}</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
