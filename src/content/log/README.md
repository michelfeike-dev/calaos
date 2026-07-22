# Logbuch (`content/log`)

Alltägliche Gedanken und Lektionen für die Seite **`/log`** (calaos.me/log)
sowie die passenden **Instagram-Story-Grafiken**.

| Datei | Zweck |
| --- | --- |
| [`log.ts`](./log.ts) | Datenquelle aller Logbuch-Einträge (Website) |
| [`ig-story-template.html`](./ig-story-template.html) | Vorlage für eine IG-Story (9:16) eines Eintrags |

---

## 1. Einen Eintrag hinzufügen

Neues Objekt oben in [`log.ts`](./log.ts) ergänzen — sortiert wird
automatisch nach `date` (neueste zuerst):

```ts
{
  title: 'Titel des Eintrags',
  text: 'Der vollständige Text …',
  date: '2026-07-21',          // ISO YYYY-MM-DD
  ort: 'Berlin',
  tags: ['chaos', 'selbstwert'],
}
```

Damit erscheint der Eintrag auf **`/log`** und im Tag-Filter.

---

## 2. Eine Instagram-Story daraus erstellen

Die Story zeigt bewusst nur einen **Anriss** — Titel als Hero, ein kurzer
Teaser, `weiterlesen`. Der volle Text bleibt in `log.ts` / auf der Website.

1. **Vorlage öffnen:** [`ig-story-template.html`](./ig-story-template.html)
   im Editor.
2. Unten im `<script>` den Block **`const entry = { … }`** füllen:
   - `nummer` – fortlaufender Index (`#1`, `#2`, …)
   - `titel` – wie in `log.ts`
   - `teaser` – **kurz** (1–3 Sätze): der stärkste Hook, endet als
     Cliffhanger, den `weiterlesen` auflöst
   - `ort`, `datum` (ISO – wird deutsch formatiert, z. B. „20. Juli 2026")
3. Datei im **Browser öffnen** (Doppelklick).
4. **Export-Modus einschalten:** oben links auf **„Export 1080×1920"**
   klicken (oder `#export` an die URL hängen). Die Story wird auf exakt
   **1080 × 1920** gesetzt — **ohne den dunklen Rand**, der Button verschwindet.

5. **Nur die Story als Bild speichern** — über den Web-Inspector wird gezielt
   die Karte aufgenommen (kein schwarzer Rand, volle Auflösung):

   **Safari (macOS):**
   1. Develop-Menü aktivieren: Safari → Einstellungen → *Erweitert*
      → „Funktionen für Webentwickler anzeigen".
   2. *Entwickler* → **Web-Inspector einblenden** (`Cmd + Opt + I`) → Reiter
      **„Elemente"**.
   3. Das Element **`<div class="story">`** suchen, Rechtsklick →
      **„Bildschirmfoto aufnehmen"** („Capture Screenshot") → speichern.
   > Safari hat **kein** Kamera-Symbol im Responsive-Modus — der Screenshot
   > läuft immer über den Web-Inspector.

   **Chrome / Edge:**
   Rechtsklick auf die Story → „Untersuchen" → im *Elements*-Panel
   **`<div class="story">`** per Rechtsklick → **„Capture node screenshot"**.

   Auf Retina-Displays entsteht das Bild in doppelter Auflösung
   (2160 × 3840) — top für Instagram.

   **Am Handy:** Vorlage öffnen, Export-Modus antippen → normaler Screenshot.

---

## 3. In Instagram verlinken

Der Text im Bild ist **nur Grafik, nicht klickbar**. Beim Hochladen:

- Story-Editor → **Sticker** (Smiley-Icon) → **„Link"**
  → `https://calaos.me/log` eingeben.
- Sticker in den **freien Bereich unten** setzen (dafür ist der Platz
  reserviert).
- Zusätzlich sinnvoll: **Link in Bio** aufs Logbuch.

---

## Design-Notiz

Die Vorlage nutzt dieselben Tokens wie die Website (Grund `#141414`,
Karte `#1c1c1c` mit blauer Oberkante, Akzent `#60a5fa`, **Instrument
Serif** als Display-Schrift). Instrument Serif wird beim lokalen Öffnen per
Google-Fonts-CDN geladen; ohne Netz greift ein Serif-Fallback
(Hoefler Text / Palatino).
