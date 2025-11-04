import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Edit({ product, suppliers }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || "",
        sku: product.sku || "",
        cost: product.cost || "",
        price: product.price || "",
        quantity: product.quantity || "",
        supplier_id: product.supplier_id || "",
        status: product.status ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("products.update", product.id), {
            onSuccess: () => {
                toast.success("Product updated successfully!");
            },
            onError: (errors) => {
                Object.values(errors).forEach((err: any) => toast.error(err as string));
            },
        });
    };

    useEffect(() => {
        if (!suppliers || suppliers.length === 0) {
            toast.error("No suppliers found. Please add one first.");
        }
    }, [suppliers]);

    return (
        <DashboardLayout>
            <Head title="Edit Product" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 w-full min-h-screen"
            >
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-gray-500 mb-4"
                >
                    <Link href={route("products.index")} className="hover:underline">
                        Products
                    </Link>{" "}
                    / <span className="text-gray-700">Edit Product</span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-semibold text-gray-800 mb-1">
                        Edit Product
                    </h1>
                    <p className="text-gray-500">
                        Update the product details below.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 w-full"
                >
                    <motion.form
                        onSubmit={handleSubmit}
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 },
                            },
                        }}
                        className="space-y-6 w-full"
                    >
                        {/* Product Name */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                placeholder="e.g., Wireless Ergonomic Mouse"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.name && (
                                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                            )}
                        </motion.div>

                        {/* SKU + Quantity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    SKU
                                </label>
                                <input
                                    type="text"
                                    value={data.sku}
                                    onChange={(e) => setData("sku", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.sku && (
                                    <p className="text-red-600 text-sm mt-1">{errors.sku}</p>
                                )}
                            </motion.div>

                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => setData("quantity", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.quantity && (
                                    <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>
                                )}
                            </motion.div>
                        </div>

                        {/* Cost + Price */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cost <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    value={data.cost}
                                    onChange={(e) => setData("cost", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.cost && (
                                    <p className="text-red-600 text-sm mt-1">{errors.cost}</p>
                                )}
                            </motion.div>

                            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData("price", e.target.value)}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.price && (
                                    <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                                )}
                            </motion.div>
                        </div>

                        {/* Supplier */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Supplier <span className="text-red-500">*</span>
                            </label>
                            <select
                                required
                                value={data.supplier_id}
                                onChange={(e) => setData("supplier_id", e.target.value)}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select a supplier</option>
                                {suppliers.map((s: any) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            {errors.supplier_id && (
                                <p className="text-red-600 text-sm mt-1">{errors.supplier_id}</p>
                            )}
                        </motion.div>

                        {/* Status */}
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.status}
                                    onChange={(e) => setData("status", e.target.checked)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700 text-sm">
                                    Active (Uncheck to deactivate product)
                                </span>
                            </label>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                            className="flex justify-end items-center gap-4 pt-6 border-t border-gray-100 mt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="button"
                                onClick={() => (window.location.href = route("products.index"))}
                                className="inline-flex items-center justify-center px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
                            >
                                Cancel
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
                            >
                                {processing ? "Saving..." : "Update Product"}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}
