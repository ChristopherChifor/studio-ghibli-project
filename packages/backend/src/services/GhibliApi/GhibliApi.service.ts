import { AxiosError } from 'axios';
import { HttpService } from '../Http/Http.service';
import { GhibliApiFilm, transformGhibliFilm, Film } from '../../shared/utils';
import { ErrorMessages, GQL_ERROR_CODES } from '../../shared/constants';

const GHIBLI_API_BASE_URL = 'https://ghibliapi.vercel.app';

interface GhibliApiServiceDependencies {
  httpService: HttpService;
}

export interface GhibliApiError {
  message: string;
  code: string;
  statusCode?: number;
}

/**
 * Custom error class for GhibliApi-related errors
 */
export class GhibliApiServiceError extends Error {
  public code: string;
  public statusCode?: number;

  constructor({ message, code, statusCode }: GhibliApiError) {
    super(message);
    this.name = 'GhibliApiServiceError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

/**
 * Creates a GhibliApiServiceError from an Axios or generic error
 */
const createApiError = (error: unknown): GhibliApiServiceError => {
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;

    if (statusCode === 404) {
      return new GhibliApiServiceError({
        message: ErrorMessages.FilmNotFound,
        code: GQL_ERROR_CODES.NOT_FOUND,
        statusCode,
      });
    }

    if (statusCode && statusCode >= 500) {
      return new GhibliApiServiceError({
        message: ErrorMessages.GhibliApiUnavailable,
        code: GQL_ERROR_CODES.SERVICE_UNAVAILABLE,
        statusCode,
      });
    }

    // Network errors (no response received)
    if (
      error.code === 'ECONNREFUSED' ||
      error.code === 'ENOTFOUND' ||
      !error.response
    ) {
      return new GhibliApiServiceError({
        message: ErrorMessages.NetworkError,
        code: GQL_ERROR_CODES.NETWORK_ERROR,
      });
    }

    // Other HTTP errors
    return new GhibliApiServiceError({
      message: error.message || ErrorMessages.ServerError,
      code: GQL_ERROR_CODES.SERVER_ERROR,
      statusCode,
    });
  }

  // Non-Axios errors
  return new GhibliApiServiceError({
    message: error instanceof Error ? error.message : ErrorMessages.ServerError,
    code: GQL_ERROR_CODES.SERVER_ERROR,
  });
};

export class GhibliApiService {
  private httpService: HttpService;
  private baseUrl: string;

  public constructor(
    { httpService }: GhibliApiServiceDependencies,
    baseUrl: string = GHIBLI_API_BASE_URL,
  ) {
    this.httpService = httpService;
    this.baseUrl = baseUrl;
  }

  /**
   * Fetches a single film by ID from the Studio Ghibli API
   * @param id - The unique identifier of the film
   * @returns The transformed film data with camelCase fields
   * @throws GhibliApiServiceError if the request fails
   */
  public async getFilmById(id: string): Promise<Film> {
    try {
      const endpoint = `${this.baseUrl}/films/${id}`;
      const response = await this.httpService.get({ endpoint });
      const apiFilm = response.data as GhibliApiFilm;

      return transformGhibliFilm(apiFilm);
    } catch (error) {
      throw createApiError(error);
    }
  }

  /**
   * Fetches all films from the Studio Ghibli API
   * @returns Array of transformed film data with camelCase fields
   * @throws GhibliApiServiceError if the request fails
   */
  public async getAllFilms(): Promise<Film[]> {
    try {
      const endpoint = `${this.baseUrl}/films`;
      const response = await this.httpService.get({ endpoint });
      const apiFilms = response.data as GhibliApiFilm[];

      return apiFilms.map(transformGhibliFilm);
    } catch (error) {
      throw createApiError(error);
    }
  }
}
