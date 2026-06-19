// material-ui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
// ==============================|| LOGO ||============================== //

export default function LogoMain({ isIcon = false }) {
  const theme = useTheme();
  if (isIcon) {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: 1,
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 700
      }}
    >
      PT
    </Box>
  );
}
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 700,
          boxShadow: theme.customShadows?.primary
        }}
      >
        PT
      </Box>
      <Stack sx={{ lineHeight: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
          Paper Trading
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.1 }}>
          Dashboard
        </Typography>
      </Stack>
    </Stack>
  );
}
LogoMain.propTypes = {
  isIcon: PropTypes.bool
};