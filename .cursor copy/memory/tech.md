# Technical Stack - Shards MD

## Core Technologies

### Language & Type System

-   **TypeScript 5.x**: Primary development language
    -   Strict type checking enabled
    -   Advanced type features (conditional types, mapped types)
    -   Full ES2022+ support
    -   Integration with all major libraries

### Frontend Framework & Libraries

#### Core Framework

-   **React 18**: UI framework
    -   Functional components with hooks
    -   Concurrent features support
    -   Strict mode enabled
    -   Error boundaries for fault tolerance

#### State Management

-   **Jotai 2.x**: Atomic state management
    -   Bottom-up approach vs top-down (Redux)
    -   Excellent TypeScript integration
    -   Minimal boilerplate
    -   Atomic updates for performance

#### UI Components & Styling

-   **shadcn/ui**: Component library foundation
    -   Radix UI primitives
    -   Customizable and accessible
    -   Copy-paste component model
-   **TailwindCSS**: Utility-first CSS framework
    -   Custom Obsidian theme integration
    -   Responsive design utilities
    -   Dark/light theme support
-   **Lucide Icons**: Icon library
    -   Consistent with Obsidian's icon system
    -   Tree-shakeable
    -   TypeScript definitions

#### Data & Table Management

-   **TanStack Table v8**: Powerful table functionality
    -   Headless table logic
    -   Advanced sorting, filtering, grouping
    -   Virtual scrolling support
    -   TypeScript-first design
-   **Zod**: Schema validation and type inference
    -   Runtime type safety
    -   Schema-first development
    -   Excellent error messages
    -   TypeScript integration

## Platform Integration

### Obsidian Platform

-   **Obsidian API**: Core platform integration
    -   Plugin lifecycle management
    -   Vault file system access
    -   Theme and settings integration
    -   Event system integration

### Data Sources

-   **Dataview API**: Task data extraction
    -   Query language integration
    -   Real-time data updates
    -   Metadata extraction
    -   File change monitoring

## Build Tools & Development

### Build System

-   **ESBuild**: Fast JavaScript bundler
    -   TypeScript compilation
    -   Tree shaking
    -   Development and production builds
    -   Plugin system integration

### Package Management

-   **PNPM**: Fast, disk space efficient package manager
    -   Strict dependency resolution
    -   Workspace support
    -   Better security model
    -   Faster CI/CD builds

### Code Quality Tools

-   **ESLint**: JavaScript/TypeScript linting
    -   TypeScript integration
    -   React hooks rules
    -   Custom rules for project consistency
-   **Prettier**: Code formatting
    -   Consistent code style
    -   Editor integration
    -   Pre-commit hooks

## Architecture Patterns & Frameworks

### State Management Patterns

-   **Atomic State**: Jotai atoms for granular state
-   **Derived State**: Computed values from base atoms
-   **Side Effects**: Async operations with proper error handling

### Component Patterns

-   **Container/Presentation**: Separation of logic and UI
-   **Custom Hooks**: Reusable state and effect logic
-   **Compound Components**: Complex UI component composition

### Data Flow Patterns

-   **Unidirectional Flow**: Predictable data movement
-   **Event-Driven**: Reactive updates through events
-   **Validation Pipelines**: Multi-layer data validation

## Technical Constraints

### Platform Constraints

-   **Obsidian Desktop Only**: No mobile support in current version
-   **Node.js Environment**: Limited to Obsidian's embedded Node.js
-   **File System Access**: Restricted to vault operations
-   **Memory Limitations**: Large vaults may impact performance

### Performance Constraints

-   **Real-time Sync**: Balancing responsiveness with resource usage
-   **Large Task Lists**: Virtual scrolling for 1000+ tasks
-   **File Watching**: Efficient change detection
-   **Memory Usage**: Minimize impact on Obsidian performance

### Compatibility Constraints

-   **Obsidian Versions**: Support for Obsidian 1.4.x+
-   **Plugin Ecosystem**: Compatibility with Tasks plugin, Dataview
-   **Theme Compatibility**: Support for community themes
-   **API Stability**: Adaptation to Obsidian API changes

## Configuration & Settings

### Build Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  }
}
```

### ESBuild Configuration

```javascript
// esbuild.config.mjs
{
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian'],
  format: 'cjs',
  target: 'node16',
  sourcemap: 'inline'
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
{
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Obsidian CSS variables integration
      }
    }
  }
}
```

## Development Tooling

### IDE Integration

-   **VS Code**: Primary development environment
-   **TypeScript Language Server**: Full type checking
-   **ESLint Extension**: Real-time linting
-   **Prettier Extension**: Auto-formatting

### Development Scripts

```json
{
	"dev": "node esbuild.config.mjs --watch",
	"build": "node esbuild.config.mjs",
	"lint": "eslint src --ext .ts,.tsx",
	"type-check": "tsc --noEmit"
}
```

## Testing Infrastructure

### Testing Framework (Planned)

-   **Jest**: Testing framework
-   **@testing-library/react**: React component testing
-   **@testing-library/jest-dom**: DOM testing utilities
-   **jest-environment-obsidian**: Obsidian-specific test environment

### Testing Strategy

-   **Unit Tests**: Individual functions and components
-   **Integration Tests**: Service layer and API integration
-   **Component Tests**: React component behavior
-   **E2E Tests**: Complete user workflows

## Performance Optimization

### Bundle Optimization

-   **Tree Shaking**: Eliminate unused code
-   **Code Splitting**: Lazy load non-critical components
-   **Asset Optimization**: Minimize bundle size

### Runtime Optimization

-   **Memoization**: React.memo, useMemo, useCallback
-   **Virtual Scrolling**: Handle large lists efficiently
-   **Debounced Updates**: Prevent excessive re-renders
-   **Atom Granularity**: Fine-grained reactive updates

## Security Considerations

### Data Security

-   **Input Validation**: Zod schemas for all external data
-   **XSS Prevention**: Safe HTML rendering
-   **File Access**: Restricted to vault operations only

### Type Safety

-   **Runtime Validation**: Zod schemas at API boundaries
-   **Compile-time Checking**: Strict TypeScript configuration
-   **Error Boundaries**: Graceful error handling

## Deployment & Distribution

### Development Deployment

-   **Manual Installation**: Copy to .obsidian/plugins/
-   **Hot Reload**: Development server with file watching
-   **Source Maps**: Debugging support

### Production Deployment (Planned)

-   **Community Plugin Store**: Official distribution channel
-   **Versioned Releases**: Semantic versioning
-   **Auto-updates**: Through Obsidian's update system

## Technical Debt & Maintenance

### Known Technical Debt

-   Migration from legacy DTable component structure
-   Unused variables and type assertions to clean up
-   Missing comprehensive test coverage
-   Documentation gaps in API layer

### Maintenance Priorities

1. **Type Safety**: Eliminate any remaining `any` types
2. **Test Coverage**: Achieve >80% test coverage
3. **Performance**: Optimize for large task lists
4. **Documentation**: Complete API documentation

### Future Technical Considerations

-   **Obsidian API Evolution**: Stay current with platform changes
-   **React 19**: Migration planning for future React versions
-   **Performance Monitoring**: Implement performance tracking
-   **Error Tracking**: Comprehensive error reporting system
