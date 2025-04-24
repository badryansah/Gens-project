"use client";

import { useState, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";

import Link from "next/link";
import Siderbar from "../SiderSeller/page";
import { motion, AnimatePresence } from "framer-motion";

export default function TambahProduk() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenuItem, setActiveMenuItem] = useState("Tambah Produk Baru");
  const [savedProducts, setSavedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    size: "",
    price: "",
    stock: "",
    weight: "",
    condition: "Baru",
    brand: "",
    sku: "",
    minimumOrder: "1",
    discount: "",
    tags: "",
    shippingInfo: "",
    warrantyInfo: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Produk berhasil disimpan!"
  );

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);

    // Try to load saved products from localStorage
    const storedProducts = localStorage.getItem("savedProducts");
    if (storedProducts) {
      try {
        setSavedProducts(JSON.parse(storedProducts));
      } catch (e) {
        console.error("Error loading saved products", e);
      }
    }
  }, []);

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && selectedFiles.length < 3) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setSelectedFiles((prev) => [...prev, ...newFiles].slice(0, 3));
    }
  };

  // Function to handle edit product
  const handleEditProduct = (id) => {
    const productToEdit = savedProducts.find((product) => product.id === id);
    if (productToEdit) {
      setProductData({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        category: productToEdit.category || "",
        size: productToEdit.size || "",
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        weight: productToEdit.weight || "",
        condition: productToEdit.condition || "Baru",
        brand: productToEdit.brand || "",
        sku: productToEdit.sku || "",
        minimumOrder: productToEdit.minimumOrder || "1",
        discount: productToEdit.discount || "",
        tags: productToEdit.tags || "",
        shippingInfo: productToEdit.shippingInfo || "",
        warrantyInfo: productToEdit.warrantyInfo || "",
      });

      // Set images if available
      if (productToEdit.images && productToEdit.images.length > 0) {
        const newSelectedFiles = productToEdit.images.map((imageUrl) => ({
          preview: imageUrl,
          isExisting: true, // Mark as existing to avoid creating new object URLs
        }));
        setSelectedFiles(newSelectedFiles);
      } else {
        setSelectedFiles([]);
      }

      setIsEditing(true);
      setEditingProductId(id);

      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Function to cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProductId(null);

    // Reset form
    setProductData({
      name: "",
      description: "",
      category: "",
      size: "",
      price: "",
      stock: "",
      weight: "",
      condition: "Baru",
      brand: "",
      sku: "",
      minimumOrder: "1",
      discount: "",
      tags: "",
      shippingInfo: "",
      warrantyInfo: "",
    });
    setSelectedFiles([]);
  };

  // Function to save product
  const handleSaveProduct = () => {
    if (isEditing && editingProductId) {
      // Update existing product
      const updatedProducts = savedProducts.map((product) => {
        if (product.id === editingProductId) {
          return {
            ...product,
            ...productData,
            images: selectedFiles.map((f) => f.preview),
            dateUpdated: new Date().toLocaleString(),
          };
        }
        return product;
      });

      setSavedProducts(updatedProducts);
      setSuccessMessage("Produk berhasil diperbarui!");
      setIsEditing(false);
      setEditingProductId(null);

      // Save to localStorage
      try {
        localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));
      } catch (e) {
        console.error("Error saving products", e);
      }
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        images: selectedFiles.map((f) => f.preview),
        dateAdded: new Date().toLocaleString(),
      };

      const updatedProducts = [...savedProducts, newProduct];
      setSavedProducts(updatedProducts);
      setSuccessMessage("Produk berhasil disimpan!");

      // Save to localStorage
      try {
        localStorage.setItem("savedProducts", JSON.stringify(updatedProducts));
      } catch (e) {
        console.error("Error saving products", e);
      }
    }

    // Reset form
    setProductData({
      name: "",
      description: "",
      category: "",
      size: "",
      price: "",
      stock: "",
      weight: "",
      condition: "Baru",
      brand: "",
      sku: "",
      minimumOrder: "1",
      discount: "",
      tags: "",
      shippingInfo: "",
      warrantyInfo: "",
    });
    setSelectedFiles([]);
    setShowSuccessMessage(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Function to delete product
  const handleDeleteProduct = (id) => {
    const filteredProducts = savedProducts.filter(
      (product) => product.id !== id
    );
    setSavedProducts(filteredProducts);

    // Update localStorage
    localStorage.setItem("savedProducts", JSON.stringify(filteredProducts));

    // If the product being deleted is the one being edited, cancel edit mode
    if (isEditing && editingProductId === id) {
      handleCancelEdit();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const sidebarVariants = {
    open: {
      width: "240px",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      width: "0px",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const formItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const productCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const successMessageVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  // Available categories for the product
  const categories = [
    "Pilih Kategori",
    "Elektronik",
    "Pakaian",
    "Makanan & Minuman",
    "Perabotan Rumah",
    "Kesehatan & Kecantikan",
    "Hobi & Olahraga",
    "Buku & Alat Tulis",
    "Otomotif",
    "Lainnya",
  ];

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          className="flex h-screen bg-gray-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Sidebar */}
          <Siderbar />

          {/* Main Content */}
          <motion.div className="flex-1 overflow-y-auto pb-12">
            {/* Success Message */}
            <AnimatePresence>
              {showSuccessMessage && (
                <motion.div
                  className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50"
                  variants={successMessageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {successMessage}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">
              {/* Form Section */}
              <motion.div
                className="lg:col-span-7"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="bg-white p-6 shadow-md rounded-lg"
                  variants={containerVariants}
                >
                  <motion.h2
                    className="text-xl font-semibold mb-4 text-black"
                    variants={itemVariants}
                  >
                    {isEditing ? "Edit Produk" : "Informasi Produk"}
                  </motion.h2>

                  {/* Form */}
                  <motion.div
                    className="bg-gray-50 p-6 rounded-lg shadow-md"
                    variants={itemVariants}
                  >
                    {/* Basic Information Section */}
                    <motion.div className="mb-6 border-b pb-6">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-4"
                        variants={formItemVariants}
                        custom={0}
                        initial="hidden"
                        animate="visible"
                      >
                        Informasi Dasar
                      </motion.h3>

                      <div className="space-y-4 text-black">
                        <motion.input
                          type="text"
                          name="name"
                          value={productData.name}
                          onChange={handleChange}
                          placeholder="Nama Produk"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={1}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.textarea
                          name="description"
                          value={productData.description}
                          onChange={handleChange}
                          placeholder="Deskripsi Produk"
                          className="w-full p-2 border rounded-md h-24"
                          variants={formItemVariants}
                          custom={2}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.select
                          name="category"
                          value={productData.category}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={3}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {categories.map((category, index) => (
                            <option
                              key={index}
                              value={
                                category !== "Pilih Kategori" ? category : ""
                              }
                            >
                              {category}
                            </option>
                          ))}
                        </motion.select>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.input
                            type="text"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                            placeholder="Merek Produk"
                            className="w-full p-2 border rounded-md"
                            variants={formItemVariants}
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            whileFocus={{
                              boxShadow: "0 0 0 2px #315CEA",
                              scale: 1.01,
                            }}
                            transition={{ duration: 0.2 }}
                          />

                          <motion.input
                            type="text"
                            name="sku"
                            value={productData.sku}
                            onChange={handleChange}
                            placeholder="SKU / Kode Produk"
                            className="w-full p-2 border rounded-md"
                            variants={formItemVariants}
                            custom={5}
                            initial="hidden"
                            animate="visible"
                            whileFocus={{
                              boxShadow: "0 0 0 2px #315CEA",
                              scale: 1.01,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>

                        <motion.input
                          type="text"
                          name="tags"
                          value={productData.tags}
                          onChange={handleChange}
                          placeholder="Tag Produk (pisahkan dengan koma)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={6}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Specifications Section */}
                    <motion.div className="mb-6 border-b pb-6 text-black">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-4"
                        variants={formItemVariants}
                        custom={7}
                        initial="hidden"
                        animate="visible"
                      >
                        Spesifikasi Produk
                      </motion.h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.input
                          type="text"
                          name="size"
                          value={productData.size}
                          onChange={handleChange}
                          placeholder="Size / Ukuran (Opsional)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={8}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.input
                          type="text"
                          name="weight"
                          value={productData.weight}
                          onChange={handleChange}
                          placeholder="Berat (gram)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={9}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="mt-4">
                        <motion.select
                          name="condition"
                          value={productData.condition}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={10}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <option value="Baru">Baru</option>
                          <option value="Bekas">Bekas</option>
                          <option value="Refurbished">Refurbished</option>
                        </motion.select>
                      </div>

                      <div className="mt-4">
                        <motion.textarea
                          name="warrantyInfo"
                          value={productData.warrantyInfo}
                          onChange={handleChange}
                          placeholder="Informasi Garansi (Opsional)"
                          className="w-full p-2 border rounded-md h-20"
                          variants={formItemVariants}
                          custom={11}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Images Section */}
                    <motion.div className="mb-6 border-b pb-6">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-2"
                        variants={formItemVariants}
                        custom={12}
                        initial="hidden"
                        animate="visible"
                      >
                        Foto atau Video Produk
                      </motion.h3>

                      <motion.div
                        className="flex space-x-2"
                        variants={formItemVariants}
                        custom={13}
                        initial="hidden"
                        animate="visible"
                      >
                        {/* File upload button */}
                        <motion.label
                          variants={imageHoverVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap={{ scale: 0.95 }}
                          className="w-20 h-20 flex items-center justify-center border rounded-md cursor-pointer bg-gray-200 overflow-hidden"
                        >
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileSelect}
                          />
                          <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{
                              repeat: Infinity,
                              duration: 10,
                              ease: "linear",
                              repeatDelay: 0,
                            }}
                          >
                            <IoAddOutline className="text-gray-500 text-3xl" />
                          </motion.div>
                        </motion.label>

                        {/* Preview boxes */}
                        {selectedFiles.map((fileObj, index) => (
                          <motion.div
                            key={index}
                            className="w-20 h-20 border rounded-md bg-gray-100 relative overflow-hidden"
                            variants={imageHoverVariants}
                            initial="rest"
                            whileHover="hover"
                            style={{
                              backgroundImage: `url(${fileObj.preview})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <motion.button
                              className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-bl-md"
                              onClick={() => {
                                if (!fileObj.isExisting) {
                                  URL.revokeObjectURL(fileObj.preview);
                                }
                                setSelectedFiles(
                                  selectedFiles.filter((_, i) => i !== index)
                                );
                              }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ×
                            </motion.button>
                          </motion.div>
                        ))}

                        {/* Empty preview boxes */}
                        {Array.from({
                          length: Math.max(0, 2 - selectedFiles.length),
                        }).map((_, index) => (
                          <motion.div
                            key={`empty-${index}`}
                            className="w-20 h-20 border rounded-md bg-gray-100"
                            variants={imageHoverVariants}
                            initial="rest"
                            whileHover="hover"
                          />
                        ))}
                      </motion.div>

                      <motion.p
                        className="text-sm text-gray-500 mt-2"
                        variants={formItemVariants}
                        custom={14}
                        initial="hidden"
                        animate="visible"
                      >
                        * Foto atau video produk promosi akan tampil di halaman
                        promosi, hasil pencarian, dan rekomendasi.
                      </motion.p>
                    </motion.div>

                    {/* Pricing and Inventory Section */}
                    <motion.div className="mb-6 text-black">
                      <motion.h3
                        className="font-semibold text-gray-700 mb-4"
                        variants={formItemVariants}
                        custom={15}
                        initial="hidden"
                        animate="visible"
                      >
                        Harga dan Persediaan
                      </motion.h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.input
                          type="text"
                          name="price"
                          value={productData.price}
                          onChange={handleChange}
                          placeholder="Harga (Rp)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={16}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.input
                          type="text"
                          name="discount"
                          value={productData.discount}
                          onChange={handleChange}
                          placeholder="Diskon (%)"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={17}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <motion.input
                          type="text"
                          name="stock"
                          value={productData.stock}
                          onChange={handleChange}
                          placeholder="Stok Tersedia"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={18}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.input
                          type="text"
                          name="minimumOrder"
                          value={productData.minimumOrder}
                          onChange={handleChange}
                          placeholder="Minimum Pemesanan"
                          className="w-full p-2 border rounded-md"
                          variants={formItemVariants}
                          custom={19}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>

                      <div className="mt-4">
                        <motion.textarea
                          name="shippingInfo"
                          value={productData.shippingInfo}
                          onChange={handleChange}
                          placeholder="Informasi Pengiriman (Opsional)"
                          className="w-full p-2 border rounded-md h-20"
                          variants={formItemVariants}
                          custom={20}
                          initial="hidden"
                          animate="visible"
                          whileFocus={{
                            boxShadow: "0 0 0 2px #315CEA",
                            scale: 1.01,
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Buttons */}
                  <motion.div
                    className="flex justify-end space-x-2 mt-6"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.8 }}
                  >
                    {isEditing ? (
                      <>
                        <motion.button
                          className="px-4 py-2 bg-gray-300 rounded-md text-black"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                          onClick={handleCancelEdit}
                        >
                          Batal
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-[#315CEA] text-white rounded-md"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                          onClick={handleSaveProduct}
                          animate={{
                            boxShadow: [
                              "0px 0px 0px rgba(49, 92, 234, 0)",
                              "0px 2px 10px rgba(49, 92, 234, 0.4)",
                              "0px 0px 0px rgba(49, 92, 234, 0)",
                            ],
                          }}
                          transition={{
                            boxShadow: {
                              repeat: Infinity,
                              duration: 2,
                              repeatDelay: 1,
                            },
                          }}
                        >
                          Simpan Perubahan
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        className="px-4 py-2 bg-[#315CEA] text-white rounded-md"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleSaveProduct}
                        animate={{
                          boxShadow: [
                            "0px 0px 0px rgba(49, 92, 234, 0)",
                            "0px 2px 10px rgba(49, 92, 234, 0.4)",
                            "0px 0px 0px rgba(49, 92, 234, 0)",
                          ],
                        }}
                        transition={{
                          boxShadow: {
                            repeat: Infinity,
                            duration: 2,
                            repeatDelay: 1,
                          },
                        }}
                      >
                        Simpan Produk
                      </motion.button>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
              {/* Product List Section */}
              <motion.div
                className="lg:col-span-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="bg-white p-6 shadow-md rounded-lg sticky top-4"
                  variants={itemVariants}
                >
                  <motion.h2
                    className="text-xl font-semibold mb-4 flex items-center text-black"
                    variants={itemVariants}
                  >
                    <span>Produk Terdaftar</span>
                    <motion.span
                      className="ml-2 bg-[#315CEA] text-white text-sm py-0.5 px-2 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {savedProducts.length}
                    </motion.span>
                  </motion.h2>

                  {savedProducts.length === 0 ? (
                    <motion.div
                      className="text-center py-12 text-gray-500"
                      variants={fadeInVariants}
                    >
                      <motion.div
                        className="text-5xl mb-4 text-gray-300 mx-auto"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <IoAddOutline className="mx-auto" />
                      </motion.div>
                      Belum ada produk terdaftar
                    </motion.div>
                  ) : (
                    <motion.div
                      className="space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto pr-2"
                      variants={itemVariants}
                    >
                      <AnimatePresence>
                        {savedProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                              isEditing && editingProductId === product.id
                                ? "border-[#315CEA] bg-blue-50"
                                : ""
                            }`}
                            variants={productCardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                          >
                            <div className="flex items-start">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3 flex-shrink-0">
                                {product.images && product.images.length > 0 ? (
                                  <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url(${product.images[0]})`,
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No img
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-800 truncate">
                                  {product.name}
                                </h3>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <span className="truncate">
                                    {product.category || "Tanpa Kategori"} •{" "}
                                    {product.condition}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <div className="text-[#315CEA] font-semibold">
                                    {product.price
                                      ? `Rp ${product.price}`
                                      : "Tanpa Harga"}
                                    {product.discount && (
                                      <span className="text-xs text-green-500 ml-1">
                                        -{product.discount}%
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Stok: {product.stock || "0"}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-3 pt-3 border-t">
                              <motion.button
                                className={`p-1.5 rounded-md ${
                                  isEditing && editingProductId === product.id
                                    ? "text-blue-600 bg-blue-100"
                                    : "text-gray-500 hover:bg-gray-100"
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                title="Edit Produk"
                                onClick={() => handleEditProduct(product.id)}
                              >
                                <FaEdit size={16} />
                              </motion.button>
                              <motion.button
                                className="p-1.5 text-red-500 rounded-md hover:bg-red-50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Hapus Produk"
                                disabled={
                                  isEditing && editingProductId === product.id
                                }
                              >
                                <FaTrash size={16} />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {savedProducts.length > 0 && (
                    <motion.div
                      className="mt-6 border-t pt-4"
                      variants={fadeInVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link href="/all-products">
                        <motion.button
                          className="w-full py-2 bg-[#315CEA] bg-opacity-10 text-[#315CEA] rounded-md font-medium"
                          variants={buttonVariants}
                          initial="rest"
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Lihat Semua Produk
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
