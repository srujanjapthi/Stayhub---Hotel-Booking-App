import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDialogContext } from "../../contexts/DialogContext";

type Props = {
  header: string;
  content: string;
  note?: string;
  onClose?: () => void;
  onAccept: () => void;
  onReject: () => void;
};

const ConfirmDeleteDialog = ({
  header,
  content,
  note,
  onClose,
  onAccept,
  onReject,
}: Props) => {
  const { isModalOpen, closeModal } = useDialogContext();

  const handleClose = () => {
    closeModal();
    onClose && onClose();
  };

  const handleAccept = () => {
    onAccept();
    closeModal();
  };

  const handleReject = () => {
    onReject();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{header}</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-500 hover:text-black transition-all duration-300"
              >
                <X />
              </button>
            </div>

            <p className="mt-4 text-gray-700 font-medium">{content}</p>
            {note && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">Note: </span>
                {note}
              </p>
            )}

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteDialog;
