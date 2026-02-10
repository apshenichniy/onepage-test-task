# OnePage

No-code one-page website builder with an interactive visual element editor.

## Tech Stack

| Technology | Role |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| MobX | Reactive state management |
| TanStack Router | File-based routing |
| Tailwind CSS 4 | Utility-first styling |
| Vite 7 | Dev server and bundler |
| dnd-kit | Drag-and-drop interactions |
| Motion | Animations and transitions |
| CVA | Component variant styling |
| Biome / Ultracite | Linting and formatting |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest)

### Setup

```bash
git clone <repo-url>
cd onepage-test-task
bun install
bun run dev        # http://localhost:3000
```

### Commands

| Command | Description |
|---|---|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build |
| `bun run preview` | Preview production build |
| `bun run test` | Run tests (Vitest) |
| `bun run check` | Check code quality (Ultracite) |
| `bun run fix` | Auto-fix lint/format issues |

## Project Structure

```
src/
├── routes/                  # TanStack Router pages
│   ├── __root.tsx           # Root layout
│   └── index.tsx            # Main page, side-effect imports
│
├── components/              # Core layout components
│   ├── preview-canvas.tsx   # Live preview area
│   ├── editor-sidebar.tsx   # Draggable panel sidebar
│   ├── panel-stack.tsx      # Animated panel navigation
│   └── icons.tsx            # SVG icon components
│
├── elements/                # Self-contained element modules
│   ├── heading/             # Heading element
│   │   ├── types.ts
│   │   ├── heading.store.ts
│   │   ├── panels.ts        # Panel registration (side-effect)
│   │   └── ui/              # Preview + panel components
│   └── tagline/             # Tagline (tags) element
│       ├── types.ts
│       ├── tagline.store.ts
│       ├── panels.ts
│       └── ui/
│
├── shared/
│   ├── stores/
│   │   ├── preview.store.ts          # Root store (all element stores)
│   │   └── panel-navigation.store.ts # Panel stack navigation
│   ├── types.ts                        # Shared types (Alignment, etc.)
│   ├── lib/
│   │   └── panel-registry.ts         # Type-safe panel registry
│   └── ui/                           # Reusable UI components
│
├── lib/
│   └── utils.ts             # cn() utility (clsx + tailwind-merge)
├── router.tsx               # Router configuration
└── styles.css               # Global styles and animations
```

## Architecture

### State Management

MobX stores are composed into a single root `PreviewStore`, provided to the component tree via React Context:

```
PreviewStore
├── heading: HeadingStore      # text, link, styles
├── tagline: TaglineStore      # items[], styles
└── panelNavigation: PanelNavigationStore  # panel stack, open/close
```

`PreviewStore` is instantiated in the route component via `useState(() => new PreviewStore())` to ensure a fresh store per request during SSR. The context defaults to `null`, and `usePreview()` throws if called outside the provider.

Each element store sets up a debounced MobX `reaction` in its constructor to persist state changes (e.g. `POST http://api/heading`). Setters only mutate observables; persistence is handled automatically by the reaction with a 300ms delay.

Components access stores through the `usePreview()` hook. All UI components are wrapped with `observer()` from `mobx-react-lite`, so changes to store properties automatically trigger re-renders.

### UI Layout

- **PreviewCanvas** renders the live page preview. Each element is wrapped in `ElementPreview`, which acts as a click target to open the element's editor panel.
- **EditorSidebar** is a draggable overlay that hosts the `PanelStack`. It slides in/out with fade + zoom animations and can be repositioned by dragging the panel header handle. Drag position is applied directly via `style.transform` through `requestAnimationFrame`, bypassing React state to avoid re-renders during drag.

### Panel System

Panels are registered at module load time via side-effect imports and stored in a global `Map<string, ComponentType>`. Panel routes are fully typed through TypeScript declaration merging on the `PanelRouteMap` interface.

Navigation uses a stack model:

- `open(panel)` -- opens a top-level panel (replaces stack)
- `push(panel)` -- navigates deeper (adds to stack)
- `pop()` -- goes back (removes from stack)
- `close()` -- closes the sidebar

Transitions between panels are animated with Motion, using a `direction` flag (`forward` / `backward`) to determine slide direction.

## Adding a New Element

Example: adding a `Button` element.

### 1. Create the element folder

```
src/elements/button/
├── types.ts
├── button.store.ts
├── panels.ts
└── ui/
    ├── button-preview.tsx
    ├── button-main-panel.tsx
    └── button-styles-panel.tsx
```

### 2. Define types (`types.ts`)

```ts
import type { Alignment } from "@/shared/types";

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonStyles {
  variant: ButtonVariant;
  alignment: Alignment;
}
```

### 3. Create the MobX store (`button.store.ts`)

```ts
import { makeAutoObservable, reaction } from "mobx";
import type { ButtonStyles } from "./types";

export class ButtonStore {
  text = "Click me";
  link = "";
  styles: ButtonStyles = {
    variant: "primary",
    alignment: "center",
  };

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({ text: this.text, link: this.link, styles: { ...this.styles } }),
      (data) => console.log("POST http://api/button", data),
      { delay: 300 }
    );
  }

  setText(value: string) {
    this.text = value;
  }

  setVariant(value: ButtonStyles["variant"]) {
    this.styles.variant = value;
  }
}
```

### 4. Build preview and panel components (`ui/`)

Preview component renders the element on the canvas, panel components provide the editing UI. Wrap all components with `observer()` and use `usePreview()` to access the store.

### 5. Register panels (`panels.ts`)

```ts
import { registerPanel } from "@/shared/lib/panel-registry";
import { ButtonMainPanel } from "./ui/button-main-panel";
import { ButtonStylesPanel } from "./ui/button-styles-panel";

declare module "@/shared/lib/panel-registry" {
  interface PanelRouteMap {
    "button-main": { type: "button-main" };
    "button-styles": { type: "button-styles" };
  }
}

registerPanel("button-main", ButtonMainPanel);
registerPanel("button-styles", ButtonStylesPanel);
```

### 6. Wire into the root store (`src/shared/stores/preview.store.ts`)

Add the new store as a property of `PreviewStore`. The store is instantiated per request via `useState(() => new PreviewStore())` in the route component, so each SSR request gets a fresh instance and avoids shared state between requests.

```ts
import { ButtonStore } from "@/elements/button/button.store";

export class PreviewStore {
  heading = new HeadingStore();
  tagline = new TaglineStore();
  button = new ButtonStore();        // add this
  panelNavigation = new PanelNavigationStore();
}
```

### 7. Add preview to the canvas (`src/components/preview-canvas.tsx`)

Render `<ButtonPreview />` inside the canvas layout, wrapped with `<ElementPreview>`.

### 8. Import the side-effect module (`src/routes/index.tsx`)

```ts
import "@/elements/button/panels";
```

This import triggers panel registration at startup.

## Code Quality

The project uses [Ultracite](https://github.com/haydenbleasel/ultracite), a zero-config Biome preset for strict linting and formatting.

```bash
bun run check    # Check for issues
bun run fix      # Auto-fix issues
```
