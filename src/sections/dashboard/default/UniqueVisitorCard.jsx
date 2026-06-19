import PropTypes from 'prop-types';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';

// ==============================|| DEFAULT - INDEX OPTIONS ANALYSIS ||============================== //

export default function UniqueVisitorCard({ selectedIndex, onIndexChange, indexOptions }) {
  const selectedOption = indexOptions[selectedIndex];

  const handleIndexChange = (event, value) => {
    onIndexChange(value);
  };

  return (
    <>
      <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid>
          <Stack sx={{ gap: 0.25 }}>
            <Typography variant="h5">Index Options Analysis</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              {selectedOption.subtitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid>
          <Tabs
            value={selectedIndex}
            onChange={handleIndexChange}
            aria-label="index options tabs"
            sx={{
              minHeight: 36,
              '& .MuiTab-root': { minHeight: 36, py: 0.75, px: { xs: 1.25, sm: 2 }, fontSize: '0.75rem', fontWeight: 700 },
              '& .MuiTabs-indicator': { height: 2 }
            }}
          >
            {Object.entries(indexOptions).map(([key, option]) => (
              <Tab key={key} value={key} label={option.label} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart chart={selectedOption.chart} indexLabel={selectedOption.label} />
        </Box>
      </MainCard>
    </>
  );
}

UniqueVisitorCard.propTypes = {
  selectedIndex: PropTypes.string,
  onIndexChange: PropTypes.func,
  indexOptions: PropTypes.object
};
