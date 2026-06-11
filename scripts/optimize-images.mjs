/**
 * Optimiert alle Post-Bilder verlustarm: skaliert auf max. Breite herunter,
 * korrigiert die EXIF-Orientierung und schreibt eine WebP-Variante daneben.
 *
 * Aufruf:   pnpm optimize:images
 *
 * - Quelle:  public/images/posts/** (*.jpg, *.jpeg, *.png)
 * - Ziel:    gleiche Datei mit Endung .webp
 * - Die Originaldateien bleiben erhalten. Nach dem Lauf:
 *     1. coverImage-/Bildpfade im MDX auf die .webp-Datei umstellen
 *     2. die großen Originale löschen (optional, spart Repo-Größe)
 *
 * Parameter (Env, optional):
 *   MAX_WIDTH  Standard 2000  (px — wird nie hochskaliert)
 *   QUALITY    Standard 80    (WebP-Qualität 1–100)
 */

import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { resolve, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = resolve(__dirname, '..', 'public', 'images', 'posts')

const MAX_WIDTH = Number(process.env.MAX_WIDTH) || 2000
const QUALITY = Number(process.env.QUALITY) || 80
const SOURCE_EXT = new Set(['.jpg', '.jpeg', '.png'])

/** Recursively collect optimizable source files. */
function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else if (SOURCE_EXT.has(extname(entry.name).toLowerCase())) out.push(full)
  }
  return out
}

const kb = (bytes) => Math.round(bytes / 1024)

async function main() {
  let files
  try {
    files = walk(POSTS_DIR)
  } catch {
    console.error(`Kein Verzeichnis gefunden: ${POSTS_DIR}`)
    process.exit(1)
  }

  if (files.length === 0) {
    console.log('Keine zu optimierenden Bilder gefunden.')
    return
  }

  console.log(`Optimiere ${files.length} Bild(er) → max ${MAX_WIDTH}px, WebP q${QUALITY}\n`)

  let savedTotal = 0
  for (const file of files) {
    const out = file.replace(/\.(jpe?g|png)$/i, '.webp')
    const before = statSync(file).size

    await sharp(file)
      .rotate() // EXIF-Orientierung anwenden (verhindert hochkant/seitlich)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out)

    const after = statSync(out).size
    savedTotal += before - after
    const rel = file.replace(`${POSTS_DIR}/`, '')
    console.log(
      `✓ ${rel}\n  ${kb(before)} KB → ${kb(after)} KB (${out.split('/').pop()})`
    )
  }

  console.log(`\nGesamt eingespart: ${kb(savedTotal)} KB`)
  console.log('Nächste Schritte: MDX-Pfade auf .webp umstellen, Originale ggf. löschen.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
