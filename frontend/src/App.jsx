import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./Routes/routes";

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <MainRoutes />
      </Router>
    </MantineProvider>
  );
};

export default App;
