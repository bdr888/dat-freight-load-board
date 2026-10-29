# Architecture Decisions

- **Vite, React, and TypeScript:** Vite provides a fast local development and production build workflow. React keeps the interface in focused components, while TypeScript types the load data and table columns to catch mismatches during development. This combination keeps iteration quick while making UI changes easier to validate and maintain. I've used React the most in my career and am comfortable whipping up an app quickly with it.

- **TanStack Table:** The headless table model is a very easy to use pattern. The library handles client-side search, status filtering, sorting, and pagination out of the box. It can easily adapt to data heavy api calls and is flexible enough to work in tandem with server side pagination, client side cacheing, or other tools that keep web performance quick.

- **shadcn components:** The project uses locally owned, composable UI primitives for buttons, labels, selects, and table structure. Like a mini design system/component library, this provides consistent interaction patterns while keeping the components adaptable. Owning the component source made it easy to update the code to make it WCAG compliant, and work for the Load Board app.

- **Tailwind CSS:** Utility classes are a great solution for quick prototyping, and can also be very effective in larger apps when managed well. Shared theme tokens and global styles live in `src/index.css`, keeping the visual foundation in one place. This keeps styling close to the UI it affects and makes responsive refinements efficient without introducing a separate styling layer.
