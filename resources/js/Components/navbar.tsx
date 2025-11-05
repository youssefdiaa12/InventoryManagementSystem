import { Link, usePage } from "@inertiajs/react";
import { Boxes } from "lucide-react";

export default function Navbar({ auth }: { auth: any }) {
    const page = usePage();
    const currentRoute = page.url; 

    const onLoginPage = currentRoute.startsWith("/login");
    const onRegisterPage = currentRoute.startsWith("/register");

    return (
        <header className="w-full bg-white shadow-sm py-4">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <Link
    href="/"
    className="flex items-center space-x-3 hover:opacity-80 transition"
>
    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
       <Boxes className="h-14 w-14 text-blue-600" />
    </div>

    <span className="text-xl font-semibold text-gray-800">
        Inventory Manager
    </span>
</Link>


                {/* Right Navigation */}
                <nav className="flex items-center space-x-6 text-gray-700 font-medium">

                    {/* If user is logged in — show Dashboard */}
                    {auth?.user=== 'admin' ? (
                        <Link href={route("dashboard")} className="hover:text-blue-600">
                            Dashboard
                        </Link>
                    ) :auth?.user.role=='manager' ? (
                        <Link href={route("stockmanagement.index")} className="hover:text-blue-600">
                            Warehouse
                        </Link>
                    ) : (
                        <>
                            {/* Hide LOGIN button if we are already on login page */}
                            {!onLoginPage && (
                                <Link
                                    href={route("login")}
                                    className="hover:text-blue-600"
                                >
                                    Log in
                                </Link>
                            )}

                            {/* Hide REGISTER button if we are on register page */}
                            {!onRegisterPage && (
                                <Link
                                    href={route("register")}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            )}
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
