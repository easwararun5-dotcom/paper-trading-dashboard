// material-ui
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// ==============================|| SETTINGS PAGE ||============================== //

export default function SettingsPage() {
  const { state, setField } = useConfig();
  const { mode, setMode } = useColorScheme();
  const currentMode = mode || state.themeMode || 'light';

  const handleThemeModeChange = (event) => {
    const nextMode = event.target.checked ? 'dark' : 'light';
    setMode(nextMode);
    setField('themeMode', nextMode);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid size={12}>
        <Typography variant="h5">Settings</Typography>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <MainCard title="Broker Connection">
          <Stack sx={{ gap: 2.5 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Angel One API placeholders for paper trading configuration.
            </Typography>
            <TextField label="Client ID" placeholder="ANGELONE_CLIENT_ID" fullWidth />
            <TextField label="API Key" placeholder="ANGELONE_API_KEY" fullWidth />
            <TextField label="TOTP Secret" placeholder="ANGELONE_TOTP_SECRET" fullWidth />
            <TextField label="Redirect URL" placeholder="https://paper-trading.local/callback" fullWidth />
            <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>
              Save Broker Settings
            </Button>
          </Stack>
        </MainCard>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <MainCard title="General Application Settings">
          <Stack sx={{ gap: 1.5 }}>
            <FormControlLabel
              control={<Switch checked={currentMode === 'dark'} onChange={handleThemeModeChange} />}
              label="Dark theme"
            />
            <FormControlLabel control={<Switch defaultChecked />} label="Enable paper trade confirmations" />
            <FormControlLabel control={<Switch defaultChecked />} label="Show unrealized P&L on dashboard" />
            <FormControlLabel control={<Switch />} label="Use compact table density" />
            <TextField label="Default Capital" defaultValue="100000" fullWidth />
            <TextField label="Risk Per Trade (%)" defaultValue="1.5" fullWidth />
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
