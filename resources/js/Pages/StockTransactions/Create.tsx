import React, { useState, useEffect } from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Create() {
    const { flash, products } = usePage().props as any;
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: "",
        type: "inbound",
        quantity: "",
        reason: "",
        notes: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("stock-transactions.store"), {
            onSuccess: () => {
                toast.success("Stock transaction recorded successfully!");
                reset();
                setSelectedProduct(null);
            },
            onError: (errs) => {
                Object.values(errs).forEach((err: any) => toast.error(err as string));
            },
        });
    };

    // useEffect(() => {
    //     if (flash?.success) toast.success(flash.success);
    // }, [flash]);

    const currentStock = selectedProduct?.quantity || 0;
    const moveQty = Number(data.quantity || 0);
    const newStock =
        data.type === "inbound"
            ? currentStock + moveQty
            : currentStock - moveQty;

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full min-h-screen p-6"
            >
                {/* Breadcrumbs */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href={route("dashboard")} className="hover:underline">
                        Dashboard
                    </Link>{" "}
                    /{" "}
                    <span className="text-gray-700">Record Stock Movement</span>
                </div>

                <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                    Record Stock Movement
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Transaction Form */}
                    <motion.div
                        className="bg-white shadow-sm rounded-2xl border border-gray-100 p-8 md:col-span-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-lg font-semibold mb-6 text-gray-800">
                            Transaction Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Transaction Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transaction Type
                                </label>
                                <div className="flex space-x-3">
                                    {["inbound", "outbound"].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setData("type", type)}
                                            className={`flex-1 py-2.5 rounded-lg border text-center capitalize font-medium transition ${data.type === type
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Product */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product
                                </label>
                                <select
                                    required
                                    value={data.product_id}
                                    onChange={(e) => {
                                        setData("product_id", e.target.value);
                                        const prod = products.find(
                                            (p: any) => p.id == e.target.value
                                        );
                                        setSelectedProduct(prod);
                                    }}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select a product</option>
                                    {products.map((product: any) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.product_id}
                                    </p>
                                )}
                            </div>

                            {/* Quantity & Reason */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Reason for Movement
                                    </label>
                                    <select
                                        required
                                        value={data.reason}
                                        onChange={(e) =>
                                            setData("reason", e.target.value)
                                        }
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Select reason</option>
                                        <option value="New Stock Arrival">
                                            New Stock Arrival
                                        </option>
                                        <option value="Customer Sale">Customer Sale</option>
                                        <option value="Stock Adjustment">
                                            Stock Adjustment
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    rows={3}
                                    value={data.notes}
                                    onChange={(e) => setData("notes", e.target.value)}
                                    placeholder="Add reference or remarks..."
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {processing
                                        ? "Submitting..."
                                        : "Submit Transaction"}
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Transaction Summary */}
                    <motion.div
                        className="bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl border border-gray-100 p-6 space-y-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h11M9 21V3m6 18l6-6m0 0l-6-6m6 6H9"
                                />
                            </svg>
                            Transaction Summary
                        </h3>

                        {selectedProduct ? (
                            <>
                                <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2 shadow-sm">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">Product</span>
                                        <span className="text-gray-800 font-semibold">
                                            {selectedProduct.name}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">SKU</span>
                                        <span className="text-gray-700">
                                            {selectedProduct.sku || "—"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">Unit Price</span>
                                        <span className="text-gray-800 font-semibold">
                                            {selectedProduct
                                                ? new Intl.NumberFormat("en-EG", {
                                                    style: "currency",
                                                    currency: "EGP",
                                                }).format(
                                                    data.type === "inbound"
                                                        ? Number(selectedProduct.cost || 0)
                                                        : Number(selectedProduct.price || 0)
                                                )
                                                : "—"}
                                        </span>
                                    </div>


                                    <hr className="my-2 border-gray-200" />

                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">Current Stock</span>
                                        <span className="text-gray-900 font-semibold">
                                            {currentStock} Units
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-600">Quantity to Move</span>
                                        <span
                                            className={`font-semibold ${data.type === "inbound"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {data.type === "inbound" ? `+${moveQty}` : `-${moveQty}`} Units
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <span className="font-medium text-gray-600">
                                            New Stock Level
                                        </span>
                                        <span className="text-blue-700 font-bold text-base">
                                            {newStock} Units
                                        </span>
                                    </div>


                                    <div className="flex justify-between items-center text-sm mt-2">
                                        <span className="font-medium text-gray-600">
                                            Transaction Value
                                        </span>
                                        <span
                                            className={`font-bold text-base ${data.type === "inbound" ? "text-green-700" : "text-red-700"
                                                }`}
                                        >
                                            {selectedProduct && moveQty > 0
                                                ? new Intl.NumberFormat("en-EG", {
                                                    style: "currency",
                                                    currency: "EGP",
                                                }).format(
                                                    (data.type === "inbound"
                                                        ? Number(selectedProduct.cost || 0)
                                                        : Number(selectedProduct.price || 0)) * moveQty
                                                )
                                                : "EGP 0.00"}
                                        </span>
                                    </div>


                                </div>

                                {data.type === "outbound" && moveQty > currentStock && (
                                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mt-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-red-600 mt-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01M12 5a7 7 0 00-7 7 7 7 0 0014 0 7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <div className="text-sm text-red-700">
                                            <strong>Insufficient Stock:</strong> Cannot process outbound.
                                            Quantity exceeds available stock.
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-5 text-center text-gray-500 text-sm">
                                Select a product to preview stock changes.
                            </div>
                        )}
                    </motion.div>

                </div>
            </motion.div>
        </DashboardLayout>
    );
}
