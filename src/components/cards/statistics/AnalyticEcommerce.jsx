import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import { withAlpha } from 'utils/colorUtils';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra }) {
  const monospaceFont = "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace";
  const isSuccess = color === 'success';
  const isError = color === 'error';

  return (
    <MainCard
      contentSX={{ p: 1.5, pb: '12px !important' }}
      sx={(theme) => {
        const successColor = '#38cd70';
        const errorColor = '#ff6b6b';
        const activeColor = isSuccess ? successColor : (isError ? errorColor : theme.vars.palette[color]?.main || '');
        const activeBg = isSuccess 
          ? withAlpha(successColor, 0.06) 
          : (isError ? withAlpha(errorColor, 0.06) : theme.vars.palette.background.paper);

        return {
          height: '100%',
          bgcolor: activeBg,
          boxShadow: theme.vars.customShadows.z1,
          borderLeft: '4px solid',
          borderLeftColor: color === 'primary' ? 'divider' : activeColor,
          borderRadius: '4px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: theme.vars.customShadows.z2,
            borderColor: color === 'primary' ? theme.vars.palette.primary.main : activeColor
          }
        };
      }}
    >
      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.6875rem' }}>
          {title}
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', gap: 1 }}>
          <Typography 
            variant="h3" 
            sx={(theme) => {
              const successColor = '#38cd70';
              const errorColor = '#ff6b6b';
              const activeColor = isSuccess ? successColor : (isError ? errorColor : theme.vars.palette.text.primary);
              return { 
                color: activeColor, 
                fontWeight: 700, 
                fontFamily: monospaceFont, 
                fontSize: '1.5rem', 
                letterSpacing: '-0.5px' 
              };
            }}
          >
            {count}
          </Typography>
          {percentage && (
            <Box
              sx={(theme) => {
                const successColor = '#38cd70';
                const errorColor = '#ff6b6b';
                const activeColor = isSuccess ? successColor : (isError ? errorColor : theme.vars.palette.primary.main);
                return {
                  ml: 1.25,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.25,
                  py: 0.25,
                  borderRadius: '4px',
                  height: '22px',
                  bgcolor: withAlpha(activeColor, 0.12),
                  border: '1px solid',
                  borderColor: withAlpha(activeColor, 0.3),
                  color: activeColor
                };
              }}
            >
              {isLoss ? <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} /> : <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
              <Typography sx={{ fontFamily: monospaceFont, fontWeight: 700, fontSize: '0.725rem', color: 'inherit' }}>
                {percentage}%
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
      <Box sx={{ pt: 1 }}>
        <Typography 
          variant="body2" 
          sx={(theme) => {
            const successColor = '#38cd70';
            const errorColor = '#ff6b6b';
            const activeColor = isSuccess ? successColor : (isError ? errorColor : theme.vars.palette.text.secondary);
            return {
              color: activeColor, 
              fontSize: '0.725rem', 
              fontFamily: extra?.includes('INR') ? monospaceFont : 'inherit',
              fontWeight: (isSuccess || isError) ? 600 : 400
            };
          }}
        >
          {extra}
        </Typography>
      </Box>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};
