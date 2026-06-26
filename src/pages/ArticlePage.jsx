import axios from "axios";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ArticlePage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get(`http://localhost:8000/article/${id}`)
      .then((result) => {
        setArticle(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleDeleteArticle = () => {
    setIsDeleting(true);

    axios
      .delete(`http://localhost:8000/article/${id}`)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBackHome = () => {
    navigate("/");
  };

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        ... در حال بارگذاری
      </div>
    );
    return (
      <>
        <div className="flex justify-center text-center">
          <h1 className="text-2xl font-bold">مقاله پیدا نشد</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" mx-auto px-4 sm:px-10 md:px-20 py-8">
        <div className="flex flex-row justify-center gap-10 mb-8">
          <span className="text-sm text-gray-600">تاریخ : {article.date}</span>

          <span className="text-sm text-gray-600">
            نویسنده : {article.athor}
          </span>

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

        <div className="flex flex-row justify-center gap-20 mt-10">
          <button
            onClick={() => setShowBackModal(true)}
            className="bg-blue-500 hover:bg-blue-600 transition duration-500 text-white px-8 py-2 rounded cursor-pointer"
          >
            بازگشت
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 hover:bg-red-600 transition duration-500 text-white px-6 py-2 rounded cursor-pointer"
          >
            حذف مقاله
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-center text-lg font-medium mb-6">
              آیا میخواهید این مقاله را حذف کنید؟
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition duration-500 cursor-pointer"
              >
                خیر
              </button>

              <button
                onClick={handleDeleteArticle}
                disabled={isDeleting}
                className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500
                transition duration-500 cursor-pointer"
              >
                {isDeleting ? "در حال حذف شدن..." : "بله"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showBackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-center text-lg font-bold mb-6">
              آیا میخواهید بازگردید؟
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowBackModal(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500
                transition duration-500 cursor-pointer"
              >
                خیر
              </button>

              <button
                onClick={handleBackHome}
                className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500
                transition duration-500 cursor-pointer"
              >
                بله
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
