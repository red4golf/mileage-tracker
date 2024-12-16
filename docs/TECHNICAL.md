# Technical Documentation

## Architecture Overview

### Frontend Architecture

The application follows a component-based architecture using React and TypeScript. Key architectural decisions include:

1. **State Management**
   - React Query for server state
   - React Context for theme and auth state
   - Local state for component-specific UI

2. **Routing**
   - React Router v6
   - Protected routes for authenticated users
   - Nested routes for feature modules

3. **Data Layer**
   - Google Sheets API integration
   - Centralized service layer
   - Type-safe API contracts

### Data Structure

#### Google Sheets Structure

1. **Vehicles Sheet**
   ```
   Columns:
   - A: ID (uuid)
   - B: Name
   - C: Current Mileage
   - D: Cost Per Mile
   - E: Status
   - F: Category
   - G: Notes
   - H: Created At
   - I: Updated At
   ```

2. **Mileage Entries Sheet**
   ```
   Columns:
   - A: ID (uuid)
   - B: Vehicle ID
   - C: Date
   - D: Ending Mileage
   - E: Notes
   ```

3. **Monthly Transfers Sheet**
   ```
   Columns:
   - A: Month
   - B: Status
   - C: Confirmation ID
   - D: Timestamp
   ```

### Security

1. **Authentication**
   - Google OAuth 2.0
   - Token management
   - Automatic token refresh

2. **Authorization**
   - Role-based access control
   - Sheet-level permissions
   - API scope limitations

## Component Guidelines

### Base Components

All base components should:
1. Be fully typed with TypeScript
2. Support dark mode
3. Accept common HTML attributes
4. Include loading states where applicable
5. Handle error states appropriately

Example:
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}
```

### Form Validation

Forms use React Hook Form with Zod schemas:

```tsx
const schema = z.object({
  field: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;
```

### API Integration

Services follow a singleton pattern:

```typescript
class Service {
  private static instance: Service;
  
  static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }
}
```

## Build and Deploy

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

### Production

1. Build:
   ```bash
   npm run build
   ```

2. Environment variables needed:
   ```
   VITE_GOOGLE_CLIENT_ID=
   VITE_GOOGLE_SHEETS_ID=
   ```

## Testing Strategy

1. **Unit Tests**
   - Components
   - Utilities
   - Validation logic

2. **Integration Tests**
   - Form submissions
   - API interactions
   - Navigation flows

3. **E2E Tests**
   - Critical user paths
   - Authentication flows
   - Data persistence

## Performance Considerations

1. **Data Fetching**
   - React Query caching
   - Batch operations
   - Optimistic updates

2. **React Optimization**
   - Memoization
   - Code splitting
   - Lazy loading

3. **Bundle Size**
   - Tree shaking
   - Dynamic imports
   - Module analysis