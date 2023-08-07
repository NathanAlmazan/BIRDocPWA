import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FindInPageIcon from '@mui/icons-material/FindInPage';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Container>
    <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
            Sorry, page not found!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
        </Typography>

        <Box sx={{ mx: 'auto', my: { xs: 5, sm: 10 } }}>
            <FindInPageIcon sx={{ width: 120, height: 120 }} color='error' />
        </Box>

        <Button to="/app/dashboard" size="large" variant="contained" component={RouterLink}>
            Go to Home
        </Button>
    </StyledContent>
    </Container>
  );
}