import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-100 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-[120px] sm:text-[170px] font-black text-blue-600 leading-none select-none">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          صفحه مورد نظر پیدا نشد
        </h2>

        <p className="text-gray-500 mt-5 leading-8">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد، آدرس را اشتباه وارد
          کرده‌اید
        </p>

        <div className="mt-10">
          <NavLink
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            بازگشت به صفحه اصلی
          </NavLink>
        </div>
      </div>
    </div>
  );
}
