const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const ArtJob = require('../models/ArtJob');

// Approve employee
router.post('/approve', async (req, res) => {
    const { employeeId } = req.body;
    try {
        let employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        employee.isApproved = true;
        await employee.save();

        res.send('Employee approved');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create art job
router.post('/create-art-job', async (req, res) => {
    const { title, duration } = req.body;
    try {
        const artJob = new ArtJob({ title, duration });
        await artJob.save();

        res.send('Art job created');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Dashboard metrics
router.get('/dashboard', async (req, res) => {
    const { fromDate, toDate } = req.query;
    try {
        const artJobs = await ArtJob.find({
            completedAt: { $gte: new Date(fromDate), $lte: new Date(toDate) }
        });

        const employeeProduction = await ArtJob.aggregate([
            { $match: { completedAt: { $gte: new Date(fromDate), $lte: new Date(toDate) } } },
            { $group: { _id: '$completedBy', count: { $sum: 1 } } }
        ]);

        res.json({ artJobs, employeeProduction });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
