import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import HostelDetails from "./pages/HostelDetails";
import KnowMore from "./pages/KnowMore";
import Login from "./pages/Login";
import Saved from "./pages/Saved";
import SearchResults from "./pages/SearchResults";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route path="/know-more" element={<KnowMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </>
  );
}

export default App;
