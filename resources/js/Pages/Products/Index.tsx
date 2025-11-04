import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, Search, Package, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Index({ products = { data: [], links: [] }, suppliers = [] }: any) {
    const [search, setSearch] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    console.log("Suppliers:", suppliers);


    const filtered = (products.data || []).filter((p: any) => {
        const matchesSearch =
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.sku?.toLowerCase().includes(search.toLowerCase());
        const matchesSupplier =
            !selectedSupplier || p.supplier?.name === selectedSupplier;
        return matchesSearch && matchesSupplier;
    });

    const handleDelete = (product: any) => {
        setSelectedProduct(product);
        setDeleteDialog(true);
    };

    const confirmDelete = () => {
    if (!selectedProduct) return;

    router.delete(route("products.destroy", selectedProduct.id), {
        onSuccess: () => {
            toast.success("Product deleted successfully!");
            setDeleteDialog(false);
            setSelectedProduct(null);
        },
        onError: () => {
            toast.error("Failed to delete product. Please try again.");
            setDeleteDialog(false);
        },
    });
};


    return (
        <DashboardLayout>
            <Head title="Product Inventory" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-2xl shadow-sm w-full"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Product Inventory</h2>
                        <p className="text-gray-500 text-sm">
                            Manage your product list, suppliers, and stock details.
                        </p>
                    </div>
                    <Link
                        href={route("products.create")}
                        className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Product</span>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                    <div className="relative flex-1 min-w-[260px]">
                        <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by Product Name or SKU..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* Supplier Dropdown */}
                    <div className="relative min-w-[200px] flex-1 sm:flex-none">
                        <select
                            value={selectedSupplier}
                            onChange={(e) => setSelectedSupplier(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                        >
                            <option value="">All Suppliers</option>

                            {(Array.isArray(suppliers) ? suppliers : []).map((s: any) => (
                                <option key={s.id} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </select>

                        {/* Dropdown arrow icon */}
                        <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="px-6 py-3 font-medium">Product</th>
                                <th className="px-6 py-3 font-medium">SKU</th>
                                <th className="px-6 py-3 font-medium">Cost</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium">Quantity</th>
                                <th className="px-6 py-3 font-medium">Supplier</th>
                                <th className="px-6 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {filtered.length > 0 ? (
                                    filtered.map((p: any) => (
                                        <motion.tr
                                            key={p.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-lg">
                                                    <Package className="w-6 h-6 text-gray-500" />
                                                </div>
                                                <span className="font-medium text-gray-800 truncate">
                                                    {p.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{p.sku}</td>
                                            <td className="px-6 py-4 text-gray-600">EGP{p.cost}</td>
                                            <td className="px-6 py-4 text-gray-600">EGP{p.price}</td>
                                            <td className="px-6 py-4 text-gray-600">{p.quantity}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {p.supplier?.name ?? "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end items-center space-x-2">
                                                    <Link
                                                        href={route("products.edit", p.id)}
                                                        className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(p)}
                                                        className="inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-8 text-center text-gray-500"
                                        >
                                            No products found.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-3">
                    <p>
                        Showing {products.from} to {products.to} of {products.total} results
                    </p>
                    <div className="flex space-x-1">
                        {products.links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link.url ?? "#"}
                                className={`px-3 py-1 rounded-md border text-sm ${link.active
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white hover:bg-gray-100 border-gray-300"
                                    } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <AnimatePresence>
                    {deleteDialog && selectedProduct && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setDeleteDialog(false)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Dialog Content */}
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                    Confirm Deletion
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete{" "}
                                    <span className="font-medium text-gray-900">
                                        {selectedProduct?.name}
                                    </span>
                                    ? This action cannot be undone.
                                </p>

                                {/* Action Buttons */}
                                <div className="flex justify-end space-x-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setDeleteDialog(false)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={confirmDelete}
                                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </DashboardLayout>
    );
}
