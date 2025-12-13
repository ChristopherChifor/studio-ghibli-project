import { useRouteError, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { IS_DEV } from '~/shared/constants';

const ErrorContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
});

const ErrorCard = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '48px',
  maxWidth: '480px',
  width: '100%',
  textAlign: 'center',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
});

const StyledErrorIcon = styled(ErrorIcon)({
  fontSize: '64px',
  color: '#c24646',
  marginBottom: '16px',
});

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Log error in development mode
  if (IS_DEV) {
    // eslint-disable-next-line no-console
    console.error('Error caught at boundary:', error);
  }

  const errorMessage =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  return (
    <ErrorContainer>
      <ErrorCard>
        <StyledErrorIcon />
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 700, color: '#1a1a2e', marginBottom: 2 }}
        >
          Oops!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', marginBottom: 3, lineHeight: 1.6 }}
        >
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#999',
            fontStyle: 'italic',
            marginBottom: 4,
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          {errorMessage}
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
      </ErrorCard>
    </ErrorContainer>
  );
}
