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

const signals = [
  { timestamp: '20 Jun 2026, 09:30', index: 'NIFTY', signal: 'BUY CE', confidence: 82, reason: 'PCR bullish + Positive OI buildup', outcome: 'Win' },
  { timestamp: '20 Jun 2026, 10:15', index: 'BANK NIFTY', signal: 'HOLD', confidence: 67, reason: 'Neutral setup', outcome: 'No Trade' },
  { timestamp: '20 Jun 2026, 11:20', index: 'SENSEX', signal: 'BUY PE', confidence: 74, reason: 'Call writing + Price below VWAP', outcome: 'Win' },
  { timestamp: '19 Jun 2026, 14:05', index: 'NIFTY', signal: 'BUY PE', confidence: 69, reason: 'EMA20 below EMA50 + Negative delta bias', outcome: 'Loss' }
];

function signalColor(signal) {
  if (signal === 'BUY CE') return '#4ADE80';
  if (signal === 'BUY PE') return '#F87171';
  return '#BFBFBF';
}

function outcomeColor(outcome) {
  if (outcome === 'Win') return '#4ADE80';
  if (outcome === 'Loss') return '#F87171';
  return '#BFBFBF';
}

// ==============================|| SIGNAL HISTORY PAGE ||============================== //

export default function TradesPage() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12}>
        <Stack sx={{ gap: 0.25 }}>
          <Typography variant="h5">Signals</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Historical AI-assisted signals for NIFTY, BANK NIFTY, and SENSEX.
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        <MainCard title="Signal History" content={false}>
          <TableContainer sx={{ width: '100%', overflowX: 'auto', maxHeight: 520 }}>
            <Table stickyHeader aria-label="signal history table">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Index</TableCell>
                  <TableCell>Signal</TableCell>
                  <TableCell align="right">Confidence</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Outcome</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {signals.map((row, index) => (
                  <TableRow
                    key={`${row.timestamp}-${row.index}`}
                    hover
                    sx={(theme) => ({
                      bgcolor: index % 2 === 0 ? 'transparent' : theme.vars.palette.action.hover,
                      '&:last-child td, &:last-child th': { border: 0 }
                    })}
                  >
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>{row.index}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.signal}
                        size="small"
                        sx={{
                          minWidth: 74,
                          fontWeight: 800,
                          color: signalColor(row.signal),
                          bgcolor: `${signalColor(row.signal)}1f`,
                          border: `1px solid ${signalColor(row.signal)}4d`
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: 800 }}>{row.confidence}%</Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 260 }}>{row.reason}</TableCell>
                    <TableCell>
                      <Typography sx={{ color: outcomeColor(row.outcome), fontWeight: 800 }}>{row.outcome}</Typography>
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
