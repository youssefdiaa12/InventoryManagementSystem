import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function DeleteUserForm({ className = "" }: { className?: string }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
    password: "",
  });

  const confirmUserDeletion = () => setConfirmingUserDeletion(true);

  const deleteUser: FormEventHandler = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    clearErrors();
    reset();
  };

  return (
    <motion.section
      className={`p-6 bg-white border border-red-100 rounded-2xl shadow-sm ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* === HEADER === */}
      <header className="border-b border-red-50 pb-3 mb-6">
        <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Delete Account
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Permanently delete your account and all associated data. This action
          <span className="font-semibold text-gray-800"> cannot be undone.</span>
        </p>
      </header>

      {/* === ACTION BUTTON === */}
      <DangerButton
        onClick={confirmUserDeletion}
        className="bg-red-600 hover:bg-red-700 shadow-md"
      >
        Delete Account
      </DangerButton>

      {/* === CONFIRMATION MODAL === */}
      <AnimatePresence>
        {confirmingUserDeletion && (
          <Modal show={confirmingUserDeletion} onClose={closeModal}>
            <motion.form
              onSubmit={deleteUser}
              className="p-6 bg-white rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Confirm Account Deletion
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                This action will <span className="text-red-600 font-medium">permanently</span>{" "}
                delete all of your data. Please enter your password to confirm.
              </p>

              <div className="mt-6">
                <InputLabel htmlFor="password" value="Password" className="sr-only" />
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordInput}
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your password"
                  isFocused
                />
                <InputError message={errors.password} className="mt-2" />
              </div>

              <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                <DangerButton
                  className="ml-3 bg-red-600 hover:bg-red-700 text-white shadow-sm"
                  disabled={processing}
                >
                  {processing ? "Deleting..." : "Delete Permanently"}
                </DangerButton>
              </div>
            </motion.form>
          </Modal>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
