import React from "react";

export default function Input(props) {
  return (
    <>
      <div>
        <label className="block mb-2 text-right font-medium">
          {props.label}
        </label>
        <input
          type="text"
          name={props.name}
          onChange={props.handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={props.placeholder}
        />
      </div>
    </>
  );
}
