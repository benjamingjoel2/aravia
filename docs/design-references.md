# Design references

Reviewed 17 October 2026. Patterns only: no imagery, copy or brand assets from these sites are used in Aravia.
Six Senses could not be loaded (access denied, archive copy failed).

| Site | What is worth borrowing | Where it lands in Aravia |
|---|---|---|
| **White Desert** (white-desert.com) | Full-bleed cinematic photography; an oversized, spaced destination name set over the image; serif italic for quotes; vertical image strips that expand on hover for "Our trips"; very sparse navigation. | Destination heroes with the place name set very large; homepage regions as three tall panels that widen on hover. |
| **The Tailor** (thetailor.com) | Aerial hero; headline with an italic serif accent ("Luxury travel Australia *in style*"); colour-blocked sections in deep, muted tones; "Your dedicated Travel Designer" values in a thin frame. | Italic sand accent in headings; one Petra-rose section and one sand section to break the midnight; "Your concierge" values framed with the lattice frame. |
| **Alma** (almahospitality.it) | Huge lowercase wordmark over a warm interior photograph; quiet colour blocks (mauve); generous whitespace. | Confidence to let type and image carry the page, with few elements. |
| **Mathieu Crepel** (mathieu-crepel.com) | Giant type split around a centred image ("RAISED BY [image] THE WAVES"); words pinned to opposite corners over a full-bleed photo ("NO PLACE / LIKE HOME"). | Closing statement split around an image; the About story. |
| **H+I Adventures** (mountainbikeworldwide.com) | Tall portrait cards with the title over the image; a dedicated tour calendar section; journal as clean rows with an arrow; a map of destinations. | Destination and service cards as portrait plates; the Journal index as rows. |
| **Kultiveret** (kultiveret.com) | Founder portrait beside a short first-person quote; asymmetric editorial columns; small, precise body text. | About: concierge profiles as portrait plus a single line in their own words. |
| **The Drake** (thedrake.ca) | Mono micro-labels and boxed type. Playful and loud, so it doesn't suit Aravia's tone. | Only the precision of small labels, which the eyebrow style already covers. |
| **Mammut Local Adventure** | Video intro with a skip control. | Not adopted: autoplay video conflicts with performance and reduced-motion goals. |

## The common thread

Every one of these sites is led by photography. Typography and layout support the image; they don't replace it.
Aravia's design system is in place, but the site has no photography yet, which is the main gap these references show.

## Second round (19 October 2026)

| Site | Status | What was borrowed |
|---|---|---|
| **Eagle's Nest** (eaglesnest.sergesyutkin.com) | Reviewed (layout and type; its media host was blocked) | The name set edge to edge along the bottom of the hero with small corner labels; big serif headings beside a large sans lede; offerings as hairline rows with a small photo; words scrolling over a pinned photograph; a stacked uppercase manifesto; a sideways-scrolling schedule; an FAQ. |
| **Six Senses** (sixsenses.com) | Not reviewed | The site's bot protection returns "Access Denied"; archived copies unreachable from this environment. |
| **Elementis** (elementis.co) | Not reviewed | Its content API and image host are blocked by the environment's network policy; www returned 502. |
| **Sabbatical** (sabbatical.travel) | Not reviewed | Blocked by the environment's network policy. |

Applied on the homepage: the ARAVIA wordmark across the hero, "Not a tour operator. *A concierge.*", How it works over a pinned photograph, six offering rows, the Season as a sideways carousel, and the discretion manifesto (*Never named. Never photographed. Never shared. Always on call.*). How it works gained an FAQ.

## Third round (19 October 2026)

| Site | Status | What was borrowed |
|---|---|---|
| **Sylver Rappresentanze** (sylverrappresentanze.it) | Hero reviewed; the rest of the page, its fonts and images come from blocked hosts | A split hero: photograph melting into a warm taupe panel that holds the introduction; a giant light wordmark across the top-left in place of the small logo; a stacked uppercase serif statement running off the edge at the foot; navigation as underlined text links with a second row of smaller links stacked beneath. |

Applied: the homepage hero is now the split composition (taupe #7E6852, chosen so cream text passes 4.5:1, where Sylver's lighter taupe does not); "ASK. / CONSIDER IT / *arranged.*" stacked at the foot; the small logo steps aside on desktop while the giant wordmark shows; underlined navigation with Travelling with grace, About, Journal and Contact stacked beneath at the top of every page.

## Fourth round: Sylver in full (20 October 2026)

The whole Sylver page was reviewed this time, by serving its scroll library (GSAP 3.12.2) from the npm package in place of the blocked CDN. Its fonts (Haboro Contrast on Typekit) and two background videos stayed blocked.

| Sylver | Aravia |
|---|---|
| Horizontal scroll on desktop: vertical scrolling moves full-height panels sideways; stacked on mobile | `HorizontalScroller` on the homepage, from 64rem up; keyboard focus scrolls an off-screen panel into view |
| Split hero: photo melting into taupe `#B7A283`, giant spaced wordmark top-left, intro and "About →" on the right, the uppercase promise at the foot running into the next panel | Same composition. Taupe deepened to `#866F50` so white text passes 4.5:1 |
| Hôtellerie and Ristorazione panels: huge uppercase heading, a short list, two paragraphs, a link with a faint wordmark behind it, a two-photo collage | What we arrange; Where we take you |
| Contact panel with a map of Tuscany and Umbria filled in green over faint outlines | Contacts and concierges beside a map of the eleven countries (`data/map.ts`, Natural Earth) |
| Green band with a strip of partner logos and the name set huge, cut by the edge | The same band with a strip of places |
| Green footer with "Contatta il commerciale" form | "Ask your concierge" form on every page, posting to `/api/requests` |
| Header: spaced wordmark, links with a short rule under the first letters, a second row stacked beneath; green bar on mobile | The same; Ask Aravia is a link in the row |
| Deep green `#244440`, text `#4A4A4A`, stone `#F3EFE6`, white panels; Arsenal for text; square corners; buttons as underlined uppercase text | The same tokens. Tenor Sans stands in for Haboro Contrast |

Removed from the homepage to match the reference: the request field in the hero (the footer form and Ask Aravia replace it), How it works, the Season carousel, the Composer teaser, the discretion manifesto and testimonials. Each still has its own page in the navigation.
