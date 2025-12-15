import { nonNull, extendType, idArg } from 'nexus';
import { HelloWorld, Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { getHelloWorld } from '~/shared/utils';
import { GhibliApiService, GhibliApiServiceError } from '~/services/GhibliApi';
import { HttpService } from '~/services/Http/Http.service';

// Create service instances
const httpService = new HttpService();
const ghibliApiService = new GhibliApiService({ httpService });

export const GhibliQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('helloWorld', {
      type: nonNull(HelloWorld),
      resolve: async () => {
        try {
          const helloWorld = getHelloWorld();
          return helloWorld;
        } catch (error) {
          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.field('film', {
      type: Film,
      description: 'Fetch a Studio Ghibli film by its ID',
      args: {
        id: nonNull(
          idArg({ description: 'The unique identifier of the film' }),
        ),
      },
      resolve: async (_, { id }) => {
        try {
          const film = await ghibliApiService.getFilmById(id);
          return film;
        } catch (error) {
          // Handle GhibliApiServiceError with proper GraphQL error codes
          if (error instanceof GhibliApiServiceError) {
            throw new GraphQLError(error.message, {
              extensions: { code: error.code },
            });
          }

          // Re-throw GraphQL errors as-is
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});
