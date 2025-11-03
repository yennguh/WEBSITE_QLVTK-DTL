import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoHeader from "../public/assets/logo.jpg";
import { useEffect, useState } from "react";
import { inforUser } from "../api/users.api";
export default function Header() {
  const [user, setUser] = useState();
  const fetchUsers = async () => {
    const result = await inforUser();
    if (result) {
      setUser(result);
    } else {
      setUser(null);
    }

  };

  useEffect(() => {

    fetchUsers();
  }, []);
  return (
    <header className="w-full shadow-sm border-b bg-white">
      <div className="w-full mx-auto flex items-center justify-between py-2 px-4">
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <img
            src={logoHeader}
            alt="logo"
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-5 text-sm font-medium">
          {[
            "Trang chủ",
            "Đồ thất lạc",
            "Đồ nhặt được",
            "Báo mất đồ",
            "Media",
            "Hướng dẫn",
            "Tin tức",
            "Giới thiệu",
            "Liên hệ",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className={`px-2 py-1 rounded-full transition ${item === "Trang chủ"
                ? "bg-red-100 text-red-600 font-semibold text-lg"
                : "hover:text-red-600 text-lg"
                }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Login + social + lang */}
        <div className="flex items-center gap-3">
          {user ? (
            <span>Xin chào, <span className="font-bold">{user.fullname}</span></span>
          ) : (
            <Link to="/login">
              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700">
                Đăng nhập / Đăng ký
              </button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center border rounded-full hover:bg-gray-100"
            >
              <FaFacebookF className="text-lg" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
