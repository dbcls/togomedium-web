import { THEME } from "%core/theme";
import { createTheme } from "@mui/material";

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
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: THEME.COLOR.GRAY_LINE,
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: THEME.COLOR.GRAY_LINE,
          },
        },
      },
    },
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

// Keep portal content in the same shadow root as the Stanza's Emotion styles.
export const createStanzaMuiTheme = (container: HTMLElement) =>
  createTheme(muiTheme, {
    components: {
      MuiModal: { defaultProps: { container } },
      MuiPopover: { defaultProps: { container } },
      MuiPopper: { defaultProps: { container } },
    },
  });
