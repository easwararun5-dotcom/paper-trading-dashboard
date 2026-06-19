// ==============================|| OVERRIDES - TABLE CELL ||============================== //

export default function TableHead(theme) {
  return {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.vars.palette.background.paper,
          borderTop: '1px solid',
          borderTopColor: theme.vars.palette.divider,
          borderBottom: '2px solid',
          borderBottomColor: theme.vars.palette.divider,
          '& .MuiTableCell-head': {
            backgroundColor: theme.vars.palette.background.paper,
            color: theme.vars.palette.text.secondary,
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase'
          }
        }
      }
    }
  };
}
