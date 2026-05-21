import React from "react";

export default function Article(props) {
  return (
    <>
      <div className="w-full h-83 sm:w-60 md:w-70 bg-[#eeeeee] shadow-md mb-4 rounded overflow-hidden">
        <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
          <img
            src={props.article.imageUrl}
            alt="article"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
          />
        </div>
        <div className="text-right flex flex-col gap-2 p-2">
          <h3 className="text-black text-sm font-medium">
            {props.article.title}
          </h3>
          <p className="text-gray-700 text-xs font-medium">
            {props.article.readingTime}
          </p>
        </div>
      </div>
    </>
  );
}
