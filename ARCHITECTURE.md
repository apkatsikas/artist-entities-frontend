# Architecture

This project uses a **feature-based MVVM** pattern. Code is organized by feature first, then by layer within each feature. This keeps related code together and makes it easy to find everything belonging to a feature in one place.

## Directory Structure

```
src/
├── features/
│   ├── artists/
│   │   ├── api/          # HTTP calls only
│   │   ├── services/     # Business logic and validation
│   │   ├── hooks/        # ViewModels — state and orchestration
│   │   └── components/   # Views — JSX and styling only
│   ├── auth/
│   │   ├── api/
│   │   ├── services/
│   │   ├── hooks/        # Includes authContext.ts (context + useAuth hook)
│   │   └── components/   # Includes AuthProvider.tsx
│   ├── shared/
│   │   ├── components/   # Reusable UI components (e.g. FormContainer)
│   │   ├── utils/        # Pure utility functions
│   │   └── constants/    # App-wide constants (theme, sxPresets)
│   └── pages/            # Page components — composition only
└── mocks/                # MSW handlers for testing
```

## Layer Rules

Each layer has a strict contract. Violating these keeps concerns mixed and makes code hard to test or reuse.

### API (`api/`)

- Only HTTP calls (`fetch`)
- No business logic
- No state
- No UI knowledge
- Returns raw `Response` objects

### Service (`services/`)

- Business logic and validation only
- Calls the API layer
- Parses API responses and maps errors to thrown `Error` objects
- No state management
- No React code (no hooks, no JSX)

### ViewModel (`hooks/`)

- Manages async server state via **TanStack Query** (`useMutation`, `useQuery`)
- Calls the service layer — never the API layer directly
- Returns clean data and handler functions to the view, including `isPending` for loading state
- No JSX
- Named with the `use` prefix per React hook convention

### View (`components/`)

- Only JSX and styling via **MUI** (`Box`, `Typography`, `Button`, `TextField`, etc.)
- Shared style tokens live in `shared/constants/theme.ts` (`sxPresets`) — no inline magic numbers
- No API calls
- No business logic
- Receives everything through props
- May import types from its corresponding ViewModel

### Page (`pages/`)

- Composition only
- Calls ViewModel hooks and passes their output as props to View components
- Handles conditional rendering based on app state (e.g. auth)
- No business logic

## Data Flow

```
User action
    ↓
View (component) — calls handler from props
    ↓
ViewModel (hook) — calls service via TanStack Query mutation, exposes data/error/isPending
    ↓
Service — validates, calls API, maps response
    ↓
API — HTTP fetch
    ↓
(response bubbles back up the same chain)
```

## Testing Pattern

Because Views are pure and ViewModels are hooks, tests compose them with a small wrapper:

```tsx
function ArtistSectionWithViewModel() {
  const vm = useArtistSectionViewModel();
  return <ArtistSection {...vm} onFetchArtist={vm.fetchArtist} />;
}
```

This mirrors how the Page composes them and keeps tests realistic without needing to manually construct props.

Tests that use ViewModels must be wrapped with `QueryClientProvider` (and a fresh `QueryClient` with `retry: false` to prevent retries from hanging tests). The `MockAuthProvider` in `src/__tests__/mocks/` includes this automatically.

## TODO

- [ ] Add **Zustand** for shared state that needs to be accessed across multiple features (e.g. a notification system, cross-feature artist selection). Currently `AuthContext` is the only shared state and uses React Context, which is fine for auth. Zustand becomes the right tool when multiple features need to read/write the same state without prop drilling or deeply nested providers.
