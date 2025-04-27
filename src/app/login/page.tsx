"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/aset/logo.png";
import { motion } from "framer-motion";

function Login() {
  // Animation states
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set animation visible after component mounts
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="h-screen bg-white flex flex-col font-sans text-black overflow-hidden">
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

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center pt-24 px-4 sm:px-6 md:px-8">
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
                  className="absolute -top-4 -left-4 w-16 h-16 bg-blue-100 rounded-full z-[-1]"
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
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-100 rounded-full z-[-1]"
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
            <div className="flex flex-col justify-center space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-black">
                  Welcome Back
                </h2>
                <p className="mt-2 text-base sm:text-lg text-gray-600">
                  Please enter your details to log in
                </p>
              </motion.div>

              <motion.form
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email or Username
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-200 text-base"
                    placeholder="Enter your email or username"
                    required
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition duration-200 text-base"
                    placeholder="Enter your password"
                    required
                  />
                </motion.div>

                <motion.div
                  className="flex items-center justify-between text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                >
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <motion.div whileHover={{ scale: 1.05, color: "#2563EB" }}>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      Forgot password?
                    </a>
                  </motion.div>
                </motion.div>

                <Link href="/Home" className="block w-full mt-6">
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg font-medium text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                  >
                    Mulai Membeli
                  </motion.button>
                </Link>

                <motion.div
                  className="relative flex py-3 items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 }}
                >
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-3 text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </motion.div>

                <Link
                  href="/Dashboad/Profileseller"
                  className="block w-full mt-6"
                >
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg font-medium text-base"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                  >
                    Mulai Menjual
                  </motion.button>
                </Link>
              </motion.form>

              <motion.p
                className="text-center text-sm sm:text-base text-gray-600 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.8 }}
              >
                Don't have an account?{" "}
                <Link
                  href="/Signup"
                  className="text-blue-500 hover:underline font-medium"
                >
                  <motion.span whileHover={{ scale: 1.05, color: "#2563EB" }}>
                    Sign up
                  </motion.span>
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          className="bg-gradient-to-r from-blue-50 to-purple-50 text-center py-4 mt-8"
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

export default Login;
