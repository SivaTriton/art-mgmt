import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtJob = () => {
    const [artJobs, setArtJobs] = useState([]);

    useEffect(() => {
        const fetchArtJobs = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/art-jobs`);
            setArtJobs(res.data);
        };
        fetchArtJobs();
    }, []);

    const handleSelect = async (artJobId) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/select-art-job`, { artJobId }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            alert('Art job selected');
        } catch (err) {
            console.error(err);
            alert('Error selecting art job');
        }
    };

    return (
        <div>
            {artJobs.map(job => (
                <div key={job._id}>
                    <h3>{job.title}</h3>
                    <button onClick={() => handleSelect(job._id)}>Select</button>
                </div>
            ))}
        </div>
    );
};

export default ArtJob;
