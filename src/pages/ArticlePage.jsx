import React from "react";
import { useParams } from "react-router-dom";
import db from "../../data/db.json";

export default function ArticlePage() {
  const { id } = useParams();

  const article = db.article.find((item) => item.id === Number(id));

  if (!article) {
    return <h1>مقاله پیدا نشد</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-10 md:px-20 py-8">
      <div className="flex flex-row justify-evenly gap-4 mb-8">
        <span className="text-sm text-gray-600">تاریخ : {article.date}</span>

        <span className="text-sm text-gray-600">نویسنده : {article.athor}</span>

        <span className="text-sm text-gray-600">
          مدت زمان خواندن : {article.readingTime}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="size-96 rounded-sm"
        />
      </div>
      <h1 className="text-3xl text-center font-bold my-6">{article.title}</h1>

      <p className="text-right leading-8">{article.content}</p>
    </div>
  );
}
