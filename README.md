# Royal Grace – wedding invitation (local copy)

Plain HTML + CSS + JavaScript. No framework, no build step.

## Files

| File | What it is |
|------|------------|
| `index.html` | The invitation page (open this on a phone, or share it) |
| `config.js` | **All the editable details** – names, dates, venue, timeline, texts, photos |
| `style.css` | The design (mobile first, same values as the original template) |
| `script.js` | Interactions: tap-to-open video, music, scratch heart, countdown, slideshow, calendar links, RSVP |
| `preview.html` | Phone-sized preview to view on a desktop browser |
| `assets/` | Intro video, background music, background textures, slideshow photos (`card-1/2/3.jpg` are the pages of the printed card) |
| `card-translation.md` | Full English translation of the Hindi wedding card the details came from |

## Editing the invitation

Open `config.js` in any text editor, change the values, save, refresh the page.

* Names, parents/subtext → `hero`
* Welcome message → `welcome.text`
* Event date/time (drives the scratch heart, countdown and calendar links) → `event`
* Headings → `headings`
* Photos → `slideshow.images` (put the files in `assets/`)
* Program, pre-wedding events → `timeline.days`, `preEvents.days`
* Venue + map → `venue` (leave `mapEmbedUrl` empty to auto-build the map)
* Dress code, transportation, accommodation, gifts, closing text, footer → their sections
* Hide a section → set its `enabled: false`
* RSVP replies → `rsvp.whatsapp` (number with country code) or `rsvp.email`
* Media files → `media`

Use `\n` inside a string for a line break.

## Viewing

* Double-click `index.html`, or
* open `preview.html` to see it inside a phone frame on a desktop.

The Google Fonts and the venue map need an internet connection; everything else is local.
