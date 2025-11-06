import { useState } from "react";
import { Search, Package, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
    const [search, setSearch] = useState("");

    const items = [
        { id: 1, name: "Balo màu đen", location: "Thư viện A", date: "2025-11-03", status: "Chưa nhận" },
        { id: 2, name: "Điện thoại iPhone 12", location: "Căn tin", date: "2025-11-02", status: "Đã nhận" },
        { id: 3, name: "Thẻ sinh viên", location: "Giảng đường B2", date: "2025-11-01", status: "Đang xử lý" },
    ];

    const filtered = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm đồ thất lạc..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
                    <Package className="text-blue-500" size={30} />
                    <div>
                        <p className="text-gray-500 text-sm">Tổng số đồ thất lạc</p>
                        <p className="text-xl font-bold">128</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={30} />
                    <div>
                        <p className="text-gray-500 text-sm">Đã nhận lại</p>
                        <p className="text-xl font-bold">67</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
                    <Clock className="text-yellow-500" size={30} />
                    <div>
                        <p className="text-gray-500 text-sm">Đang xử lý</p>
                        <p className="text-xl font-bold">12</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
                    <Package className="text-purple-500" size={30} />
                    <div>
                        <p className="text-gray-500 text-sm">Đồ mới thêm hôm nay</p>
                        <p className="text-xl font-bold">5</p>
                    </div>
                </div>
            </div>

            {/* Recent items */}
            <div className="bg-white rounded-xl shadow p-4">
                <h2 className="text-lg font-semibold mb-3">Đồ thất lạc gần đây</h2>
                <table className="w-full text-sm text-left border-t">
                    <thead className="text-gray-600 border-b">
                        <tr>
                            <th className="py-2">Tên đồ</th>
                            <th className="py-2">Vị trí</th>
                            <th className="py-2">Ngày</th>
                            <th className="py-2">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((item) => (
                            <tr key={item.id} className="border-b last:border-none">
                                <td className="py-2">{item.name}</td>
                                <td>{item.location}</td>
                                <td>{item.date}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Đã nhận"
                                            ? "bg-green-100 text-green-700"
                                            : item.status === "Đang xử lý"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
