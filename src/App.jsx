import { ThemeProvider } from "styled-components";
import HomePage from "./pages/HomePage";
import ResetStyle from "./styles/ResetStyle";
import { theme } from "./styles/theme";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <Outlet/>
    </ThemeProvider>
  );
}

export default App;
