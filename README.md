# lzdesigns.ca

Static archive of the LZ Designs portfolio, rebuilt from the September 2026 cPanel
backup of the old CrucialP hosting. Served by GitHub Pages at **https://lzdesigns.ca**.

## What this is

The original site was WordPress (`public_html/lz`, theme `fotofolio-1.0.6`) wrapping a
set of static [VisualLightBox](http://visuallightbox.com) galleries. The WordPress layer
held almost nothing — 6 pages, 16 posts — so it was dropped. The galleries *were* the
site, and they are preserved here as plain HTML.

## Layout

| path | source in the old backup | images |
|---|---|---|
| `logos/` | `public_html/folio/logo` | 121 |
| `web/` | `public_html/folio/web` | 28 |
| `packaging/` | `public_html/folio/package` | 14 |
| `business-cards/` | `public_html/folio/bc` | 10 |
| `various/` | `public_html/various` + `various-2` + `various-1` | 259 |
| `web-portfolio/` | `public_html/web-portfolio` | 10 |

`various`, `various-1` and `various-2` were three re-exports of the same gallery
(Oct 2010, Feb 2011, Jul 2011) at identical dimensions. They are merged here into one
`various`, newest copy of each file winning, which recovers 15 pieces that only existed
in the older exports.

Full images live in `img/<category>/full/`, grid thumbnails in `img/<category>/thumb/`.
Thumbnails are regenerated from the full images; the originals shipped with a magnifier
badge burned into them.

## Watermarks

Every full image carries a `VisualLightBox.com` watermark burned in at export time
(107x10 px, inset 6/4 from the bottom-right corner) — the free version of the 2010
gallery generator did that. 366 of 442 have been cleaned by interpolating the box away
between the rows above and below it. The remaining 76 sit on top of real artwork, so
they were left alone rather than smeared.

## Rebuilding

The site is generated, not hand-written. Nothing here needs a build step to deploy —
GitHub Pages serves it as-is — but `manifest.json` is the index the pages were rendered
from. Regeneration scripts are not kept in the repo; the source of truth is the cPanel
backup tarball.

## No build, no dependencies

Plain HTML + one stylesheet + one 90-line vanilla-JS lightbox. No jQuery, no framework,
no tracking.
