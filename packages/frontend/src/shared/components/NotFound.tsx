import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SearchOff as NotFoundIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFoundContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
});

const NotFoundCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '48px',
  maxWidth: '480px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
});

const StyledNotFoundIcon = styled(NotFoundIcon)({
  fontSize: '64px',
  color: '#3e6cac',
  marginBottom: '16px',
});

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <NotFoundCard>
        <StyledNotFoundIcon />
        <Typography
          variant="h1"
          sx={{
            fontSize: '4rem',
            fontWeight: 700,
            color: '#1a1a2e',
            marginBottom: 1,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 600, color: '#1a1a2e', marginBottom: 2 }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', marginBottom: 4, lineHeight: 1.6 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#3e6cac',
            '&:hover': { backgroundColor: '#2d5a9a' },
            borderRadius: '8px',
            padding: '12px 32px',
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Return Home
        </Button>
      </NotFoundCard>
    </NotFoundContainer>
  );
};

export default NotFound;
