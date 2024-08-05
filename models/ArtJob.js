const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtJobSchema = new Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    completedBy: { type: Schema.Types.ObjectId, ref: 'Employee' }
});

module.exports = mongoose.model('ArtJob', ArtJobSchema);
