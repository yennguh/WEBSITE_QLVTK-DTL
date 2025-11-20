import React from 'react';
import AdminSection from './components/AdminSection';

export default function FoundItemsList() {
    return (
        <AdminSection
            title="Danh sách đã trả"
            description="Theo dõi các vật dụng đã xác nhận trả lại cho chủ sở hữu."
        >
            <div className="rounded-lg bg-white p-6 shadow">
                <p className="text-gray-600">Danh sách sẽ hiển thị tại đây.</p>
            </div>
        </AdminSection>
    );
}

