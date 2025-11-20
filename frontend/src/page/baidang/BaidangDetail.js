import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, MapPin, Package, Phone, Mail, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { fetchPostById, deletePost } from '../../api/posts.api';
import { inforUser } from '../../api/users.api';
import { AuthContext } from '../../core/AuthContext';
import { jwtDecode } from 'jwt-decode';

const BaidangDetail = () => {
  const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await fetchPostById(id);
                if (postData) {
                    setPost(postData);
                    
                    // Check if current user is owner
                    if (token) {
                        try {
                            const decoded = jwtDecode(token);
                            setIsOwner(postData.userId === decoded._id);
                            setIsAdmin(decoded.roles?.includes('admin') || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']?.includes('admin'));
                        } catch (err) {
                            console.error('Error decoding token:', err);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    useEffect(() => {
        if (post?.userId && token) {
            // In a real app, you'd fetch user info by userId
            // For now, using current user info
            const fetchUserInfo = async () => {
                const userData = await inforUser();
                if (userData) {
                    setUser(userData);
                }
            };
            fetchUserInfo();
        }
    }, [post, token]);

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?')) {
            return;
        }

        try {
            await deletePost(id);
            alert('Xóa bài đăng thành công');
            navigate(isAdmin ? '/admin' : '/');
        } catch (error) {
            alert('Có lỗi xảy ra khi xóa bài đăng');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Đang tải...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài đăng</h2>
                    <Link to="/" className="text-blue-600 hover:underline">Quay về trang chủ</Link>
                </div>
            </div>
        );
    }

  return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại
                </button>

                {/* Actions (if owner or admin) */}
                {(isOwner || isAdmin) && (
                    <div className="flex gap-2 mb-4">
                        {isOwner && (
                            <Link
                                to={`/baidang/${id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Edit className="w-4 h-4" />
                                Chỉnh sửa
                            </Link>
                        )}
                        {(isOwner || isAdmin) && (
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4" />
                                Xóa
                            </button>
                        )}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Images */}
                    {post.images && post.images.length > 0 && (
                        <div className="relative">
                            <img
                                src={post.images[currentImageIndex]}
                                alt={post.title}
                                className="w-full h-96 object-cover"
                            />
                            {post.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => 
                                            prev > 0 ? prev - 1 : post.images.length - 1
                                        )}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => 
                                            prev < post.images.length - 1 ? prev + 1 : 0
                                        )}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                                    >
                                        ›
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                        {post.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 rounded-full ${
                                                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <div className="p-6">
                        {/* Title */}
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                            <div className="flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                <span>{post.itemType}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{post.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    post.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    post.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    post.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                    {post.status === 'approved' ? 'Đã duyệt' :
                                     post.status === 'pending' ? 'Chờ duyệt' :
                                     post.status === 'rejected' ? 'Đã từ chối' :
                                     'Đã hoàn thành'}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
                            <p className="text-gray-700 whitespace-pre-wrap">{post.description}</p>
                        </div>

                        {/* Contact Info */}
                        {(post.contactInfo?.phone || post.contactInfo?.email || user) && (
                            <div className="border-t pt-6">
                                <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
                                <div className="space-y-2">
                                    {user && (
                                        <p className="text-gray-700">
                                            <span className="font-medium">Người đăng:</span> {user.fullname}
                                        </p>
                                    )}
                                    {post.contactInfo?.phone && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Phone className="w-5 h-5" />
                                            <a href={`tel:${post.contactInfo.phone}`} className="hover:text-blue-600">
                                                {post.contactInfo.phone}
                                            </a>
                                        </div>
                                    )}
                                    {post.contactInfo?.email && (
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Mail className="w-5 h-5" />
                                            <a href={`mailto:${post.contactInfo.email}`} className="hover:text-blue-600">
                                                {post.contactInfo.email}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    </div>
  );
};

export default BaidangDetail;
