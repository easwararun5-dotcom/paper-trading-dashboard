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

const holdings = [
  { symbol: 'RELIANCE', quantity: 25, averagePrice: 2824.5, currentPrice: 2896.2, pnl: 1792.5 },
  { symbol: 'TCS', quantity: 12, averagePrice: 3860.0, currentPrice: 3818.4, pnl: -499.2 },
  { symbol: 'HDFCBANK', quantity: 40, averagePrice: 1512.3, currentPrice: 1548.7, pnl: 1456.0 },
  { symbol: 'INFY', quantity: 30, averagePrice: 1468.2, currentPrice: 1491.6, pnl: 702.0 }
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
}

// ==============================|| PORTFOLIO PAGE ||============================== //

export default function PortfolioPage() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12}>
        <Typography variant="h5">Portfolio</Typography>
      </Grid>
      <Grid size={12}>
        <MainCard title="Holdings" content={false}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto', maxHeight: 520 }}>
            <Table stickyHeader aria-label="holdings table">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Average Price</TableCell>
                  <TableCell align="right">Current Price</TableCell>
                  <TableCell align="right">P&L</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((holding, index) => (
                  <TableRow
                    key={holding.symbol}
                    hover
                    sx={(theme) => ({
                      bgcolor: index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                      '&:last-child td, &:last-child th': { border: 0 }
                    })}
                  >
                    <TableCell>
                      <Stack>
                        <Typography variant="subtitle1">{holding.symbol}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          NSE Equity
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{holding.quantity}</TableCell>
                    <TableCell align="right">{formatCurrency(holding.averagePrice)}</TableCell>
                    <TableCell align="right">{formatCurrency(holding.currentPrice)}</TableCell>
                    <TableCell align="right">
                      <Chip
                      label={formatCurrency(holding.pnl)}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        minWidth: 100,
                        color:
                          holding.pnl >= 0
                            ? '#4ADE80'
                            : '#F87171',
                        backgroundColor:
                          holding.pnl >= 0
                            ? 'rgba(74, 222, 128, 0.15)'
                            : 'rgba(248, 113, 113, 0.15)',
                        border:
                          holding.pnl >= 0
                            ? '1px solid rgba(74, 222, 128, 0.3)'
                            : '1px solid rgba(248, 113, 113, 0.3)'
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
