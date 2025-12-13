import { useState, useEffect } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useFilmQuery } from '~/hooks';
import { useToast } from '~/contexts';
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
  FilmTitle,
  DetailRow,
  DetailLabel,
  DetailValue,
  RtScore,
  TomatoIcon,
  SkeletonContainer,
} from './MovieCard.styles';

export const MovieCard = ({ filmConfig }: MovieCardProps) => {
  const [cardState, setCardState] = useState<CardState>(CardState.RESTING);
  const [isExpanded, setIsExpanded] = useState(false);
  const { fetchFilm, film, loading, error } = useFilmQuery();
  const { showError } = useToast();

  const isFlipped = cardState !== CardState.RESTING;

  // Show toast notification when error occurs
  useEffect(() => {
    if (error) {
      showError(`Failed to load "${filmConfig.title}": ${error.message}`);
    }
  }, [error, filmConfig.title, showError]);

  const handleLoad = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchFilm(filmConfig.id);
    setCardState(CardState.LOADED);
  };

  // Check if device supports touch (mobile)
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const handleCardClick = () => {
    if (cardState === CardState.RESTING) {
      return;
    }

    // On mobile: toggle through states
    if (isTouchDevice()) {
      if (cardState === CardState.LOADED && film) {
        // Show expanded details
        setIsExpanded(true);
        setCardState(CardState.EXPANDED);
      } else if (cardState === CardState.EXPANDED) {
        // Go back to resting state
        setIsExpanded(false);
        setCardState(CardState.RESTING);
      }
    } else {
      // On desktop: click always returns to resting state
      setIsExpanded(false);
      setCardState(CardState.RESTING);
    }
  };

  const handleMouseEnter = () => {
    // Only expand on hover for non-touch devices
    if (!isTouchDevice() && cardState === CardState.LOADED && film) {
      setIsExpanded(true);
      setCardState(CardState.EXPANDED);
    }
  };

  const handleMouseLeave = () => {
    // Only collapse on mouse leave for non-touch devices
    if (!isTouchDevice() && cardState === CardState.EXPANDED) {
      setIsExpanded(false);
      setCardState(CardState.LOADED);
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
        height="40%"
        sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }}
      />
      <Skeleton
        variant="text"
        width="90%"
        sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)', mt: 2 }}
      />
      <Skeleton
        variant="text"
        width="80%"
        sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }}
      />
      <Skeleton
        variant="text"
        width="60%"
        sx={{ bgcolor: 'rgba(0, 0, 0, 0.08)' }}
      />
    </SkeletonContainer>
  );

  const renderLoadedState = () => {
    if (loading) {
      return renderLoadingSkeleton();
    }

    if (error) {
      return (
        <SkeletonContainer>
          <RestingTitle sx={{ color: '#c24646', fontSize: '1rem' }}>
            Error: {error.message}
          </RestingTitle>
        </SkeletonContainer>
      );
    }

    if (!film) {
      return renderLoadingSkeleton();
    }

    // Create a short description with the title inline
    const shortDescription = film.description
      ? film.description.length > 120
        ? `${film.description.substring(0, 120)}...`
        : film.description
      : 'No description available.';

    return (
      <>
        <ImageContainer isExpanded={isExpanded}>
          <MovieImage src={film.image || ''} alt={film.title} loading="lazy" />
          <LoadedTitle isVisible={!isExpanded}>{film.title}</LoadedTitle>
        </ImageContainer>

        <DetailsContainer isExpanded={isExpanded}>
          <Description>
            <FilmTitle>{film.title}</FilmTitle> {shortDescription}
          </Description>

          <DetailRow>
            <DetailLabel>Runtime:</DetailLabel>
            <DetailValue>
              {film.runningTime ? `${film.runningTime} min` : 'N/A'}
            </DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Director:</DetailLabel>
            <DetailValue>{film.director || 'N/A'}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Released:</DetailLabel>
            <DetailValue>{film.releaseDate || 'N/A'}</DetailValue>
          </DetailRow>

          <RtScore>
            <TomatoIcon src="/tomato@3x.png" alt="Rotten Tomatoes" />
            {film.rtScore ? `${film.rtScore}%` : 'N/A'}
          </RtScore>
        </DetailsContainer>
      </>
    );
  };

  return (
    <CardContainer
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
