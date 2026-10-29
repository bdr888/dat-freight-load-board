<!-- intent-skills:start -->

## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:

- Run `npm exec --no -- intent list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npm exec --no -- intent load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.

<!-- intent-skills:end -->

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
