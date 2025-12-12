import { styled, Box, Typography, IconButton } from '@mui/material';

// Card container with 3D perspective
export const CardContainer = styled(Box)({
  perspective: '1000px',
  width: '100%',
  height: '360px',
  cursor: 'pointer',
});

// Inner card that flips
export const CardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.7s ease-in-out',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

// Base card face styles
const cardFaceBase = {
  position: 'absolute' as const,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden' as const,
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
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
  backgroundColor: '#1a1a2e',
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

// Loaded state - Image container that shrinks on expand
export const ImageContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  width: '100%',
  height: isExpanded ? '45%' : '100%',
  transition: 'height 0.35s ease-out',
  overflow: 'hidden',
  position: 'relative',
}));

export const MovieImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center top',
});

export const LoadedTitle = styled(Typography)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px',
  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.85))',
  color: '#fff',
  fontSize: '1.25rem',
  fontWeight: 600,
});

// Expanded state - Details section
export const DetailsContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ isExpanded }) => ({
  padding: '16px',
  color: '#fff',
  flex: 1,
  overflow: 'auto',
  opacity: isExpanded ? 1 : 0,
  transition: 'opacity 0.35s ease-out',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

export const Description = styled(Typography)({
  fontSize: '0.85rem',
  lineHeight: 1.5,
  color: 'rgba(255, 255, 255, 0.9)',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const DetailRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.85rem',
  color: 'rgba(255, 255, 255, 0.85)',
});

export const DetailLabel = styled('span')({
  fontWeight: 600,
  color: 'rgba(255, 255, 255, 0.6)',
});

export const RtScore = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#ffeb3b',
});

// Loading skeleton
export const SkeletonContainer = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px',
});
