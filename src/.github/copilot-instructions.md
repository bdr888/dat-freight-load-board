# Project Instructions

## Project overview

- React application written in TypeScript.
- Follow the existing architecture and patterns in the codebase.
- Prefer simple, maintainable solutions over unnecessary abstractions.

## Before making changes

- Inspect relevant files and existing implementations first.
- Check package.json for available scripts and dependencies.
- Identify the smallest change that solves the problem.
- Ask for clarification when requirements are ambiguous and the
  ambiguity materially affects the implementation.

## Coding standards

- Use functional React components and hooks.
- Use TypeScript types to make component contracts explicit.
- Avoid `any`; prefer `unknown` when a type is genuinely unknown.
- Keep components focused on a single responsibility.
- Extract reusable logic when there is a real use case.
- Follow existing naming, formatting, and import conventions.
- Avoid adding dependencies unless they provide clear value.

## React conventions

- Never mutate React state directly.
- Use functional state updates when the next state depends
  on the previous state.
- Keep derived values out of state when they can be computed.
- Use stable, meaningful keys when rendering lists.
- Avoid effects for values that can be computed during render.
- Keep effects focused on synchronizing with external systems.

## Testing and validation

- Inspect package.json to determine the available scripts.
- Run relevant tests after changing behavior.
- Run linting and TypeScript checks when available.
- Run the production build when practical.
- Never claim a check passed unless it was actually run.
- If a check cannot run, explain why.

## Change management

- Keep changes scoped to the requested task.
- Do not rewrite unrelated code.
- Do not modify environment files, secrets, or generated files
  unless explicitly required.
- Do not silently change public interfaces or existing behavior.
- Explain important tradeoffs and any remaining risks.

## Completion criteria

- Summarize what changed and why.
- List tests and validation commands actually run.
- Identify any follow-up work or unresolved issues.
