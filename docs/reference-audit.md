# Atlas reference audit

Reference: https://atlasdesign.framer.ai/; inspected 22 November 2026. The public sitemap contains 17 pages. “About” links to the home page’s `#about` section, not a separate page.

## Routes

- `/`, `/projects`, `/blogs`, `/contact`, `/legal/privacy-policy`
- `/projects/cloudl-experience-overhaul`
- `/projects/stratus-generation-engine`
- `/projects/premiere-expansion`
- `/projects/lumo-market-launch`
- `/projects/nexa-search-surge`
- `/projects/thread-revenue-lift`
- `/projects/vertex-digital-platform`
- `/blogs/digital-marketing-strategies-that-generate-qualified-leads`
- `/blogs/creating-high-performance-websites-for-growth`
- `/blogs/how-branding-influences-customer-trust-and-growth`
- `/blogs/why-modern-businesses-need-seo-more-than-ever`
- `/blogs/five-website-mistakes-that-hurt-conversion-rates`

## Assets and content

Original images, SVG logos, portraits, project galleries, article photography, and fonts were downloaded locally. The reference uses no video files. The primary typeface is Golos Text, including its variable font; Geist, Inter, and Satoshi also occur in the reference sources.

`reference-data/pages.json` records text, original HTML blocks, image URLs, and their section/link context. `reference-data/asset-manifest.json` maps source URLs to local files; `reference-data/aliases.json` maps opaque image filenames to descriptive paths. The downloaded HTML and animation modules are inspection material, not runtime dependencies.

Before responsive variants, after removing 46 unused, byte-identical opaque image copies, the original asset set held **96 files totaling 34.65 MiB**. This cleanup saved **28.28 MiB**; every removed file has a retained descriptive alias and the manifest now points to that alias. Referenced opaque names and unique originals remain. The largest individual images are Nexa’s cover (5.38 MiB), Cloudl’s cover (4.64 MiB), and Premiere’s cover (3.66 MiB). Run the verifier for current size after further changes. Original large sources are retained for fidelity. `bun run images:optimize` now generates local 480, 800, 1200, and 1920px WebP copies for project and blog media; the browser selects the appropriate size with `srcset`. The 800px copies total 0.78 MiB compared with 21.77 MiB for the corresponding originals (96% smaller); this is an image-set comparison, not a measured page payload.

## Measured motion settings

| Interaction              | Reference configuration                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Hero intro words         | opacity `0.001`, translateY `5px`; spring `1s`, bounce `0`, stagger `0.075s`, initial delay `0.2s`                                  |
| Hero title               | opacity `0.001`, translateY `20px`; tween `0.6s`, delay `0.5s`, easing `[0.12, 0.23, 0.5, 1]`                                       |
| Hero supporting elements | same `0.6s` tween; slideshow delay `0.3s`, labels `0.6s`/`0.8s`, avatars `0.7s`                                                     |
| Hero slideshow           | autoplay interval `4.5s`; draggable; leftward transition                                                                            |
| Section entrance         | opacity `0`, translateY `50px`; tween `0.7s`, easing `[0.22, 1, 0.36, 1]`                                                           |
| Scroll text color reveal | filter and color transitions `0.2s ease-out`                                                                                        |
| Logo changes             | spring `2s`, bounce `0.2`; vertical movement and scale `0.7`                                                                        |
| Team desktop ticker      | continuous leftward movement at `50px/s`                                                                                            |
| Team manual slideshow    | spring stiffness `200`, damping `40`, mass `1`, delay `0`                                                                           |
| Testimonials             | manual slideshow; gap `22px`; two cards desktop, one tablet/phone; spring stiffness `200`, damping `40`, mass `1`                   |
| Desktop smooth scrolling | intensity `50`; frame coefficient `1 - exp(-0.1 × 60 × deltaSeconds)`; snap within `0.35px`; disabled for reduced motion and mobile |

Hero and final CTA use the same Liquid Gradient GLSL. The replica retains its color-space conversion, seed hash, and turbulence program. Colors: `#ff6200`, `#ff4800`, `#ff0000`, `#000000`, `#000000`, `#ff0000`. Uniform values: speed `0.73`, seed `380`, scale `0.1`, amplitude `0.07`, turbulence frequency `0.31`, iterations `7`, wave frequency `5`, bias `0.8`, exposure and contrast `1.1`, saturation `1`, grain amount `0.02`/mode `2`, loop `0`, mouse input disabled. Canvas resolution is one rendered pixel per CSS pixel, matching the reference’s “consistent” setting. The replica adds offscreen/hidden-tab pausing and a static frame for reduced motion.

## Verification

After a production build, run:

```sh
bun run build
bun scripts/verify-site.mjs
```

The script checks every declared static page plus all project/blog slugs, local media literals in source, exported HTML/CSS media references, and internal page links. It exits with a failure when a route or asset is missing. It does not claim visual or timing equivalence.

Browser checks covered the home page at 320, 390, 768, 1024, and 1440px without horizontal overflow; the mobile menu and desktop resize reset; service selection; empty contact form validation; project index/case study desktop dimensions; and mobile article/contact pages. Static verification covers all 17 routes. Further frame-by-frame comparison remains necessary for complete slideshow cycles and drag behavior, sticky navigation and mobile menu, all five service states, team ticker wrap, testimonial arrow limits, scroll reveal progress, smooth-scroll feel, and entrance timing on every route. Compare at desktop, tablet, and mobile widths, including keyboard focus and reduced motion. Contact form delivery also needs a real destination configured; local validation alone does not deliver an inquiry.

## WebGL recording comparison

The supplied 33.5-second screencast shows the same six-color liquid field with diagonal dark bands, diffuse red/orange regions, and static spatial grain. The fragment body, UV mapping, and one-pixel-per-CSS-pixel resolution match the reference. The shader now also uses the original default integer precision. The animation clock no longer clamps long frame intervals.

The renderer is split into configuration, GLSL, GPU resource management, and React lifecycle modules. Four clock tests cover elapsed-time accuracy and pause/resume. Browser verification confirmed live WebGL2 rendering and recovery after a forced context loss/restoration.
