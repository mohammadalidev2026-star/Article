import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import ArticlePage from "./pages/ArticlePage";
import CreateArticle from "./pages/CreateArticle";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/articles/:id" element={<ArticlePage />} />
      <Route path="/createArticle" element={<CreateArticle />} />
    </Routes>
  );
}

export default App;
