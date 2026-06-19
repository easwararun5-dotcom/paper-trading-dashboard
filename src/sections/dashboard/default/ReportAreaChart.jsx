// material-ui
import { useTheme } from '@mui/material/styles';

import { axisClasses, chartsGridClasses, LineChart, lineClasses } from '@mui/x-charts';

const data = [1.2, 1.6, -0.8, 2.1, 1.4, 2.8, 1.9];
const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ==============================|| REPORT AREA CHART ||============================== //

export default function ReportAreaChart() {
  const theme = useTheme();

  return (
    <LineChart
      hideLegend
      grid={{ horizontal: true }}
      xAxis={[{ data: labels, scaleType: 'point', disableLine: true, tickSize: 7 }]}
      yAxis={[{ tickMaxStep: 1, position: 'none' }]}
      series={[{ data, showMark: false, id: 'ReportAreaChart', color: theme.vars.palette.warning.main, label: 'Drawdown %' }]}
      height={340}
      margin={{ top: 30, bottom: 25, left: 20, right: 20 }}
      sx={{
        [`& .${lineClasses.line}`]: { strokeWidth: 1 },
        [`& .${chartsGridClasses.line}`]: { strokeDasharray: '4 4' },
        [`& .${axisClasses.root}.${axisClasses.directionX} .${axisClasses.tick}`]: { stroke: 'transparent' }
      }}
    />
  );
}
