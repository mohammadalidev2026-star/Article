import React from "react";

export default function Navbar(props) {
  return (
    <div className="shadow-md flex justify-end px-4 sm:px-10 md:pr-20">
      <ul className="flex flex-row flex-wrap gap-3 sm:gap-4 py-4 text-xs sm:text-sm font-medium">
        {props.items?.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
