import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/aboutUs" element={<AboutUs />} />

      <Route path="/articles/:id" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
