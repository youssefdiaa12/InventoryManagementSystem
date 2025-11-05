import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, useEffect, useState } from "react";
import {
    LayoutDashboard,
    Package,
    Users,
    ChevronDown,
    LogOut,
    User,
    Boxes,
    ArrowLeftRight,
    ChartBar,
    Warehouse,
    Menu,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const [openMenu, setOpenMenu] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ESC key closes sidebar on mobile
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSidebarOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
            {/* === MOBILE NAVBAR === */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md z-40 relative">
                <div className="flex items-center space-x-2">
                    <Boxes className="h-8 w-8 text-blue-600" />
                    <h1 className="font-semibold text-gray-800 text-lg">
                        Inventory Manager
                    </h1>
                </div>
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-md hover:bg-gray-100"
                >
                    <Menu className="h-6 w-6 text-gray-700" />
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* === MOBILE SIDEBAR OVERLAY === */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            {/* backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black z-40 lg:hidden"
                                onClick={() => setSidebarOpen(false)}
                            />

                            {/* sidebar drawer */}
                            <motion.aside
                                initial={{ x: -250 }}
                                animate={{ x: 0 }}
                                exit={{ x: -250 }}
                                transition={{ type: "tween", duration: 0.3 }}
                                className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl flex flex-col justify-between z-50"
                            >
                                <div className="flex flex-col h-full">
                                    {/* header */}
                                    <div className="flex items-center justify-between px-6 py-5 border-b">
                                        <div className="flex items-center space-x-3">
                                            <Boxes className="h-10 w-10 text-blue-600" />
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                Inventory Manager
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => setSidebarOpen(false)}
                                            className="p-2 rounded-md hover:bg-gray-100"
                                        >
                                            <X className="h-6 w-6 text-gray-600" />
                                        </button>
                                    </div>

                                    {/* links */}
                                    <nav className="mt-4 px-3 space-y-1 flex-1 overflow-y-auto">
                                        {auth.user?.role === "admin" && (
                                            <SidebarLink
                                                href="/dashboard"
                                                icon={<LayoutDashboard />}
                                                label="Dashboard"
                                            />
                                        )}
                                        <SidebarLink
                                            href="/stockmanagement"
                                            icon={<Warehouse />}
                                            label="Stock Management"
                                        />
                                        <SidebarLink
                                            href="/products"
                                            icon={<Package />}
                                            label="Products"
                                        />
                                        {auth.user?.role === "admin" && (
                                            <SidebarLink
                                                href="/suppliers"
                                                icon={<Users />}
                                                label="Suppliers"
                                            />
                                        )}
                                        <SidebarLink
                                            href="/stock"
                                            icon={<ArrowLeftRight />}
                                            label="Stock Movements"
                                        />
                                        <SidebarLink
                                            href="/reports"
                                            icon={<ChartBar />}
                                            label="Reports"
                                        />
                                    </nav>

                                    {/* user dropdown */}
                                    <UserMenu
                                        openMenu={openMenu}
                                        setOpenMenu={setOpenMenu}
                                        auth={auth}
                                        sidebarOpen={sidebarOpen}
                                        setSidebarOpen={setSidebarOpen}
                                    />
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* === DESKTOP SIDEBAR === */}
                <motion.aside
                    initial={{ x: -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="hidden lg:flex w-64 bg-white shadow-lg flex-col justify-between flex-shrink-0"
                >
                    <div>
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-3 px-6 py-6 border-b hover:bg-gray-50"
                        >
                            <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                            >
                                <Boxes className="h-14 w-14 text-blue-600" />
                            </motion.div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Inventory Manager
                            </h1>
                        </Link>

                        {/* nav links */}
                        <nav className="mt-6 space-y-1 px-2">
                            {auth.user?.role === "admin" && (
                                <SidebarLink
                                    href="/dashboard"
                                    icon={<LayoutDashboard />}
                                    label="Dashboard"
                                />
                            )}
                            <SidebarLink
                                href="/stockmanagement"
                                icon={<Warehouse />}
                                label="Stock Management"
                            />
                            <SidebarLink
                                href="/products"
                                icon={<Package />}
                                label="Products"
                            />
                            {auth.user?.role === "admin" && (
                                <SidebarLink
                                    href="/suppliers"
                                    icon={<Users />}
                                    label="Suppliers"
                                />
                            )}
                            <SidebarLink
                                href="/stock"
                                icon={<ArrowLeftRight />}
                                label="Stock Movements"
                            />
                            <SidebarLink
                                href="/reports"
                                icon={<ChartBar />}
                                label="Reports"
                            />
                        </nav>
                    </div>

                    <UserMenu
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                        auth={auth}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                </motion.aside>

                {/* === MAIN CONTENT === */}
                <motion.main
                    className="flex-1 overflow-y-auto p-6 lg:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
}

function SidebarLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: any;
    label: string;
}) {
    const page = usePage();
    const active = page.url === href || page.url.startsWith(`${href}/`);

    return (
        <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link
                href={href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition hover:bg-blue-50 ${
                    active ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                }`}
            >
                <span className="w-5 h-5">{icon}</span>
                <span>{label}</span>
            </Link>
        </motion.div>
    );
}

function UserMenu({
    openMenu,
    setOpenMenu,
    auth,
    sidebarOpen,
    setSidebarOpen,
}: any) {
    return (
        <div className="p-4 border-t relative">
            <button
                onClick={() => setOpenMenu(!openMenu)}
                className="w-full flex items-center justify-between px-3 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-700">{auth.user.name}</span>
                </div>
                <motion.div
                    animate={{ rotate: openMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                </motion.div>
            </button>

            <AnimatePresence>
                {openMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden absolute bottom-16 left-4 right-4 z-50"
                    >
                        <Link
                            href={route("profile.edit")}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => setSidebarOpen(false)}
                        >
                            Profile
                        </Link>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
