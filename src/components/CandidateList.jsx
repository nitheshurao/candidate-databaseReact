import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CandidateForm from './CandidateForm';
import { deleteById } from '../services/api';
const columns = [
//   { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'skills', headerName: 'Skills', width: 200 },
  { field: 'experience', headerName: 'Experience', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
];

 function AlertDialog({id,setDataChanges}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
      <ModeEditIcon sx={{color:'#CF682F'}}/>  
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit"}
        </DialogTitle>
        <DialogContent>
         <CandidateForm id={id} setDataChanges={setDataChanges}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
const CandidateList = ({ candidates,setCurrentPage, setLimit, limit, currentPage ,totolCount ,setDataChanges}) => {
   const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

console.log("candidates++++++++++++++",candidates);
  const [selected, setSelected] = React.useState([]);
  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setCurrentPage(0);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <Paper >
    <TableContainer >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>

          <TableRow>
            {columns?.map((column) => (
              <TableCell
                key={column.field}
                align={column.headerName}
                // style={{ top: 57, minWidth: column.width }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          { candidates?.length>0&&candidates?.map((row) => {
                const isItemSelected = isSelected(row.id);

              return (
                <TableRow
                hover
                // onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                // aria-checked={isItemSelected}
                // tabIndex={-1}
                // key={row.id}
                // selected={isItemSelected}
                sx={{ cursor: 'pointer' ,border:'1px solid #43586C'}}
              >
                
                <TableCell
                  component="th"
                //   id={labelId}
                  scope="row"
                  padding="none"
                  
                >
                  {row.name}
                </TableCell>
                <TableCell align="">{row.skills}</TableCell>
                <TableCell align="">{row.experience}</TableCell>
                <TableCell  align="">{row.location}</TableCell>
                <TableCell  padding="checkbox">
                    <Box sx={{display:'flex', color:"#CF682F",}}>
                     <AlertDialog id={row._id} setDataChanges={setDataChanges}/>
                    <Button>
                </Button>  
                <Button onClick={()=>{
                    deleteById(row._id)
                    setDataChanges()
                }}>

                <DeleteIcon sx={{color:'#CF682F'}}/>
                </Button>
                    </Box>
            
                </TableCell>
              </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination

      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={totolCount}
      rowsPerPage={limit}
      page={currentPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  );
};

export default CandidateList;
