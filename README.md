<div align="center">

# Nihal Shah — Portfolio

A personal portfolio site for a software engineer who ships backend-heavy
microservices, distributed systems, and cloud-native infrastructure.

**[Live site](https://nihals-portfolio.netlify.app)** · [GitHub](https://github.com/nihalashah) · [LinkedIn](https://www.linkedin.com/in/nihal-shahh/) · nihalshah.dev@gmail.com

<br />

<img src="https://img.shields.io/badge/Angular-14-DD0031?logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-4.7-3178C6?logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/SCSS-styled-CC6699?logo=sass&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Material-14-757575?logo=materialdesign&logoColor=white" />
<img src="https://img.shields.io/badge/Netlify-deployed-00C7B7?logo=netlify&logoColor=white" />

</div>

---

## Overview

A single-page Angular site built around a code-editor aesthetic — terminal
cards, JSON syntax highlighting, monospace accents — with a focus on motion,
contrast, and a real light/dark theme system. Fully responsive: every section
is rebuilt down to phone-sized breakpoints.

The site is structured as a sequence of vertically stacked sections on a
single route, lazy-loaded after the initial chunk:

```
hero  ->  about  ->  experience  ->  projects  ->  tech stack  ->  education  ->  contact
```

---

## Tech stack

| Layer            | Stack                                                                  |
| ---------------- | ---------------------------------------------------------------------- |
| Framework        | Angular 14, RxJS 7, TypeScript 4.7                                     |
| Styling          | SCSS modules, CSS custom properties, Tailwind, Angular Material        |
| Layout           | `@angular/flex-layout` (responsive `fxLayout` directives)              |
| Motion           | Angular Animations + `IntersectionObserver` for scroll-reveal          |
| Forms            | Reactive forms + `ng-recaptcha` v3                                     |
| Hosting          | Netlify, auto-deploy from `main`                                       |

---

## Local development

```bash
npm install
npm start
```

Opens at **http://localhost:4200**. The dev server hot-reloads on save.

### Production build

```bash
npm run build           # default ng build
npm run build:prod      # AOT + build optimizer + production config
```

Outputs to `dist/`. Pushing this to `main` triggers Netlify to rebuild and
publish to `nihals-portfolio.netlify.app`.

### Other scripts

| Command              | What it does                                  |
| -------------------- | --------------------------------------------- |
| `npm start`          | dev server with HMR at `:4200`                |
| `npm run watch`      | dev build, rebuild on file change             |
| `npm run build`      | one-shot dev build                            |
| `npm run build:prod` | production build (minified, AOT)              |
| `npm test`           | Karma + Jasmine unit tests                    |

---

## Project structure

```
src/
├── app/
│   ├── ui/
│   │   ├── pages/home/         landing-page sections (hero, about, expertise, contact, ...)
│   │   ├── common/             navbar, footer, dialogs, shared chrome
│   │   ├── animations/         transition triggers (TRANSITION_TEXT, ENTER_SCALE, ...)
│   │   └── utils/              IntersectionObserver helpers, view utilities
│   └── api/                    typed API client + DTOs (contact form)
├── assets/                     images, fonts, SVG icons
├── styles/                     typography, mixins, global SCSS
└── styles.scss                 light/dark CSS variables, terminal palette
```

---

## Theming

Theming is fully CSS-variable driven. Both palettes live in
[`src/styles.scss`](src/styles.scss):

- `:root` — light theme (cream/charcoal, warm orange accents)
- `[data-theme="dark"]` — dark theme (deep coffee browns, peach accents)

The terminal card uses a distinct syntax-highlighting palette so JSON keys,
strings, and booleans each have their own color rather than blending into the
brand orange:

```scss
--terminal-key:  #82b4ff;   /* sky blue */
--terminal-str:  #b3e09c;   /* mint green */
--terminal-bool: #ffc36a;   /* amber */
```

---

## Scroll-reveal animations

Sections fade and translate in once they enter the viewport. The trigger uses
a thin `IntersectionObserver` wrapper rather than CDK's `ScrollDispatcher`, so
it works reliably on mobile (where the `window` is the scroll container,
which CDK doesn't observe by default):

```ts
// src/app/ui/utils/views.utils.ts
UiUtilsView.observeReveal(this.vAnimRefView, () => {
  this._mTriggerAnim = 'true';
  this.cdr.detectChanges();
});
```

Each section binds its content to a single trigger:

```html
<div [@transitionText]="{ value: _mTriggerAnim, params: { animDelay: 200 } }">
  ...
</div>
```

---

## Deployment

| Env        | URL                                            | Trigger                |
| ---------- | ---------------------------------------------- | ---------------------- |
| Production | https://nihals-portfolio.netlify.app           | push to `main`         |

Netlify build settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** matches the `engines` range supported by Angular 14

---

## License

Personal portfolio. All content © Nihal Shah. Code is shared for reference;
please don't reuse the resume content, copy, or imagery.

