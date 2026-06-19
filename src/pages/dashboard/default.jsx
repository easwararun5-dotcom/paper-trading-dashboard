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
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import { withAlpha } from 'utils/colorUtils';

const portfolioRows = [
  { symbol: 'RELIANCE', qty: 25, avg: '2,824.50', ltp: '2,896.20', pnl: 1792.5 },
  { symbol: 'TCS', qty: 12, avg: '3,860.00', ltp: '3,818.40', pnl: -499.2 },
  { symbol: 'HDFCBANK', qty: 40, avg: '1,512.30', ltp: '1,548.70', pnl: 1456.0 },
  { symbol: 'INFY', qty: 30, avg: '1,468.20', ltp: '1,491.60', pnl: 702.0 }
];

const monospaceFont = "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace";
const monoSX = { fontFamily: monospaceFont, fontSize: '0.75rem' };

function formatPnl(value) {
  return `${value >= 0 ? '+' : '-'}${Math.abs(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function SectionTitle({ title, subtitle }) {
  return (
    <Stack sx={{ gap: 0.25 }}>
      <Typography variant="h5" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>{title}</Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}

function InfoRow({ label, value, color = 'text.primary', highlight = false }) {
  const isNumeric = /[0-9%]/.test(value) || value.includes('INR');
  const isSuccess = color === 'success.main' || color === 'success';
  const isError = color === 'error.main' || color === 'error';
  const successColor = '#38cd70';
  const errorColor = '#ff6b6b';

  return (
    <Stack 
      direction="row" 
      sx={(theme) => {
        const activeColor = isSuccess ? successColor : (isError ? errorColor : (theme.vars.palette[color.split('.')[0]]?.main || theme.vars.palette.primary.main));
        return {
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: 1,
          px: highlight ? 1 : 0.5,
          py: highlight ? 0.75 : 0.5,
          borderRadius: '4px',
          bgcolor: highlight ? withAlpha(activeColor, 0.08) : 'transparent',
          border: highlight ? '1px solid' : 'none',
          borderColor: highlight ? withAlpha(activeColor, 0.3) : 'transparent'
        };
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: highlight ? 600 : 400 }}>
        {label}
      </Typography>
      <Typography 
        variant="subtitle1" 
        sx={(theme) => {
          const activeColor = isSuccess ? successColor : (isError ? errorColor : theme.vars.palette[color.split('.')[0]]?.main || color);
          return {
            color: activeColor, 
            fontWeight: 700, 
            fontSize: highlight ? '0.875rem' : '0.75rem', 
            fontFamily: isNumeric ? monospaceFont : 'inherit' 
          };
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  // Compute portfolio stats dynamically
  const totalInvested = portfolioRows.reduce((acc, row) => acc + row.qty * parseFloat(row.avg.replace(/,/g, '')), 0);
  const totalPnl = portfolioRows.reduce((acc, row) => acc + row.pnl, 0);
  const currentValue = totalInvested + totalPnl;
  const pnlPercent = (totalPnl / totalInvested) * 100;

  const formattedInvested = `INR ${totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  const formattedCurrent = `INR ${currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  const formattedTotalPnl = `${totalPnl >= 0 ? '+' : '-'}${Math.abs(totalPnl).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${totalPnl >= 0 ? '+' : '-'}${Math.abs(pnlPercent).toFixed(2)}%)`;

  return (
    <Stack sx={{ gap: 2 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
        <SectionTitle title="Paper Trading Dashboard" subtitle="Live-style mock workspace for monitoring positions, signals, and trade execution." />
        <Chip 
          label="Paper Mode" 
          size="small" 
          sx={(theme) => ({ 
            bgcolor: withAlpha(theme.vars.palette.warning.main, 0.1), 
            color: 'warning.main', 
            fontWeight: 600, 
            border: '1px solid', 
            borderColor: withAlpha(theme.vars.palette.warning.main, 0.2), 
            borderRadius: '4px',
            fontSize: '0.6875rem'
          })} 
        />
      </Stack>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="Account Balance" count="INR 100,000" extra="Available margin INR 82,450" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="Current P&L" count="+INR 2,350" percentage={2.35} color="success" extra="Today +INR 780" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="Open Position" count="RELIANCE x 25" extra="Avg INR 2,824.50" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="Last Signal" count="BUY INFY" percentage={68} color="success" extra="EMA crossover, 11:05 AM" />
        </Grid>
      </Grid>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <UniqueVisitorCard />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack sx={{ gap: 1.5, height: '100%' }}>
            <MainCard contentSX={{ p: 1.5, pb: '12px !important' }}>
              <Stack sx={{ gap: 1.5 }}>
                <SectionTitle title="Current Position" subtitle="RELIANCE · NSE Equity" />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <InfoRow label="Quantity" value="25" />
                  <InfoRow label="Avg Price" value="INR 2,824.50" />
                  <InfoRow label="LTP" value="INR 2,896.20" color="primary.main" highlight />
                  <InfoRow label="Unrealized" value="+INR 1,792.50" color="success.main" highlight />
                </Box>
              </Stack>
            </MainCard>

            <MainCard contentSX={{ p: 1.5, pb: '12px !important' }}>
              <Stack sx={{ gap: 1.5 }}>
                <SectionTitle title="Active Strategy" subtitle="EMA Crossover · 5 minute candles" />
                <Stack sx={{ gap: 1 }}>
                  <InfoRow label="Status" value="Active" color="success.main" highlight />
                  <InfoRow label="Last Signal" value="BUY RELIANCE" color="success.main" highlight />
                  <InfoRow label="Win Rate" value="64%" color="primary.main" highlight />
                  <InfoRow label="Risk / Trade" value="1.5%" />
                </Stack>
              </Stack>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack sx={{ gap: 1 }}>
            <SectionTitle title="Trade History" subtitle="Most recent paper orders and fills" />
            <MainCard content={false}>
              <OrdersTable />
            </MainCard>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack sx={{ gap: 1 }}>
            <SectionTitle title="Portfolio Summary" subtitle="Top holdings by active exposure" />
            <MainCard content={false}>
              {/* Dynamic portfolio summaries card header */}
              <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: (theme) => withAlpha(theme.vars.palette.action.hover, 0.5) }}>
                <Grid container spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Grid size={4}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 600, display: 'block' }}>Invested</Typography>
                    <Typography variant="subtitle2" sx={{ ...monoSX, fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', mt: 0.25 }}>{formattedInvested}</Typography>
                  </Grid>
                  <Grid size={4}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 600, display: 'block' }}>Current Value</Typography>
                    <Typography variant="subtitle2" sx={{ ...monoSX, fontSize: '0.875rem', fontWeight: 600, color: 'text.primary', mt: 0.25 }}>{formattedCurrent}</Typography>
                  </Grid>
                  <Grid size={4}>
                    <Box 
                      sx={(theme) => {
                        const successColor = '#38cd70';
                        const errorColor = '#ff6b6b';
                        const activeColor = totalPnl >= 0 ? successColor : errorColor;
                        return { 
                          p: 1, 
                          borderRadius: '4px', 
                          bgcolor: withAlpha(activeColor, 0.08), 
                          border: '1px solid', 
                          borderColor: withAlpha(activeColor, 0.3),
                          textAlign: 'right'
                        };
                      }}
                    >
                      <Typography variant="caption" sx={{ color: totalPnl >= 0 ? '#38cd70' : '#ff6b6b', textTransform: 'uppercase', fontSize: '0.625rem', fontWeight: 800, display: 'block' }}>Total P&L</Typography>
                      <Typography variant="h4" sx={{ ...monoSX, fontSize: '1.25rem', fontWeight: 800, mt: 0.25, color: totalPnl >= 0 ? '#38cd70' : '#ff6b6b' }}>
                        {formattedTotalPnl}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <TableContainer sx={{ maxHeight: 222 }}>
                <Table stickyHeader size="small" aria-label="portfolio summary table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ py: 0.75, px: 1.5, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}>Symbol</TableCell>
                      <TableCell align="right" sx={{ py: 0.75, px: 1.5, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}>Qty</TableCell>
                      <TableCell align="right" sx={{ py: 0.75, px: 1.5, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}>LTP</TableCell>
                      <TableCell align="right" sx={{ py: 0.75, px: 1.5, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}>P&L</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolioRows.map((row) => (
                      <TableRow key={row.symbol} hover>
                        <TableCell sx={{ py: 0.5, px: 1.5 }}>
                          <Stack sx={{ gap: 0 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '0.75rem' }}>{row.symbol}</Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: monospaceFont, fontSize: '0.6875rem' }}>
                              Avg {row.avg}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 0.5, px: 1.5, ...monoSX }}>{row.qty}</TableCell>
                        <TableCell align="right" sx={{ py: 0.5, px: 1.5, ...monoSX }}>INR {row.ltp}</TableCell>
                        <TableCell align="right" sx={{ py: 0.5, px: 1.5 }}>
                          <Box 
                            sx={(theme) => {
                              const successColor = '#38cd70';
                              const errorColor = '#ff6b6b';
                              const activeColor = row.pnl >= 0 ? successColor : errorColor;
                              return {
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                py: 0.5,
                                px: 1.25,
                                borderRadius: '4px',
                                bgcolor: withAlpha(activeColor, 0.1),
                                border: '1px solid',
                                borderColor: withAlpha(activeColor, 0.3),
                                minWidth: '95px'
                              };
                            }}
                          >
                            <Typography sx={{ ...monoSX, fontWeight: 800, fontSize: '0.8125rem', color: row.pnl >= 0 ? '#38cd70' : '#ff6b6b' }}>
                              {formatPnl(row.pnl)}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MainCard>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
