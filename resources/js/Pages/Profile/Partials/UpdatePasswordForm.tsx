import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function UpdatePasswordForm({
  className = "",
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }
        if (errors.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <motion.section
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* === HEADER === */}
      <header className="border-b pb-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          Update Password
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose a strong, unique password to keep your account secure.
        </p>
      </header>

      {/* === FORM === */}
      <form onSubmit={updatePassword} className="space-y-6">
        {/* Current Password */}
        <div>
          <InputLabel htmlFor="current_password" value="Current Password" />
          <TextInput
            id="current_password"
            ref={currentPasswordInput}
            type="password"
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={data.current_password}
            onChange={(e) => setData("current_password", e.target.value)}
            autoComplete="current-password"
          />
          <InputError className="mt-2" message={errors.current_password} />
        </div>

        {/* New Password */}
        <div>
          <InputLabel htmlFor="password" value="New Password" />
          <TextInput
            id="password"
            ref={passwordInput}
            type="password"
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={errors.password} />
        </div>

        {/* Confirm Password */}
        <div>
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={data.password_confirmation}
            onChange={(e) =>
              setData("password_confirmation", e.target.value)
            }
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={errors.password_confirmation} />
        </div>

        {/* === ACTIONS === */}
        <div className="flex items-center gap-4">
          <PrimaryButton
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow"
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
              Password updated successfully!
            </motion.p>
          </Transition>
        </div>
      </form>
    </motion.section>
  );
}
