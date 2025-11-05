import Navbar from "@/Components/navbar";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Boxes,
    PackageSearch,
    Truck,
    ClipboardList,
    BarChart3,
} from "lucide-react";

export default function Welcome({ auth }: { auth: any }) {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-gray-50 flex flex-col">

                {/* NAVBAR */}
                <Navbar auth={auth} />

                {/* HERO SECTION */}
                <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-24">

                    <motion.div
                        initial={{ scale: 0.7, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-28 h-28 rounded-2xl bg-blue-100 flex items-center justify-center mb-8 shadow-lg"
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

                <section className="bg-white py-20 border-t">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto text-center mb-16 px-6"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need to Stay in Control
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Powerful features built to help you manage stock, suppliers, and workflow efficiently.
                        </p>
                    </motion.div>

                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <PackageSearch className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Advanced Product Tracking
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Monitor product availability, variations, prices, and categories with precision.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Supplier Management
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Keep supplier information organized and build more reliable inventory channels.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            <ClipboardList className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Stock Movement Logs
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Track every inbound and outbound stock movement with full history logs.
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition md:col-span-3"
                        >
                            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Real-Time Inventory Insights
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xl mx-auto">
                                Make smarter decisions with real-time analytics on stock trends, low inventory alerts,
                                product turnover, and supplier performance.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="py-8 text-center text-gray-500 text-sm bg-gray-50 border-t">
                    © {new Date().getFullYear()} Inventory Manager • Empowering Stock Control
                </footer>
            </div>
        </>
    );
}
