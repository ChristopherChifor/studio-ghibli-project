import { AxiosError } from 'axios';
import { GhibliApiService, GhibliApiServiceError } from './GhibliApi.service';
import { HttpService } from '../Http/Http.service';
import { ErrorMessages, GQL_ERROR_CODES } from '../../shared/constants';

// Mock HttpService
jest.mock('../Http/Http.service');

/**
 * Helper to create a mock AxiosError
 */
const createAxiosError = (statusCode?: number, code?: string): AxiosError => {
  const error = new AxiosError('Request failed');
  error.response = statusCode
    ? ({
        status: statusCode,
        data: {},
        statusText: '',
        headers: {},
        config: {},
      } as never)
    : undefined;
  error.code = code;
  return error;
};

describe('GhibliApiService', () => {
  let ghibliApiService: GhibliApiService;
  let mockHttpService: jest.Mocked<HttpService>;

  const mockApiFilm = {
    id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
    title: 'Castle in the Sky',
    original_title: '天空の城ラピュタ',
    original_title_romanised: 'Tenkū no Shiro Rapyuta',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg',
    movie_banner:
      'https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg',
    description:
      'The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa.',
    director: 'Hayao Miyazaki',
    producer: 'Isao Takahata',
    release_date: '1986',
    running_time: '124',
    rt_score: '95',
  };

  const expectedTransformedFilm = {
    id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
    title: 'Castle in the Sky',
    originalTitle: '天空の城ラピュタ',
    originalTitleRomanised: 'Tenkū no Shiro Rapyuta',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg',
    movieBanner:
      'https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg',
    description:
      'The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa.',
    director: 'Hayao Miyazaki',
    producer: 'Isao Takahata',
    releaseDate: '1986',
    runningTime: '124',
    rtScore: '95',
  };

  beforeEach(() => {
    mockHttpService = new HttpService() as jest.Mocked<HttpService>;
    ghibliApiService = new GhibliApiService({ httpService: mockHttpService });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFilmById', () => {
    it('should fetch a film by ID and return transformed data', async () => {
      mockHttpService.get = jest.fn().mockResolvedValue({ data: mockApiFilm });

      const result = await ghibliApiService.getFilmById(mockApiFilm.id);

      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint: `https://ghibliapi.vercel.app/films/${mockApiFilm.id}`,
      });
      expect(result).toEqual(expectedTransformedFilm);
    });

    it('should transform snake_case fields to camelCase', async () => {
      mockHttpService.get = jest.fn().mockResolvedValue({ data: mockApiFilm });

      const result = await ghibliApiService.getFilmById(mockApiFilm.id);

      expect(result.originalTitle).toBe(mockApiFilm.original_title);
      expect(result.originalTitleRomanised).toBe(
        mockApiFilm.original_title_romanised,
      );
      expect(result.movieBanner).toBe(mockApiFilm.movie_banner);
      expect(result.releaseDate).toBe(mockApiFilm.release_date);
      expect(result.runningTime).toBe(mockApiFilm.running_time);
      expect(result.rtScore).toBe(mockApiFilm.rt_score);
    });

    it('should throw GhibliApiServiceError with NOT_FOUND code for 404 response', async () => {
      const axiosError = createAxiosError(404);
      mockHttpService.get = jest.fn().mockRejectedValue(axiosError);

      await expect(
        ghibliApiService.getFilmById('invalid-id'),
      ).rejects.toMatchObject({
        message: ErrorMessages.FilmNotFound,
        code: GQL_ERROR_CODES.NOT_FOUND,
        statusCode: 404,
      });
    });

    it('should throw GhibliApiServiceError with SERVICE_UNAVAILABLE code for 5xx responses', async () => {
      const axiosError = createAxiosError(503);
      mockHttpService.get = jest.fn().mockRejectedValue(axiosError);

      await expect(
        ghibliApiService.getFilmById(mockApiFilm.id),
      ).rejects.toMatchObject({
        message: ErrorMessages.GhibliApiUnavailable,
        code: GQL_ERROR_CODES.SERVICE_UNAVAILABLE,
        statusCode: 503,
      });
    });

    it('should throw GhibliApiServiceError with NETWORK_ERROR code for connection errors', async () => {
      const axiosError = createAxiosError(undefined, 'ECONNREFUSED');
      mockHttpService.get = jest.fn().mockRejectedValue(axiosError);

      await expect(
        ghibliApiService.getFilmById(mockApiFilm.id),
      ).rejects.toMatchObject({
        message: ErrorMessages.NetworkError,
        code: GQL_ERROR_CODES.NETWORK_ERROR,
      });
    });

    it('should throw GhibliApiServiceError with NETWORK_ERROR code when no response received', async () => {
      const axiosError = createAxiosError(undefined);
      mockHttpService.get = jest.fn().mockRejectedValue(axiosError);

      await expect(
        ghibliApiService.getFilmById(mockApiFilm.id),
      ).rejects.toMatchObject({
        message: ErrorMessages.NetworkError,
        code: GQL_ERROR_CODES.NETWORK_ERROR,
      });
    });

    it('should handle non-Axios errors gracefully', async () => {
      const genericError = new Error('Unexpected error');
      mockHttpService.get = jest.fn().mockRejectedValue(genericError);

      await expect(
        ghibliApiService.getFilmById(mockApiFilm.id),
      ).rejects.toMatchObject({
        message: 'Unexpected error',
        code: GQL_ERROR_CODES.SERVER_ERROR,
      });
    });
  });

  describe('getAllFilms', () => {
    it('should fetch all films and return transformed data', async () => {
      const mockFilms = [
        mockApiFilm,
        { ...mockApiFilm, id: 'another-id', title: 'My Neighbor Totoro' },
      ];
      mockHttpService.get = jest.fn().mockResolvedValue({ data: mockFilms });

      const result = await ghibliApiService.getAllFilms();

      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint: 'https://ghibliapi.vercel.app/films',
      });
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expectedTransformedFilm);
    });

    it('should return empty array when no films exist', async () => {
      mockHttpService.get = jest.fn().mockResolvedValue({ data: [] });

      const result = await ghibliApiService.getAllFilms();

      expect(result).toEqual([]);
    });

    it('should throw GhibliApiServiceError with SERVICE_UNAVAILABLE code for 500 response', async () => {
      const axiosError = createAxiosError(500);
      mockHttpService.get = jest.fn().mockRejectedValue(axiosError);

      await expect(ghibliApiService.getAllFilms()).rejects.toMatchObject({
        message: ErrorMessages.GhibliApiUnavailable,
        code: GQL_ERROR_CODES.SERVICE_UNAVAILABLE,
        statusCode: 500,
      });
    });

    it('should throw GhibliApiServiceError with NETWORK_ERROR code for DNS errors', async () => {
      const axiosError = createAxiosError(undefined, 'ENOTFOUND');
      mockHttpService.get = jest.fn().mockRejectedValue(axiosError);

      await expect(ghibliApiService.getAllFilms()).rejects.toMatchObject({
        message: ErrorMessages.NetworkError,
        code: GQL_ERROR_CODES.NETWORK_ERROR,
      });
    });
  });

  describe('GhibliApiServiceError', () => {
    it('should be an instance of Error', () => {
      const error = new GhibliApiServiceError({
        message: 'Test error',
        code: 'TEST_CODE',
        statusCode: 400,
      });

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(GhibliApiServiceError);
      expect(error.name).toBe('GhibliApiServiceError');
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.statusCode).toBe(400);
    });
  });
});
