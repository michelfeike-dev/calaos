# calaos Marketing-Sticker

Drei Sticker-Versionen im calaos-Look für den Druck bei **stickerapp.de**.
Dunkler Grund (`#141414`), weiße Wortmarke füllt die **volle Breite** (bis 2 mm
Sicherheitsrand); die Höhe ist je Version so gewählt, dass der Sicherheitsbereich
maximal ausgefüllt wird. Scharfe Ecken, Finish **matt**.

## Versionen (in [`versions/`](versions/))
| # | Motiv | Endgröße (Schnitt) | Datei inkl. 2 mm Beschnitt | Print-PNG |
| --- | --- | --- | --- | --- |
| 1 | **calma.** + `www.calaos.me` | 86 × 35 mm = **8,6 × 3,5 cm** | 90 × 39 mm | `1-calma_print_600dpi.png` (2126 × 921) |
| 2 | **chaos.** + `www.calaos.me` | 86 × 36 mm = **8,6 × 3,6 cm** | 90 × 40 mm | `2-chaos_print_600dpi.png` (2126 × 945) |
| 3 | **calaos.** (nur Logo) | 86 × 30 mm = **8,6 × 3,0 cm** | 90 × 34 mm | `3-calaos_print_600dpi.png` (2126 × 803) |

Alle Maße liegen auf ganzen Millimetern → im StickerApp-Konfigurator exakt als **cm mit
einer Nachkommastelle** eingebbar (Breite einheitlich **8,6 cm**). Breite über `cutW` im Skript
steuerbar (Default 86 mm); die Höhe wird je Version auf ganze mm aufgerundet, das Logo bleibt
dabei zentriert und unverzerrt.

Je Version drei Dateien: `*.svg` (Vektor-Master), `*_print_600dpi.png` (Upload),
`*_proof.png` (Kontrolle mit Hilfslinien: magenta = Schnitt, cyan = Sicherheitsbereich).

## Bei StickerApp bestellen (je Version)
1. Produkt **Rechteckige Sticker** (Custom / Rectangle), **scharfe Ecken**.
2. **Größe** = Endgröße der jeweiligen Version in cm (z. B. Version 1: **8,6 × 3,5 cm**).
3. **Material/Finish: Matt** (weißes Vinyl).
4. Die passende `*_print_600dpi.png` hochladen.
5. **2 mm Beschnitt ist in der Datei enthalten** — nicht doppelt anlegen, Motiv 1 : 1 platzieren.
6. StickerApp-Vorschau prüfen (dunkler Grund bis zur Schnittkante, Wortmarke mit Abstand zum Rand).

## Prepress / Farbe
StickerApp druckt **CMYK** und konvertiert die RGB-Datei automatisch. Richtwerte:
- Grund `#141414` → tiefes Schwarz (bei Bedarf „Rich Black" ~C40 M40 Y40 K100).
- Blau `#60a5fa` → ≈ **C62 M34 Y0 K0**.
- Weiß (Wortmarke) = **Aussparung** des weißen Vinyls — keine Weißschicht nötig.

≥300 dpi ist erfüllt (600 dpi). Für maximale Farbtreue die SVGs in Illustrator/Inkscape
öffnen, **Schriften in Pfade** wandeln (die Wortmarken sind bereits Pfade; nur die URL-Zeile
in Version 1/2 ist Text) und als **CMYK-PDF** exportieren.

## Neu generieren / ändern
Alle Versionen werden aus den Website-Wortmarken erzeugt:

```bash
node marketing/sticker/generate.mjs
```

Quellen: `public/images/text/calma.svg`, `…/chaos.svg` und die calaos.-Wortmarke
(inline im Skript, aus `src/components/shared/calaos-logo.tsx`).
Layout-Parameter (Sicherheitsrand, Abstand, URL-Größe) stehen oben im Skript.
