import { Box, Typography } from '@mui/material';
import { MovieCard } from './components/MovieCard';
import { FILM_CONFIGS } from './constants';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/background@3x.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: { xs: 3, md: 5 },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#1a1a2e',
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            marginBottom: 1,
          }}
        >
          Discover Studio Ghibli Films
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#4a4a5a',
            fontSize: { xs: '0.9rem', md: '1.1rem' },
          }}
        >
          Select a film & hover to learn more
        </Typography>
      </Box>

      {/* Cards Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 3 },
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {FILM_CONFIGS.map((filmConfig) => (
          <MovieCard key={filmConfig.id} filmConfig={filmConfig} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
