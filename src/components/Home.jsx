import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import { getAllCandidates } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [totalCount,setTotalCount]= React.useState(0)
  const [candidates, setCandidates] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [limit,setLimit] = React.useState(10);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();


  function handleClick() {
    navigate("/Chart");
  }

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCandidates({currentPage:currentPage,limit:limit});

      console.log("dataaaa",data);
      setCandidates(data.data.candidates);
      setTotalCount(data.data.totalCount)
    };
    fetchData();
  }, [open,currentPage, limit]);
  return (
    <React.Fragment>
         <Button onClick={() => { handleClick() }}>Chart</Button>
      <Button variant="outlined" onClick={handleClickOpen}>
      Create 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Create Candidate
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CandidateForm handleClose={handleClose}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>

      <CandidateList candidates={candidates} setLimit={setLimit} totolCount ={totalCount} limit={limit} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </React.Fragment>
  );
}