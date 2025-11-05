import React, { useState, useEffect, useRef } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Package,
    AlertTriangle,
    Users,
    TrendingUp,
    Plus,
    FileBarChart2,
    Pencil,
    Trash2,
    ChevronDown,
    CircleDot,
    X,
} from "lucide-react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import toast from "react-hot-toast";

export default function Dashboard() {
    const { metrics = {}, lowStock = [], topProducts = [], users = [] } =
        usePage().props as any;

    const [openRoleDropdown, setOpenRoleDropdown] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenRoleDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

    const handleRoleChange = (userId: number, newRole: string) => {
        setUpdatingUserId(userId);
        setOpenRoleDropdown(null);

        router.put(
            route("users.updateRole", userId),
            { role: newRole },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Role updated to ${newRole.toUpperCase()} successfully`);
                },
                onError: () => {
                    toast.error("Failed to update user role. Please try again.");
                },
                onFinish: () => {
                    setUpdatingUserId(null);
                },
            }
        );
    };
    const [confirmDelete, setConfirmDelete] = useState<{ id: number; name: string } | null>(null);


    const handleDeleteUser = (userId: number, userName: string) => {
        setConfirmDelete(null);
        router.delete(route("users.destroy", userId), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(`${userName} has been deleted successfully.`);
            },
            onError: () => {
                toast.error("Failed to delete user. Try again.");
            },
        });
    };




    const metricCards = [
        {
            title: "Total Inventory Value",
            value: `EGP${metrics.totalValue?.toLocaleString() || "0"}`,
            change: "Inventory value reflects the total worth of all stocked items.",
            color: "from-emerald-400 to-emerald-600",
            text: "text-emerald-700",
            icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
        },
        {
            title: "Total Products (SKUs)",
            value: metrics.totalProducts || 0,
            change: "Represents the number of unique products currently listed in your inventory.",
            color: "from-blue-400 to-blue-600",
            text: "text-blue-700",
            icon: <Package className="w-5 h-5 text-blue-600" />,
        },
        {
            title: "Items Low on Stock",
            value: metrics.lowStock || 0,
            change: "These products are running low and may need restocking soon.",
            color: "from-amber-400 to-amber-600",
            text: "text-amber-700",
            icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
        },
        {
            title: "Active Users",
            value: metrics.activeUsers || users.length || 0,
            change: "All users currently active and able to manage products and transactions.",
            color: "from-purple-400 to-purple-600",
            text: "text-purple-700",
            icon: <Users className="w-5 h-5 text-purple-600" />,
        },
    ];


    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
        }),
    };

    return (
        <DashboardLayout>
            <Head title="Dashboard" />

            {/* === HEADER === */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Dashboard Overview
                    </h1>
                    <div className="hidden sm:flex items-center gap-2">
                        {/* <Button variant="outline" className="flex gap-2 items-center">
              <FileBarChart2 className="w-4 h-4" />
              Export Report
            </Button> */}
                    </div>
                </div>
                <p className="text-gray-500 text-sm">
                    Monitor your inventory, users, and product performance in real-time.
                </p>
                <div className="h-[2px] w-32 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </motion.div>

            {/* === METRICS === */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
                initial="hidden"
                animate="visible"
            >
                {metricCards.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={fadeInUp}
                        custom={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card className="shadow-lg hover:shadow-xl transition-all border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
                            <div className={`h-1.5 rounded-t bg-gradient-to-r ${item.color}`} />
                            <CardHeader className="pb-2 flex justify-between items-center">
                                <CardTitle className={`text-sm font-semibold ${item.text}`}>
                                    {item.title}
                                </CardTitle>
                                {item.icon}
                            </CardHeader>
                            <CardContent>
                                <p className={`text-2xl font-bold ${item.text}`}>
                                    {item.value}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{item.change}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* === QUICK ACTIONS === */}
            <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Link href="/products/create">
                    <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow">
                        <Plus className="w-4 h-4" /> Add New Product
                    </Button>
                </Link>
                <Link href="/reports">
                    <Button className="flex items-center gap-2 bg-gray-100 text-gray-800 hover:bg-gray-200 shadow-sm">
                        <FileBarChart2 className="w-4 h-4" /> Generate Report
                    </Button>
                </Link>
            </motion.div>

            {/* === MAIN GRID === */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
            >
                {/* === MOST ACTIVE PRODUCTS === */}
                <motion.div variants={fadeInUp} custom={0}>
                    <Card className="shadow-lg border-gray-100 overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl">
                        <CardHeader className="border-b bg-gray-50 flex justify-between items-center">
                            <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-emerald-600" />
                                Most Active Products
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {topProducts.length > 0 ? (
                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                        <tr>
                                            <th className="py-3 px-4">Product</th>
                                            <th className="py-3 px-4">SKU</th>
                                            <th className="py-3 px-4">Units Sold</th>
                                            <th className="py-3 px-4 text-right">Stock</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topProducts.map((p: any, i: number) => (
                                            <motion.tr
                                                key={p.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="border-b hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="py-3 px-4 font-medium text-gray-800">
                                                    {p.name}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{p.sku}</td>
                                                <td className="py-3 px-4 text-gray-700">
                                                    {p.units_sold}
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs ${p.stock_level === "Low Stock"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                            }`}
                                                    >
                                                        {p.stock_level}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="p-4 text-sm text-gray-500">
                                    No product activity available.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* === USER MANAGEMENT === */}
                <motion.div variants={fadeInUp} custom={1}>
                    <Card
                        ref={dropdownRef}
                        className="shadow-lg border-gray-100 bg-white/80 backdrop-blur-sm rounded-2xl relative overflow-visible"
                    >


                        <CardHeader className="border-b bg-gray-50 flex justify-between items-center">
                            <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                User Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="divide-y">
                            {users.length > 0 ? (
                                users.map((u: any) => (
                                    <motion.div
                                        key={u.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex justify-between items-center py-3 px-1 hover:bg-gray-50 rounded transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <CircleDot
                                                className={`w-3 h-3 ${u.is_active ? "text-emerald-500" : "text-gray-300"
                                                    }`}
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700">
                                                    {u.name}
                                                </p>
                                                <p className="text-xs text-gray-500">{u.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 relative">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                className={`text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded capitalize flex items-center gap-1 ${updatingUserId === u.id ? "opacity-60 cursor-wait" : ""
                                                    }`}
                                                onClick={() =>
                                                    setOpenRoleDropdown(openRoleDropdown === u.id ? null : u.id)
                                                }
                                                disabled={updatingUserId === u.id}
                                            >
                                                {updatingUserId === u.id ? "Updating..." : (u.role || "user")}
                                                <ChevronDown className="w-3 h-3" />
                                            </motion.button>

                                            <AnimatePresence>
                                                {openRoleDropdown === u.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                                                        className="absolute right-0 top-full mt-1 bg-white border rounded-md shadow-xl z-50 w-32 overflow-hidden"
                                                    >

                                                        {["user", "manager", "admin"].map((role) => (
                                                            <div
                                                                key={role}
                                                                onClick={() => handleRoleChange(u.id, role)}
                                                                className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 ${u.role === role
                                                                    ? "font-semibold text-blue-600"
                                                                    : "text-gray-700"
                                                                    }`}
                                                            >
                                                                {role.charAt(0).toUpperCase() + role.slice(1)}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* <Button variant="ghost" size="icon" title="Edit">
                                                <Pencil className="w-4 h-4 text-gray-500" />
                                            </Button> */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Delete"
                                                onClick={() => setConfirmDelete({ id: u.id, name: u.name })}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>



                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 py-3">No users found.</p>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {confirmDelete && (
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
                                onClick={() => setConfirmDelete(null)}
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
                                    {confirmDelete.name}
                                </span>
                                ? This action cannot be undone.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setConfirmDelete(null)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => handleDeleteUser(confirmDelete.id, confirmDelete.name)}
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
