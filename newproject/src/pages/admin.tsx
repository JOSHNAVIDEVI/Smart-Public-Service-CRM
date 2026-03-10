import React, { useState, useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Complaint {
    id: string;
    category: 'Road' | 'Electricity' | 'Water' | 'Garbage' | 'Drainage';
    status: 'Pending' | 'In Progress' | 'Resolved';
    urgency: 'High' | 'Medium' | 'Low';
}

const generateMockComplaints = (): Complaint[] => {
    const categories: Array<'Road' | 'Electricity' | 'Water' | 'Garbage' | 'Drainage'> = ['Road', 'Electricity', 'Water', 'Garbage', 'Drainage'];
    const statuses: Array<'Pending' | 'In Progress' | 'Resolved'> = ['Pending', 'In Progress', 'Resolved'];
    const urgencies: Array<'High' | 'Medium' | 'Low'> = ['High', 'Medium', 'Low'];
    const complaints: Complaint[] = [];

    for (let i = 1; i <= 30; i++) {
        complaints.push({
            id: `CMP-${String(i).padStart(4, '0')}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
        });
    }
    return complaints;
};

const AdminDashboard: React.FC = () => {
    const [complaints] = useState<Complaint[]>(generateMockComplaints());
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Summary calculations
    const totalComplaints = complaints.length;
    const pendingCount = complaints.filter(c => c.status === 'Pending').length;
    const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
    const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

    // Category distribution
    const categoryDistribution = {
        Road: complaints.filter(c => c.category === 'Road').length,
        Electricity: complaints.filter(c => c.category === 'Electricity').length,
        Water: complaints.filter(c => c.category === 'Water').length,
        Garbage: complaints.filter(c => c.category === 'Garbage').length,
        Drainage: complaints.filter(c => c.category === 'Drainage').length,
    };

    // Status distribution
    const statusDistribution = {
        Pending: pendingCount,
        'In Progress': inProgressCount,
        Resolved: resolvedCount,
    };

    // Urgency distribution
    const urgencyDistribution = {
        High: complaints.filter(c => c.urgency === 'High').length,
        Medium: complaints.filter(c => c.urgency === 'Medium').length,
        Low: complaints.filter(c => c.urgency === 'Low').length,
    };

    const categoryChartData = {
        labels: Object.keys(categoryDistribution),
        datasets: [
            {
                data: Object.values(categoryDistribution),
                backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const statusChartData = {
        labels: Object.keys(statusDistribution),
        datasets: [
            {
                label: 'Complaints by Status',
                data: Object.values(statusDistribution),
                backgroundColor: ['#fbbf24', '#f97316', '#22c55e'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const urgencyChartData = {
        labels: Object.keys(urgencyDistribution),
        datasets: [
            {
                label: 'Complaints by Urgency',
                data: Object.values(urgencyDistribution),
                backgroundColor: ['#dc2626', '#f59e0b', '#6b7280'],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const filteredComplaints = selectedCategory
        ? complaints.filter(c => c.category === selectedCategory)
        : complaints;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard - Smart Public Service CRM</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-semibold">Total Complaints</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{totalComplaints}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-semibold">Pending</h3>
                        <p className="text-3xl font-bold text-yellow-500 mt-2">{pendingCount}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-semibold">In Progress</h3>
                        <p className="text-3xl font-bold text-orange-500 mt-2">{inProgressCount}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-600 text-sm font-semibold">Resolved</h3>
                        <p className="text-3xl font-bold text-green-500 mt-2">{resolvedCount}</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Complaints by Category</h2>
                        <Pie
                            data={categoryChartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    // legend: { position: 'bottom' as const },
                                    // onClick: (event: any) => {
                                    //     const label = event.chart.legend.labels[event.datasetIndex || 0]?.text || null;
                                    //     setSelectedCategory(label);
                                    // },
                                },
                            }}
                        />
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm"
                        >
                            Clear Filter
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Complaints by Status</h2>
                        <Bar
                            data={statusChartData}
                            options={{
                                responsive: true,
                                plugins: { legend: { display: false } },
                                scales: { y: { beginAtZero: true } },
                            }}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Complaints by Urgency</h2>
                        <Bar
                            data={urgencyChartData}
                            options={{
                                responsive: true,
                                plugins: { legend: { display: false } },
                                scales: { y: { beginAtZero: true } },
                            }}
                        />
                    </div>
                </div>

                {/* Complaint Table */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {selectedCategory ? `${selectedCategory} Complaints` : 'All Complaints'}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Complaint ID</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Urgency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredComplaints.map((complaint) => (
                                    <tr key={complaint.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 text-gray-800">{complaint.id}</td>
                                        <td className="px-4 py-3 text-gray-800">{complaint.category}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    complaint.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : complaint.status === 'In Progress'
                                                        ? 'bg-orange-100 text-orange-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}
                                            >
                                                {complaint.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    complaint.urgency === 'High'
                                                        ? 'bg-red-100 text-red-800'
                                                        : complaint.urgency === 'Medium'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {complaint.urgency}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;