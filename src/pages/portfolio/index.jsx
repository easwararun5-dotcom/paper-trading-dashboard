// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';

const positions = [
  { contract: 'NIFTY 23750 CE', index: 'NIFTY', quantity: 50, entryPrice: 120, currentPrice: 148.5, pnl: 1425 },
  { contract: 'BANK NIFTY 52500 PE', index: 'BANK NIFTY', quantity: 30, entryPrice: 214, currentPrice: 198.4, pnl: -468 },
  { contract: 'SENSEX 78000 CE', index: 'SENSEX', quantity: 20, entryPrice: 186.5, currentPrice: 221.75, pnl: 705 }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
}

// ==============================|| POSITIONS PAGE ||============================== //

export default function PortfolioPage() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12}>
        <Stack sx={{ gap: 0.25 }}>
          <Typography variant="h5">Positions</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Active index option contracts and unrealized performance.
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <MainCard title="Open Positions" content={false}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto', maxHeight: 520 }}>
            <Table stickyHeader aria-label="index option positions table">
              <TableHead>
                <TableRow>
                  <TableCell>Contract</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Entry Price</TableCell>
                  <TableCell align="right">Current Price</TableCell>
                  <TableCell align="right">PnL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {positions.map((position, index) => (
                  <TableRow
                    key={position.contract}
                    hover
                    sx={(theme) => ({
                      bgcolor: index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                      '&:last-child td, &:last-child th': { border: 0 }
                    })}
                  >
                    <TableCell>
                      <Stack>
                        <Typography variant="subtitle1">{position.contract}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {position.index} · Weekly Options
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{position.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(position.entryPrice)}</TableCell>
                    <TableCell align="right">{formatCurrency(position.currentPrice)}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatCurrency(position.pnl)}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          minWidth: 100,
                          color: position.pnl >= 0 ? '#4ADE80' : '#F87171',
                          backgroundColor: position.pnl >= 0 ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                          border: position.pnl >= 0 ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid rgba(248, 113, 113, 0.3)'
                        }}
                      />
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
