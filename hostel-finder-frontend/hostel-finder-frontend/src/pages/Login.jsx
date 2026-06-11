import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseContact(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, message: "Please enter your email or phone number." };
  }

  if (trimmed.includes("@")) {
    if (!EMAIL_PATTERN.test(trimmed)) {
      return { valid: false, message: "Please enter a valid email address." };
    }

    return { valid: true, type: "email", value: trimmed };
  }

  const digits = trimmed.replace(/\D/g, "");

  if (/^\d+$/.test(trimmed.replace(/\s/g, ""))) {
    if (digits.length !== 10) {
      return {
        valid: false,
        message: "Please enter a valid 10-digit phone number.",
      };
    }

    return { valid: true, type: "phone", value: digits };
  }

  return {
    valid: false,
    message: "Please enter a valid email or 10-digit phone number.",
  };
}

function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [contactType, setContactType] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const isSignup = mode === "signup";

  function resetForm() {
    setName("");
    setIdentifier("");
    setContactType(null);
    setOtp("");
    setOtpSent(false);
    setMessage("");
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    resetForm();
  }

  function handleIdentifierChange(event) {
    setIdentifier(event.target.value);

    if (otpSent) {
      setOtpSent(false);
      setContactType(null);
      setOtp("");
      setMessage("");
    }
  }

  function handleSendOtp(event) {
    event.preventDefault();
    setMessage("");

    if (isSignup && !name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    const parsed = parseContact(identifier);

    if (!parsed.valid) {
      setMessage(parsed.message);
      return;
    }

    setContactType(parsed.type);
    setIdentifier(parsed.value);
    setOtpSent(true);
    setMessage(
      parsed.type === "email"
        ? `OTP sent to your email at ${parsed.value}. (UI preview — not connected to backend yet.)`
        : `OTP sent to your phone number ${parsed.value}. (UI preview — not connected to backend yet.)`,
    );
  }

  function handleVerify(event) {
    event.preventDefault();
    setMessage("");

    if (!otp.trim() || otp.trim().length < 4) {
      setMessage("Please enter the OTP you received.");
      return;
    }

    const verifiedWith =
      contactType === "email"
        ? `email (${identifier})`
        : `phone number (${identifier})`;

    setMessage(
      isSignup
        ? `Account created and verified with your ${verifiedWith}! (UI preview — not connected to backend yet.)`
        : `Login successful! Verified with your ${verifiedWith}. (UI preview — not connected to backend yet.)`,
    );
  }

  return (
    <>
      <div className="auth-screen">
        <div className="page-container auth-screen-inner">
          <Navbar />
          <main className="auth-page">
            <div className="auth-card">
          <div className="auth-card-header">
            <h1 className="auth-title">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="auth-subtitle">
              {isSignup
                ? "Join Hostel Finder with a one-time code sent to your email or phone."
                : "Sign in with a one-time code sent to your email or phone."}
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={otpSent ? handleVerify : handleSendOtp}
            noValidate
          >
            {isSignup && (
              <>
                <label className="auth-label" htmlFor="auth-name">
                  Full name
                </label>
                <input
                  id="auth-name"
                  className="auth-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </>
            )}

            <label className="auth-label" htmlFor="auth-identifier">
              Email or phone number
            </label>
            <input
              id="auth-identifier"
              className="auth-input"
              type="text"
              inputMode="email"
              placeholder="Email or phone number"
              value={identifier}
              onChange={handleIdentifierChange}
              autoComplete="username"
              readOnly={otpSent}
            />

            {otpSent && contactType && (
              <p className="auth-hint">
                {contactType === "email"
                  ? `Enter the code sent to ${identifier}`
                  : `Enter the code sent to +91 ${identifier}`}
              </p>
            )}

            {otpSent && (
              <>
                <label className="auth-label" htmlFor="auth-otp">
                  Enter OTP
                </label>
                <input
                  id="auth-otp"
                  className="auth-input auth-input--otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, ""))
                  }
                  autoComplete="one-time-code"
                />
                <button
                  type="button"
                  className="auth-resend-btn"
                  onClick={() => {
                    const channel =
                      contactType === "email" ? "email" : "phone number";
                    setMessage(`OTP resent to your ${channel}! (UI preview only.)`);
                  }}
                >
                  Resend OTP
                </button>
              </>
            )}

            {message && (
              <p
                className={`auth-message${
                  message.includes("successful") ||
                  message.includes("created and verified")
                    ? " auth-message--success"
                    : ""
                }`}
                role="status"
              >
                {message}
              </p>
            )}

            <button type="submit" className="auth-submit-btn">
              {otpSent
                ? isSignup
                  ? "Verify & Sign up"
                  : "Verify & Login"
                : "Send OTP"}
            </button>

            {otpSent && (
              <button
                type="button"
                className="auth-change-contact-btn"
                onClick={() => {
                  setOtpSent(false);
                  setContactType(null);
                  setOtp("");
                  setMessage("");
                }}
              >
                Use a different email or phone
              </button>
            )}
          </form>

          <p className="auth-footer-text">
            {isSignup ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => handleModeChange("login")}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => handleModeChange("signup")}
                >
                  Sign up
                </button>
              </>
            )}
          </p>

              <Link to="/" className="auth-back-link">
                Back to Home
              </Link>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
