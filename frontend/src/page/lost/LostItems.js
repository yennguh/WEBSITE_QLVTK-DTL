import React from "react";
import { Search, Clock, Eye, ContactRound, LayoutGrid } from "lucide-react";
import img1 from "../../public/assets/phone.jpg";
import img2 from "../../public/assets/phone.jpg";
import img3 from "../../public/assets/phone.jpg";
import img4 from "../../public/assets/phone.jpg";
import { Link } from "react-router-dom";

const data = [
    {
        id: 1,
        title: "Điện thoại Iphone 14 Pro Max bị mất ở trường Đại học Trà Vinh",
        image: img1,
        date: "23 ngày trước",
        count: 1,
    },
    {
        id: 2,
        title: "Điện thoại Iphone 14 Pro Max bị mất ở trường Đại học Trà Vinh",
        image: img2,
        date: "27 ngày trước",
        count: 2,
    },
    {
        id: 3,
        title: "Điện thoại Iphone 14 Pro Max bị mất ở trường Đại học Trà Vinh",
        image: img3,
        date: "28 ngày trước",
        count: 1,
    },
    {
        id: 4,
        title: "Điện thoại Iphone 14 Pro Max bị mất ở trường Đại học Trà Vinh",
        image: img4,
        date: "28 ngày trước",
        count: 3,
    },
];

const LostItems = () => {
    return (
        <div className="p-10">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold uppercase text-gray-800">
                    Đồ bị thất lạc
                </h1>

                <div className="flex items-center gap-3 w-full md:w-auto">

                    {/* Search box */}
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

            {/* Grid cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((item) => (
                    <Link to={`/detail/${item.id}`} key={item.id}>
                        <div
                            key={item.id}
                            className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
                        >
                            <div className="relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute bottom-2 right-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                                    <LayoutGrid className="w-4 h-4" /> {item.count} ảnh
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold mb-3">{item.title}</h3>

                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {item.date}
                                </div>

                                <div className="flex justify-between">
                                    <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                                        <Eye className="w-4 h-4" /> Xem ảnh
                                    </button>

                                    <button className="flex items-center gap-1 px-3 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition">
                                        <ContactRound className="w-4 h-4" /> Liên hệ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
};

export default LostItems;
