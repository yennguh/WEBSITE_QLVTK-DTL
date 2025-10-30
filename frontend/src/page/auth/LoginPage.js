import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "../../public/assets/bg.jpg";
import logo from "../../public/assets/logo.jpg";
import { EyeOff, Eye } from "lucide-react";

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);


    const togglePassword = () => setPasswordVisible(v => !v);
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
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

                    <h1 className="text-2xl font-bold mt-3">Đăng nhập</h1>
                    <p className="text-sm mt-1">Đăng nhập vào tài khoản của bạn</p>
                </div>

                {/* Form đăng nhập */}
                <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email/ Số điện thoại
                        </label>
                        <input
                            type="text"
                            placeholder="admin@admin.com"
                            className="mt-1 w-full p-3 border rounded-lg focus:ring-1 focus:ring-red-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                        <div className="relative mt-1">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full pr-12 p-3 border rounded-lg focus:ring-1 focus:ring-red-500 outline-none"
                                aria-label="Mật khẩu"
                            />


                            {/* nút hiển thị/mờ mật khẩu */}
                            <button
                                type="button"
                                onClick={togglePassword}
                                aria-label={passwordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                className="absolute inset-y-0 right-2 flex items-center px-2"
                                tabIndex={0}
                            >
                                {/* simple eye / eye-off SVGs */}
                                {passwordVisible ? (
                                    <Eye />
                                ) : (
                                    <EyeOff />
                                )}
                            </button>
                        </div>
                        <div className="flex justify-end text-sm mt-1">
                            <a href="#" className="text-red-600 hover:underline">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input id="remember" type="checkbox" className="w-4 h-4" />
                        <label htmlFor="remember" className="text-sm text-gray-700">
                            Lưu đăng nhập
                        </label>
                    </div>


                    <button className="w-full bg-red-600 text-white font-semibold py-3 rounded-full hover:bg-red-700 transition">
                        Đăng nhập
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/register" className="text-red-600 hover:underline font-medium">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
