# VAT Calculator - Nigeria Tax System

A comprehensive VAT (Value Added Tax) calculator built for the Nigerian tax
system. This Progressive Web Application allows users to calculate VAT on
products and services with different tax rates including standard, reduced,
zero-rated, and exempt categories.

## Features

### Core Functionality

- ✅ Product catalog with various VAT rates (20%, 10%, 5%, 0%)
- ✅ Real-time VAT calculations
- ✅ Shopping cart-style calculation interface
- ✅ Multiple product categories (Services, Food & Beverages, Medical,
  Education, etc.)
- ✅ Dynamic quantity adjustments
- ✅ Comprehensive calculation summaries

### User Interface

- ✅ Responsive design (mobile and desktop)
- ✅ Grid and List view toggle for products
- ✅ Search and filter functionality
- ✅ Category-based filtering
- ✅ Dark/Light theme support with multiple color schemes
- ✅ Slide-out cart sheet for calculations
- ✅ Toast notifications for user feedback

### Calculations

- ✅ Subtotal calculation (pre-VAT)
- ✅ Individual item VAT calculation
- ✅ Total VAT amount across all items
- ✅ Grand total (including VAT)
- ✅ Currency formatting (Nigerian Naira ₦)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Components:** Radix UI
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Form Handling:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Testing:** Vitest

## VAT Categories

The application supports the following VAT categories aligned with Nigerian tax
law:

| Category      | VAT Rate | Examples                                |
| ------------- | -------- | --------------------------------------- |
| Standard Rate | 20%      | Most services, consulting               |
| Reduced Rate  | 10%      | Food & beverages, some services         |
| Lower Rate    | 5%       | Basic necessities                       |
| Zero-Rated    | 0%       | Medical supplies, educational materials |
| Exempt        | 0%       | Certain exempt services                 |

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx              # Main calculator page
│   ├── providers.tsx         # React Query provider
│   └── globals.css           # Global styles & theme variables
├── modules/
│   ├── cart/
│   │   ├── components/       # Cart-related components
│   │   │   ├── cart-sheet.tsx
│   │   │   ├── cart-summary.tsx
│   │   │   ├── add-to-cart.tsx
│   │   │   └── category-filter.tsx
│   │   └── store/            # Zustand cart store
│   ├── products/
│   │   ├── components/       # Product display components
│   │   │   ├── product-grid.tsx
│   │   │   └── product-card.tsx
│   │   └── types.ts          # Product interfaces
│   ├── layout/
│   │   └── components/       # Layout components
│   │       ├── header.tsx
│   │       ├── search-bar.tsx
│   │       └── view-toggle.tsx
│   └── utils/
│       ├── vat-calculator.ts # VAT calculation logic
│       └── validation-schema.ts # Form validation
├── lib/
│   └── api/
│       └── product.ts        # Product data API
└── primitives/
    ├── ui/                   # Radix UI components
    └── theme-provider.tsx    # Theme context
```

## Installation

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Install Dependencies

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

### Run Tests

```bash
pnpm test
```

### Run Tests with UI

```bash
pnpm test:ui
```

### Run Tests with Coverage

```bash
pnpm test:coverage
```

### Test Suites

The application includes comprehensive tests for:

- VAT calculation functions
- Item subtotal calculations
- Item total calculations (including VAT)
- Cart totals with multiple items
- Currency formatting
- Edge cases (zero VAT, decimal prices, large numbers)

## Build & Deploy

### Production Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Deployment Platforms

- **Vercel:** Recommended (Zero-config deployment for Next.js)
- **Netlify:** Fully supported
- **Cloudflare Pages:** Supported

## Key Features Implementation

### 1. VAT Calculation Engine

The calculator uses precise decimal arithmetic to ensure accurate tax
calculations:

```typescript
// Calculate VAT for an item
calculateItemVat(basePrice, quantity, vatRate);

// Calculate subtotal (pre-VAT)
calculateItemSubtotal(basePrice, quantity);

// Calculate total including VAT
calculateItemTotal(basePrice, quantity, vatRate);

// Calculate cart-wide totals
calculateCartTotals(items);
```

### 2. State Management

- **Zustand Store:** Manages cart state with persistence
- **React Query:** Handles product data fetching and caching
- **Form State:** React Hook Form with Zod validation

### 3. Responsive Design

- Mobile-first approach
- Collapsible header on mobile
- Sheet-based cart interface
- Touch-friendly controls
- Adaptive grid/list layouts

### 4. Theme Support

Multiple theme options:

- Dark mode
- Light mode
- Orange theme
- Red theme
- Rose theme

Themes are powered by `next-themes` with CSS variables for easy customization.

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Samsung Internet: Full support

## Usage Example

1. Browse the product catalog
2. Use search or category filters to find products
3. Click "Calculate" or select a product
4. Specify quantity in the cart sheet
5. Add multiple products as needed
6. View real-time VAT calculations
7. See breakdown of subtotal, VAT, and total

## Nigerian VAT Compliance

This calculator follows the Nigerian Federal Inland Revenue Service (FIRS) VAT
guidelines:

- Standard VAT rate: 7.5% (configurable to 20% in demo)
- Proper categorization of goods and services
- Zero-rating for exports and exempt items
- Clear display of VAT amounts

## Performance Optimizations

- React Query caching for product data
- Memoized calculations to prevent unnecessary re-renders
- Optimized re-renders with Zustand selectors
- Lazy loading of components
- Efficient form validation

## Future Enhancements

- [ ] Export calculations to PDF
- [ ] Save calculation history
- [ ] Multi-currency support
- [ ] Bulk product import
- [ ] Tax rate customization
- [ ] Invoice generation
- [ ] Print-friendly layouts
- [ ] Advanced reporting

## Scripts Reference

| Command              | Description              |
| -------------------- | ------------------------ |
| `pnpm dev`           | Start development server |
| `pnpm build`         | Create production build  |
| `pnpm start`         | Start production server  |
| `pnpm lint`          | Run ESLint               |
| `pnpm test`          | Run Vitest tests         |
| `pnpm test:ui`       | Run tests with UI        |
| `pnpm test:coverage` | Generate coverage report |

## License

MIT

## Author

Built as part of the PwC Frontend Assessment

## Assessment Notes

This project demonstrates proficiency in:

- Modern React patterns and hooks
- TypeScript type safety
- State management (Zustand)
- Server/Client component architecture (Next.js App Router)
- Form handling and validation
- Unit testing with Vitest
- Responsive design with Tailwind CSS
- Component composition with Radix UI
- Real-world business logic implementation
