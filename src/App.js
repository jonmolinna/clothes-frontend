import { Box } from "@mui/material";
import { grey } from '@mui/material/colors';
import AppRouter from "./routers/AppRouter";
import { theme } from "./theme";
import { ThemeProvider } from '@mui/material/styles';

// redux
import { Provider } from 'react-redux';
import { store } from './features/store';

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ bgcolor: grey[200] }}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </Box>
    </Provider>
  );
}

export default App;
