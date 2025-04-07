# PMKIN-JS Development Guide

## Build Commands
- `bun run build` - Build the package
- `bun run format` - Format code with Prettier
- `bun run test` - Run all tests with Vitest
- `bun run test src/file.test.ts` - Run a single test file
- `bun run typecheck` - Run TypeScript type checking

## Code Style Guidelines
- **Formatting**: Use Prettier for consistent formatting
- **Types**: Use strong TypeScript types; enable strict mode
- **Imports**: Keep imports sorted alphabetically; use explicit named imports
- **Naming**: Use PascalCase for classes/interfaces, camelCase for variables/functions
- **Error Handling**: Use specific error classes; check for null/undefined responses

## TypeScript Conventions
- Prefer interfaces over types for object definitions
- Use explicit return types for functions
- Define proper types for API responses
- Make private properties readonly when possible
- Use string literal types for constants

## Testing Practices
- Mock external dependencies using vi.mock()
- Test success and error cases
- Use descriptive test names with "should" pattern
- Group related tests with describe blocks
- Test error scenarios with expect().rejects.toThrow()