import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm, router } from "@inertiajs/react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface PaginatedSuppliers {
    data: Supplier[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    from?: number;
    to?: number;
    total?: number;
}

export default function Index({ suppliers }: { suppliers: PaginatedSuppliers }) {
    const [search, setSearch] = useState("");
    const { delete: destroy } = useForm({});
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

    const filtered = suppliers.data.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleConfirmDelete = () => {
        if (!selectedSupplier) return;
        destroy(route("suppliers.destroy", selectedSupplier.id), {
            onSuccess: () => {
                toast.success("Supplier deleted successfully!");
                setSelectedSupplier(null);
            },
            onError: () => {
                toast.error("Failed to delete supplier.");
                setSelectedSupplier(null);
            },
        });
    };

    return (
        <DashboardLayout>
            <Head title="Suppliers" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Supplier Management
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Manage your suppliers and their contact details.
                        </p>
                    </div>

                    <motion.a
                        href={route("suppliers.create")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add New Supplier</span>
                    </motion.a>
                </div>

                {/* Search */}
                <motion.input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                {/* Table */}
                <motion.div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-md">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-700">
                                <th className="px-4 py-3 font-medium">Name</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Phone</th>
                                <th className="px-4 py-3 font-medium">Address</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filtered.length > 0 ? (
                                    filtered.map((s) => (
                                        <motion.tr
                                            key={s.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-4 py-3 text-gray-800 font-medium">{s.name}</td>
                                            <td className="px-4 py-3 text-gray-600">{s.email}</td>
                                            <td className="px-4 py-3 text-gray-600">{s.phone}</td>
                                            <td className="px-4 py-3 text-gray-600">{s.address}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <motion.a
                                                        href={route("suppliers.edit", s.id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </motion.a>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        onClick={() => setSelectedSupplier(s)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-10 text-center text-gray-500"
                                        >
                                            🧾 No suppliers found.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>

                {/* Conditional Pagination */}
                {filtered.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-3">
                        {suppliers.from && suppliers.to && suppliers.total && (
                            <p>
                                Showing {suppliers.from} to {suppliers.to} of {suppliers.total} results
                            </p>
                        )}

                        <div className="flex space-x-1">
                            {suppliers.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className={`px-3 py-1 rounded-md border text-sm ${link.active
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white hover:bg-gray-100 border-gray-300"
                                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </motion.div>

            {/* Delete Confirmation Dialog */}
            <AnimatePresence>
                {selectedSupplier && (
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
                            <button
                                onClick={() => setSelectedSupplier(null)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Confirm Deletion
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-medium text-gray-900">
                                    {selectedSupplier.name}
                                </span>
                                ? This action cannot be undone.
                            </p>

                            <div className="flex justify-end space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedSupplier(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleConfirmDelete}
                                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
