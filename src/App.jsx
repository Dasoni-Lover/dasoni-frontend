import { ThemeProvider } from "styled-components";
import HomePage from "./pages/HomePage";
import ResetStyle from "./styles/ResetStyle";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
