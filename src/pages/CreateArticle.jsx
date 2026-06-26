import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import axios from "axios";

export default function CreateArticle() {
  const [article, setArticle] = useState({
    title: "",
    date: "",
    athor: "",
    readingTime: "",
    message: "",
    imageURL: "",
  });

  console.log(article);

  const handleChangeArticle = (e) => {
    setArticle((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeArticleMessage = (e) => {
    setArticle((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const handleCreateNewArticle = () => {
    axios.post("http://localhost:8000/article", {
      imageUrl: article.imageURL,
      title: article.title,
      readingTime: article.readingTime,
      date: article.date,
      athor: article.athor,
      content: article.message,
    });
  };

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
      to="/CreateArticle"
      className={({ isActive }) =>
        isActive
          ? "text-blue-600"
          : "text-black hover:text-blue-500 transition-colors"
      }
    >
      ساخت مقاله
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
  return (
    <>
      <Navbar items={pages} />

      <div className="flex flex-col gap-4 my-6 px-4 sm:px-8 md:px-12 lg:px-20">
        <h2 className="text-right text-xl font-medium mb-6">: ساخت مقاله</h2>

        <Input
          name="title"
          label=" عنوان مقاله"
          handleChange={handleChangeArticle}
          placeholder="عنوان مقاله را وارد کنید"
        />

        <Input
          name="imageURL"
          label="آدرس عکس"
          handleChange={handleChangeArticle}
          placeholder="آدرس عکس مقاله را بگذارید"
        />

        <Input
          name="athor"
          label="نویسنده"
          handleChange={handleChangeArticle}
          placeholder="نویسنده مقاله را وارد کنید"
        />

        <Input
          name="readingTime"
          label="مدت زمان خواندن"
          handleChange={handleChangeArticle}
          placeholder="مدت زمان مقاله را وارد کنید"
        />

        <Input
          name="date"
          label="تاریخ"
          handleChange={handleChangeArticle}
          placeholder=" تاریخ مقاله را وارد کنید"
        />

        <Textarea
          label="متن"
          placeholder="متن را وارد کنید"
          handleChange={handleChangeArticleMessage}
        />
      </div>

      <div className="flex flex-row justify-end px-4 sm:px-8 md:px-12 lg:px-20 mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 transition duration-500 text-white px-8 py-2 rounded cursor-pointer"
          onClick={handleCreateNewArticle}
        >
          ساخت مقاله
        </button>
      </div>
    </>
  );
}
