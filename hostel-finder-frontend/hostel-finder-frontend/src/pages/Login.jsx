import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { loginUser, saveAuthToken } from "../api/authApi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await loginUser({
        email: trimmedEmail,
        password,
      });

      saveAuthToken(token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="auth-page">
        <div className="auth-card">
          <header className="auth-card-header">
            <h1 className="auth-title">Login</h1>
            <p className="auth-subtitle">
              Welcome back! Log in to find your home away from home.
            </p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {successMessage && (
              <p className="auth-success" role="status">
                {successMessage}
              </p>
            )}

            <div className="auth-field">
              <label htmlFor="login-email" className="auth-label">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="auth-input"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password" className="auth-label">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="auth-input"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="auth-switch-link">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
