// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

const trades = [
  { id: 'TRD-1028', symbol: 'RELIANCE', side: 'Buy', quantity: 10, price: 2890.2, timestamp: '13 Jun 2026, 09:45 AM' },
  { id: 'TRD-1027', symbol: 'TCS', side: 'Sell', quantity: 4, price: 3820.0, timestamp: '13 Jun 2026, 10:15 AM' },
  { id: 'TRD-1026', symbol: 'INFY', side: 'Buy', quantity: 15, price: 1487.5, timestamp: '12 Jun 2026, 02:35 PM' },
  { id: 'TRD-1025', symbol: 'HDFCBANK', side: 'Buy', quantity: 20, price: 1544.8, timestamp: '12 Jun 2026, 11:20 AM' }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
}

// ==============================|| TRADES PAGE ||============================== //

export default function TradesPage() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12}>
        <Typography variant="h5">Trades</Typography>
      </Grid>
      <Grid size={12}>
        <MainCard title="Trade History" content={false}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto', maxHeight: 520 }}>
            <Table stickyHeader aria-label="trade history table">
              <TableHead>
                <TableRow>
                  <TableCell>Trade ID</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Buy/Sell</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell>Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trades.map((trade, index) => (
                  <TableRow
                    key={trade.id}
                    hover
                    sx={(theme) => ({
                      bgcolor: index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                      '&:last-child td, &:last-child th': { border: 0 }
                    })}
                  >
                    <TableCell>{trade.id}</TableCell>
                    <TableCell>{trade.symbol}</TableCell>
                    <TableCell>
                      <Chip
                                label={trade.side}
                                size="small"
                                sx={{
                                  fontWeight: 700,
                                  minWidth: 70,
                                  color: trade.side === 'Buy' ? '#4ADE80' : '#F87171',
                                  backgroundColor:
                                    trade.side === 'Buy'
                                      ? 'rgba(74, 222, 128, 0.15)'
                                      : 'rgba(248, 113, 113, 0.15)',
                                  border: trade.side === 'Buy'
                                    ? '1px solid rgba(74, 222, 128, 0.3)'
                                    : '1px solid rgba(248, 113, 113, 0.3)'
                                }}
                              />
                    </TableCell>
                    <TableCell align="right">{trade.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(trade.price)}</TableCell>
                    <TableCell>{trade.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
}
