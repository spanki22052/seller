# Theme System

This directory contains the theme configuration for the application, matching the design system from the screenshot.

## Structure

- `colors.ts` - Color tokens extracted from the design
- `index.ts` - Main theme export with colors, spacing, shadows, etc.
- `styled.d.ts` - TypeScript declarations for styled-components theme
- `useTheme.ts` - Hook to access theme in components

## Color Palette

### Background Colors
- `bg.primary`: Deep black space background (#0a0a0a)
- `bg.secondary`: Dark grey cards (#1a1a1a)
- `bg.tertiary`: Slightly lighter grey (#252525)
- `bg.input`: Input backgrounds (#1a1a1a)
- `bg.card`: Card backgrounds (#1a1a1a)

### Text Colors
- `text.primary`: White text (#ffffff)
- `text.secondary`: Light grey (#b0b0b0)
- `text.tertiary`: Medium grey (#808080)

### Accent Colors
- `accent.purple`: Primary purple (#8b5cf6)
- `accent.blue`: Blue accent (#3b82f6)
- `accent.pink`: Pink accent for special buttons (#ec4899)

### Gradients
- `gradient.purpleBlue`: Purple to blue gradient
- `gradient.purplePink`: Purple to pink gradient
- `gradient.glowPurple`: Purple glow effect
- `gradient.glowBlue`: Blue glow effect

## Usage

### In styled-components

```typescript
import styled from "styled-components";

const StyledComponent = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.bg.card,
  color: theme.colors.text.primary,
  borderRadius: theme.borderRadius.lg,
}));
```

### Using the hook

```typescript
import { useTheme } from "@/shared/lib/theme/useTheme";

function MyComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.colors.accent.purple }}>Content</div>;
}
```

### CSS Variables

CSS variables are also available in `globals.css` for use in regular CSS:
- `--bg-primary`, `--bg-secondary`, etc.
- `--text-primary`, `--text-secondary`, etc.
- `--accent-purple`, `--accent-blue`, etc.

