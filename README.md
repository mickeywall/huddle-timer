# Huddle Timer

A simple stand-up (huddle) facilitator. Add your team, hit **SPIN** to pick who goes next,
and a countdown starts for that person. When time runs out the clock turns red and keeps
counting into negative numbers so everyone can see who ran over.

It is a single file (`index.html`) with no dependencies, no build step and no server.
Everything runs in the browser, and nothing is ever uploaded.

## Using it (for the person running the huddle)

1. Open the page and add everyone's name. You can paste several at once, separated by commas.
   Click a round picture to add a photo, or drag a photo from your computer onto someone's row.
2. Set **Time per person** (for example 2 min).
3. Untick **Here today** for anyone who is out.
4. Press **Start huddle**, then **SPIN**.
5. When the reel stops, press **Start timer**. Press **Done – next person** when they finish.
6. When everyone has gone, press **See the summary**. **Copy summary** puts a short recap on your
   clipboard that you can paste into the Teams chat.

Keyboard shortcuts during a huddle: **Space** = spin / start / pause / resume, **Enter** = done.

In a Teams meeting, use **Share > Window** (or Screen) and pick the browser window showing this page.
The beeps only reach the other attendees if the **Include computer sound** option is ticked when you
start sharing (if your version of Teams offers it); otherwise only you hear them.

If someone arrives late, find them under **Not here** on the right and press **Add back**.
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

The app works as a narrow strip. Drag the window's edge until it is about 300&ndash;400 pixels wide and
everything (the reel, the clock, the buttons, who's left) fits without scrolling.

1. In Planner, set the board to **Group by: Assigned to**, so each person has their own column.
2. Put Planner in your browser on the left and the Huddle Timer window on the right, side by side.
3. In Teams choose **Share > Screen**. (**Window** only shares one window, so it can't show both.)
   The first time, macOS asks you to let Teams record the screen: System Settings > Privacy & Security >
   Screen Recording (called Screen & System Audio Recording on newer macOS versions).
4. Spin. When the reel lands on someone, everyone looks at that person's Planner column.

**Keep it on top (Chrome and Edge):** click the small pop-out icon at the top of the app. The timer moves
into a small floating window that stays above your other windows, so Planner can't cover it, and the
main window shows a "Bring it back here" button. Close the floating window, or click its **Dock back**
icon, to return. Safari and Firefox don't offer pop-out, so the button doesn't appear there; just keep
the two windows side by side.

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

### Pop-out window

The pop-out uses the Document Picture-in-Picture API (Chrome / Edge 116+, desktop). The whole UI
(`#shell`) is moved into the floating window and moved back on close; app state stays in the main page.
Event listeners are registered through `listen()` so they can be replayed on the pop-out's document, and
the clock interval and reel animation run in whichever window currently shows the UI (a hidden main
window gets its timers throttled). The button only appears when `'documentPictureInPicture' in window`.

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
