import React from "react";

export default function Textarea(props) {
  return (
    <>
      <div>
        <label className="block mb-2 text-right font-medium">
          {props.label}
        </label>
        <textarea
          className="w-full px-4 py-8 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={props.placeholder}
          onChange={props.handleChange}
        ></textarea>
      </div>
    </>
  );
}
