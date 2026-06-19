import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { axisClasses, barClasses, BarChart, chartsGridClasses } from '@mui/x-charts';

// project imports
import MainCard from 'components/MainCard';
import { withAlpha } from 'utils/colorUtils';

// ==============================|| STRATEGY PERFORMANCE COLUMN CHART ||============================== //

export default function SalesChart({ filter = 'today' }) {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [seriesVisibility, setSeriesVisibility] = useState({ Wins: true, Losses: true });
  const [highlightedItem, setHighlightedItem] = useState({ seriesId: 'Wins' });

  const toggleSeriesVisibility = (seriesId, seriesLabel) => {
    setSeriesVisibility((prev) => {
      const isNowHidden = prev[seriesLabel];
      if (isNowHidden && highlightedItem?.seriesId === seriesId) {
        setHighlightedItem(null);
      }
      return { ...prev, [seriesLabel]: !prev[seriesLabel] };
    });
  };

  const handleHighLightedSeries = (newHighLightedSeries) => {
    if (newHighLightedSeries !== null) {
      setHighlightedItem((prev) => ({
        ...prev,
        seriesId: newHighLightedSeries
      }));
    }
  };

  const valueFormatter = (value) => `${value} trades`;
  const primaryColor = theme.vars.palette.primary.main;
  const primaryLightColor = theme.vars.palette.primary.lighter;
  const warningColor = theme.vars.palette.warning.main;
  const warningLightColor = theme.vars.palette.warning.lighter;

  // ==============================|| MEMOIZED CHART DATA ||============================== //

  const chartData = useMemo(() => {
    let labels = [];
    let winsData = [];
    let wins2Data = [];
    let lossesData = [];
    let losses2Data = [];

    switch (filter) {
      case 'month':
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        winsData = [12, 9, 14, 11];
        wins2Data = [4, 3, 5, 4];
        lossesData = [5, 4, 6, 3];
        losses2Data = [2, 2, 1, 2];
        break;
      case 'year':
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        winsData = [32, 35, 38, 34, 42, 45, 48, 44, 41, 47, 52, 50];
        wins2Data = [9, 10, 11, 8, 12, 13, 14, 12, 11, 13, 15, 14];
        lossesData = [18, 16, 15, 17, 14, 13, 12, 15, 16, 13, 11, 12];
        losses2Data = [5, 4, 4, 5, 3, 4, 3, 4, 5, 3, 3, 4];
        break;
      case 'today':
      default:
        labels = ['07.06', '08.06', '09.06', '10.06', '11.06', '12.06', '13.06'];
        winsData = [5, 3, 4, 6, 4, 7, 5];
        wins2Data = [2, 1, 2, 1, 3, 2, 2];
        lossesData = [2, 4, 2, 3, 2, 1, 3];
        losses2Data = [1, 1, 1, 2, 1, 0, 1];
        break;
    }
    return { labels, winsData, wins2Data, lossesData, losses2Data };
  }, [filter]);

  const { labels, winsData, wins2Data, lossesData, losses2Data } = chartData;

  const initialSeries = [
    { id: 'Wins', data: winsData, stack: 'wins', label: 'Wins', color: warningColor, valueFormatter },
    { id: 'WinsPartial', data: wins2Data, stack: 'wins', label: 'Wins', color: warningLightColor, valueFormatter },
    { id: 'Losses', data: lossesData, stack: 'losses', label: 'Losses', color: primaryColor, valueFormatter },
    { id: 'LossesPartial', data: losses2Data, stack: 'losses', label: 'Losses', color: primaryLightColor, valueFormatter }
  ];

  const initialSeriesCopy = [...initialSeries.slice(0, 1), ...initialSeries.slice(2, 3)];

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Strategy P&L
            </Typography>
            <Typography variant="h4">INR 5,560</Typography>
          </Box>

          <Stack direction="row" sx={{ gap: 3 }}>
            {initialSeriesCopy.map((series) => (
              <Stack
                key={series.label}
                direction="row"
                onClick={() => toggleSeriesVisibility(series.id, series.label)}
                onMouseEnter={() => handleHighLightedSeries(series.id)}
                onMouseLeave={() => setHighlightedItem(null)}
                sx={{
                  gap: 1,
                  alignItems: 'center',
                  opacity: seriesVisibility[series.label] ? 1 : 0.45,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                <Box sx={{ height: 10, width: 10, borderRadius: '50%', backgroundColor: series.color }} />
                <Typography>{series.label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <BarChart
          hideLegend
          height={380}
          grid={{ horizontal: true }}
          xAxis={[
            {
              id: 'sales-x-axis',
              data: labels,
              tickSize: 7,
              disableLine: true,
              categoryGapRatio: downSM ? 0.5 : 0.7,
              barGapRatio: downSM ? 0.4 : 0.7
            }
          ]}
          yAxis={[{ disableLine: true, tickSize: 7, tickMaxStep: 50 }]}
          series={initialSeries
            .map((series) => ({ ...series, type: 'bar', color: withAlpha(series.color, 0.85), visible: seriesVisibility[series.label] }))
            .filter((series) => series.visible)}
          highlightedItem={highlightedItem}
          slotProps={{ bar: { rx: 4, ry: 4 }, tooltip: { trigger: 'item' } }}
          axisHighlight={{ x: 'none' }}
          margin={{ top: 30, left: -5, bottom: 25, right: 10 }}
          sx={{
            [`& .${barClasses.element}:hover`]: { opacity: 0.6 },
            [`& .${chartsGridClasses.line}`]: { strokeDasharray: '4 4', stroke: theme.vars.palette.divider },
            '& .MuiBarElement-series-auto-generated-id-0, & .MuiBarElement-series-auto-generated-id-1': { width: 15 },
            [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' },
            [`& .${axisClasses.root}.${axisClasses.directionY} .${axisClasses.tick}`]: { stroke: 'transparent' }
          }}
        />
      </Box>
    </MainCard>
  );
}

SalesChart.propTypes = { filter: PropTypes.any };
