import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const AdminDashboard = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [metrics, setMetrics] = useState({ artJobs: [], employeeProduction: [] });

    const fetchMetrics = async () => {
        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/dashboard`, {
                params: { fromDate, toDate }
            });
            setMetrics(res.data);
        } catch (err) {
            console.error(err);
            alert('Error fetching metrics');
        }
    };

    return (
        <div>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <button onClick={fetchMetrics}>Fetch Metrics</button>

            <Bar data={{
                labels: metrics.artJobs.map(job => job.title),
                datasets: [{
                    label: 'Art Pieces Created',
                    data: metrics.artJobs.map(job => job.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }} />

            <Bar data={{
                labels: metrics.employeeProduction.map(prod => prod._id),
                datasets: [{
                    label: 'Employee Production',
                    data: metrics.employeeProduction.map(prod => prod.count),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            }} />
        </div>
    );
};

export default AdminDashboard;
