import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import GearOrganizer from "./pages/gear-organizer";
import ProtectedRoute from "./routes/protected-route";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/gear-organizer"
                element={
                  <ProtectedRoute>
                    <GearOrganizer />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </div>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
