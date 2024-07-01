const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: [String],
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    videoInterviewResult: { type: String },
    codingResult: { type: String }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
