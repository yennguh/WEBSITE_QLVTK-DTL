import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { sendContact } from '../../api/contact.api';
import { AuthContext } from '../../core/AuthContext';
import { inforUser } from '../../api/users.api';
import { useEffect } from 'react';

const Contact = () => {
    const { token } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onTouched"
    });

    useEffect(() => {
        if (token) {
            // Pre-fill user info if logged in
            const fetchUserInfo = async () => {
                try {
                    const userData = await inforUser();
                    if (userData) {
                        reset({
                            name: userData.fullname || '',
                            email: userData.email || '',
                            phone: userData.phone || ''
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };
            fetchUserInfo();
        }
    }, [token, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setError('');
        setSuccess(false);

        try {
            const result = await sendContact(data);
            if (result) {
                setSuccess(true);
                reset();
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi gửi tin nhắn');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">Liên hệ với chúng tôi</h1>
                    <p className="text-gray-600">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <Mail className="w-8 h-8 text-blue-600 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Email</h3>
                        <p className="text-gray-600">support@tvu.edu.vn</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <Phone className="w-8 h-8 text-green-600 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Điện thoại</h3>
                        <p className="text-gray-600">0294 3855 999</p>
                    </div>
                </div>

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("name", { required: "Họ tên là bắt buộc" })}
                                type="text"
                                placeholder="Nguyễn Văn A"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: "Email là bắt buộc",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email không hợp lệ"
                                    }
                                })}
                                type="email"
                                placeholder="email@example.com"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số điện thoại
                            </label>
                            <input
                                {...register("phone", {
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Số điện thoại không hợp lệ"
                                    }
                                })}
                                type="tel"
                                placeholder="0962xxxxxx"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Chủ đề <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("subject", { required: "Chủ đề là bắt buộc" })}
                                type="text"
                                placeholder="VD: Yêu cầu hỗ trợ, Góp ý..."
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.subject && (
                                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MessageSquare className="w-4 h-4 inline mr-2" />
                                Nội dung tin nhắn <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register("message", {
                                    required: "Nội dung là bắt buộc",
                                    minLength: { value: 10, message: "Nội dung tối thiểu 10 ký tự" }
                                })}
                                rows="6"
                                placeholder="Nhập nội dung tin nhắn của bạn..."
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.message && (
                                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <Send className="w-5 h-5" />
                            {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;

