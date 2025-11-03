import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-md dark:bg-gray-800/80">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
          Create Your Account ✨
        </h2>
        <p className="mb-6 text-center text-gray-500 dark:text-gray-400">
          Join us and start your journey today
        </p>

        <form onSubmit={submit} className="space-y-6">
          {/* Name */}
          <div>
            <InputLabel
              htmlFor="name"
              value="Full Name"
              className="text-gray-700 dark:text-gray-300"
            />
            <div className="relative mt-2">
              <User className="absolute left-3 top-2.5 size-5 text-gray-400 dark:text-gray-500" />
              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                autoComplete="name"
                isFocused
                onChange={(e) => setData("name", e.target.value)}
                required
              />
            </div>
            <InputError message={errors.name} className="mt-1" />
          </div>

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
                onChange={(e) => setData("email", e.target.value)}
                required
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
                autoComplete="new-password"
                onChange={(e) => setData("password", e.target.value)}
                required
              />
            </div>
            <InputError message={errors.password} className="mt-1" />
          </div>

          {/* Confirm Password */}
          <div>
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirm Password"
              className="text-gray-700 dark:text-gray-300"
            />
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-2.5 size-5 text-gray-400 dark:text-gray-500" />
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-10 pr-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                autoComplete="new-password"
                onChange={(e) =>
                  setData("password_confirmation", e.target.value)
                }
                required
              />
            </div>
            <InputError
              message={errors.password_confirmation}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <PrimaryButton
              className="group relative w-full justify-center overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-indigo-500"
              disabled={processing}
            >
              <span className="relative z-10">
                {processing ? "Registering..." : "Register"}
              </span>
            </PrimaryButton>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href={route("login")}
            className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Log in
          </Link>
        </p>
      </div>
    </GuestLayout>
  );
}
