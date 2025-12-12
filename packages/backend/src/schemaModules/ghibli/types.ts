/**
 * Raw API response from Studio Ghibli API (snake_case fields)
 */
export interface GhibliFilmApiResponse {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
}

/**
 * Film type matching GraphQL schema (camelCase fields)
 */
export interface Film {
  id: string;
  title: string;
  originalTitle: string | null;
  originalTitleRomanised: string | null;
  image: string | null;
  movieBanner: string | null;
  description: string | null;
  director: string | null;
  producer: string | null;
  releaseDate: string | null;
  runningTime: string | null;
  rtScore: string | null;
}

/**
 * Transforms snake_case API response to camelCase Film object
 */
export function transformFilmResponse(
  apiResponse: GhibliFilmApiResponse,
): Film {
  return {
    id: apiResponse.id,
    title: apiResponse.title,
    originalTitle: apiResponse.original_title || null,
    originalTitleRomanised: apiResponse.original_title_romanised || null,
    image: apiResponse.image || null,
    movieBanner: apiResponse.movie_banner || null,
    description: apiResponse.description || null,
    director: apiResponse.director || null,
    producer: apiResponse.producer || null,
    releaseDate: apiResponse.release_date || null,
    runningTime: apiResponse.running_time || null,
    rtScore: apiResponse.rt_score || null,
  };
}
