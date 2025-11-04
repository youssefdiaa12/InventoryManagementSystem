import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };

  return (
    <motion.section
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* === Header === */}
      <header className="border-b pb-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Profile Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your account's profile details and email address.
        </p>
      </header>

      {/* === Form === */}
      <form onSubmit={submit} className="space-y-6">
        {/* NAME */}
        <div>
          <InputLabel htmlFor="name" value="Full Name" />
          <div className="relative mt-1">
            <TextInput
              id="name"
              className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              required
              autoComplete="name"
            />
            <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <InputError className="mt-2" message={errors.name} />
        </div>

        {/* EMAIL */}
        <div>
          <InputLabel htmlFor="email" value="Email Address" />
          <div className="relative mt-1">
            <TextInput
              id="email"
              type="email"
              className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
              required
              autoComplete="username"
            />
            <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <InputError className="mt-2" message={errors.email} />
        </div>

        {/* VERIFY EMAIL */}
        {mustVerifyEmail && user.email_verified_at === null && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <p className="text-amber-800">
              Your email address is unverified.{" "}
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="text-blue-600 hover:underline font-medium ml-1"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <p className="mt-2 font-medium text-green-600">
                A new verification link has been sent to your email.
              </p>
            )}
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="flex items-center gap-4">
          <PrimaryButton
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 shadow text-white"
          >
            {processing ? "Saving..." : "Save Changes"}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out duration-300"
            enterFrom="opacity-0"
            leave="transition ease-in-out duration-300"
            leaveTo="opacity-0"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-green-600"
            >
              Profile updated successfully!
            </motion.p>
          </Transition>
        </div>
      </form>
    </motion.section>
  );
}
