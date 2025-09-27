# 🚀 Fast Development Guide

## Quick Start Commands

```bash
# Fastest development server (recommended)
npm run dev:fast

# Clean build and start
npm run dev:clean

# Regular development
npm run dev
```

## Performance Optimizations Applied

### 1. **Turbo Mode Enabled**
- Uses Next.js Turbo for faster compilation
- Incremental builds and caching
- Parallel processing

### 2. **TypeScript Optimizations**
- Disabled strict mode for faster compilation
- Incremental compilation with cache
- Skip lib check for faster builds

### 3. **Bundle Splitting**
- Vendor chunks separated
- Common chunks optimized
- Lazy loading for heavy components

### 4. **Component Optimizations**
- Memoized components
- Lazy loading with Suspense
- Optimized imports

## Development Tips

### For Faster Compilation:
1. Use `npm run dev:fast` for development
2. Keep terminal open to maintain cache
3. Use `npm run clean` if builds get corrupted
4. Disable TypeScript strict mode in development

### For Better Performance:
1. Components are lazy-loaded by default
2. Heavy libraries (Recharts, Framer Motion) are dynamically imported
3. Images are optimized with WebP/AVIF
4. CSS is optimized and minified

### Troubleshooting:
- If compilation is slow, run `npm run clean` first
- Use `npm run dev:clean` for a fresh start
- Check console for performance metrics

## Build Commands

```bash
# Development build (with Turbo optimizations)
npm run build

# Production build (with console removal)
npm run build:prod

# Build with analysis
npm run build:analyze

# Type checking only
npm run type-check

# Lint and fix
npm run lint
```

## Configuration Notes

- **Development**: Uses `next.config.js` (Turbo-compatible)
- **Production**: Uses `next.config.prod.js` (includes console removal)
- **Turbo Mode**: Optimized for fast development builds
- **Console Removal**: Only applied in production builds

## Performance Monitoring

The app includes performance monitoring that tracks:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

Check browser console for performance metrics.
