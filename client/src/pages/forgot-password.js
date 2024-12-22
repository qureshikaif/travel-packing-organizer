import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleForgotPassword } from "../services";
import { forgotPasswordSchema } from "../utils";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await handleForgotPassword(data.email);
      navigate("/reset-password");
      alert("OTP sent to your email. Please check your inbox.");
    } catch (error) {
      setError("apiError", { message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Display API Error */}
          {errors.apiError && (
            <p className="text-red-600 text-center">
              {errors.apiError.message}
            </p>
          )}

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-300 text-gray-800 p-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
