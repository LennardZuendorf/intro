# Design System

## Neobrutalism Design

The website follows the Neobrutalism design aesthetic, inspired by components from [neobrutalism.dev](https://www.neobrutalism.dev/). This design approach is characterized by its bold, unapologetic visual elements that evoke a sense of raw functionality combined with playful expression.

### Key Characteristics

1. **Bold Typography**

   - Large, prominent headings
   - Clear hierarchical structure
   - High-contrast font choices

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

### Base Components

- **Typography**: Customized text styles for headings, body text, and UI elements
- **Buttons**: Bold, well-defined buttons with strong borders and distinct hover states
- **Cards**: Content containers with pronounced borders and shadows
- **Navigation**: Clear, bold navigation elements with obvious active states
- **Form Elements**: Input fields, dropdowns, and form controls styled with the Neobrutalism approach

### Custom Components

Custom components extend the basic shadcn/ui library to provide specialized functionality while maintaining the consistent Neobrutalism design language.

## Implementation Details

### CSS Approach

- Uses TailwindCSS for utility-based styling
- Custom CSS variables for theming and consistent values
- PostCSS for processing and optimization

### Responsive Design

- Mobile-first approach
- Breakpoints aligned with standard device sizes
- Adaptation of Neobrutalism elements for smaller screens while maintaining the design essence

### Accessibility Considerations

- High contrast colors aid readability
- Clear focus states for keyboard navigation
- Semantic HTML structure underlying the visual design

## Design Resources

- Components based on [neobrutalism.dev](https://www.neobrutalism.dev/)
- Custom implementation through shadcn/ui and TailwindCSS
- Consistent application throughout the website
