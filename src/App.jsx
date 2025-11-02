import { ThemeProvider } from "styled-components";
import ResetStyle from "./styles/ResetStyle";
import { theme } from "./styles/theme";
import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <GlobalStyle>
        <Outlet />
      </GlobalStyle>
    </ThemeProvider>
  );
}

export default App;
