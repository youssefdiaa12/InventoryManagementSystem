import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      <div className="mb-8">
        <Link
          href="/"
          className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <ApplicationLogo className="h-20 w-20 fill-current text-indigo-600 dark:text-indigo-400" />
        </Link>
      </div>

      {children}

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Inventory. All rights reserved.
      </p>
    </div>
  );
}
