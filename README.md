# Architect

Website for an architecture studio: a home page that scrolls one full-screen section at a time, a photo gallery page and a service page. Built in August 2021 as a learning project.

**Live demo:** [androfficial.github.io/architect](https://androfficial.github.io/architect/)

## Features

- On screens wider than 769 px the home page runs on fullPage.js: seven full-screen sections, navigation dots that show the current section number (01 to 07), up and down arrow buttons, and header links that jump to their sections.
- At 769 px and below the home page scrolls normally and header links scroll smoothly to their sections. At 992 px and below a burger button opens the navigation and locks page scroll.
- Where the page scrolls normally, the fixed header gets a dark background after 60 px. The Services submenu opens on hover on wide screens and on tap with a height animation on touch devices; the city and language dropdowns close on an outside click.
- The projects and holiday house sliders (Swiper) lazy-load their images. The projects slider shows three, two or one slide depending on width and switches to a fade effect on phones.
- The Location button opens the embedded Google Map in an fslightbox lightbox, and the ten photos on the services page open as an fslightbox gallery.
- The subscribe form checks the email format and the callback form checks that name and phone are filled. Invalid fields are outlined in red, and the result is only logged to the console.

## Tech stack

- **Framework:** none, plain HTML and JavaScript
- **UI:** fullPage.js 3 with the Scrolloverflow extension, Swiper 6, fslightbox
- **Styling:** SCSS compiled to CSS (the SCSS sources are not in the repository)
- **Tooling:** built with Gulp 4, which produced the plain and minified bundles in `css/` and `js/`
- **Hosting:** GitHub Pages

## Getting started

The repository holds the compiled site, with no dependencies and no build step. The icons come from an external SVG sprite that browsers do not load from `file://`, so serve the folder over HTTP, for example with `npx serve .` on Node.js 18 or later.

```bash
git clone https://github.com/androfficial/architect.git
cd architect
npx serve .
```

Then open the local address that `serve` prints.

## Pages

| Page | Description |
| --- | --- |
| `index.html` | Home page with full-screen sections: intro, about, services, projects slider, holiday house slider, testimonials and contacts |
| `services.html` | Gallery of ten photos in a lightbox, followed by the contacts section |
| `service-more.html` | Service description with sample text in Ukrainian, the services grid, a callback form and the contacts section |

## Notes

- The inner pages are not linked from the home page (the Services submenu items point to `#`), so open them by their URLs.
- Full-page scrolling is enabled only on the home page, through the `enable-fullpage` class on its `body`.
