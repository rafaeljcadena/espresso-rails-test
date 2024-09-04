import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axiosClient from '../../../configs/axiosClient';
import { Typography } from '@mui/material';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import StatementArchiveModal from '../StatementArchiveModal';


const currencyFormatter = new Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' })
const dateFormatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC'});

const StatusTypography = ({ style, children, ...rest }) => {
  return (
    <Typography 
      variant='span' 
      sx={{ fontSize: '.7rem', p: '7px', borderRadius: 6, ...style }}
      {...rest}
      >
      {children}
    </Typography>
  )
}

const StatusComponent = ({ value }) => {
  switch(value) {
    case 'verified':
      return <StatusTypography style={{ background: '#4CAF50' }}>Comprovada</StatusTypography>
    case 'non_verified':
      return <StatusTypography style={{ background: '#00000014' }}>Não comprovada</StatusTypography>
    default:
      return null;
  }
}


export default function StatementsTable({ archived, emptyDataLabel, prepareArchiveModal, refreshData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRecords, setTotalRecords] = useState(0)

  const [statements, setStatements] = useState();

  const fetchColumns = () => {

    return columns;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchStatements(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchStatements = (queryPage = 1) => {
    const queryParams = []
    queryParams.push(`page=${queryPage}`);
    if (archived) queryParams.push("filter=archived")

    axiosClient.get(`/api/v1/statements.json?${queryParams.join('&')}`)
      .then((res) => {
        setStatements(res.data.statements);
        setTotalRecords(res.data.total_records)
      })
      .catch(err => {});
  }

  useEffect(() => {
    fetchStatements();
  }, [refreshData]);

  if (!statements) return <Paper sx={{ p: 2 }}>Carregando...</Paper>;

  let columns = [
    { id: 'merchant', label: 'Estabelecimento', minWidth: 170 },
    { id: 'cost', label: 'Valor', minWidth: 100, format: (value) => currencyFormatter.format(value / 100) },
    {
      id: 'performed_at',
      label: 'Data de criação',
      minWidth: 170,
      align: 'right',
      format: (value) => {
        return dateFormatter.format(Date.parse(value));
      },
    },
    {
      id: 'card_last4',
      label: 'Cartão',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'status',
      label: 'Comprovação',
      minWidth: 170,
      align: 'right',
      format: (value) => <StatusComponent value={value} />,
    },
    {
      id: 'user',
      label: 'Funcionário',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'category',
      label: 'Categoria',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 70,
      align: 'right',
    },
  ];

  if (archived) columns = columns.filter((column) => column.id !== 'actions');

  return (
    <>
      {statements.length === 0 ? (
        <Paper sx={{ p: 2 }}>{emptyDataLabel}</Paper>
      ) : (
        <>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statements
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {fetchColumns().map((column) => {
                            const value = row[column.id];
                            const type = column.id;

                            if (type === 'actions') {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <div style={{ display: 'flex' }}>
                                    <IconButton>
                                      <ArchiveOutlinedIcon
                                        onClick={() => prepareArchiveModal(row.id)}
                                      />
                                    </IconButton>
                                    <IconButton>
                                      <RemoveRedEyeIcon />
                                    </IconButton>
                                  </div>
                                </TableCell>
                              );
                            }

                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format ? column.format(value) : value}
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
              rowsPerPageOptions={[10]}
              component="div"
              count={totalRecords}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </>
  );
}
