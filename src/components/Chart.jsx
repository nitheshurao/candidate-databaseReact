import React, { useState } from 'react';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllCandidates } from '../services/api';
import { BarCharts } from './BarCharts';

const App = () => {
    const [mydata, setMydata] = useState([])
    const navigate = useNavigate();
    let skillsCount = {};
    function handleClick() {
        navigate("/");
    }



    React.useEffect(() => {
        const fetchData = async () => {
            const res = await getAllCandidates({ currentPage: '', limit: '' });
            const allSkills = res.data.candidates.reduce((acc, candidate) => {
                return acc.concat(candidate.skills);
            }, []);

            const skillCounts = allSkills.reduce((acc, skill) => {
                if (acc[skill]) {
                    acc[skill]++;
                } else {
                    acc[skill] = 1;
                }
                return acc;
            }, {});
            const transformedData = Object.keys(skillCounts).map(skill => ({
                label: skill,
                value: skillCounts[skill],
            }));
            setMydata(transformedData)



        };
        fetchData();
    }, []);
    return (
        <Card>
            <Button onClick={() => { handleClick() }}>"back"</Button>
            <h1>Bar Chart Example with D3.js in React</h1>
            {/* <Chartd3 data={data} />
       */}
            <BarCharts  data={mydata} />
        </Card>
    );
};

export default App;
