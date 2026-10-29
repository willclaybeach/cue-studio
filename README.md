# Cue Studio

A full blown teleprompter app made in conjunction with ChatGPT.

A browser teleprompter built for writing, rehearsing, and delivering scripts.

## Run locally

No build step or Node dependencies are required. With Python 3 installed, run from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open http://localhost:8000 in your browser. Stop the server with Ctrl+C.

For editing, open this folder in VS Code and edit the files inside `dist/`. In this buildless project, `dist/` contains the actual source and must be committed.

## Features

- Multiple scripts with browser-local autosave
- Simple editor with bold, italic, and underline
- DOCX, RTF, and TXT text import; TXT export
- Live preview and full-screen prompting where supported
- Adjustable speed, font, size, column width, line spacing, and text color
- Horizontal mirror, vertical flip, reading guide, and countdown
- Keyboard controls: Up/Down adjust speed, Space plays/pauses, T returns to top, Escape exits prompting
- Swipe up/down adjusts speed; tap the prompter to play/pause

## Project files

- `dist/index.html`: interface and page structure
- `dist/style.css`: layout, responsive styling, and prompter appearance
- `dist/app.js`: editing, script storage, scrolling, controls, and import/export
- `dist/rtf.js`: RTF text extraction
- `dist/vendor/mammoth.browser.min.js`: bundled Mammoth 1.11.0 DOCX importer
- `.openai/hosting.json`: existing Sites deployment configuration; do not substitute a new project ID

## Data and limitations

Scripts and preferences are stored in localStorage for the current browser and website origin. They are not included in this repository and do not sync between devices. Export important scripts before clearing browser data or changing the website address. Localhost and the hosted app have separate saved scripts.

DOCX and RTF imports extract text rather than preserving document layouts, images, or complex formatting. Older `.doc` files must first be converted to `.docx`. Prompter text is plain text even when the editor contains emphasis formatting.

This version has no service worker or guaranteed offline startup. Browser and OS support affect full-screen mode and screen wake lock. Test those functions on actual production devices.

## Hosting

The browser app is served separately through Sites. A GitHub push alone does not publish a new website version. No GitHub deployment automation is configured.

## Next milestones

1. Test imported production scripts on iPad, iPhone, and Mac.
2. Verify keyboard, touch, mirroring, long-script scrolling, and full-screen behavior.
3. Add full-library backup and restore, then dependable offline startup.
4. Evaluate cross-device sync and a native Apple implementation.

## Verification performed

JavaScript syntax, markup element references, DOCX paragraph extraction, and RTF groups, Unicode, escaped characters, and Windows-1252 character extraction were checked during the initial build. Interactive browser and device QA remains outstanding.

## Third-party code

The bundled DOCX importer is Mammoth.js 1.11.0: https://github.com/mwilliamson/mammoth.js . Preserve its applicable license notices when distributing the project.
