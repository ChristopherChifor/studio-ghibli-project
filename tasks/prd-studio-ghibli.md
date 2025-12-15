# Product Requirements Document: Studio Ghibli Movie Showcase

## 1. Introduction/Overview

The Studio Ghibli Movie Showcase is a responsive single-page React application that displays information about four selected Studio Ghibli films. The application features interactive movie cards with a three-state system (resting, loaded, and expanded) and integrates with a GraphQL backend that proxies data from the public Studio Ghibli API.

**Problem Statement:** Users want an engaging, visually appealing way to discover and learn about Studio Ghibli films with smooth interactions and detailed movie information.

**Goal:** Create a polished, responsive movie showcase application demonstrating proficiency in React, GraphQL, TypeScript, and modern UI/UX practices.

---

## 2. Goals

1. Build a responsive single-page application that works on desktop and mobile devices (down to 320px width)
2. Implement a GraphQL backend that serves as a proxy to the Studio Ghibli API
3. Create interactive movie cards with three distinct states and smooth 3D flip animations
4. Provide a seamless user experience with proper loading states and error handling
5. Use TypeScript with proper typing throughout the stack, leveraging GraphQL codegen for type-safe frontend hooks

---

## 3. User Stories

### US-1: View Initial Movie Cards

**As a** user  
**I want to** see four colored cards with movie titles when I first load the application  
**So that** I know which movies are available to explore

### US-2: Load Movie Data

**As a** user  
**I want to** click a button on a movie card to load that movie's image and title  
**So that** I can see the movie's visual representation

### US-3: View Detailed Movie Information

**As a** desktop user  
**I want to** hover over a loaded movie card to see additional details  
**So that** I can learn more about the film without navigating away

### US-4: View Detailed Movie Information (Mobile)

**As a** mobile user  
**I want to** tap on a loaded movie card to see additional details  
**So that** I can learn more about the film on my touch device

### US-5: Handle Loading States

**As a** user  
**I want to** see a loading animation when movie data is being fetched  
**So that** I know the application is working

### US-6: Handle Errors Gracefully

**As a** user  
**I want to** see clear error messages when something goes wrong  
**So that** I understand what happened and can try again

### US-7: Return to Previous Card State

**As a** user  
**I want to** be able to flip the card back to its previous view  
**So that** I can easily navigate between card states

---

## 4. Functional Requirements

### 4.1 Frontend Requirements

#### Card Display System

**FR-1:** The application SHALL display four movie cards in a horizontal row (1x4 grid) on desktop screen sizes.

**FR-2:** The application SHALL display four movie cards in a single column layout on mobile screen sizes.

**FR-3:** The application SHALL be fully responsive and functional down to 320px viewport width.

**FR-4:** Each card SHALL have a background color corresponding to its position (left to right):

- Card 1 (Porco Rosso): Yellow
- Card 2 (Kiki's Delivery Service): Red
- Card 3 (Howl's Moving Castle): Green
- Card 4 (My Neighbor Totoro): Blue

#### Card States

**FR-5:** Each card SHALL support three distinct states:

| State        | Trigger                                        | Display                                                                                           |
| ------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Resting**  | Initial load                                   | Colored background with movie title centered                                                      |
| **Loaded**   | User clicks "Load" button                      | Movie image with movie title                                                                      |
| **Expanded** | Hover (desktop) or tap (mobile) on loaded card | Movie banner (shrunk upward), Description, Director, Release date, Runtime, Rotten Tomatoes score |

**FR-6:** In the resting state, each card SHALL display:

- Colored background (yellow, red, green, or blue)
- Movie title centered in the card
- A button to load the movie data

**FR-7:** In the loaded state, each card SHALL display:

- Movie poster/image
- Movie title

**FR-8:** In the expanded state, each card SHALL display:

- Movie banner/image (animated to shrink upward)
- Movie description
- Director name
- Release date
- Runtime
- Rotten Tomatoes score (displayed as `[RT Logo] XX%` format)

**FR-8a:** If any data field is missing or empty from the API, the application SHALL display "N/A" for that field.

#### Interactions & Animations

**FR-9:** Cards SHALL use a 3D flip animation (180° rotation on Y-axis) when transitioning between resting and loaded states.

**FR-10:** When hovering (desktop) or tapping (mobile) a loaded card, the movie image SHALL animate to shrink upward to reveal additional movie information below it.

**FR-11:** Users SHALL be able to flip the card back from expanded state to loaded state.

**FR-12:** Users SHALL be able to flip the card back from loaded state to resting state (optional - to re-show the colored card).

#### Loading & Error States

**FR-13:** When a user clicks the load button, the button SHALL display a loading animation/indicator.

**FR-14:** A loading skeleton animation SHALL be displayed on the card while movie data is being fetched.

**FR-15:** If an API error occurs, the application SHALL display:

- An error message inside the affected card
- A toast notification alerting the user

**FR-16:** Error messages SHALL be clear and user-friendly.

#### GraphQL Integration

**FR-17:** The frontend SHALL use Apollo Client for GraphQL communication.

**FR-18:** The frontend SHALL use GraphQL codegen to generate TypeScript types and hooks.

**FR-19:** The application SHALL use `useLazyQuery` (or similar) to fetch movie data on-demand when the user clicks a button.

**FR-20:** All GraphQL queries SHALL be properly typed using generated types.

### 4.2 Backend Requirements

#### GraphQL Schema

**FR-21:** The backend SHALL define a `Film` GraphQL type with the following fields:

- `id`: String (required)
- `title`: String (required)
- `originalTitle`: String
- `originalTitleRomanised`: String
- `image`: String (movie poster URL)
- `movieBanner`: String (banner image URL)
- `description`: String
- `director`: String
- `producer`: String
- `releaseDate`: String
- `runningTime`: String
- `rtScore`: String (Rotten Tomatoes score)

**FR-22:** The backend SHALL implement a `film(id: ID!)` query that fetches a single film by its ID.

**FR-23:** The backend MAY implement a `films` query that fetches all films (optional, for future expansion).

#### API Integration

**FR-24:** The backend SHALL integrate with the Studio Ghibli API at `https://ghibliapi.vercel.app/`.

**FR-25:** The backend SHALL fetch film data from the endpoint: `https://ghibliapi.vercel.app/films/{id}`.

**FR-26:** The backend SHALL NOT cache or persist data (acts as a simple proxy).

**FR-27:** The backend SHALL handle API errors gracefully and return appropriate GraphQL errors.

### 4.3 Film Data

**FR-28:** The application SHALL feature the following four films:

| Film Title              | API ID                                 |
| ----------------------- | -------------------------------------- |
| Porco Rosso             | `ebbb6b7c-945c-41ee-a792-de0e43191bd8` |
| Kiki's Delivery Service | `ea660b10-85c4-4ae3-8a5f-41cea3648e3e` |
| Howl's Moving Castle    | `cd3d059c-09f4-4ff3-8d63-bc765a5184fa` |
| My Neighbor Totoro      | `58611129-2dbc-4a81-a72f-77ddfc1b1b49` |

---

## 5. Non-Goals (Out of Scope)

1. **User Authentication:** No login or user accounts required
2. **Data Persistence:** No database or caching layer needed
3. **Search/Filter Functionality:** Not required for initial implementation
4. **Multiple Pages/Routing:** Single page application only
5. **Film Comparison Features:** No side-by-side comparison needed
6. **Favorites/Bookmarking:** No save functionality required
7. **Additional Films Beyond Four:** Only the specified four films
8. **Video Playback:** No trailers or video content
9. **Backend Caching:** Server acts as a simple proxy without caching

---

## 6. Design Considerations

### Visual Design

- **Card Colors (Resting State):**

  - Porco Rosso: Yellow (`#FFD700` or similar)
  - Kiki's Delivery Service: Red (`#DC143C` or similar)
  - Howl's Moving Castle: Green (`#228B22` or similar)
  - My Neighbor Totoro: Blue (`#4169E1` or similar)

- **Typography:** Use the existing MUI theme typography
- **Spacing:** Consistent padding and margins following MUI spacing guidelines
- **Shadows:** Subtle card shadows for depth

### Animation Specifications

- **3D Flip Animation:**

  - Duration: 600-800ms
  - Easing: ease-in-out
  - Rotation: 180° on Y-axis
  - Preserve 3D perspective for realistic effect

- **Image Shrink Animation (Hover/Tap):**
  - Duration: 300-400ms
  - Easing: ease-out
  - Image shrinks upward to approximately 40-50% of original height
  - Additional info fades in below

### Responsive Breakpoints

- **Desktop:** > 768px (1x4 horizontal row)
- **Mobile:** ≤ 768px (single column, stacked)
- **Minimum supported width:** 320px

### UI Components

- Use MUI components where appropriate
- Use styled-components for custom styling
- Implement loading skeletons using MUI Skeleton component
- Use MUI Snackbar/Alert for toast notifications

### Reference Design

> **Note:** The user will provide reference images showing all three card states (resting, loaded, expanded). Implementation should match the provided design reference.

---

## 7. Technical Considerations

### Frontend Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **State Management:** Apollo Client cache (no additional state management needed)
- **Styling:** styled-components + MUI
- **GraphQL:** Apollo Client with codegen-generated hooks
- **Code Generation:** @graphql-codegen/cli with client preset

### Backend Stack

- **Runtime:** Node.js
- **Framework:** Apollo Server
- **Schema Definition:** Nexus
- **HTTP Client:** Axios (existing HttpService)
- **API Source:** Studio Ghibli API (https://ghibliapi.vercel.app/)

### File Structure Recommendations

```
packages/frontend/src/
├── modules/
│   └── home/
│       ├── Home.tsx
│       ├── components/
│       │   ├── MovieCard/
│       │   │   ├── MovieCard.tsx
│       │   │   ├── MovieCard.styles.ts
│       │   │   ├── MovieCardFront.tsx
│       │   │   ├── MovieCardBack.tsx
│       │   │   └── index.ts
│       │   └── MovieGrid/
│       │       ├── MovieGrid.tsx
│       │       └── index.ts
│       └── constants.ts (film IDs, colors)
├── graphql/
│   └── queries/
│       └── index.ts (add GET_FILM query)

packages/backend/src/
├── schemaModules/
│   └── ghibli/
│       ├── objectTypes.ghibliSchema.ts (add Film type)
│       └── queries.ghibliSchema.ts (add film query)
├── services/
│   └── GhibliApi/
│       └── GhibliApi.service.ts (new service for API calls)
```

### Dependencies

**Frontend (likely already installed):**

- @apollo/client
- @mui/material
- styled-components
- @graphql-codegen/cli
- @graphql-codegen/client-preset

**Backend (likely already installed):**

- apollo-server-express / @apollo/server
- nexus
- axios

### API Response Shape

The Studio Ghibli API returns film data in the following format:

```json
{
  "id": "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
  "title": "My Neighbor Totoro",
  "original_title": "となりのトトロ",
  "original_title_romanised": "Tonari no Totoro",
  "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/rtGDOeG9LzoerkDGZF9dnVeLRPQ.jpg",
  "movie_banner": "https://image.tmdb.org/t/p/original/etqr6fOOCXQOgwrQXaKwenTSuzx.jpg",
  "description": "Two sisters move to the country...",
  "director": "Hayao Miyazaki",
  "producer": "Hayao Miyazaki",
  "release_date": "1988",
  "running_time": "86",
  "rt_score": "93"
}
```

**Note:** API field names use snake_case; transform to camelCase in GraphQL schema.

---

## 8. Success Metrics

| Metric                  | Criteria                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| **Film Loading**        | All four films load successfully when their respective buttons are clicked                      |
| **Card Interactions**   | 3D flip animation works smoothly on card state transitions                                      |
| **Hover/Tap Expansion** | Card expansion animation (image shrink + info reveal) works on desktop (hover) and mobile (tap) |
| **Responsive Design**   | Application displays correctly at all viewport widths from 320px to 1920px+                     |
| **Error Handling**      | Errors display both in-card message and toast notification                                      |
| **Loading States**      | Loading indicators appear during data fetching                                                  |
| **Type Safety**         | All GraphQL operations use codegen-generated types                                              |
| **Mobile Touch**        | Touch interactions (tap to load, tap to expand) work smoothly on mobile devices                 |

---

## 9. Design Decisions

### Resolved

1. **RT Score Display:** Display as percentage with Rotten Tomatoes logo

   - Format: `[RT Logo] 93%`
   - Include space for the Rotten Tomatoes logo icon to the left of the percentage

2. **Empty/Missing Data:** Display "N/A" for any missing or empty data fields from the API

### Open Questions (To Be Determined Later)

1. **Design Reference:** Awaiting image showing all three card states (resting, loaded, expanded) from the user.

2. **Card Flip Back Mechanism:** How should users flip the card back from expanded to loaded state?

   - Tap/click anywhere on the card?
   - Dedicated "close" or "back" button?
   - Tap/click outside the card?

3. **Reset to Resting State:** Should users be able to reset a loaded card back to its initial colored/resting state, or is this one-way?

4. **Animation Accessibility:** Should there be a reduced-motion option for users who prefer minimal animations?

---

## Appendix A: API Endpoints Reference

| Endpoint                                  | Method | Description               |
| ----------------------------------------- | ------ | ------------------------- |
| `https://ghibliapi.vercel.app/films`      | GET    | List all films            |
| `https://ghibliapi.vercel.app/films/{id}` | GET    | Get a specific film by ID |

---

## Appendix B: Film IDs Quick Reference

```typescript
const FILM_IDS = {
  PORCO_ROSSO: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8',
  KIKIS_DELIVERY_SERVICE: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e',
  HOWLS_MOVING_CASTLE: 'cd3d059c-09f4-4ff3-8d63-bc765a5184fa',
  MY_NEIGHBOR_TOTORO: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
} as const;

const CARD_COLORS = {
  PORCO_ROSSO: '#FFD700', // Yellow
  KIKIS_DELIVERY_SERVICE: '#DC143C', // Red
  HOWLS_MOVING_CASTLE: '#228B22', // Green
  MY_NEIGHBOR_TOTORO: '#4169E1', // Blue
} as const;
```
