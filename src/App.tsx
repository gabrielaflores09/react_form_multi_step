// External deps
import React from "react";
import { ThemeProvider } from "@material-ui/core";

// Internal deps
import Menu from "./components/Menu/Menu";
import theme from "./themeConfig";
import Formulario from "./components/Formulario/Formulario";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Formulario />
    </ThemeProvider>
  );
}

export default App;
