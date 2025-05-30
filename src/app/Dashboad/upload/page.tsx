"use client";

import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import Siderbar from "../SiderSeller/page";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadResi() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resiData, setResiData] = useState({
    orderNumber: "",
    courierName: "",
    resiNumber: "",
    shippingDate: "",
    customerName: "",
    shippingAddress: "",
    notes: "",
  });
  const [savedResi, setSavedResi] = useState(() => {
    // Load saved data from localStorage when component mounts
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedResiData");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
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
      },
    }),
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResiData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newResi = {
      ...resiData,
      id: Date.now().toString(),
      resiImage: selectedFile?.preview,
      dateAdded: new Date().toLocaleString(),
    };

    const updatedResi = [...savedResi, newResi];
    setSavedResi(updatedResi);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("savedResiData", JSON.stringify(updatedResi));
    }

    setSuccessMessage("Resi berhasil diupload dan disimpan!");
    setShowSuccessMessage(true);

    // Reset form
    setResiData({
      orderNumber: "",
      courierName: "",
      resiNumber: "",
      shippingDate: "",
      customerName: "",
      shippingAddress: "",
      notes: "",
    });
    setSelectedFile(null);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="max-w-4xl mx-auto px-4 py-6">
            <motion.div
              className="bg-white p-6 shadow-md rounded-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-xl font-semibold mb-6 text-black"
                variants={formItemVariants}
                custom={0}
              >
                Upload Resi Pengiriman
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Information */}
                  <motion.div variants={formItemVariants} custom={1}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Order
                    </label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={resiData.orderNumber}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] text-black placeholder-gray-400"
                      required
                    />
                  </motion.div>

                  {/* Courier Information */}
                  <motion.div variants={formItemVariants} custom={2}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Kurir
                    </label>
                    <select
                      name="courierName"
                      value={resiData.courierName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                      required
                    >
                      <option value="" className="text-gray-400">
                        Pilih Kurir
                      </option>
                      <option value="JNE" className="text-black">
                        JNE
                      </option>
                      <option value="J&T" className="text-black">
                        J&T
                      </option>
                      <option value="SiCepat" className="text-black">
                        SiCepat
                      </option>
                      <option value="Pos Indonesia" className="text-black">
                        Pos Indonesia
                      </option>
                    </select>
                  </motion.div>

                  {/* Resi Number */}
                  <motion.div variants={formItemVariants} custom={3}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Resi
                    </label>
                    <input
                      type="text"
                      name="resiNumber"
                      value={resiData.resiNumber}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] text-black placeholder-gray-400"
                      required
                    />
                  </motion.div>

                  {/* Shipping Date */}
                  <motion.div variants={formItemVariants} custom={4}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Pengiriman
                    </label>
                    <input
                      type="date"
                      name="shippingDate"
                      value={resiData.shippingDate}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] text-black"
                      required
                    />
                  </motion.div>
                </div>

                {/* Customer Information */}
                <motion.div
                  variants={formItemVariants}
                  custom={5}
                  className="space-y-4"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={resiData.customerName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] text-black placeholder-gray-400"
                    required
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Pengiriman
                  </label>
                  <textarea
                    name="shippingAddress"
                    value={resiData.shippingAddress}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] h-20 text-black placeholder-gray-400"
                    required
                  />
                </motion.div>

                {/* Resi Image Upload */}
                <motion.div
                  variants={formItemVariants}
                  custom={6}
                  className="space-y-4"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Foto Resi
                  </label>
                  <div className="flex items-center space-x-4">
                    <motion.label
                      className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#315CEA]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept="image/*"
                      />
                      {selectedFile ? (
                        <img
                          src={selectedFile.preview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <IoAddOutline className="text-4xl text-gray-400" />
                      )}
                    </motion.label>
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Notes */}
                <motion.div variants={formItemVariants} custom={7}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan (Opsional)
                  </label>
                  <textarea
                    name="notes"
                    value={resiData.notes}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-[#315CEA] focus:border-[#315CEA] h-20 text-black placeholder-gray-400"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={formItemVariants}
                  custom={8}
                  className="flex justify-end"
                >
                  <motion.button
                    type="submit"
                    className="px-6 py-2 bg-[#315CEA] text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Upload Resi
                  </motion.button>
                </motion.div>
              </form>

              {/* Display Saved Resi Data */}
              {savedResi.length > 0 && (
                <motion.div
                  className="mt-8 border-t pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-lg font-semibold mb-4 text-black">
                    Data Resi Tersimpan ({savedResi.length})
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {savedResi.map((resi, index) => (
                      <motion.div
                        key={resi.id}
                        className="bg-gray-50 p-4 rounded-lg border"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Order: {resi.orderNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                              Resi: {resi.resiNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                              Kurir: {resi.courierName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Penerima: {resi.customerName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Tanggal: {resi.shippingDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              Disimpan: {resi.dateAdded}
                            </p>
                            {resi.resiImage && (
                              <img
                                src={resi.resiImage}
                                alt="Resi"
                                className="w-16 h-16 object-cover rounded mt-2 ml-auto"
                              />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Clear All Data Button */}
                  <motion.div className="mt-4 flex justify-end">
                    <motion.button
                      onClick={() => {
                        setSavedResi([]);
                        if (typeof window !== "undefined") {
                          localStorage.removeItem("savedResiData");
                        }
                        setSuccessMessage("Semua data resi telah dihapus!");
                        setShowSuccessMessage(true);
                        setTimeout(() => setShowSuccessMessage(false), 3000);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Hapus Semua Data
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
