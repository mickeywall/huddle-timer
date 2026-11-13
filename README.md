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
5. Press **Randomize order**. The names slide around, slowing down like a slot machine, then land in a
   numbered list with a bounce, a shine, popping numbers and a burst of sparks. Not happy with it?
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

- **Installed app (Chrome or Edge):** the app window itself resizes and snaps to the right edge and stays
  there (it snaps back if you drag it) until you click Pop out; Setup and the summary use a normal centered
  window.
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

**Docked strip, or a small square window (the icon at the top).**

- **Opens centered (installed app):** the installed app opens as a normal centered window for Setup. Setup
  and the summary are always normal centered windows.
- **Docked (the default during a huddle):** when you press Start huddle, the window resizes and snaps to the
  right edge of the screen, full height, as a strip. It is locked there: a resize is refused on the spot, and
  if you drag it away it snaps straight back as soon as you let go. (A web page can't truly freeze its own window, so letting go is when it
  moves back. It never fights you while you drag, so nothing flickers.)
- **Pop out:** turns the same window into a small square window of **fixed size** (520 x 520), with a
  condensed view: the speaker, the clock, Pause / Done, and chips for the next four people (+N more). You can
  move it anywhere, but resizing is refused: the moment you try (from an edge or a corner), the size goes
  straight back, so the window just won't grow or shrink. It remembers where you last put it. (A web page
  can't remove a window's edges or its maximize button, so you may see it twitch while you try, and maximizing
  may not be blocked.)
- **Snap to side** (the same icon, while popped out): snaps the window back to the right edge of whichever
  screen it is on and locks it again. To move the strip to another monitor, press Pop out, drag it there,
  then press Snap to side.
- It is one window the whole time. It can be covered by another window like any other, and a window can't
  be made much narrower than about 500 px (a browser limit), so the strip is about that wide.
- **Normal browser tab (Chrome or Edge):** *Pop out* opens a small floating window that stays above your
  other windows (this is the only way a browser tab can become a small window), and the tab shows "Bring it
  back here". Dock back, or close the floating window, to return.

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
can never get stuck. The animation is FLIP: it reorders the real rows in the DOM and animates each from its
old place with the Web Animations API (ten hops with growing pauses, then a bouncy landing on the real order),
followed by CSS keyframes (shine, number pop, glow on #1) and `sparkBurst()`. In a narrow window, sizes in the
running view use `clamp()` with `vh` units and the running card grows to take leftover height, so a tall strip
is filled instead of leaving empty space at the bottom. `startNext()` takes the first id off `h.queue` and starts its timer; it runs from
**Start** and from every Done/skip, which is what makes turns chain automatically. Saved sessions from the
older "spin" version (a person in a `landed` phase) are converted on load.

### Window handling (`enterStrip` / `leaveStrip`)

- Installed app (`display-mode: standalone` etc.): `window.resizeTo` / `moveTo` to the strip, and it checks
  `outerWidth` afterwards. If the browser ignored it, it falls back to the pop-out.
- **Dock / card modes, installed app (`winMode`):** `snapToSide()` places the window on the right edge of the
  current screen and `settleHome()` records whatever size and position the browser settled on as `lockBase`
  (windows can't be narrower than ~500 px, so it differs from the 360 px requested). `enforceWindow()` runs every
  150 ms while locked: in `'dock'` any change from `lockBase`, in `'card'` only a change of size, is noticed;
  it waits until two polls in a row see the same rectangle (the person stopped dragging / resizing), then calls
  `resizeTo` (+ `moveTo` when docked) once to put it back, giving up after 5 tries (e.g. maximized). Resizes are
  refused immediately by `onWindowResize()` (a `resize` event listener): it restores the size, and the position
  too (`lockBase` when docked, `cardPos` = the card's last position while its size was right, because dragging the
  left or top edge also shifts the window). Moves fire no event, so those are caught by the watcher. `popOutCard()`
  makes the 520 x 520 card (position from `huddle-timer/float` in `localStorage`, else top-right) and adds the
  `is-card` class for the condensed layout; `dockSide()` saves the card's position and docks again. The app also
  calls `centerWindow()` at launch and for Setup / summary. This replaced earlier designs that used a Document
  Picture-in-Picture window and tried to hide the app window under it (needed clicks, retried constantly,
  flickered): don't go back to that.
- **Normal browser tab:** the pop-out uses the Document Picture-in-Picture API (Chrome / Edge 116+, desktop; it
  needs a click as its user gesture; also used as the fallback when an installed window can't be resized). The
  whole UI (`#shell`) is moved into the floating window and moved back on close; app state stays in the main
  page. Event listeners are registered through `listen()` so they can be replayed on the pop-out's document,
  and the clock interval and shuffle animation run in whichever window currently shows the UI (a hidden main
  window gets its timers throttled).
- Neither available (Safari, Firefox): nothing moves, and a one-time tip is shown.
- Restoring: Setup / summary dock a floating card or pop-out back, then re-center an installed window that is
  strip-sized.

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
