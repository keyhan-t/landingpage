Bloom update - logo loader and product image correction

- Replaced the previous T-shirt loader with a Bloom floral brand mark and wordmark.
- Loader motion is CSS-driven (transform/opacity) and no longer updates React state every frame.
- Added 16 square transparent WebP apparel cutouts under public/products/.
- Assigned matching transparent cutouts to 22 apparel product records; four accessory records retain their existing source photos because the generated cutout sheet did not contain accessory items.
- Product cards and product detail gallery now use object-contain with consistent square image canvases, without stretching or cropping.
- Product images are lazy-loaded and decoded asynchronously on product cards.

Run:
  npm install
  npm run dev

Build verification could not be completed in this environment because npm dependency installation timed out.
