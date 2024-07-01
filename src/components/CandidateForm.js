import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

import { addCandidate, getCandidateByid, getCandidateupdate } from '../services/api';

const CandidateForm = (props) => {
    const { id } = props
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [codingResult, setCodingResult] = useState('')
    useEffect(() => {
        console.log("___id", id);

        async function fetchData() {
            // You can await here
            const res = await getCandidateByid(props.id)
            setName(res.data.name)
            setSkills(res.data.skills)
            setExperience(res.data.experience)
            setLocation(res.data.location)
            setCodingResult(res.data.codingResult)
        }
        fetchData();
    }, [id])
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
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("getCandidateByidgetCandidateupdate");
        try {
            const response = await getCandidateupdate({
                _id: props.id,
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
            props.setDataChanges('1')
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };


    return (
        <form onSubmit={props.id ? handleUpdate : handleSubmit}>
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
                    <Button type="submit" variant="contained" color="primary">`{id ? 'edit' : 'save'}`</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CandidateForm;
