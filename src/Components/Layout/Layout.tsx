import * as React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

//https://material-ui.com/styles/advanced/
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          height: "100%"
        },
        body: {
          height: "100%"
        },
        "@root": {
          height: "100%"
        }
      },
    },
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    background: {
      default: "white",
    },
  },
});

const Layout: React.FunctionComponent = props => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </>
  );
};

export { Layout };
