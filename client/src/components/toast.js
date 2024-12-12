import { CheckCircle, Trash2, X } from "lucide-react";

// Toast Notification Component
export const Toast = ({ message, type, onClose }) => {
    return (
      <div
        className={`fixed top-5 right-5 flex items-center px-4 py-2 rounded shadow-lg text-white ${
          type === 'success' ? 'bg-yellow-500' : 'bg-red-500'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 mr-2" />
        ) : (
          <Trash2 className="h-5 w-5 mr-2" />
        )}
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 focus:outline-none">
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  };