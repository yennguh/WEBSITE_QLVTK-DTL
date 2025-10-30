import React from "react";
import { Link } from "react-router-dom";
import background from "../../public/assets/bg.jpg";
import logo from "../../public/assets/logo.jpg";

const RegisterPage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="bg-black bg-opacity-50 absolute inset-0"></div>

            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Logo + tiêu đề */}
                <div className="text-center text-white mb-8">
                    <img src={logo} alt="logo" className="mx-auto w-24 h-24 mb-3" />
                    <h2 className="text-xl font-semibold uppercase">
                        Đại học Trà Vinh
                    </h2>

                    <p className="text-sm mt-1">Tạo tài khoản mới</p>
                </div>

                {/* Form đăng ký */}
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-5 mb-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            placeholder="Nguyễn Văn A"
                            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Số điện thoại
                        </label>
                        <input
                            type="tel"
                            placeholder="0123456789"
                            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                        />
                    </div>



                    <button className="w-full bg-red-600 text-white font-semibold py-3 rounded-full hover:bg-red-700 transition">
                        Đăng ký
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="text-red-600 hover:underline font-medium">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;