import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function AccountPlaceholder({ title, description }) {
  return (
    <>
      <Navbar />
      <main className="account-placeholder-page">
        <section className="account-placeholder-card">
          <h1>{title}</h1>
          <p>{description}</p>
          <Link to="/" className="login-btn">
            Back to Home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default AccountPlaceholder;
