import { useLazyQuery } from '@apollo/client';
import { GET_FILM } from '~/graphql/queries';
import { GetFilmQuery } from '~/graphql/gen/graphql';

/**
 * Custom hook for fetching a film on-demand using useLazyQuery.
 * Returns a function to trigger the fetch and the query state.
 *
 * @example
 * const { fetchFilm, film, loading, error, called } = useFilmQuery();
 *
 * // Trigger fetch when user clicks "Load"
 * const handleLoad = () => {
 *   fetchFilm('2baf70d1-42bb-4437-b551-e5fed5a87abe');
 * };
 */
export const useFilmQuery = () => {
  const [getFilm, { data, loading, error, called }] =
    useLazyQuery<GetFilmQuery>(GET_FILM);

  const fetchFilm = (id: string) => {
    getFilm({ variables: { id } });
  };

  return {
    fetchFilm,
    film: data?.film ?? null,
    loading,
    error,
    called,
  };
};
