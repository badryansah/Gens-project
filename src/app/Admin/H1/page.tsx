"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IoTrendingUp,
  IoTrendingDown,
  IoEllipsisHorizontal,
  IoFilter,
  IoSearch,
  IoNotifications,
  IoChevronForward,
  IoStar,
} from "react-icons/io5";

// Animation variants (ambil dari Home)
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const AdminDashboard = () => {
  const [isVisible, setIsVisible] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  // Mock data (bisa diganti dengan fetch API)
  const stats = [
    {
      title: "Total Sales",
      value: "Rp 34.456.000",
      change: 14,
      isPositive: true,
      subtitle: "bulan ini",
    },
    {
      title: "Total Order",
      value: "3.456",
      change: 17,
      isPositive: false,
      subtitle: "bulan ini",
    },
    {
      title: "Total Revenue",
      value: "Rp 1.456.000",
      change: 14,
      isPositive: true,
      subtitle: "bulan ini",
    },
    {
      title: "Total Customer",
      value: "42.456",
      change: 11,
      isPositive: false,
      subtitle: "bulan ini",
    },
  ];

  const products = [
    {
      name: "Playstation 5",
      price: "Rp 8.000.000",
      category: "Elektronik",
      quantity: 128,
      amount: "Rp 1.024.000.000",
      rating: 5,
    },
    {
      name: "Controller PS5",
      price: "Rp 1.200.000",
      category: "Elektronik",
      quantity: 89,
      amount: "Rp 106.800.000",
      rating: 4,
    },
    {
      name: "Jam Tangan Wanita",
      price: "Rp 2.000.000",
      category: "Aksesoris",
      quantity: 74,
      amount: "Rp 148.000.000",
      rating: 4,
    },
    {
      name: "Parfum Pria",
      price: "Rp 900.000",
      category: "Kecantikan",
      quantity: 69,
      amount: "Rp 62.100.000",
      rating: 5,
    },
  ];

  // Scroll animation observer (ambil dari Home)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-900"
          >
            Admin Dashboard
          </motion.h1>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-gray-600 relative"
          >
            <IoNotifications className="text-xl" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          />
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          id="statsCards"
          data-animate
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemFade}
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group"
            >
              {/* Animated background elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-200 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <IoEllipsisHorizontal className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="mb-3"
              >
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`flex items-center gap-1 text-sm ${
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.isPositive ? <IoTrendingUp /> : <IoTrendingDown />}
                  {stat.change}%
                </motion.div>
                <span className="text-sm text-gray-500">{stat.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Top Selling Products */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8"
          id="topProducts"
          data-animate
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-semibold text-gray-900"
            >
              Produk Terlaris
            </motion.h3>
            <div className="flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                <IoFilter />
                Filter
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Lihat Semua
              </motion.button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Nama Produk",
                    "Harga",
                    "Kategori",
                    "Jumlah",
                    "Total",
                    "Rating",
                    "Aksi",
                  ].map((header, index) => (
                    <motion.th
                      key={header}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: product.rating }).map((_, i) => (
                          <IoStar key={i} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <IoEllipsisHorizontal />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
