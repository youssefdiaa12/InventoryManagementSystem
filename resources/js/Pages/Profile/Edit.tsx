import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { motion } from "framer-motion";
import { PageProps } from "@/types";
import { ChevronRight, Home } from "lucide-react";

export default function Edit({
    mustVerifyEmail,
    status,
    auth,
}: PageProps<{ mustVerifyEmail: boolean; status?: string; auth: any }>) {
    return (
        <DashboardLayout>
            <Head title="Profile" />

            <div className="max-w-6xl mx-auto py-8 space-y-10">
                {/* Breadcrumbs + Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-sm text-gray-500 mb-3">
                        <Link
                            href={route("dashboard")}
                            className="flex items-center gap-1 hover:text-blue-600 transition"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                        <span className="text-gray-700 font-medium">Profile</span>
                    </nav>

                    {/* Title and description */}
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Profile Settings
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your personal information, security, and account preferences.
                        </p>
                    </div>
                </motion.div>

                {/* Profile Info */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Personal Information
                    </h2>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </motion.div>

                {/* Update Password */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Security
                    </h2>
                    <UpdatePasswordForm className="max-w-xl" />
                </motion.div>

                {/* Delete User */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h2 className="text-lg font-semibold text-red-600 mb-4">
                        Danger Zone
                    </h2>
                    <DeleteUserForm className="max-w-xl" />
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
