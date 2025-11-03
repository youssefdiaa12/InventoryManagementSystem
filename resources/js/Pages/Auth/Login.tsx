import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Mail, Lock } from "lucide-react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false as boolean,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Login" />

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-md dark:bg-gray-800/80">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Welcome Back 👋
        </h2>
        <p className="mb-6 text-center text-gray-500 dark:text-gray-400">
          Sign in to continue your journey
        </p>

        {status && (
          <div className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900 dark:text-green-200">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          {/* Email */}
          <div>
            <InputLabel
              htmlFor="email"
              value="Email Address"
              className="text-gray-700 dark:text-gray-300"
            />
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-2.5 size-5 text-gray-400 dark:text-gray-500" />
              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("email", e.target.value)}
              />
            </div>
            <InputError message={errors.email} className="mt-1" />
          </div>

          {/* Password */}
          <div>
            <InputLabel
              htmlFor="password"
              value="Password"
              className="text-gray-700 dark:text-gray-300"
            />
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-2.5 size-5 text-gray-400 dark:text-gray-500" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                autoComplete="current-password"
                onChange={(e) => setData("password", e.target.value)}
              />
            </div>
            <InputError message={errors.password} className="mt-1" />
          </div>

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>

            {canResetPassword && (
              <Link
                href={route("password.request")}
                className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Forgot password?
              </Link>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <PrimaryButton
              className="group relative w-full justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-indigo-500"
              disabled={processing}
            >
              <span className="relative z-10">
                {processing ? "Logging in..." : "Log in"}
              </span>
            </PrimaryButton>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href={route("register")}
            className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Create one
          </Link>
        </p>
      </div>
    </GuestLayout>
  );
}
