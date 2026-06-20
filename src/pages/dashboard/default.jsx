import { useState } from 'react';

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
import { withAlpha } from 'utils/colorUtils';

const indexOptionsData = {
  nifty: {
    label: 'NIFTY',
    subtitle: 'NIFTY 50 · Weekly index options',
    chart: {
      labels: ['09:20', '10:00', '10:40', '11:20', '12:00', '12:40', '13:20', '14:00', '14:40', '15:20'],
      spot: [23580, 23605, 23572, 23618, 23642, 23626, 23684, 23710, 23692, 23736],
      ema20: [23552, 23568, 23578, 23594, 23610, 23620, 23642, 23661, 23676, 23696],
      ema50: [23518, 23532, 23545, 23560, 23576, 23591, 23606, 23622, 23638, 23655],
      vwap: [23566, 23578, 23584, 23598, 23612, 23622, 23639, 23655, 23669, 23684]
    },
    metrics: {
      spotPrice: '23,736.20',
      atmStrike: '23,750 CE/PE',
      pcr: '1.08',
      maxPain: '23,700',
      delta: '0.58',
      gamma: '0.012',
      theta: '-8.40',
      vega: '14.20',
      iv: '12.8%',
      oiChange: '+8.4L contracts',
      dayTrend: 'Bullish'
    }
  },
  banknifty: {
    label: 'BANK NIFTY',
    subtitle: 'BANK NIFTY · Weekly index options',
    chart: {
      labels: ['09:20', '10:00', '10:40', '11:20', '12:00', '12:40', '13:20', '14:00', '14:40', '15:20'],
      spot: [51210, 51168, 51272, 51334, 51296, 51420, 51382, 51476, 51522, 51488],
      ema20: [51190, 51202, 51222, 51251, 51275, 51308, 51330, 51362, 51396, 51420],
      ema50: [51142, 51158, 51176, 51198, 51220, 51245, 51270, 51294, 51320, 51347],
      vwap: [51206, 51204, 51228, 51258, 51281, 51309, 51332, 51364, 51400, 51430]
    },
    metrics: {
      spotPrice: '51,488.35',
      atmStrike: '51,500 CE/PE',
      pcr: '0.94',
      maxPain: '51,400',
      delta: '0.47',
      gamma: '0.008',
      theta: '-12.10',
      vega: '21.60',
      iv: '15.6%',
      oiChange: '-2.1L contracts',
      dayTrend: 'Rangebound'
    }
  },
  sensex: {
    label: 'SENSEX',
    subtitle: 'SENSEX · Weekly index options',
    chart: {
      labels: ['09:20', '10:00', '10:40', '11:20', '12:00', '12:40', '13:20', '14:00', '14:40', '15:20'],
      spot: [77840, 77912, 77866, 77794, 77820, 77742, 77696, 77728, 77654, 77618],
      ema20: [77882, 77876, 77861, 77839, 77818, 77796, 77770, 77750, 77725, 77698],
      ema50: [77910, 77896, 77882, 77866, 77850, 77831, 77812, 77794, 77774, 77755],
      vwap: [77856, 77868, 77858, 77836, 77822, 77800, 77778, 77760, 77738, 77716]
    },
    metrics: {
      spotPrice: '77,618.10',
      atmStrike: '77,600 CE/PE',
      pcr: '0.88',
      maxPain: '77,800',
      delta: '-0.42',
      gamma: '0.006',
      theta: '-10.80',
      vega: '18.30',
      iv: '13.9%',
      oiChange: '+1.7L contracts',
      dayTrend: 'Bearish'
    }
  }
};

const portfolioRows = [
  { symbol: 'NIFTY 23750 CE', qty: 50, avg: '120.00', ltp: '148.50', pnl: 1425.0 },
  { symbol: 'BANK NIFTY 52500 PE', qty: 30, avg: '214.00', ltp: '198.40', pnl: -468.0 },
  { symbol: 'SENSEX 78000 CE', qty: 20, avg: '186.50', ltp: '221.75', pnl: 705.0 }
];

const recentSignals = [
  { time: '09:30', index: 'NIFTY', signal: 'BUY CE', confidence: '82%', status: 'Active' },
  { time: '10:15', index: 'BANK NIFTY', signal: 'HOLD', confidence: '65%', status: 'Closed' },
  { time: '11:20', index: 'SENSEX', signal: 'BUY PE', confidence: '74%', status: 'Active' }
];

const aiSignalReasons = ['Price above VWAP', 'EMA20 above EMA50', 'PCR supports bullish move', 'Positive OI buildup'];

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
  const isNeutral = color.startsWith('text.');
  const successColor = '#38cd70';
  const errorColor = '#ff6b6b';

  return (
    <Stack 
      direction="row" 
      sx={(theme) => {
        const activeColor = isSuccess ? successColor : isError ? errorColor : theme.vars.palette.divider;
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
          const activeColor = isSuccess ? successColor : isError ? errorColor : isNeutral ? theme.vars.palette.text.primary : theme.vars.palette[color.split('.')[0]]?.main || color;
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

function RecentSignalsTable() {
  return (
    <TableContainer sx={{ maxHeight: 280 }}>
      <Table stickyHeader size="small" aria-label="recent signals table">
        <TableHead>
          <TableRow>
            {['Time', 'Index', 'Signal', 'Confidence', 'Status'].map((label) => (
              <TableCell
                key={label}
                align={label === 'Confidence' ? 'right' : 'left'}
                sx={{ py: 1, px: 1.5, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'text.secondary' }}
              >
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {recentSignals.map((row, index) => (
            <TableRow
              key={`${row.time}-${row.index}`}
              hover
              sx={(theme) => ({
                bgcolor: index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                '&:last-child td, &:last-child th': { border: 0 }
              })}
            >
              <TableCell sx={{ py: 0.85, px: 1.5, ...monoSX }}>{row.time}</TableCell>
              <TableCell sx={{ py: 0.85, px: 1.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{row.index}</Typography>
              </TableCell>
              <TableCell sx={{ py: 0.85, px: 1.5 }}>
                <Chip
                  size="small"
                  label={row.signal}
                  sx={(theme) => {
                    const isBullish = row.signal === 'BUY CE';
                    const isBearish = row.signal === 'BUY PE';
                    const activeColor = isBullish ? '#38cd70' : isBearish ? '#ff6b6b' : theme.vars.palette.text.secondary;
                    return {
                      height: 22,
                      borderRadius: '4px',
                      bgcolor: withAlpha(activeColor, 0.12),
                      border: '1px solid',
                      borderColor: withAlpha(activeColor, 0.32),
                      color: activeColor,
                      fontWeight: 800,
                      fontSize: '0.6875rem'
                    };
                  }}
                />
              </TableCell>
              <TableCell align="right" sx={{ py: 0.85, px: 1.5, ...monoSX, fontWeight: 700 }}>
                {row.confidence}
              </TableCell>
              <TableCell sx={{ py: 0.85, px: 1.5 }}>
                <Typography sx={{ color: row.status === 'Active' ? '#38cd70' : 'text.secondary', fontWeight: 700, fontSize: '0.75rem' }}>
                  {row.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AiSignalCard() {
  return (
    <MainCard contentSX={{ p: 1.5, pb: '12px !important' }}>
      <Stack sx={{ gap: 1.5 }}>
        <SectionTitle title="AI Trading Signal" subtitle="ML-assisted read on current options setup" />
        <Box
          sx={(theme) => ({
            p: 1.25,
            borderRadius: '4px',
            bgcolor: withAlpha('#38cd70', 0.08),
            border: '1px solid',
            borderColor: withAlpha('#38cd70', 0.28)
          })}
        >
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
            <Stack sx={{ gap: 0.25 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Signal
              </Typography>
              <Typography sx={{ color: '#38cd70', fontSize: '1.25rem', fontWeight: 800, letterSpacing: 0 }}>
                BUY CE
              </Typography>
            </Stack>
            <Stack sx={{ alignItems: 'flex-end', gap: 0.25 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>
                Confidence
              </Typography>
              <Typography sx={{ color: '#38cd70', fontFamily: monospaceFont, fontSize: '1.5rem', fontWeight: 900 }}>
                82%
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <InfoRow label="Market Bias" value="Bullish" color="success.main" highlight />
        <Stack sx={{ gap: 0.75 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' }}>
            Reasons
          </Typography>
          {aiSignalReasons.map((reason) => (
            <Stack key={reason} direction="row" sx={{ alignItems: 'center', gap: 0.75 }}>
              <Typography sx={{ color: '#38cd70', fontSize: '0.8125rem', fontWeight: 900 }}>✓</Typography>
              <Typography sx={{ color: 'text.primary', fontSize: '0.75rem', fontWeight: 500 }}>{reason}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </MainCard>
  );
}

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [selectedIndex, setSelectedIndex] = useState('nifty');
  const selectedOptions = indexOptionsData[selectedIndex];

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
        <SectionTitle title="AI Index Options Platform" subtitle="ML-assisted workspace for index options analysis, signals, and position monitoring." />
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
          <AnalyticEcommerce title="Active Position" count="NIFTY 23750 CE" extra="Quantity 50 · Entry ₹120" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AnalyticEcommerce title="Latest AI Signal" count="BUY CE" percentage={82} color="success" extra="Confidence 82%" />
        </Grid>
      </Grid>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <UniqueVisitorCard selectedIndex={selectedIndex} onIndexChange={setSelectedIndex} indexOptions={indexOptionsData} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack sx={{ gap: 1.5, height: '100%' }}>
            <MainCard contentSX={{ p: 1.5, pb: '12px !important' }}>
              <Stack sx={{ gap: 1.5 }}>
                <SectionTitle title="Options Snapshot" subtitle={selectedOptions.subtitle} />
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                  <InfoRow label="Spot Price" value={selectedOptions.metrics.spotPrice} highlight />
                  <InfoRow label="ATM Strike" value={selectedOptions.metrics.atmStrike} />
                  <InfoRow label="Put Call Ratio (PCR)" value={selectedOptions.metrics.pcr} />
                  <InfoRow label="Max Pain" value={selectedOptions.metrics.maxPain} />
                  <InfoRow label="Delta" value={selectedOptions.metrics.delta} />
                  <InfoRow label="Gamma" value={selectedOptions.metrics.gamma} />
                  <InfoRow label="Theta" value={selectedOptions.metrics.theta} />
                  <InfoRow label="Vega" value={selectedOptions.metrics.vega} />
                </Box>
              </Stack>
            </MainCard>

            <MainCard contentSX={{ p: 1.5, pb: '12px !important' }}>
              <Stack sx={{ gap: 1.5 }}>
                <SectionTitle title="Options Breadth" subtitle="Derived from mock option-chain data" />
                <Stack sx={{ gap: 1 }}>
                  <InfoRow label="Implied Volatility (IV)" value={selectedOptions.metrics.iv} />
                  <InfoRow label="Open Interest Change" value={selectedOptions.metrics.oiChange} />
                  <InfoRow
                    label="Day Trend"
                    value={selectedOptions.metrics.dayTrend}
                    color={
                      selectedOptions.metrics.dayTrend === 'Bullish'
                        ? 'success.main'
                        : selectedOptions.metrics.dayTrend === 'Bearish'
                          ? 'error.main'
                          : 'text.primary'
                    }
                    highlight={selectedOptions.metrics.dayTrend !== 'Rangebound'}
                  />
                </Stack>
              </Stack>
            </MainCard>

            <AiSignalCard />
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack sx={{ gap: 1 }}>
            <SectionTitle title="Recent Signals" subtitle="Latest ML-assisted options signals" />
            <MainCard content={false}>
              <RecentSignalsTable />
            </MainCard>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack sx={{ gap: 1 }}>
            <SectionTitle title="Position Summary" subtitle="Open index option exposure" />
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
