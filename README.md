# Studio Ghibli Films Showcase

> A responsive React + GraphQL application showcasing Studio Ghibli films with interactive 3D flip cards. This monorepo contains both frontend and backend packages managed through [lerna](https://github.com/lerna/lerna) and pnpm workspaces.

## Getting Started

### Prerequisites

Ensure you have Node.js version 20.11 installed:

```bash
nvm install 20.11
nvm use
```

The `.nvmrc` file in the root of this project will default to node 20.11 if you run `nvm use`.
Confirm your Node.js version by running `node --version`.

### Install pnpm

This project uses pnpm for package management. Install it by following the [pnpm installation instructions](https://pnpm.io/installation).

### Setup Instructions

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

   We use [pnpm workspaces](https://pnpm.io/workspaces) for dependency sharing between packages.

2. **Copy .env.example values into .env file**:

   ```bash
   cp ./packages/backend/.env.example ./packages/backend/.env
   cp ./packages/frontend/.env.example ./packages/frontend/.env
   ```

3. **Start the development servers**:

- **Backend (GraphQL Server)**:

  ```bash
  cd packages/backend
  pnpm dev
  ```

  The GraphQL server will start on `http://localhost:8080`

- **Frontend (React App)**:

  ```bash
  cd packages/frontend
  pnpm dev
  ```

  The React app will start on `http://localhost:3000`

## Project Structure

- `packages/backend/` - GraphQL server with Apollo Server
- `packages/frontend/` - React application with Apollo Client
- `tasks/` - PRD and task breakdown documentation

## Available Scripts

### Backend

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint

### Frontend

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests
- `pnpm codegen` - Generate GraphQL types

## GraphQL Code Generation

This project uses GraphQL Code Generation with the client preset to create TypeScript types and typed GraphQL operations.

### Using Codegen

1. **Write GraphQL operations** in TypeScript files within `src/graphql/queries/` or `src/graphql/mutations/` directories
2. **Generate types and utilities**:
   ```bash
   cd packages/frontend
   pnpm codegen
   ```
3. **Import and use the generated `gql` function** in your components:

   ```typescript
   import { GET_FILM } from '~/graphql/queries';
   import { useQuery } from '@apollo/client';

   const { data, loading, error } = useQuery(GET_FILM);
   ```

### Codegen Configuration

The codegen configuration in `codegen.ts` uses:

- **Schema**: `../backend/schema.graphql` (local schema file)
- **Documents**: `./src/graphql/mutations/*.ts` and `./src/graphql/queries/*.ts`
- **Output**: `./src/graphql/gen/` (generated files directory)
- **Preset**: `client` (provides type-safe GraphQL operations)

---

## Project Overview

This application displays four Studio Ghibli films (Porco Rosso, Kiki's Delivery Service, Howl's Moving Castle, and My Neighbor Totoro) with a polished, interactive card-based UI. Key features include:

- **3D Flip Card Animations**: Cards flip with smooth CSS 3D transforms when loading film data
- **Hover/Tap Expansion**: Loaded cards reveal additional details on hover (desktop) or tap (mobile)
- **GraphQL Backend**: Apollo Server proxies the public Studio Ghibli API with type-safe schema
- **Responsive Design**: Works seamlessly from 320px mobile to large desktop screens
- **Error Handling**: Toast notifications and in-card error states for failed requests
- **Accessibility**: Supports reduced-motion preferences for users who prefer minimal animations

## Dev-Tasks Process

This project was developed using the **dev-tasks workflow** as specified in the challenge requirements:

### PRD (Product Requirements Document)

Created a comprehensive PRD (`tasks/prd-studio-ghibli.md`) covering:

- User stories for all interactions
- Functional requirements for frontend and backend
- Design specifications (animations, colors, breakpoints)
- Technical considerations and file structure
- API integration details

### Task Breakdown

Generated actionable tasks (`tasks/tasks-prd-studio-ghibli.md`) organized into:

1. **Backend: Film GraphQL Type & Schema** - Define Film type with snake_case to camelCase transformation
2. **Backend: Ghibli API Service** - Service layer for fetching film data with comprehensive error handling
3. **Backend: Film Query Resolver** - GraphQL query implementation
4. **Frontend: GraphQL Query Setup** - GET_FILM query with codegen types
5. **Frontend: Movie Card Component** - Three-state card with flip animations
6. **Frontend: Responsive Grid Layout** - 1x4 desktop, single-column mobile
7. **Frontend: Loading & Error Handling** - Skeletons, button states, toast notifications

### Git Workflow

Followed conventional commit format throughout development:

- `feat(backend): add GhibliApi service with error handling`
- `feat(frontend): movie card UI polish and error toasts`
- `chore: update package README repos`

## Time Spent

| Task                                    | Time         |
| --------------------------------------- | ------------ |
| PRD & Task Planning                     | ~30 min      |
| Backend Implementation (Schema/Service) | ~45 min      |
| Frontend GraphQL Setup & Codegen        | ~20 min      |
| MovieCard Component & Animations        | ~1.5 hrs     |
| Responsive Design & Styling             | ~45 min      |
| Error Handling & Polish                 | ~30 min      |
| Final Review & Documentation            | ~20 min      |
| **Total**                               | **~4.5 hrs** |

## Technology Rationale

### Frontend Stack

- **React + TypeScript**: Type safety and component architecture
- **Apollo Client**: Seamless GraphQL integration with caching and typed hooks
- **MUI + styled-components**: Rapid UI development with customizable theming
- **Vite**: Fast HMR and modern build tooling
- **GraphQL Codegen**: Auto-generated TypeScript types from schema

### Backend Stack

- **Apollo Server + Express**: Production-ready GraphQL server
- **Nexus**: Code-first schema definition with TypeScript integration
- **Axios**: Robust HTTP client for API calls

### Architecture Decisions

- **Lazy Query Pattern**: Used `useLazyQuery` for on-demand fetching to avoid unnecessary API calls
- **Service Layer**: Separated API logic into `GhibliApiService` for testability and error handling
- **Custom Error Types**: `GhibliApiServiceError` for typed error handling across the stack
- **Toast Context**: Centralized notification system for user feedback

## Challenges Encountered

1. **3D Flip Animation Backface**: Required careful handling of `backface-visibility` and `transform-style: preserve-3d` to prevent visual glitches during the flip animation.

2. **Touch vs Mouse Detection**: Implementing reliable touch device detection for mobile interactions required checking both `ontouchstart` and `navigator.maxTouchPoints`.

3. **Animation Performance**: Used `willChange` CSS property and GPU-accelerated transforms to ensure smooth 60fps animations on mobile devices.

4. **GraphQL Type Generation**: Setting up the codegen pipeline to watch both schema and query files required careful configuration of the client preset.

## Known Limitations

1. **No Data Persistence**: Cards reset to initial state on page refresh (as per requirements - no caching)
2. **Single Page Only**: No routing to individual film detail pages
3. **Limited Error Recovery**: Users must refresh the page to retry failed requests
4. **No Offline Support**: Requires network connectivity for all operations

## Future Improvements

With additional time, I would implement:

1. **Skeleton Loading States**: More detailed skeleton UI matching the card layout
2. **Error Retry Mechanism**: Allow users to retry failed requests without refreshing
3. **Image Preloading**: Preload film images after initial page load for faster transitions
4. **Unit/Integration Tests**: Comprehensive test coverage for components and hooks
5. **Offline Support**: Service worker caching for basic offline functionality
6. **Film Comparison**: Side-by-side comparison feature for multiple films
7. **Keyboard Navigation**: Full keyboard accessibility for card interactions
8. **Dark Mode**: Alternative color scheme respecting system preferences

---
