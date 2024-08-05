const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
    artJobs: [{ type: Schema.Types.ObjectId, ref: 'ArtJob' }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
