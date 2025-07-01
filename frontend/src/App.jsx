import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import KasirLayout from "./layouts/KasirLayout";
import AuthLayout from "./layouts/AuthLayout";
import { getKategori } from "./service/Service";
import "./loading.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      checkAuth();
      hasFetched.current = true;
    }
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Ping API to validate token
        await getKategori();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
    setLoading(false);
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (loading)
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      );

    if (!isAuthenticated) return <Navigate to="/auth/login" />;

    const role = localStorage.getItem("role"); // ambil role dari localStorage
    const pathname = window.location.pathname;

    // Jika kasir mencoba mengakses selain halaman /kasir → redirect ke /kasir
    if (role === "kasir" && pathname !== "/kasir") {
      return <Navigate to="/kasir" replace />;
    }

    return children;
  };

  // Public Route Component (for authentication)
  const PublicRoute = ({ children }) => {
    if (loading)
      return (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      );
    if (isAuthenticated) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute untuk kasir (butuh login) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <KasirLayout />
            </ProtectedRoute>
          }
        />

        {/* Rute untuk halaman otentikasi (tidak boleh diakses jika sudah login) */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        />

        {/* Rute default jika tidak dikenal */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              localStorage.getItem("role") === "admin" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/kasir" replace />
              )
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
