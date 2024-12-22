import Background from "../assets/side.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../utils/schemas";
import { handleLogin } from "../services";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await handleLogin(data);
      const { token, user } = response;
      login({ user, token });
    } catch (error) {
      setError("apiError", { message: error.message });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      <div className="hidden md:block md:w-1/2 relative h-screen">
        <img
          src={Background}
          alt="Travel Gear"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Display API Error */}
            {errors.apiError && (
              <p className="text-red-600 mt-1 text-center">
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
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className={`w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password")}
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-300 text-gray-800 p-2 rounded hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
          </form>

          <div className="flex justify-between items-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-yellow-800 hover:underline">
                Sign Up
              </Link>
            </p>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-yellow-800 hover:underline focus:outline-none"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
