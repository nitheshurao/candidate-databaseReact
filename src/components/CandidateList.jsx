import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead,  TableRow } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'skills', headerName: 'Skills', width: 200 },
  { field: 'experience', headerName: 'Experience', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
];

const CandidateList = ({ candidates,setCurrentPage, setLimit, limit, currentPage ,totolCount }) => {
   const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setCurrentPage(0);
  };
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
                style={{ top: 57, minWidth: column.width }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates?.map((row) => {
                console.log("column --1",row);
              return (
                <TableRow hover tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    console.log("column",column);
                    const value = row[column.field];
                    return (
                        <TableCell
                        key={column.id}
                        align={column.field}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {value}
                      </TableCell>
                    );
                  })}
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
