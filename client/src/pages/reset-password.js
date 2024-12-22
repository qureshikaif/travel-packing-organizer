import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../utils";
import { handleResetPassword } from "../services";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await handleResetPassword(data);
      navigate("/login");
      alert(
        "Password reset successful. You can now log in with your new password."
      );
    } catch (error) {
      setError("apiError", { message: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Reset Password
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

          <div>
            <label className="block text-gray-700">OTP</label>
            <input
              type="text"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                errors.otp ? "border-red-500" : ""
              }`}
              {...register("otp")}
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="text-red-600 mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                errors.newPassword ? "border-red-500" : ""
              }`}
              {...register("newPassword")}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-600 mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-300 text-gray-800 p-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
