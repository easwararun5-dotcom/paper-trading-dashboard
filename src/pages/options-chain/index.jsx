import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { withAlpha } from 'utils/colorUtils';

const successColor = '#38cd70';
const errorColor = '#ff6b6b';
const monoFont = "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace";

const indexData = {
  nifty: {
    label: 'NIFTY',
    summary: { spot: '23,736.20', atm: '23,750', pcr: '1.08', maxPain: '23,700', iv: '12.8%' },
    features: { pcr: '1.08 Bullish', oiBuildup: 'Call unwinding + Put writing', volumeSpike: '1.7x near ATM', ivTrend: 'Stable to rising', deltaBias: 'Positive CE skew' },
    chain: [
      { strike: 23550, ceOi: '18.4L', ceOiChg: '-1.2L', ceVolume: '42.8K', ceLtp: '214.50', peLtp: '31.20', peVolume: '28.1K', peOiChg: '+2.8L', peOi: '25.6L' },
      { strike: 23600, ceOi: '22.1L', ceOiChg: '-0.8L', ceVolume: '51.2K', ceLtp: '173.80', peLtp: '42.65', peVolume: '34.6K', peOiChg: '+3.1L', peOi: '31.4L' },
      { strike: 23650, ceOi: '26.7L', ceOiChg: '+0.4L', ceVolume: '60.5K', ceLtp: '131.40', peLtp: '58.90', peVolume: '46.2K', peOiChg: '+4.2L', peOi: '36.8L' },
      { strike: 23700, ceOi: '34.8L', ceOiChg: '+1.1L', ceVolume: '74.9K', ceLtp: '92.35', peLtp: '82.70', peVolume: '63.3K', peOiChg: '+5.4L', peOi: '42.9L' },
      { strike: 23750, ceOi: '41.2L', ceOiChg: '+2.6L', ceVolume: '96.4K', ceLtp: '58.10', peLtp: '112.80', peVolume: '88.7K', peOiChg: '+6.8L', peOi: '45.1L', atm: true },
      { strike: 23800, ceOi: '48.6L', ceOiChg: '+4.9L', ceVolume: '91.8K', ceLtp: '34.75', peLtp: '149.30', peVolume: '72.5K', peOiChg: '+3.6L', peOi: '37.7L' },
      { strike: 23850, ceOi: '35.5L', ceOiChg: '+3.7L', ceVolume: '62.9K', ceLtp: '20.15', peLtp: '190.40', peVolume: '38.4K', peOiChg: '+1.2L', peOi: '27.2L' }
    ]
  },
  banknifty: {
    label: 'BANK NIFTY',
    summary: { spot: '51,488.35', atm: '51,500', pcr: '0.94', maxPain: '51,400', iv: '15.6%' },
    features: { pcr: '0.94 Neutral', oiBuildup: 'Mixed near ATM', volumeSpike: '1.3x on 51,500', ivTrend: 'Softening', deltaBias: 'Balanced' },
    chain: [
      { strike: 51200, ceOi: '9.8L', ceOiChg: '-0.4L', ceVolume: '22.1K', ceLtp: '408.20', peLtp: '126.50', peVolume: '18.4K', peOiChg: '+0.8L', peOi: '11.7L' },
      { strike: 51300, ceOi: '12.4L', ceOiChg: '+0.2L', ceVolume: '28.7K', ceLtp: '323.15', peLtp: '162.40', peVolume: '25.1K', peOiChg: '+1.1L', peOi: '14.5L' },
      { strike: 51400, ceOi: '16.2L', ceOiChg: '+0.8L', ceVolume: '36.2K', ceLtp: '246.80', peLtp: '211.95', peVolume: '31.9K', peOiChg: '+1.7L', peOi: '17.8L' },
      { strike: 51500, ceOi: '21.8L', ceOiChg: '+1.6L', ceVolume: '44.6K', ceLtp: '182.30', peLtp: '278.20', peVolume: '40.2K', peOiChg: '+2.4L', peOi: '22.1L', atm: true },
      { strike: 51600, ceOi: '25.3L', ceOiChg: '+2.9L', ceVolume: '38.9K', ceLtp: '127.65', peLtp: '358.10', peVolume: '32.8K', peOiChg: '+1.5L', peOi: '19.6L' },
      { strike: 51700, ceOi: '19.7L', ceOiChg: '+2.1L', ceVolume: '27.4K', ceLtp: '84.25', peLtp: '446.85', peVolume: '20.6K', peOiChg: '+0.6L', peOi: '13.8L' }
    ]
  },
  sensex: {
    label: 'SENSEX',
    summary: { spot: '77,618.10', atm: '77,600', pcr: '0.88', maxPain: '77,800', iv: '13.9%' },
    features: { pcr: '0.88 Bearish', oiBuildup: 'Call writing active', volumeSpike: '1.5x on 77,600 PE', ivTrend: 'Rising', deltaBias: 'Negative PE skew' },
    chain: [
      { strike: 77400, ceOi: '4.2L', ceOiChg: '-0.2L', ceVolume: '11.3K', ceLtp: '312.40', peLtp: '86.20', peVolume: '9.8K', peOiChg: '+0.5L', peOi: '5.8L' },
      { strike: 77500, ceOi: '5.8L', ceOiChg: '+0.1L', ceVolume: '14.2K', ceLtp: '235.10', peLtp: '119.45', peVolume: '12.6K', peOiChg: '+0.8L', peOi: '7.4L' },
      { strike: 77600, ceOi: '8.6L', ceOiChg: '+0.7L', ceVolume: '21.4K', ceLtp: '166.80', peLtp: '163.75', peVolume: '23.1K', peOiChg: '+1.9L', peOi: '11.2L', atm: true },
      { strike: 77700, ceOi: '11.7L', ceOiChg: '+1.8L', ceVolume: '24.8K', ceLtp: '112.55', peLtp: '225.60', peVolume: '20.9K', peOiChg: '+1.3L', peOi: '9.9L' },
      { strike: 77800, ceOi: '14.9L', ceOiChg: '+2.4L', ceVolume: '20.7K', ceLtp: '72.35', peLtp: '301.25', peVolume: '14.7K', peOiChg: '+0.4L', peOi: '7.1L' }
    ]
  }
};

function MetricCard({ title, value }) {
  return <AnalyticEcommerce title={title} count={value} extra="Options chain snapshot" />;
}

function OptionsChainTable({ rows }) {
  return (
    <MainCard content={false}>
      <TableContainer sx={{ width: '100%', overflowX: 'auto', maxHeight: 520 }}>
        <Table stickyHeader size="small" aria-label="options chain table">
          <TableHead>
            <TableRow>
              {['CE OI', 'CE OI Chg', 'CE Volume', 'CE LTP', 'Strike', 'PE LTP', 'PE Volume', 'PE OI Chg', 'PE OI'].map((label) => (
                <TableCell key={label} align={label === 'Strike' ? 'center' : 'right'}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.strike}
                hover
                sx={(theme) => ({
                  bgcolor: row.atm ? withAlpha(theme.vars.palette.warning.main, 0.1) : index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                  '&:last-child td, &:last-child th': { border: 0 }
                })}
              >
                <TableCell align="right" sx={{ color: 'text.secondary' }}>{row.ceOi}</TableCell>
                <TableCell align="right" sx={{ color: row.ceOiChg.startsWith('+') ? successColor : errorColor }}>{row.ceOiChg}</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>{row.ceVolume}</TableCell>
                <TableCell align="right" sx={{ color: successColor, fontFamily: monoFont, fontWeight: 700 }}>{row.ceLtp}</TableCell>
                <TableCell
                  align="center"
                  sx={(theme) => ({
                    fontFamily: monoFont,
                    fontWeight: 900,
                    color: row.atm ? theme.vars.palette.warning.main : 'text.primary',
                    borderLeft: `1px solid ${theme.vars.palette.divider}`,
                    borderRight: `1px solid ${theme.vars.palette.divider}`
                  })}
                >
                  {row.strike}
                  {row.atm && (
                    <Chip label="ATM" size="small" sx={{ ml: 1, height: 20, borderRadius: '4px', fontSize: '0.625rem', fontWeight: 800 }} />
                  )}
                </TableCell>
                <TableCell align="right" sx={{ color: errorColor, fontFamily: monoFont, fontWeight: 700 }}>{row.peLtp}</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>{row.peVolume}</TableCell>
                <TableCell align="right" sx={{ color: row.peOiChg.startsWith('+') ? successColor : errorColor }}>{row.peOiChg}</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary' }}>{row.peOi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

function FeatureSnapshot({ features }) {
  return (
    <MainCard title="Feature Snapshot">
      <Grid container spacing={1.5}>
        {[
          ['PCR', features.pcr],
          ['OI Buildup', features.oiBuildup],
          ['Volume Spike', features.volumeSpike],
          ['IV Trend', features.ivTrend],
          ['Delta Bias', features.deltaBias]
        ].map(([label, value]) => (
          <Grid key={label} size={{ xs: 12, sm: 6, lg: 2.4 }}>
            <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'background.default', height: '100%' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>
                {label}
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 0.75, fontWeight: 700 }}>
                {value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
}

function AiRecommendation() {
  return (
    <MainCard title="AI Recommendation">
      <Stack spacing={1.5}>
        <Box sx={{ p: 1.5, borderRadius: 1, border: '1px solid', borderColor: withAlpha(successColor, 0.35), bgcolor: withAlpha(successColor, 0.08) }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', gap: 1 }}>
            <Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>Signal</Typography>
              <Typography variant="h4" sx={{ color: successColor, fontWeight: 900 }}>BUY CE</Typography>
            </Stack>
            <Stack sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>Confidence</Typography>
              <Typography variant="h4" sx={{ color: successColor, fontFamily: monoFont, fontWeight: 900 }}>82%</Typography>
            </Stack>
          </Stack>
        </Box>
        <Stack spacing={0.75}>
          {['PCR bullish', 'Positive OI buildup', 'Price above VWAP'].map((reason) => (
            <Typography key={reason} variant="body2" sx={{ color: 'text.primary' }}>
              <Box component="span" sx={{ color: successColor, fontWeight: 900, mr: 1 }}>✓</Box>
              {reason}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </MainCard>
  );
}

// ==============================|| OPTIONS CHAIN PAGE ||============================== //

export default function OptionsChainPage() {
  const [selectedIndex, setSelectedIndex] = useState('nifty');
  const selected = indexData[selectedIndex];

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid size={12}>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between', gap: 1.5 }}>
          <Stack>
            <Typography variant="h5">Options Chain</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Mock option-chain workspace for future FastAPI, PostgreSQL, and ML integration.
            </Typography>
          </Stack>
          <Tabs value={selectedIndex} onChange={(event, value) => setSelectedIndex(value)} aria-label="index selector tabs">
            {Object.entries(indexData).map(([key, value]) => (
              <Tab key={key} value={key} label={value.label} />
            ))}
          </Tabs>
        </Stack>
      </Grid>

      {[
        ['Spot Price', selected.summary.spot],
        ['ATM Strike', selected.summary.atm],
        ['PCR', selected.summary.pcr],
        ['Max Pain', selected.summary.maxPain],
        ['IV', selected.summary.iv]
      ].map(([title, value]) => (
        <Grid key={title} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
          <MetricCard title={title} value={value} />
        </Grid>
      ))}

      <Grid size={12}>
        <Stack sx={{ gap: 1 }}>
          <Typography variant="h5">Options Chain Table</Typography>
          <OptionsChainTable rows={selected.chain} />
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <FeatureSnapshot features={selected.features} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <AiRecommendation />
      </Grid>
    </Grid>
  );
}
