import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";

// ----------------------------------------------------------------------

export default function PlainLayout() {

  return (
    <Box sx={{ display: 'flex', position: "relative" }}>
        <Outlet />
    </Box>
  );
}
