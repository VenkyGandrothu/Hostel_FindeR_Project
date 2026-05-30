import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import KnowMore from "./pages/KnowMore";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/know-more" element={<KnowMore />} />
      </Routes>
    </>
  );
}

export default App;
