# Home, From Here

A dependency-free first prototype. Open `dist/index.html` in a browser, or serve `dist` using any static server.

## Replace the content
- Put your photos in `dist/assets/images/`.
- Edit `dist/memories.js`: each entry has an image, alt text, title, story, position (x/y as percentages), width, and rotation.
- The six fragments are sample memories, not statements about the author's life.
- The map is a schematic emotional map, not geographic information.
- `dist/style.css` controls typography, layout, color and responsive behavior.
- `dist/app.js` handles pointer motion, dialogs, navigation and local responses.
- The animation uses a native requestAnimationFrame easing loop; no animation dependency is needed.
- Touch users can tap every fragment. Keyboard users can Tab and Enter; Escape closes a memory. Reduced-motion preferences disable scattering.
- Responses stay in localStorage on the current browser and origin. They are not sent to a server.
- Sound is intentionally deferred until personal recordings are available.

## Placeholder image credits
Reference images are temporary editorial placeholders, not the student's hometown photos. Replace before public exhibition and confirm rights for any retained image.
- street.jpg: https://k.sina.cn/article_7453483661_1bc43228d00100s2rc.html
- river.jpg: https://you.ctrip.com/travels/2040260/4050589.html
- childhood.jpg: https://www.4305.cn/w/hn8z24z26b4

Google Fonts: Cormorant Garamond and DM Sans, with system fallbacks.

## Personal media update
The active archive now uses your four supplied photographs, two personal videos, and wave recording. Stories are bilingual draft descriptions of the visible media; edit them in `dist/memories.js`.
- Photos: harbor.png, hillside.png, family.jpg, table.jpg
- Audio: assets/audio/waves.m4a; explicitly toggle on/off, loops until paused.
- Videos: assets/video/memory-01.mp4 and memory-02.mp4, browser-compatible H.264/AAC versions. Original MOV recordings are retained as download fallbacks.
- Videos play on demand, pause background waves when played, and stop on closing the memory. Media pauses when the browser tab is hidden.
- Earlier placeholder files remain unused and can be removed when preparing a final exhibition copy.

## Shipu map and personal archive
- The Emotional map now displays the supplied `assets/images/personal/shipu-map.png`; click to enlarge.
- A little of my home contains all 11 additional photographs. Edit the `personalMemories` array in `memories.js` for captions and stories.
- The distance line is a keyboard/touch/mouse accessible range input from Shipu to New York. It shows approximate distance from Shipu along a conceptual line, not live location or an actual flight path.
- Full distance uses the haversine formula with approximate city/town centers: Shipu 29.20622, 121.92718; New York 40.7128, -74.0060. Rounded to 10 km.
- Shipu coordinate reference: https://mapcarta.com/15935810
- The time display awaits the author's choice of time difference, time away from home, or travel duration; no departure date or flight duration has been invented.
