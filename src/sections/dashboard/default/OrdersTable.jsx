import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';
import { withAlpha } from 'utils/colorUtils';

function createData(tradeId, symbol, side, quantity, status, price) {
  return { tradeId, symbol, side, quantity, status, price };
}

const rows = [
  createData('SIG-1028', 'NIFTY 23750 CE', 'Buy', 50, 1, 148.5),
  createData('SIG-1027', 'BANK NIFTY 52500 PE', 'Sell', 30, 1, 198.4),
  createData('SIG-1026', 'SENSEX 78000 CE', 'Buy', 20, 0, 221.75),
  createData('SIG-1025', 'NIFTY 23700 PE', 'Buy', 50, 1, 96.2),
  createData('SIG-1024', 'BANK NIFTY 52000 CE', 'Sell', 30, 2, 174.8),
  createData('SIG-1023', 'SENSEX 77600 PE', 'Buy', 20, 1, 163.75)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = [...array.map((el, index) => [el, index])];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'tradeId',
    align: 'left',
    disablePadding: false,
    label: 'Trade ID'
  },
  {
    id: 'symbol',
    align: 'left',
    disablePadding: true,
    label: 'Symbol'
  },
  {
    id: 'quantity',
    align: 'right',
    disablePadding: false,
    label: 'Quantity'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    label: 'Price'
  }
];

const monoSX = { fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace", fontSize: '0.75rem' };

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ py: 1, px: 1.5, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Open';
      break;
    case 1:
      color = 'success';
      title = 'Filled';
      break;
    case 2:
      color = 'error';
      title = 'Exited';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" sx={{ gap: 0.75, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'tradeId';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          maxHeight: 280,
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table stickyHeader size="small" aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={(theme) => {
                    const successColor = '#38cd70';
                    const errorColor = '#ff6b6b';
                    return {
                      bgcolor: index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                      borderLeft: '4px solid',
                      borderLeftColor: row.side === 'Buy' ? successColor : errorColor,
                      '&:last-child td, &:last-child th': { border: 0 }
                    };
                  }}
                  tabIndex={-1}
                  key={row.tradeId}
                >
                  <TableCell component="th" id={labelId} scope="row" sx={{ py: 0.75, px: 1.5 }}>
                    <Typography sx={{ color: 'secondary.main', ...monoSX, fontWeight: 500 }}>{row.tradeId}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 0.75, px: 1.5 }}>
                    <Stack direction="row" sx={{ gap: 1.25, alignItems: 'center' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.75rem' }}>{row.symbol}</Typography>
                      <Box
                        sx={(theme) => {
                          const successColor = '#38cd70';
                          const errorColor = '#ff6b6b';
                          const activeColor = row.side === 'Buy' ? successColor : errorColor;
                          return {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: 1.25,
                            py: 0.25,
                            height: '22px',
                            borderRadius: '4px',
                            bgcolor: withAlpha(activeColor, 0.12),
                            border: '1px solid',
                            borderColor: withAlpha(activeColor, 0.35),
                            color: activeColor
                          };
                        }}
                      >
                        <Typography sx={{ fontWeight: 800, fontSize: '0.6875rem', color: 'inherit', letterSpacing: '0.5px' }}>
                          {row.side.toUpperCase()}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell align="right" sx={{ py: 0.75, px: 1.5, ...monoSX }}>{row.quantity}</TableCell>
                  <TableCell sx={{ py: 0.75, px: 1.5 }}>
                    <OrderStatus status={row.status} />
                  </TableCell>
                  <TableCell align="right" sx={{ py: 0.75, px: 1.5, ...monoSX }}>
                    <NumericFormat value={row.price} displayType="text" thousandSeparator prefix="INR " decimalScale={2} fixedDecimalScale />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
