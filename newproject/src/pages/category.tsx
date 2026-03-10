import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Complaint {
    id: string;
    title: string;
    description: string;
    location: string;
    status: 'Pending' | 'In Progress' | 'Resolved';
    urgency: 'High' | 'Medium' | 'Low';
}

const urgencyOrder = { High: 0, Medium: 1, Low: 2 };

export default function Category() {
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your actual API call
        const fetchComplaints = async () => {
            try {
                // Example: const response = await fetch(`/api/complaints?category=${categoryName}`);
                // const data = await response.json();
                
                // Mock data for demonstration
                const mockData: Complaint[] = [
                    {
                        id: '1',
                        title: 'Pothole on Main Street',
                        description: 'Large pothole affecting traffic',
                        location: 'Main Street, Downtown',
                        status: 'In Progress',
                        urgency: 'High',
                    },
                    {
                        id: '2',
                        title: 'Street Light Not Working',
                        description: 'Street light at intersection is broken',
                        location: 'Oak Avenue, Zone 5',
                        status: 'Pending',
                        urgency: 'Medium',
                    },
                ];

                const filtered = mockData.filter(c => c.id);
                const sorted = filtered.sort(
                    (a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
                );
                setComplaints(sorted);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, [categoryName]);

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <button
                onClick={() => navigate('/admin')}
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {categoryName} Complaints
            </h1>

            {complaints.length === 0 ? (
                <div className="text-center p-8 bg-white rounded shadow">
                    <p className="text-gray-600">No complaints found for this category.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 text-left font-semibold">ID</th>
                                <th className="p-3 text-left font-semibold">Title</th>
                                <th className="p-3 text-left font-semibold">Description</th>
                                <th className="p-3 text-left font-semibold">Location</th>
                                <th className="p-3 text-left font-semibold">Status</th>
                                <th className="p-3 text-left font-semibold">Urgency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{complaint.id}</td>
                                    <td className="p-3 font-medium">{complaint.title}</td>
                                    <td className="p-3 text-sm text-gray-600">{complaint.description}</td>
                                    <td className="p-3">{complaint.location}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded text-sm font-semibold ${
                                                complaint.status === 'Resolved'
                                                    ? 'bg-green-200 text-green-800'
                                                    : complaint.status === 'In Progress'
                                                    ? 'bg-yellow-200 text-yellow-800'
                                                    : 'bg-red-200 text-red-800'
                                            }`}
                                        >
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded text-sm font-semibold ${
                                                complaint.urgency === 'High'
                                                    ? 'bg-red-200 text-red-800'
                                                    : complaint.urgency === 'Medium'
                                                    ? 'bg-orange-200 text-orange-800'
                                                    : 'bg-blue-200 text-blue-800'
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
            )}
        </div>
    );
}