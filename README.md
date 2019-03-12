# Vue Chrome HMR Setup

<img src="public/assets/logo.png" height="300" />

## Abstract

This is a demo project to see if we can get HRM working in a Chrome extension.

A chrome extension is essentially a web app that has access to the Browser API so you can interact with tabs, bookmarks, etc.

Generally the extension code is compiled and loaded into the browser and the extension runs. If you want to make any changes, you need to rebuild and reload.

Because this process is laborious, people have been looking at using live reload and the like to reduce manual reloading steps.

However, it seems that the following React project has gotten HMR working, so that makes it much easier to maintain state in a complex extension:

- https://github.com/jhen0409/react-chrome-extension-boilerplate

I would like to achieve the same for Vue if possible, so I've built this simple extension (which interacts with the Bookmarks API) to test a Vue CLI build.

The ideal outcome for the project would be:

- HMR working in under the `chrome-extension:` protocol
- a webpack setup that reloads both background and content scripts on change (see below)

## Quick start

To start with, let's load and run the extension in the browser.

First, build the extension from source:

```
npm install
npm run build
```

Then, load it into the browser:

1. in Chrome, go Window > Extensions
2. Click the "Developer Mode" toggle
3. Click the "Load unpacked" button
4. Locate the project folder, and choose the "dist" subfolder

The extension should now be loaded!

To run it, click the green book icon on the top right of the page which will load the main plugin page, and you should see a book like the above, and a text input to filter and show your bookmarks.

## Project setup

The project is set up using webpack, and with two separate builds; `content` and `background`.

The content script acts as the "client" with the background acting as "server". The two builds talk to each other via messaging, in the same way that website clients talk to servers via AJAX and JSON. An extension can have many content scripts, but only one background script.

This is the gist of how extensions work. It's similar to Electron with its "main" and "render" processes.


## Development


I currently use a bit of a hack to let me develop both web app and Chrome extension:

- I run a development build, I can view the site on `localhost:` with HMR but only limited Chrome interaction
- I run a production build / watch, I can view the extension on `chrome-extension:` with full Chrome interaction

To reload scripts *without* HMR, you have to inspect the content or background script from the Extensions page, which pops up the DevTools panel for that process, then you use `CMD + R` to reload.

What I want to be able to do is create a final build setup where I have full Chrome interaction, but also have code and styling changes show via HMR, and potentially have the background script reload too.


## Scripts

These are my current – imperfect – scripts:

```bash
# local development (limited chrome interaction, but HMR)
npm run dev
```

These last two sets of content / background scripts need to be run side-by-side in separate windows, as the extension needs both content and backgound to run at the same time.

```bash
# extension development (full chrome interaction, but no HMR)
npm run watch
npm run watch:bg
```

```bash
# final build (clean content and background build)
npm run build
npm run build:bg
```

