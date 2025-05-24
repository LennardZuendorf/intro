# Design System

## Neobrutalism Design

The website follows the Neobrutalism design aesthetic, inspired by components from [neobrutalism.dev](https://www.neobrutalism.dev/). This design approach is characterized by its bold, unapologetic visual elements that evoke a sense of raw functionality combined with playful expression.

### Key Characteristics

1. **Bold Typography**

   - Large, prominent headings with comprehensive responsive scaling
   - Clear hierarchical structure across 5 breakpoints (base, sm, md, lg, xl, 2xl)
   - High-contrast font choices with aggressive font weights
   - Unified typography system ensuring consistent scaling across all components
   - MacBook Pro 14" optimized sizing at lg: breakpoint
   - Smooth mobile-to-desktop progression eliminating sizing jumps

2. **Strong Visual Elements**

   - Thick borders around components
   - Sharp, defined edges rather than excessive rounded corners
   - Distinctive shadows that create depth

3. **Color Usage**

   - High-contrast color combinations
   - Bold, sometimes unexpected color pairings
   - Limited, purposeful color palette

4. **Layout**

   - Grid-based structure
   - Intentional asymmetry in some areas
   - Clear separation between content blocks

5. **Interactive Elements**
   - Distinctive hover/focus states
   - Obvious button styling with strong borders
   - Playful animations that reinforce interactions

## Component Framework

The design system is built on shadcn/ui components, which themselves are based on Radix UI primitives. These are then customized to align with the Neobrutalism aesthetic:

### Typography System (Priority #1)
- **11 Typography Components**: H1, H2, H3, H4, Lead, L, M, S, XS, Muted, Code with comprehensive responsive scaling
- **5-Breakpoint Scaling**: base, sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **MacBook Pro 14" Optimization**: Preferred sizing at lg: breakpoint (1024px)
- **Title-Case Formatting**: Automatic title-case applied to all headings
- **Unified Text Control**: Eliminates scattered custom responsive sizing across components

### Layout Components
- **Section**: Flexible layout wrapper with grid/mask backgrounds, 1-2 column support
- **Background Grid**: Specialized grid background for hero-style sections
- **Cards**: Multi-variant content containers with rotation, interactivity, and shadow options

### Interactive Components
- **Button**: 6 variants (default, neutral, noShadow, accent, link, action) with Neobrutalism shadow effects
- **NeoBadge**: Stylized badges with rotation, interactive animations, and variant options
- **IconLink**: Button-style links with icon positioning and external link support
- **Navigation Elements**: Dropdown menus, navigation menus, tabs with bold styling

### Content Components
- **Profile Image**: Specialized image component with Neobrutalism styling
- **Carousel**: Vertical/horizontal content carousels with touch and keyboard navigation
- **Accordion**: Collapsible content sections
- **Toast System**: Neobrutalist notifications with themed styling and playful animations

### Form Components
- **Dialog**: Modal dialogs with accessibility features
- **Command**: Command palette/search interfaces
- **Popover**: Floating content containers
- **Tooltip**: Context-aware hover tooltips

### Feedback Components
- **Alert**: Themed alert messages
- **Toast/Toaster**: Comprehensive notification system
- **Hover Card**: Rich hover content containers

### Component Composition Principles
All components follow the Neobrutalism aesthetic while maintaining shadcn/ui's composition patterns and accessibility standards.

## Implementation Details

### CSS Approach

- Uses TailwindCSS for utility-based styling
- Custom CSS variables for theming and consistent values
- PostCSS for processing and optimization

### Responsive Design

- Mobile-first approach with comprehensive 5-breakpoint typography scaling
- Breakpoints: base (320px+), sm (640px+), md (768px+), lg (1024px+), xl (1280px+), 2xl (1536px+)
- MacBook Pro 14" optimization at lg: breakpoint (1024px)
- Adaptation of Neobrutalism elements for smaller screens while maintaining the design essence
- Unified typography system eliminating custom responsive sizing scattered across components

### Accessibility Considerations

- High contrast colors aid readability
- Clear focus states for keyboard navigation
- Semantic HTML structure underlying the visual design

## Component Usage Guidelines

### Development Hierarchy

1. **Typography First**: Always use typography components (H1, H2, M, etc.) before any other elements
2. **Layout Structure**: Use Section for page layouts, Card for content containers
3. **Interactive Elements**: Button for actions, IconLink for navigation, NeoBadge for labels
4. **Specialized Components**: Use specific components (ProfileImage, Carousel, etc.) for specialized needs

### Design Principles

- **Never use raw HTML text tags** - always use typography components
- **Leverage component variants** instead of custom styling
- **Preserve responsive behavior** when adding custom classes
- **Follow Neobrutalism aesthetic** with borders, shadows, rotations, and playful interactions
- **Compose components properly** (e.g., Card + CardHeader + CardContent)

### Responsive Strategy

- **Typography scales automatically** across all 5 breakpoints
- **Layout adapts intelligently** from mobile to desktop
- **Interactive elements maintain** touch-friendly sizing
- **Components work together** to create cohesive responsive experiences

### Theming Integration

- **All components respect** global CSS variables for colors
- **Neobrutalism elements** (borders, shadows) remain consistent across themes
- **Typography maintains** readability in light and dark modes
- **Interactive states** provide clear feedback in all themes

## Design Resources

- Components based on [neobrutalism.dev](https://www.neobrutalism.dev/)
- Custom implementation through shadcn/ui and TailwindCSS
- Comprehensive UI component library documented in `.cursor/rules/ui-components-guide.mdc`
- Consistent application throughout the website
