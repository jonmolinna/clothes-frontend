import { Box } from "@mui/material";
import Login from "./pages/Login";
import { grey } from '@mui/material/colors';

function App() {
  return (
    <Box sx={{ bgcolor: grey[200] }}>
      <Login />
    </Box>
  );
}

export default App;
