# Project Instructions

## Project

- This is a React application built with TypeScript and Vite.
- Inspect the existing codebase before proposing architectural changes.
- Follow the project's existing component structure, libraries, and conventions.
- Use `package.json` as the source of truth for available scripts and dependencies.

## Implementation

- Prefer the simplest solution that satisfies the requirements.
- Use functional React components and hooks.
- Prefer precise TypeScript types; avoid `any`.
- Do not mutate React state, props, or existing data structures
- Use functional state updates when the next state depends on previous state.
- Derive values during render when they do not need independent state.
- Avoid unnecessary effects, abstractions, dependencies, and refactoring.
- Keep changes focused on the requested behavior.

## User experience

- Use semantic HTML and accessible controls.
- Handle loading, empty, success, and error states when applicable.
- Preserve existing behavior unless the task explicitly requires a change.

## Testing and verification

- Inspect package.json before running commands.
- Add or update tests for meaningful behavior changes when a test setup exists.
- Run relevant tests, linting, type checks, and builds when available.
- Do not claim a command passed unless it was actually executed successfully.
- If validation cannot run, explain what was skipped and why.

## Working with the codebase

- Inspect relevant components, types, and tests before editing.
- Prefer existing utilities and dependencies over introducing new ones.
- Never silently change public interfaces or remove existing functionality.
- Do not modify secrets, credentials, or environment files unnecessarily.
- Review the final diff for unrelated changes.

## Completion

- Summarize what changed and why.
- List the validation commands actually run and their results.
- Mention important assumptions, limitations, or follow-up work.
