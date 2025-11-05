import { FaFacebookF } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import logoHeader from "../public/assets/logo.jpg";
import { useEffect, useState } from "react";
import { MdOutlineClear } from "react-icons/md";
import { inforUser } from "../api/users.api";
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
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
          <button onClick={toggleDrawer} type="button" class="relative inline-flex items-center p-1 text-sm font-medium text-center">
            <IoIosNotifications className="text-2xl"></IoIosNotifications>
            <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">20</div>
          </button>
          {open && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={toggleDrawer}
            ></div>
          )}

          {/* Drawer */}
          <div
            className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Thông báo</h2>
              <button onClick={toggleDrawer}>
                <MdOutlineClear className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
              {/* Ví dụ danh sách thông báo */}
              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium">Bạn có món đồ mới được tìm thấy!</p>
                <span className="text-xs text-gray-500">5 phút trước</span>
              </div>

              <div className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium">Báo cáo đã được cập nhật.</p>
                <span className="text-xs text-gray-500">10 phút trước</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>

  );
}
