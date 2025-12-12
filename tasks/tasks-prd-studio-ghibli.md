# Task List: Studio Ghibli Movie Showcase

> Generated from: `prd-studio-ghibli.md`

## Relevant Files

- `packages/backend/src/schemaModules/ghibli/objectTypes.ghibliSchema.ts` - Defines the Film GraphQL object type with all required fields
- `packages/backend/src/schemaModules/ghibli/types.ts` - TypeScript interfaces for API response (snake_case) and Film type (camelCase), plus transformation function
- `packages/backend/src/schemaModules/ghibli/index.ts` - Exports for ghibli schema module

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `pnpm test` or `npx jest [optional/path/to/test/file]` to run tests.
- Run `pnpm codegen` in the frontend package after updating GraphQL queries to regenerate types.

---

## Tasks

- [ ] 1.0 Backend: Create Film GraphQL Type & Schema

  - [x] 1.1 Define the Film object type with all required fields (id, title, image, movieBanner, description, director, releaseDate, runningTime, rtScore, etc.)
  - [x] 1.2 Transform snake_case API fields to camelCase GraphQL fields

- [ ] 2.0 Backend: Create Ghibli API Service

  - [ ] 2.1 Build a service that fetches film data from the Studio Ghibli API (`https://ghibliapi.vercel.app/films/{id}`)
  - [ ] 2.2 Handle API errors gracefully and return appropriate error responses

- [ ] 3.0 Backend: Implement Film Query Resolver

  - [ ] 3.1 Create a `film(id: ID!)` query resolver that uses the Ghibli API service
  - [ ] 3.2 Return properly formatted GraphQL errors for failed requests

- [ ] 4.0 Frontend: Set Up GraphQL Query & Generate Types

  - [ ] 4.1 Create the `GET_FILM` GraphQL query
  - [ ] 4.2 Run codegen to generate TypeScript types and hooks
  - [ ] 4.3 Configure `useLazyQuery` for on-demand fetching

- [ ] 5.0 Frontend: Create Movie Card Component with Three States

  - [ ] 5.1 Build the card component supporting resting, loaded, and expanded states
  - [ ] 5.2 Implement 3D flip animation for state transitions
  - [ ] 5.3 Implement hover/tap animation for expanded state (image shrinks upward, details revealed)
  - [ ] 5.4 Handle desktop hover and mobile tap interactions

- [ ] 6.0 Frontend: Create Responsive Movie Grid Layout

  - [ ] 6.1 Build the grid container with 1x4 horizontal layout on desktop
  - [ ] 6.2 Implement single-column stacked layout on mobile (≤768px)
  - [ ] 6.3 Ensure responsiveness down to 320px viewport width

- [ ] 7.0 Frontend: Implement Loading States & Error Handling
  - [ ] 7.1 Add loading skeleton animation during data fetch
  - [ ] 7.2 Add loading indicator to the "Load" button when clicked
  - [ ] 7.3 Display error messages inside affected cards
  - [ ] 7.4 Show toast notifications for errors using MUI Snackbar/Alert

---

I have generated the high-level tasks based on the PRD. Ready to generate the sub-tasks? Respond with **"Go"** to proceed.
