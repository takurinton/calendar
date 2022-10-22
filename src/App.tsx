import { createTheme, ThemeProvider, Typography } from "ingred-ui";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Typography component="h1" size="xxxxxl" align="center">
        takurinton
      </Typography>
    </ThemeProvider>
  );
}

export default App;
