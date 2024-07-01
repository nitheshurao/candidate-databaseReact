import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

import { addCandidate } from '../services/api';

const CandidateForm = (props) => {
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [codingResult, setCodingResult] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await addCandidate({
                name,
                skills,
                experience,
                location
            });
            console.log("resss", response);
            setName('');
            setSkills('');
            setExperience('');
            setLocation('');
            setCodingResult('')
            props.handleClose()
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Years of Experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Coding Result" value={codingResult} onChange={(e) => setCodingResult(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CandidateForm;
