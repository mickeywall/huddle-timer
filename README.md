# Huddle Timer

A simple stand-up (huddle) facilitator. Add your team in a normal window, then start the huddle:
the app shrinks into a narrow strip on the side of your screen, you press **Randomize order**, and
everyone can see who is up and who is next. Each person gets a countdown. When time runs out the clock
turns red and keeps counting into negative numbers so everyone can see who ran over. When you press
**Done**, the next person's timer starts straight away.

It is a single file (`index.html`) with no dependencies, no build step and no server.
Everything runs in the browser, and nothing is ever uploaded.

## Using it (for the person running the huddle)

1. Open the page and add everyone's name. You can paste several at once, separated by commas.
   Click a round picture to add a photo, or drag a photo from your computer onto someone's row.
2. Set **Time per person** (for example 2 min).
3. Untick **Here today** for anyone who is out.
4. Press **Start huddle**. The window moves into a narrow strip on the right side of the screen (see
   "Beside Planner" below for how that works in each browser).
5. Press **Randomize order**. The names shuffle and settle into a numbered list. Not happy with it?
   Press **Randomize again**. Then press **Start** (it says who goes first).
6. Each person's countdown runs. Press **Done** when they finish and the next person starts automatically
   (the button names who is next). **Pause** stops the clock. The **Up next** list shows everyone
   waiting, in order, with the next person highlighted.
7. If someone isn't here, press the small **x** beside their name (or "isn't here - skip" for whoever's
   up). They move to **Not here**, and **Add back** puts them at the end of the line.
8. When everyone has gone, press **See the summary**. **Copy summary** puts a short recap on your
   clipboard that you can paste into the Teams chat. The window goes back to normal size.

Keyboard shortcuts during a huddle: **Space** = randomize / start / pause / resume, **Enter** = done
(and start the next person).

In a Teams meeting, use **Share > Screen** so people see the strip. The sounds (a chime when the next
person starts, a beep when time is almost up, a tone when it runs out) only reach the other attendees
if **Include computer sound** is ticked when you start sharing (if your version of Teams offers it);
otherwise only you hear them.

If the page is refreshed or closed by accident mid-huddle, reopening it picks up where you left off.

### Where your list lives

The roster, photos and settings are saved in your browser's built-in storage on this computer. That is
not a file you can see or open: it lives inside the browser's own data, and it belongs to one browser
(or installed app) on one computer for this web address. It is not shared with other computers or other
browsers, and nothing is uploaded. It stays until you clear the browser's site data.

Use **Save backup file** (at the bottom of the setup screen) to keep a real file copy, move to another
computer, or recover after the browser's data is cleared. **Restore from backup** loads it back.

## Install it as an app (recommended)

An installed copy opens in its own window with no address bar or tabs, gets its own Dock icon,
and still opens when you have no internet.

- **Chrome:** open the page, then use the menu **&#8942; > Cast, save, and share > Install page as app**.
- **Edge:** open the page, then use the menu **... > Apps > Install this site as an app**.
- **Safari (macOS Sonoma or newer):** open the page, then choose **File > Add to Dock**.

Some browsers (Safari, for one) keep an installed app's data separate from normal tabs. If your team
list looks empty in the installed app, add the team once there, or use **Restore from backup**.

## Beside Planner in a Teams meeting

Setup uses a normal, centered window. When you press **Start huddle** the app moves into a narrow strip
(about 360 pixels wide) on the right side of your screen, and everything (the clock, the buttons, the
Up next list) fits in that strip. How that happens depends on how you opened it:

- **Installed app (Chrome or Edge):** the app window itself resizes and moves to the right edge, then
  returns to a centered window for Setup and the summary.
- **Normal browser tab (Chrome or Edge):** the timer opens in a small floating window that stays above
  your other windows, and the main tab shows "Bring it back here". The browser decides exactly where that
  window appears, so drag it to the right edge once; it usually remembers.
- **Safari or Firefox:** nothing can move automatically. Drag the window's edge to about 300-400 pixels
  wide and put it beside Planner yourself; the layout adapts.

You can turn the automatic move off under Setup > More options.

1. In Planner, set the board to **Group by: Assigned to**, so each person has their own column.
2. Put Planner in your browser on the left and the Huddle Timer strip on the right.
3. In Teams choose **Share > Screen**. (**Window** only shares one window, so it can't show both.)
   The first time, macOS asks you to let Teams record the screen: System Settings > Privacy & Security >
   Screen Recording (called Screen & System Audio Recording on newer macOS versions).
4. Randomize, start, and as each person comes up, everyone looks at their Planner column.

You can also float the timer yourself at any time with the small pop-out icon at the top (Chrome and
Edge only). If the app window is already a narrow strip, the floating window opens exactly on top of it
so you only see one window; click **Dock back** (the same icon) and the strip is right where it was.
If it opens in a different spot, drag it; the strip underneath stays put.

## For the developer

### Run it locally

Just open `index.html`, or serve the folder:

```bash
python -m http.server 8765
```

### Publish with GitHub Pages

1. Create a **public** repo (for example `huddle-timer`) and push the files in this folder
   (`index.html`, `sw.js`, `manifest.webmanifest`, `icons/` and this README).
2. In the repo: **Settings > Pages > Build and deployment > Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the site is live at `https://<your-github-username>.github.io/<repo-name>/`.

Because the repo is public, keep **everything company-specific out of it**: no company name, no
team names or photos, no Planner plan IDs or tenant details. The app stores the roster only in the
visitor's browser, so nothing in the repo needs to change per team.

### Privacy guard

`index.html` ships with a Content-Security-Policy `<meta>` tag that starts from `default-src 'none'`
and sets no `connect-src`, so the browser blocks the page from making any network requests. The only
exceptions are `'self'` entries (`img-src`, `manifest-src`, `worker-src`) for this site's own icons,
manifest and offline cache. If Planner / Microsoft Graph support is added later, that policy has to be
loosened deliberately, adding only
`connect-src https://graph.microsoft.com https://login.microsoftonline.com`.

### Installable app and offline cache

- `manifest.webmanifest` + `icons/` make browsers offer "install" (standalone window, no address bar).
- `sw.js` is a small service worker: **network first**, cached copy as the fallback, so updates arrive
  as soon as you're online. It only touches files from the same site. It is not registered for a
  `file://` copy. If you change the list of cached files, bump `CACHE` in `sw.js`.
- Service workers need `https://` or `localhost`, so test installs against the Pages URL or the local server.

### Huddle flow

`h.ordered` is false until **Randomize order** is pressed (queue is in list order), then true. `randomize()`
decides and saves the order first and only then plays the shuffle animation, with a safety timer so the UI
can never get stuck. `startNext()` takes the first id off `h.queue` and starts its timer; it runs from
**Start** and from every Done/skip, which is what makes turns chain automatically. Saved sessions from the
older "spin" version (a person in a `landed` phase) are converted on load.

### Window handling (`enterStrip` / `leaveStrip`)

- Installed app (`display-mode: standalone` etc.): `window.resizeTo` / `moveTo` to the strip, and it checks
  `outerWidth` afterwards. If the browser ignored it, it falls back to the pop-out.
- Otherwise the pop-out uses the Document Picture-in-Picture API (Chrome / Edge 116+, desktop; it needs the
  click on Start huddle as its user gesture). The whole UI (`#shell`) is moved into the floating window and
  moved back on close; app state stays in the main page. Event listeners are registered through `listen()`
  so they can be replayed on the pop-out's document, and the clock interval and shuffle animation run in
  whichever window currently shows the UI (a hidden main window gets its timers throttled).
- Pop-out from a strip-sized window (`outerWidth <= STRIP_MAX`): `requestWindow` with the window's inner size,
  then `resizeTo` / `moveTo` onto the original's `screenX` / `screenY`, so it covers the strip. The original
  window is never moved or resized, so Dock back needs no restoring. From a bigger window it goes to the
  right edge at strip width. (Browsers don't let a page minimize or hide its own window, so covering is
  the closest to "only the pop-out".)
- Neither available (Safari, Firefox): nothing moves, and a one-time tip is shown.
- Restoring: Setup / summary dock the pop-out back, or re-center an installed window that is strip-sized.

### Teams

- **Screen share** works today with no setup.
- A channel or meeting **Website tab** pointed at the Pages URL needs no app package or admin
  sideloading, but it only works if the page can be embedded in an iframe. Test it before relying on it.
- A full Teams app (manifest + Teams JS SDK) can come later if wanted.

### Ideas for next

- Show the current person's open and overdue Planner tasks inside the timer. Optional now: a Planner board
  grouped by assignee next to the strip covers most of it. If wanted: Graph `/planner/plans/{id}/tasks`,
  or a Planner "Export to Excel" file loaded into the page.
- Remember attendance history, or a "most over time" trend across huddles.
