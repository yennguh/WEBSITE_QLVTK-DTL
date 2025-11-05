import React, { useState } from "react";
import { Search, Clock, Eye, ContactRound, LayoutGrid, X } from "lucide-react";
import img1 from "../../public/assets/phone.jpg";
import img2 from "../../public/assets/chiakhoa.jpg";
import img3 from "../../public/assets/oplung.jpg";
import img4 from "../../public/assets/daysac.jpg";

const data = [
  {
    id: 1,
    title: "Điện thoại iPhone 16 Pro Max bị mất ở Trường Đại học Trà Vinh",
    image: img1,
    date: "05/11/2025",
    count: 1,
    user: {
      name: "Võ Phước Toàn",
    },
  },
  {
    id: 2,
    title: "Chìa khoá nhà bị mất ở Trường Đại học Trà Vinh",
    image: img2,
    date: "27 ngày trước",
    count: 1,
    user: {
      name: "Trần Ngọc Yến",
    },
  },
  {
    id: 3,
    title: "Ốp lưng iPhone XS Max bị mất ở Trường Đại học Trà Vinh",
    image: img3,
    date: "28 ngày trước",
    count: 1,
    user: {
      name: "Nguyễn Trần Khánh Ngọc",
    },
  },
  {
    id: 4,
    title: "Dây sạc iPhone XS Max bị mất ở Trường Đại học Trà Vinh",
    image: img4,
    date: "28 ngày trước",
    count: 1,
    user: {
      name: "Nguyễn Hoàng Yến",
    },
  },
];

const LostItems = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="p-10 flex flex-col items-center">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 w-full md:w-1/2">
        <h1 className="text-3xl font-bold uppercase text-gray-800">
          Đồ bị thất lạc
        </h1>

        {/* Search box */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center border rounded-full px-4 py-2 w-full md:w-72">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="flex-1 outline-none bg-transparent"
            />
            <Search className="text-red-500 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* List cards */}
      <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-full bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Người đăng */}
            <div className="flex items-center gap-3 p-4 border-b">
              <img
                src={item.image}
                alt={item.user.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  {item.user.name}
                </h4>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {item.date}
                </div>
              </div>
            </div>

            {/* Tiêu đề bài đăng */}
            <h3 className="text-lg font-semibold text-gray-800 px-4 py-3">
              {item.title}
            </h3>

            {/* Ảnh bài đăng */}
            <div className="relative w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                <LayoutGrid className="w-4 h-4" /> {item.count} ảnh
              </div>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-between px-4 py-4">
              <button
                onClick={() => setSelectedImage(item.image)}
                className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                <Eye className="w-4 h-4" /> Xem ảnh
              </button>

              <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition">
                <ContactRound className="w-4 h-4" /> Liên hệ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal xem ảnh */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-8 -right-8 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Ảnh bài đăng"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItems;
