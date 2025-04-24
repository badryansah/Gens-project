"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import Link from "next/link";

const Sidebar = ({
  isSidebarOpen = true,
  setIsSidebarOpen,
  activeMenuItem = "Profile Toko",
  setActiveMenuItem,
}) => {
  // Jika prop setter tidak disediakan, buat state lokal
  const [localIsSidebarOpen, setLocalIsSidebarOpen] = useState(isSidebarOpen);
  const [localActiveMenuItem, setLocalActiveMenuItem] =
    useState(activeMenuItem);
  const [isHovering, setIsHovering] = useState(null);

  // Deteksi ukuran layar - pindahkan ini ke atas agar diinisialisasi sebelum digunakan
  const [isDesktop, setIsDesktop] = useState(false);

  // Animation variants yang tidak menggunakan isDesktop
  const buttonVariants = {
    rest: { scale: 1, backgroundColor: "#ffffff" },
    hover: { scale: 1.1, backgroundColor: "#f3f4f6" },
    tap: { scale: 0.9, backgroundColor: "#e5e7eb" },
  };

  const iconVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  // Dua set variant terpisah untuk mobile dan desktop
  const sidebarMobileVariants = {
    open: {
      x: 0,
      opacity: 1,
      boxShadow: "5px 0 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
      },
    },
    closed: {
      x: "-100%",
      opacity: 0,
      boxShadow: "none",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "afterChildren",
      },
    },
  };

  const sidebarDesktopVariants = {
    open: {
      x: 0,
      opacity: 1,
      boxShadow: "5px 0 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
      },
    },
    closed: {
      x: 0, // Tetap di posisi, tidak bergerak di desktop
      opacity: 1, // Tetap terlihat
      boxShadow: "5px 0 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: {
      opacity: 0.5,
      display: "block",
    },
    closed: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
      },
    }),
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const menuItemVariants = {
    initial: { backgroundColor: "rgba(255, 255, 255, 0)" },
    hover: {
      backgroundColor: (name) =>
        currentActiveMenuItem === name
          ? "rgba(49, 92, 234, 0.15)"
          : "rgba(243, 244, 246, 1)",
      x: 5,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
    active: {
      backgroundColor: "rgba(49, 92, 234, 0.1)",
      color: "#315CEA",
      fontWeight: 500,
    },
  };

  const indicatorVariants = {
    initial: {
      width: 0,
      opacity: 0,
    },
    active: {
      width: 4,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Effect untuk mendeteksi ukuran layar
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check awal
    checkIsDesktop();

    // Tambahkan event listener untuk resize
    window.addEventListener("resize", checkIsDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  useEffect(() => {
    if (setIsSidebarOpen) {
      setLocalIsSidebarOpen(isSidebarOpen);
    }
  }, [isSidebarOpen, setIsSidebarOpen]);

  useEffect(() => {
    if (setActiveMenuItem) {
      setLocalActiveMenuItem(activeMenuItem);
    }
  }, [activeMenuItem, setActiveMenuItem]);

  // Pastikan sidebar selalu terbuka di desktop
  useEffect(() => {
    if (isDesktop) {
      if (setIsSidebarOpen) {
        setIsSidebarOpen(true);
      } else {
        setLocalIsSidebarOpen(true);
      }
    }
  }, [isDesktop, setIsSidebarOpen]);

  // Gunakan prop setter jika disediakan, jika tidak gunakan state lokal
  const handleSidebarToggle = () => {
    if (setIsSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setLocalIsSidebarOpen(!localIsSidebarOpen);
    }
  };

  const handleMenuItemClick = (item) => {
    if (setActiveMenuItem) {
      setActiveMenuItem(item);
    } else {
      setLocalActiveMenuItem(item);
    }
  };

  // Nilai sidebar yang digunakan (dari props atau state lokal)
  const sidebarOpen = setIsSidebarOpen ? isSidebarOpen : localIsSidebarOpen;
  const currentActiveMenuItem = setActiveMenuItem
    ? activeMenuItem
    : localActiveMenuItem;

  const menuItems = [
    { name: "Profile Toko", path: "/Dashboad/Profileseller" },
    { name: "Tambah Produk", path: "/Dashboad/Produk" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-black z-30"
            initial="closed"
            animate={sidebarOpen ? "open" : "closed"}
            exit="closed"
            variants={overlayVariants}
            onClick={handleSidebarToggle}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Toggle Button */}
      <motion.button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={handleSidebarToggle}
        variants={buttonVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <IoCloseOutline className="text-2xl text-gray-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <IoMenuOutline className="text-2xl text-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        className={`bg-white text-gray-800 h-full shadow-lg z-40 w-64 overflow-hidden ${
          isDesktop ? "static" : "fixed top-0 left-0"
        }`}
        variants={isDesktop ? sidebarDesktopVariants : sidebarMobileVariants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
      >
        <motion.div
          className="p-6 h-full flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Header */}
          <motion.div className="border-b pb-4 mb-6" variants={logoVariants}>
            <motion.h1
              className="text-2xl font-bold text-gray-800 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  delay: 0.3,
                }}
              >
                Toko Saya
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Menu Items */}
          <motion.ul
            className="space-y-4 flex-grow"
            variants={containerVariants}
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <Link href={item.path}>
                  <motion.a
                    className={`block px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
                      currentActiveMenuItem === item.name
                        ? "text-[#315CEA] font-medium"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleMenuItemClick(item.name)}
                    onHoverStart={() => setIsHovering(item.name)}
                    onHoverEnd={() => setIsHovering(null)}
                    initial="initial"
                    animate={
                      currentActiveMenuItem === item.name ? "active" : "initial"
                    }
                    whileHover="hover"
                    whileTap="tap"
                    custom={item.name}
                    variants={menuItemVariants}
                  >
                    {/* Active indicator bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-[#315CEA] rounded-r-full"
                      initial="initial"
                      animate={
                        currentActiveMenuItem === item.name
                          ? "active"
                          : "initial"
                      }
                      variants={indicatorVariants}
                    />

                    <motion.span className="relative z-10 ml-1">
                      {item.name}
                    </motion.span>

                    {/* Background highlight animation */}
                    {(isHovering === item.name ||
                      currentActiveMenuItem === item.name) && (
                      <motion.div
                        className={`absolute inset-0 rounded-lg ${
                          currentActiveMenuItem === item.name
                            ? "bg-[#315CEA] bg-opacity-10"
                            : "bg-gray-100"
                        }`}
                        layoutId="menuBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                  </motion.a>
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          {/* Footer area if needed */}
          <motion.div
            className="mt-auto pt-4 border-t"
            variants={itemVariants}
            custom={menuItems.length + 1}
          >
            <motion.p
              className="text-xs text-gray-500 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
            >
              © 2025 Toko Saya
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
