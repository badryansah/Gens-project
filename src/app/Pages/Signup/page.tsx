"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/app/aset/logo.png";
import GoogleLogo from "@/app/aset/google-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function Sign() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  // User type state (buyer or seller)
  const [userType, setUserType] = useState("buyer"); // Default to buyer

  useEffect(() => {
    // Set animation visible after component mounts
    setIsVisible(true);

    // Mencegah scrolling pada body
    document.body.style.overflow = "hidden";

    // Bersihkan efek ketika komponen unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="h-screen bg-white flex flex-col font-sans text-black overflow-hidden">
        {/* Header - Tetap menggunakan motion dan animasi */}
        <motion.header
          className="bg-white shadow-sm p-4 sm:p-6 w-full z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.h1
              className="text-xl sm:text-2xl font-bold tracking-tight text-black"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Grab & Ship
            </motion.h1>

            {/* Mobile menu button - hidden on larger screens */}
            <button className="block md:hidden text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </motion.header>

        {/* Main Content - Dengan ukuran tetap dan tanpa scroll */}
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden">
          <motion.div
            className="bg-white max-w-4xl w-full p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-lg rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Left Section - Hidden on small screens */}
            <div className="hidden md:flex justify-center items-center">
              <motion.div
                className="relative"
                initial={{ rotateY: 45, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
              >
                <Image
                  src={Logo}
                  alt="Shopping Cart and Phone"
                  width={300}
                  height={300}
                  className="w-3/4 h-auto rounded-lg shadow-md"
                />
                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-16 h-16 bg-pink-100 rounded-full z-[-1]"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full z-[-1]"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  Create an account
                </h2>
                <p className="mt-2 text-base sm:text-lg text-black">
                  Enter your details below
                </p>
              </motion.div>

              <motion.form
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {/* User Type Selection */}
                <div className="flex space-x-4 mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="buyer"
                      checked={userType === "buyer"}
                      onChange={() => setUserType("buyer")}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Buyer</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value="seller"
                      checked={userType === "seller"}
                      onChange={() => setUserType("seller")}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium">Seller</span>
                  </label>
                </div>

                {/* Buyer Name field - enabled only when userType is buyer */}
                <motion.div
                  whileHover={{ scale: userType === "buyer" ? 1.01 : 1 }}
                  whileTap={{ scale: userType === "buyer" ? 0.99 : 1 }}
                >
                  <label
                    htmlFor="buyerName"
                    className={`block text-sm font-semibold mb-1 sm:mb-2 ${
                      userType === "buyer" ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Buyer Name
                  </label>
                  <input
                    type="text"
                    id="buyerName"
                    className={`w-full border rounded-lg p-2 sm:p-3 focus:outline-none transition duration-200 text-base ${
                      userType === "buyer"
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 text-black"
                        : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    placeholder="Enter your name"
                    required={userType === "buyer"}
                    disabled={userType !== "buyer"}
                  />
                </motion.div>

                {/* Store Name field - enabled only when userType is seller */}
                <motion.div
                  whileHover={{ scale: userType === "seller" ? 1.01 : 1 }}
                  whileTap={{ scale: userType === "seller" ? 0.99 : 1 }}
                >
                  <label
                    htmlFor="storeName"
                    className={`block text-sm font-semibold mb-1 sm:mb-2 ${
                      userType === "seller" ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    className={`w-full border rounded-lg p-2 sm:p-3 focus:outline-none transition duration-200 text-base ${
                      userType === "seller"
                        ? "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 text-black"
                        : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    placeholder="Enter your store name"
                    required={userType === "seller"}
                    disabled={userType !== "seller"}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-black mb-1 sm:mb-2"
                  >
                    Email or Phone Number
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-200 text-base text-black"
                    placeholder="Enter your email or phone number"
                    required
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-black mb-1 sm:mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-200 text-base text-black"
                    placeholder="Enter your password"
                    required
                  />
                </motion.div>

                <Link href="login/" className="block w-full">
                  <motion.button
                    type="button"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg font-semibold text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                  >
                    Create Account
                  </motion.button>
                </Link>
                {/* <Link href="/404Eror" className="block w-full">
                  <motion.button
                    type="button"
                    className="w-full bg-gray-100 border border-gray-300 text-black py-2 sm:py-3 rounded-lg flex justify-center items-center gap-3 transition duration-200 hover:bg-gray-50 font-medium text-base"
                    whileHover={{ scale: 1.02, backgroundColor: "#f5f5f5" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                  >
                    <Image
                      src={GoogleLogo}
                      alt="Google Icon"
                      className="w-5 h-5"
                    />
                    Sign up with Google
                  </motion.button>
                </Link> */}
              </motion.form>

              <motion.p
                className="text-center text-sm sm:text-base text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
              >
                Already have an account?{" "}
                <Link
                  href="login/"
                  className="text-blue-500 hover:underline font-medium"
                >
                  <motion.span whileHover={{ scale: 1.05, color: "#2563EB" }}>
                    Log In
                  </motion.span>
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          className="bg-gradient-to-r from-blue-50 to-purple-50 text-center py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <p className="text-sm text-gray-600">
            © 2025 Grab & Ship. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </>
  );
}

export default Sign;
