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

const strategies = [
  { name: 'NIFTY EMA Crossover', status: 'Active', lastSignal: 'BUY 23750 CE', pnl: 2850 },
  { name: 'SENSEX RSI Reversal', status: 'Inactive', lastSignal: 'HOLD 78000 CE', pnl: -640 },
  { name: 'BANK NIFTY ORB', status: 'Active', lastSignal: 'BUY 52500 PE', pnl: 1420 },
  { name: 'NIFTY VWAP Pullback', status: 'Active', lastSignal: 'BUY 23700 CE', pnl: 930 }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

// ==============================|| STRATEGIES PAGE ||============================== //

export default function StrategiesPage() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12}>
        <Typography variant="h5">Strategies</Typography>
      </Grid>
      <Grid size={12}>
        <MainCard title="Strategy Monitor" content={false}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
            <Table aria-label="strategy monitor table">
              <TableHead>
                <TableRow>
                  <TableCell>Strategy Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Signal</TableCell>
                  <TableCell align="right">Profit/Loss</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {strategies.map((strategy) => (
                  <TableRow key={strategy.name} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{strategy.name}</TableCell>
                    <TableCell>
                      <Chip
                                label={strategy.status}
                                size="small"
                                sx={{
                                  fontWeight: 700,
                                  minWidth: 80,
                                  color:
                                    strategy.status === 'Active'
                                      ? '#4ADE80'
                                      : '#D1D5DB',
                                  backgroundColor:
                                    strategy.status === 'Active'
                                      ? 'rgba(74, 222, 128, 0.15)'
                                      : 'rgba(156, 163, 175, 0.15)',
                                  border:
                                    strategy.status === 'Active'
                                      ? '1px solid rgba(74, 222, 128, 0.3)'
                                      : '1px solid rgba(156, 163, 175, 0.3)'
                                }}
/>
                    </TableCell>
                    <TableCell>{strategy.lastSignal}</TableCell>
                    <TableCell align="right">
                      <Typography color={strategy.pnl >= 0 ? 'success.main' : 'error.main'}>{formatCurrency(strategy.pnl)}</Typography>
                    </TableCell>
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
