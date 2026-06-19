// ==============================|| OVERRIDES - TABLE ROW ||============================== //

export default function TableRow() {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-of-type': {
            '& .MuiTableCell-root': {
              borderBottom: 'none'
            }
          },
          '& .MuiTableCell-root': {
            borderBottomColor: 'var(--palette-divider)',
            '&:last-of-type': {
              paddingRight: 24
            },
            '&:first-of-type': {
              paddingLeft: 24
            }
          }
        }
      }
    }
  };
}
