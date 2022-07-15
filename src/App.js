import { Box } from "@mui/material";
import { grey } from '@mui/material/colors';
import AppRouter from "./routers/AppRouter";

// redux
import { Provider } from 'react-redux';
import { store } from './features/store';

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ bgcolor: grey[200] }}>
        <AppRouter />
      </Box>
    </Provider>
  );
}

export default App;
