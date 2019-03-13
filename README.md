# Vue Chrome HMR Setup

<img src="public/assets/logo.png" height="300" style="margin:auto" />

## Abstract

This is a demo project to see if we can get Vue DevTools and HRM working in a Chrome extension.

A chrome extension is essentially HTML and JavaScript files that have access to the Browser API so you can interact with tabs, bookmarks, etc:
 
 - https://developer.chrome.com/extensions/getstarted
 
For more complex extensions, it makes sense to use modern build tools, and to compile the code before loading it into the browser.

For either setup, if you make any changes you need manually reload the extension from the Extensions page. Because this is fairly laborious, some [people have been using plugins](https://medium.com/front-end-weekly/hot-reloading-extensions-using-webpack-cdfa0e4d5a08) like Live Reload to improve the developer experience.

However, it seems that the following React project has gotten HMR working, which allows the developer to maintain application state rather than having [the whole page](https://github.com/rubenspgcavalcante/webpack-chrome-extension-reloader/issues/72) reload:

- https://github.com/jhen0409/react-chrome-extension-boilerplate

I would like to achieve the same for Vue if possible, so I've built this simple extension (which interacts with the Bookmarks API) to test a Vue CLI build.

The ideal outcome for the project would be:

- Vue DevTools working in all environments
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

The content script acts as the "client" with the background acting as "server". The two builds talk to each other via messaging, in the same way that website clients talk to servers via AJAX and JSON. An extension can have many content scripts, but only one background script

This is the gist of how extensions work. It's similar to Electron with its "main" and "render" processes.

More information here:

- [Extension architecture](https://developer.chrome.com/extensions/overview#arch)
- [Message passing](https://developer.chrome.com/extensions/messaging)


## Development


I currently use a bit of a hack to let me develop both web app and Chrome extension:

- I run a development build, I can view the site on `localhost:` with Vue DevTools and HMR but only limited Chrome interaction
- I run a production build / watch, I can view the extension on `chrome-extension:` without DevTools or HMR but with full Chrome interaction

To reload scripts *without* HMR, you have to inspect the content or background script from the Extensions page, which pops up the DevTools panel for that process, then you use `CMD + R` to reload.

What I want to be able to do is create a final build setup where I have full Chrome interaction, DevTools, partial updates via HMR, and potentially have the background script reload too.


## Scripts

These are my current – imperfect – scripts:

```bash
# local development (limited chrome interaction, but HMR)
npm run dev
```

These last two sets of content / background scripts need to be run side-by-side in separate windows, as the extension needs both content and background to run at the same time.

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

