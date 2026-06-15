import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Article from "../components/Article";
import axios from "axios";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

export default function Home() {
  const pages = [
    <NavLink
      to="/AboutUs"
      className={({ isActive }) =>
        isActive
          ? "text-blue-600"
          : "text-black hover:text-blue-500 transition-colors"
      }
    >
      درباره
    </NavLink>,
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "text-blue-600"
          : "text-black hover:text-blue-500 transition-colors"
      }
    >
      لیست مقالات
    </NavLink>,
  ];

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/article")
      .then((result) => {
        setArticles(result.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);
  return (
    <>
      <div>
        <Navbar items={pages} />

        <h2 className="text-center sm:text-right px-4 sm:px-10 md:px-20 py-4 text-sm font-medium">
          : لیست مقالات
        </h2>
        <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-10 min-h-180">
          <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-10 min-h-180">
            {articles.map((article) => (
              <NavLink key={article.id} to={`/articles/${article.id}`}>
                <Article article={article} />
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
