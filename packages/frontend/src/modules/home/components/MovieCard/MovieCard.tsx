import { useState } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useFilmQuery } from '~/hooks';
import { CardState, MovieCardProps } from './MovieCard.types';
import {
  CardContainer,
  CardInner,
  CardFront,
  CardBack,
  RestingContent,
  RestingTitle,
  ArrowButton,
  ImageContainer,
  MovieImage,
  LoadedTitle,
  DetailsContainer,
  Description,
  DetailRow,
  DetailLabel,
  RtScore,
  SkeletonContainer,
} from './MovieCard.styles';

export const MovieCard = ({ filmConfig }: MovieCardProps) => {
  const [cardState, setCardState] = useState<CardState>(CardState.RESTING);
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchFilm, film, loading, error } = useFilmQuery();

  const isFlipped = cardState !== CardState.RESTING;

  const handleLoad = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchFilm(filmConfig.id);
    setCardState(CardState.LOADED);
  };

  const handleCardClick = () => {
    if (cardState === CardState.RESTING) {
      return;
    }
    // Toggle between loaded and resting
    if (!isExpanded) {
      setCardState(CardState.RESTING);
      setIsExpanded(false);
    }
  };

  const handleMouseEnter = () => {
    if (cardState === CardState.LOADED && film) {
      setIsExpanded(true);
      setCardState(CardState.EXPANDED);
    }
  };

  const handleMouseLeave = () => {
    if (cardState === CardState.EXPANDED) {
      setIsExpanded(false);
      setCardState(CardState.LOADED);
    }
  };

  const handleTouchStart = () => {
    if (cardState === CardState.LOADED && film) {
      setIsExpanded(!isExpanded);
      setCardState(isExpanded ? CardState.LOADED : CardState.EXPANDED);
    }
  };

  const renderRestingState = () => (
    <RestingContent>
      <RestingTitle>{filmConfig.title}</RestingTitle>
      <ArrowButton
        onClick={handleLoad}
        disabled={loading}
        aria-label={`Load ${filmConfig.title}`}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <ArrowForwardIcon />
        )}
      </ArrowButton>
    </RestingContent>
  );

  const renderLoadingSkeleton = () => (
    <SkeletonContainer>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="70%"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
      <Skeleton
        variant="text"
        width="60%"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
      <Skeleton
        variant="text"
        width="40%"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
      />
    </SkeletonContainer>
  );

  const renderLoadedState = () => {
    if (loading) {
      return renderLoadingSkeleton();
    }

    if (error) {
      return (
        <RestingContent>
          <RestingTitle sx={{ color: '#fff', fontSize: '1rem' }}>
            Error: {error.message}
          </RestingTitle>
        </RestingContent>
      );
    }

    if (!film) {
      return renderLoadingSkeleton();
    }

    return (
      <>
        <ImageContainer isExpanded={isExpanded}>
          <MovieImage src={film.image || ''} alt={film.title} loading="lazy" />
          {!isExpanded && <LoadedTitle>{film.title}</LoadedTitle>}
        </ImageContainer>

        <DetailsContainer isExpanded={isExpanded}>
          <Description>{film.description || 'N/A'}</Description>
          <DetailRow>
            <DetailLabel>Director:</DetailLabel>
            {film.director || 'N/A'}
          </DetailRow>
          <DetailRow>
            <DetailLabel>Release:</DetailLabel>
            {film.releaseDate || 'N/A'}
          </DetailRow>
          <DetailRow>
            <DetailLabel>Runtime:</DetailLabel>
            {film.runningTime ? `${film.runningTime} min` : 'N/A'}
          </DetailRow>
          <RtScore>🍅 {film.rtScore ? `${film.rtScore}%` : 'N/A'}</RtScore>
        </DetailsContainer>
      </>
    );
  };

  return (
    <CardContainer
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <CardInner isFlipped={isFlipped}>
        <CardFront backgroundColor={filmConfig.color}>
          {renderRestingState()}
        </CardFront>
        <CardBack>{renderLoadedState()}</CardBack>
      </CardInner>
    </CardContainer>
  );
};
