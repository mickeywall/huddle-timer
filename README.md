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

The roster, photos and settings are saved in *this browser on this computer*. Use
**Save backup file** (at the bottom of the setup screen) to keep a copy or move to another computer,
and **Restore from backup** to load it back.

## For the developer

### Run it locally

Just open `index.html`, or serve the folder:

```bash
python -m http.server 8765
```

### Publish with GitHub Pages

1. Create a **public** repo (for example `huddle-timer`) and push `index.html` and this README.
2. In the repo: **Settings > Pages > Build and deployment > Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the site is live at `https://<your-github-username>.github.io/<repo-name>/`.

Because the repo is public, keep **everything company-specific out of it**: no company name, no
team names or photos, no Planner plan IDs or tenant details. The app stores the roster only in the
visitor's browser, so nothing in the repo needs to change per team.

### Privacy guard

`index.html` ships with a Content-Security-Policy `<meta>` tag with no network permissions
(`default-src 'none'`), so the browser blocks the page from making any network requests. If Planner / Microsoft
Graph support is added later, that policy has to be loosened deliberately, adding only
`connect-src https://graph.microsoft.com https://login.microsoftonline.com`.

### Teams

- **Screen share** works today with no setup.
- A channel or meeting **Website tab** pointed at the Pages URL needs no app package or admin
  sideloading, but it only works if the page can be embedded in an iframe. Test it before relying on it.
- A full Teams app (manifest + Teams JS SDK) can come later if wanted.

### Ideas for next

- Show the current person's open and overdue Planner tasks when the reel lands on them
  (Graph `/planner/plans/{id}/tasks`, or a Planner "Export to Excel" file loaded into the page).
- Remember attendance history, or a "most over time" trend across huddles.
