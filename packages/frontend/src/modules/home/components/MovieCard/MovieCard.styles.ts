import { styled, Box, Typography, IconButton } from '@mui/material';

// Card container with 3D perspective - responsive for 320px devices
export const CardContainer = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  width: '290px',
  height: '368px',
  cursor: 'pointer',
  // Responsive sizing for smaller screens (320px devices)
  [theme.breakpoints.down('sm')]: {
    width: '280px',
    height: '360px',
  },
  '@media (max-width: 320px)': {
    width: '260px',
    height: '340px',
  },
}));

// Inner card that flips - with reduced motion support
export const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.7s ease-in-out',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  // Respect user's motion preferences
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'transform 0.1s ease-in-out',
  },
}));

// Base card face styles
const cardFaceBase = {
  position: 'absolute' as const,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden' as const,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
  border: '4px solid #fff',
};

// Front face (Resting state)
export const CardFront = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{ backgroundColor: string }>(({ backgroundColor }) => ({
  ...cardFaceBase,
  backgroundColor,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '32px 24px',
}));

// Back face (Loaded/Expanded state)
export const CardBack = styled(Box)({
  ...cardFaceBase,
  transform: 'rotateY(180deg)',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
});

// Resting state content
export const RestingContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%',
});

export const RestingTitle = styled(Typography)({
  fontSize: '1.35rem',
  fontWeight: 600,
  color: '#fff',
  textAlign: 'center',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  marginTop: 'auto',
  marginBottom: 'auto',
});

export const ArrowButton = styled(IconButton)({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  color: '#fff',
  width: '48px',
  height: '48px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  '&:disabled': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

// Loaded state - Image container that shrinks on hover/expand
export const ImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  width: '100%',
  height: isExpanded ? '30%' : '100%',
  transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  flexShrink: 0,
  willChange: 'height',
  // Respect user's motion preferences
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'height 0.1s ease-in-out',
  },
}));

export const MovieImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center top',
});

export const LoadedTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isVisible',
})<{ isVisible?: boolean }>(({ isVisible = true }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px',
  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.85))',
  color: '#fff',
  fontSize: '1.25rem',
  fontWeight: 600,
  opacity: isVisible ? 1 : 0,
  transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  // Respect user's motion preferences
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'opacity 0.05s ease-in-out',
  },
}));

// Expanded state - Details section
export const DetailsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  padding: '16px',
  color: '#333',
  flex: 1,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  opacity: isExpanded ? 1 : 0,
  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDelay: isExpanded ? '0.15s' : '0s',
  willChange: 'opacity',
  // Respect user's motion preferences
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'opacity 0.05s ease-in-out',
    transitionDelay: '0s',
  },
}));

export const Description = styled(Typography)({
  fontSize: '0.85rem',
  lineHeight: 1.5,
  color: '#333',
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const FilmTitle = styled('span')({
  fontWeight: 700,
  color: '#1a1a2e',
});

export const DetailRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.8rem',
  color: '#333',
  fontStyle: 'italic',
});

export const DetailLabel = styled('span')({
  fontStyle: 'italic',
  color: '#666',
});

export const DetailValue = styled('span')({
  fontWeight: 600,
  fontStyle: 'italic',
  color: '#333',
});

export const RtScore = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#1a1a2e',
  marginTop: 'auto',
});

export const TomatoIcon = styled('img')({
  width: '40px',
  height: '40px',
  objectFit: 'contain',
});

// Loading skeleton
export const SkeletonContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px',
  backgroundColor: '#fff',
});
