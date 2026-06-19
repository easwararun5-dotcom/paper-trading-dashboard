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
    Spot: true,
    Reference: true
  });

  useEffect(() => {
    setVisibility({ Spot: true, Reference: true });
  }, [indexLabel]);

  const line = theme.vars.palette.divider;
  const spotColor = theme.vars.palette.text.primary;
  const referenceColor = theme.vars.palette.text.secondary;

  const toggleVisibility = (label) => {
    setVisibility((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const visibleSeries = [
    {
      data: chart.spot,
      label: 'Spot',
      showMark: false,
      area: true,
      id: 'spot',
      color: spotColor,
      visible: visibility.Spot
    },
    {
      data: chart.reference,
      label: 'Reference',
      showMark: false,
      area: false,
      id: 'reference',
      color: referenceColor,
      visible: visibility.Reference
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
            strokeWidth: series.id === 'spot' ? 2.2 : 1.6
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
    reference: PropTypes.array
  }),
  indexLabel: PropTypes.string
};
