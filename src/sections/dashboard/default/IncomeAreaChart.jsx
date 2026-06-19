import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { axisClasses, chartsGridClasses, lineClasses } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';

// project imports
import { withAlpha } from 'utils/colorUtils';

function Legend({ items, onToggle }) {
  return (
    <Stack direction="row" sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', mt: 1, mb: 0.5, flexWrap: 'wrap' }}>
      {items.map((item) => (
        <Stack
          key={item.label}
          direction="row"
          sx={{ gap: 1, alignItems: 'center', cursor: 'pointer', opacity: item.visible ? 1 : 0.45 }}
          onClick={() => onToggle(item.label)}
        >
          <Box sx={{ width: 10, height: 10, bgcolor: item.color, borderRadius: '50%' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

// ==============================|| INDEX OPTIONS AREA CHART ||============================== //

export default function IncomeAreaChart({ chart, indexLabel }) {
  const theme = useTheme();
  const [visibility, setVisibility] = useState({
    'Spot Price': true,
    'EMA 20': true,
    'EMA 50': true,
    VWAP: true
  });

  useEffect(() => {
    setVisibility({ 'Spot Price': true, 'EMA 20': true, 'EMA 50': true, VWAP: true });
  }, [indexLabel]);

  const line = theme.vars.palette.divider;
  const spotColor = theme.vars.palette.text.primary;
  const ema20Color = '#60a5fa';
  const ema50Color = '#f59e0b';
  const vwapColor = '#a78bfa';

  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const visibleSeries = [
    {
      data: chart.spot,
      label: 'Spot Price',
      showMark: false,
      area: true,
      id: 'spot',
      color: spotColor,
      visible: visibility['Spot Price']
    },
    {
      data: chart.ema20,
      label: 'EMA 20',
      showMark: false,
      area: false,
      id: 'ema20',
      color: ema20Color,
      visible: visibility['EMA 20']
    },
    {
      data: chart.ema50,
      label: 'EMA 50',
      showMark: false,
      area: false,
      id: 'ema50',
      color: ema50Color,
      visible: visibility['EMA 50']
    },
    {
      data: chart.vwap,
      label: 'VWAP',
      showMark: false,
      area: false,
      id: 'vwap',
      color: vwapColor,
      visible: visibility.VWAP
    }
  ];

  return (
    <>
      <LineChart
        hideLegend
        grid={{ horizontal: true, vertical: false }}
        xAxis={[{ scaleType: 'point', data: chart.labels, tickSize: 7, disableLine: true }]}
        yAxis={[{ tickSize: 7, disableLine: true }]}
        height={340}
        margin={{ top: 20, bottom: 20, right: 15, left: 10 }}
        series={visibleSeries
          .filter((series) => series.visible)
          .map((series) => ({
            type: 'line',
            data: series.data,
            label: `${indexLabel} ${series.label}`,
            showMark: series.showMark,
            area: series.area,
            id: series.id,
            color: series.color,
            stroke: series.color,
            strokeWidth: series.id === 'spot' ? 2.3 : 1.8
          }))}
        sx={{
          [`& .${chartsGridClasses.line}`]: { strokeDasharray: '4 4', stroke: line },
          [`& .${lineClasses.area}`]: {
            '&[data-series-id="spot"]': { fill: "url('#indexOptionsGradient')", strokeWidth: 2, opacity: 0.65 }
          },
          [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' },
          [`& .${axisClasses.root}.${axisClasses.directionY} .${axisClasses.tick}`]: { stroke: 'transparent' }
        }}
      >
        <defs>
          <linearGradient id="indexOptionsGradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={withAlpha(theme.vars.palette.text.primary, 0.2)} />
            <stop offset="90%" stopColor={withAlpha(theme.vars.palette.background.default, 0.05)} />
          </linearGradient>
        </defs>
      </LineChart>
      <Legend items={visibleSeries} onToggle={toggleVisibility} />
    </>
  );
}

Legend.propTypes = { items: PropTypes.array, onToggle: PropTypes.func };

IncomeAreaChart.propTypes = {
  chart: PropTypes.shape({
    labels: PropTypes.array,
    spot: PropTypes.array,
    ema20: PropTypes.array,
    ema50: PropTypes.array,
    vwap: PropTypes.array
  }),
  indexLabel: PropTypes.string
};
