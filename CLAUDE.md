# LUVLY SWIPE CONNECT GUIDELINES

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Code Style
- React functional components with TypeScript
- PascalCase for components, camelCase for functions/variables
- Destructure props at component start
- Prefix handler functions with `handle`
- Use shadcn/ui components with Tailwind styling
- Utility class composition with `cn()` helper

## Import Order
1. React imports
2. Third-party libraries
3. Local components
4. Utility functions

## TypeScript
- Define interfaces for component props
- Use React.FC when appropriate
- State management with React hooks

## Error Handling
- Use toast notifications for user feedback
- Form validation with conditional rendering