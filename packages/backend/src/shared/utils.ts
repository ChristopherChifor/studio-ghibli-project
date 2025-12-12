const getHelloWorld = () => {
  return {
    message: 'Hello World',
  };
};

/**
 * Raw film data from the Studio Ghibli API (snake_case fields)
 */
interface GhibliApiFilm {
  id: string;
  title: string;
  original_title?: string;
  original_title_romanised?: string;
  image?: string;
  movie_banner?: string;
  description?: string;
  director?: string;
  producer?: string;
  release_date?: string;
  running_time?: string;
  rt_score?: string;
}

/**
 * Transformed film data for GraphQL schema (camelCase fields)
 */
interface Film {
  id: string;
  title: string;
  originalTitle?: string;
  originalTitleRomanised?: string;
  image?: string;
  movieBanner?: string;
  description?: string;
  director?: string;
  producer?: string;
  releaseDate?: string;
  runningTime?: string;
  rtScore?: string;
}

/**
 * Transforms a raw Ghibli API film response from snake_case to camelCase
 */
const transformGhibliFilm = (apiFilm: GhibliApiFilm): Film => {
  return {
    id: apiFilm.id,
    title: apiFilm.title,
    originalTitle: apiFilm.original_title,
    originalTitleRomanised: apiFilm.original_title_romanised,
    image: apiFilm.image,
    movieBanner: apiFilm.movie_banner,
    description: apiFilm.description,
    director: apiFilm.director,
    producer: apiFilm.producer,
    releaseDate: apiFilm.release_date,
    runningTime: apiFilm.running_time,
    rtScore: apiFilm.rt_score,
  };
};

export { getHelloWorld, transformGhibliFilm };
export type { GhibliApiFilm, Film };
