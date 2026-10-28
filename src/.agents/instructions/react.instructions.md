---
name: React and TypeScript conventions
description: Guidelines for React components, hooks, state management, and TypeScript source files.
applyTo: 'src/**/*.{ts,tsx}'
---

# React and TypeScript

## Components

- Prefer focused function components.
- Define explicit prop types for component interfaces.
- Follow existing naming and file organization.
- Extract a shared component when reuse or separation of concerns justifies it.
- Avoid creating abstractions for one-off trivial logic.

## State and rendering

- Treat props and state as immutable.
- Use functional state updates when dependent on previous state.
- Use stable keys when rendering lists.
- Avoid storing values that can be derived from existing state or props.
- Do not use useEffect solely to calculate derived values.
- Keep effects focused on synchronizing with external systems.
- Clean up subscriptions, listeners, and other resources when necessary.

## Hooks

- Follow the Rules of Hooks.
- Keep hooks at the top level of components or custom hooks.
- Extract custom hooks when they encapsulate reusable behavior.
- Ensure effect dependencies accurately reflect referenced values.

## TypeScript

- Prefer explicit, narrow types over broad or implicit types.
- Use discriminated unions for genuinely distinct states when useful.
- Avoid unnecessary type assertions and non-null assertions.
- Do not suppress type errors just to make validation pass.

## Accessibility

- Prefer semantic HTML over clickable generic elements.
- Associate form controls with accessible labels.
- Preserve keyboard interaction and visible focus states.
