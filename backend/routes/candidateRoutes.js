const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// Get all candidates
router.get('/candidates', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10;
    try {
        const skip = (page - 1) * limit;
        const totalCount = await Candidate.countDocuments();
        // Fetch candidates with pagination
        console.log('Total number of candidates:', totalCount);
        const candidates = await Candidate.find()
            .skip(skip)
            .limit(limit);
        res.json({
            totalCount,
            candidates
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one candidate
router.get('/candidates/:id', getCandidate, (req, res) => {
    res.json(res.candidate);
});

// Create a candidate
router.post('/candidates', async (req, res) => {

    const candidate = new Candidate({
        name: req.body.name,
        skills: req.body.skills,
        experience: req.body.experience,
        location: req.body.location,
        videoInterviewResult: req.body.videoInterviewResult,
        codingResult: req.body.codingResult
    });

    try {
        const newCandidate = await candidate.save();
        res.status(201).json(newCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a candidate
router.patch('/candidates/:id', getCandidate, async (req, res) => {
    if (req.body.name != null) {
        res.candidate.name = req.body.name;
    }
    if (req.body.skills != null) {
        res.candidate.skills = req.body.skills;
    }
    if (req.body.experience != null) {
        res.candidate.experience = req.body.experience;
    }
    if (req.body.location != null) {
        res.candidate.location = req.body.location;
    }
    if (req.body.videoInterviewResult != null) {
        res.candidate.videoInterviewResult = req.body.videoInterviewResult;
    }
    if (req.body.codingResult != null) {
        res.candidate.codingResult = req.body.codingResult;
    }

    try {
        const updatedCandidate = await res.candidate.save();
        res.json(updatedCandidate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a candidate
router.delete('/candidates/:id', getCandidate, async (req, res) => {
    try {
        await res.candidate.remove();
        res.json({ message: 'Candidate deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get candidate by ID
async function getCandidate(req, res, next) {
    let candidate;
    try {
        candidate = await Candidate.findById(req.params.id);
        if (candidate == null) {
            return res.status(404).json({ message: 'Cannot find candidate' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.candidate = candidate;
    next();
}

module.exports = router;
