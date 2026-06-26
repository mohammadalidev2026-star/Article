import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#050816]">
      {/* Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 blur-[150px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 `w-112` h-112 bg-cyan-500/10 blur-[180px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Top */}

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}

          <div>
            <h1 className="text-4xl font-black text-white">Article</h1>

            <p className="text-gray-400 leading-8 mt-6">
              بستری برای مطالعه، انتشار و مدیریت مقالات با طراحی مدرن و تجربه‌ای
              لذت‌بخش
            </p>
          </div>

          {/* Links */}

          <div>
            <h2 className="text-white font-bold text-xl mb-6">صفحات</h2>

            <div className="flex flex-col gap-4 text-gray-400">
              <NavLink
                to="/"
                className="hover:text-white transition-all duration-300"
              >
                صفحه اصلی
              </NavLink>

              <NavLink
                to="/CreateArticle"
                className="hover:text-white transition-all duration-300"
              >
                ساخت مقاله
              </NavLink>

              <NavLink
                to="/AboutUs"
                className="hover:text-white transition-all duration-300"
              >
                درباره ما
              </NavLink>
            </div>
          </div>

          {/* Technologies */}

          <div>
            <h2 className="text-white font-bold text-xl mb-6 text-right">
              تکنولوژی‌ها
            </h2>

            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 text-white px-4 py-2 rounded-full">
                React
              </span>

              <span className="bg-white/10 text-white px-4 py-2 rounded-full">
                Tailwind
              </span>

              <span className="bg-white/10 text-white px-4 py-2 rounded-full">
                Axios
              </span>

              <span className="bg-white/10 text-white px-4 py-2 rounded-full">
                JSON Server
              </span>
            </div>
          </div>

          {/* Social */}

          <div>
            <h2 className="text-white font-bold text-xl mb-6 text-right">
              ما را دنبال کنید
            </h2>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-cyan-500 transition-all duration-300"
              >
                <FaTelegramPlane />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sky-600 transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Article Project. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="mt-6 md:mt-0 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 hover:scale-110 transition-all duration-300 flex items-center justify-center text-white cursor-pointer"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
