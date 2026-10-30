# Royal Motors — Car Collection Website

React + Vite + Tailwind CSS + Framer Motion + React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Structure
- `src/data/` — car dataset, brands, categories, FAQ/testimonial content
- `src/context/StoreContext.jsx` — wishlist + compare state (persisted in localStorage) and toasts
- `src/components/` — Navbar, Footer, CarCard, CompareBar, Reveal, Counter, SmartImg, etc.
- `src/pages/` — Home, Collection, CarDetails, Brands, Compare, Wishlist, TestDrive, About, Contact, FAQ

## Notes
- Car images are loaded from Unsplash. `SmartImg` shows a styled placeholder if an image fails, so swap any URL in `src/data/cars.js` (`IMG_IDS`) for your own assets.
- Test drive, enquiry, contact and newsletter forms validate and save to localStorage; connect them to your API where indicated by the `localStorage` calls.
