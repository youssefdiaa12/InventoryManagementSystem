import Navbar from "@/Components/navbar";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Boxes,
    PackageSearch,
    Truck,
    ClipboardList,
    BarChart3,
} from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Welcome({ auth }: { auth: any }) {
    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.info) toast(flash.info);
    }, [flash]);
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-gray-100 flex flex-col">

                {/* NAVBAR */}
                <Navbar auth={auth} />

                {/* HERO SECTION */}
                <section className="flex-1 max-h-screen m-auto flex flex-col items-center justify-center text-center px-6 pt-20 pb-24">

                    <motion.div
                        initial={{ scale: 0.7, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-28 h-28 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 "
                    >
                        <Boxes className="h-14 w-14 text-blue-600" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 leading-tight"
                    >
                        Smarter Inventory,  
                        <span className="text-blue-600"> Simplified.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10"
                    >
                        A streamlined platform that empowers your business with real-time product tracking, 
                        automated stock insights, and powerful supplier management — all in one place.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex space-x-4"
                    >
                        {auth.user?.role === "admin" ? (
                            <Link
                                href={route("dashboard")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow transition"
                            >
                                Go to Dashboard
                            </Link>
                        ) : auth.user?.role === "manager" ? (
                            <Link
                                href={route("stockmanagement.index")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow transition"
                            >
                                Go to Warehouse
                            </Link>
                        ) : auth.user?.role === 'user' ? (
                            <Link
                                href={route("welcome")}
                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow transition"
                            >
                                Welcome , please contact admin
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("register")}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md transition"
                                >
                                    Get Started
                                </Link>

                                <Link
                                    href={route("login")}
                                    className="px-8 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 shadow-sm transition"
                                >
                                    Log In
                                </Link>
                            </>
                        )}
                    </motion.div>
                </section>

                {/* FEATURES SECTION */}
                <section className="bg-gradient-to-b from-white to-blue-50 py-24 border-t">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto text-center mb-16 px-6"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Manage Everything in One Place
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Simplify your inventory management workflow with powerful, easy-to-use tools designed for speed and clarity.
                        </p>
                    </motion.div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
                        {[
                            {
                                icon: PackageSearch,
                                title: "Advanced Product Tracking",
                                desc: "Stay updated with accurate product counts, variants, and pricing in real-time.",
                            },
                            {
                                icon: Truck,
                                title: "Supplier Management",
                                desc: "Organize supplier data, monitor reliability, and maintain seamless operations.",
                            },
                            {
                                icon: ClipboardList,
                                title: "Stock Movement Logs",
                                desc: "Track every stock transfer, inbound, and outbound activity effortlessly.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, rotate: 0.5 }}
                                transition={{ type: "spring", stiffness: 250 }}
                                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-blue-100"
                            >
                                <item.icon className="h-14 w-14 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        className="mt-20 max-w-5xl mx-auto text-center bg-white/70 backdrop-blur-md border border-blue-100 p-12 rounded-2xl shadow-lg"
                    >
                        <BarChart3 className="h-14 w-14 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            Real-Time Insights
                        </h3>
                        <p className="text-gray-700 text-base max-w-2xl mx-auto">
                            Visualize your stock turnover, supplier performance, and low-inventory trends instantly — 
                            so you can make smarter, faster decisions.
                        </p>
                    </motion.div>
                </section>

                {/* FOOTER */}
                <footer className="py-8 text-center text-gray-500 text-sm bg-gray-50 border-t">
                    © {new Date().getFullYear()} Inventory Manager • Empowering Stock Control
                </footer>
            </div>
        </>
    );
}
