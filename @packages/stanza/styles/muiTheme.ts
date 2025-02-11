import { createTheme } from "@mui/material";
import { THEME } from "%stanza/styles/theme";

export const muiTheme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    primary: {
      main: THEME.COLOR.PRIMARY,
      contrastText: THEME.COLOR.WHITE,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    MuiButton: {
      styleOverrides: {},
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          paddingRight: "12px",
          fontWeight: "500",
        },
      },
    },
  },
});
