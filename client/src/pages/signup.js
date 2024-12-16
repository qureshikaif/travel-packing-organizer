import Background from "../assets/side.jpg";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSignup } from "../services";
import { signupSchema } from "../utils/schemas";

const SignupPage = () => {
  // Initialize react-hook-form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // To manually set errors (e.g., API errors)
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  /**
   * Handles form submission.
   * @param {Object} data - Form data.
   */
  const onSubmit = async (data) => {
    try {
      await handleSignup(data);
    } catch (error) {
      setError("apiError", { message: error.message });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2 relative h-screen">
        <img
          src={Background}
          alt="Travel Gear"
          className="w-full h-full object-cover"
        />
        {/* Optional Black Overlay on Image */}
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Display API Error */}
            {errors.apiError && (
              <p className="text-red-600 mt-1 text-center">
                {errors.apiError.message}
              </p>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.username ? "border-red-500" : ""
                }`}
                {...register("username")}
                placeholder="Your username"
              />
              {errors.username && (
                <p className="text-red-600 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email")}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password")}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                {...register("confirmPassword")}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-300 text-gray-800 p-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Link to Login */}
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
