import React, { useState, useEffect } from 'react';
import { Card, Progress, Timeline, Tag, Button, Spin, Empty, Divider } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';

interface ComplaintStatus {
    id: string;
    title: string;
    description: string;
    status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdDate: string;
    lastUpdated: string;
    progress: number;
    timeline: TimelineEvent[];
    assignedDepartment: string;
    referenceNumber: string;
}

interface TimelineEvent {
    date: string;
    event: string;
    description: string;
    status: string;
}

const ViewComplaint: React.FC = () => {
    const { complaintId } = useParams<{ complaintId: string }>();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState<ComplaintStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaint = async () => {
            try {
                // Replace with actual API call
                // const response = await fetch(`/api/complaints/${complaintId}`);
                // const data = await response.json();
                
                // Mock data for demonstration
                const mockComplaint: ComplaintStatus = {
                    id: complaintId || '1',
                    title: 'Water Supply Issue',
                    description: 'No water supply in my locality for the past 3 days',
                    status: 'in-progress',
                    priority: 'high',
                    createdDate: '2024-01-15',
                    lastUpdated: '2024-01-17',
                    progress: 65,
                    assignedDepartment: 'Water Department',
                    referenceNumber: 'CRM-2024-001567',
                    timeline: [
                        {
                            date: '2024-01-15',
                            event: 'Complaint Submitted',
                            description: 'Your complaint has been registered',
                            status: 'completed',
                        },
                        {
                            date: '2024-01-16',
                            event: 'Under Review',
                            description: 'Complaint assigned to Water Department',
                            status: 'completed',
                        },
                        {
                            date: '2024-01-17',
                            event: 'In Progress',
                            description: 'Repair team dispatched to your location',
                            status: 'in-progress',
                        },
                        {
                            date: '2024-01-18',
                            event: 'Expected Resolution',
                            description: 'Estimated completion date',
                            status: 'pending',
                        },
                    ],
                };
                
                setComplaint(mockComplaint);
            } catch (error) {
                console.error('Error fetching complaint:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaint();
    }, [complaintId]);

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'submitted': 'blue',
            'in-progress': 'orange',
            'resolved': 'green',
            'closed': 'gray',
        };
        return colors[status] || 'blue';
    };

    const getPriorityColor = (priority: string) => {
        const colors: { [key: string]: string } = {
            'low': 'green',
            'medium': 'orange',
            'high': 'red',
        };
        return colors[priority] || 'blue';
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
    }

    if (!complaint) {
        return <Empty description="Complaint not found" />;
    }

    return (
        <div style={{ padding: '24px' }}>
            <Button 
                type="text" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate(-1)}
                style={{ marginBottom: '20px' }}
            >
                Go Back
            </Button>

            <Card style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2>{complaint.title}</h2>
                    <Tag color={getStatusColor(complaint.status)}>{complaint.status.toUpperCase()}</Tag>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                        <p><strong>Reference Number:</strong> {complaint.referenceNumber}</p>
                        <p><strong>Priority:</strong> <Tag color={getPriorityColor(complaint.priority)}>{complaint.priority.toUpperCase()}</Tag></p>
                        <p><strong>Department:</strong> {complaint.assignedDepartment}</p>
                    </div>
                    <div>
                        <p><strong>Created:</strong> {complaint.createdDate}</p>
                        <p><strong>Last Updated:</strong> {complaint.lastUpdated}</p>
                    </div>
                </div>

                <Divider />

                <h3>Description</h3>
                <p>{complaint.description}</p>
            </Card>

            <Card title="Progress Status" style={{ marginBottom: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Overall Progress: {complaint.progress}%</strong></p>
                    <Progress percent={complaint.progress} status={complaint.status === 'resolved' ? 'success' : 'active'} />
                </div>
            </Card>

            <Card title="Timeline">
                <Timeline
                    items={complaint.timeline.map((event, index) => ({
                        dot: event.status === 'completed' ? <CheckCircleOutlined style={{ fontSize: '16px', color: '#52c41a' }} /> : <ClockCircleOutlined style={{ fontSize: '16px', color: '#faad14' }} />,
                        children: (
                            <div>
                                <p><strong>{event.event}</strong></p>
                                <p>{event.date}</p>
                                <p>{event.description}</p>
                            </div>
                        ),
                    }))}
                />
            </Card>
        </div>
    );
};

export default ViewComplaint;