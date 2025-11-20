import React from 'react';
import AdminSection from './components/AdminSection';

export default function AdminProfile() {
    return (
        <AdminSection
            title="Thông tin cá nhân"
            description="Quản trị viên có thể cập nhật hồ sơ và liên hệ."
        >
            <div className="rounded-lg bg-white p-6 shadow">
                <p className="text-gray-600">Biểu mẫu hồ sơ sẽ xuất hiện trong khu vực này.</p>
            </div>
        </AdminSection>
    );
}

