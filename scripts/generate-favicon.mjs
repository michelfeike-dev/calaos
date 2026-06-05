/**
 * Generiert favicon.ico (16×16, 32×32, 48×48) aus dem Logo-SVG.
 * Aufruf: node scripts/generate-favicon.mjs
 */

import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const svgSource = resolve(root, 'public/icon.svg')
const outputPath = resolve(root, 'src/app/favicon.ico')

const SIZES = [16, 32, 48]
const BG = { r: 20, g: 20, b: 20, alpha: 0 } // transparent dark

async function svgToPng(size) {
  return sharp(svgSource, { density: 300 })
    .resize(size, size, {
      fit: 'contain',
      background: BG,
    })
    .png()
    .toBuffer()
}

function buildIco(pngBuffers) {
  const count = pngBuffers.length
  const headerSize = 6
  const entrySize = 16
  const dataOffset = headerSize + count * entrySize

  // Offsets for each image
  const offsets = []
  let offset = dataOffset
  for (const buf of pngBuffers) {
    offsets.push(offset)
    offset += buf.length
  }

  const totalSize = offset
  const ico = Buffer.alloc(totalSize)

  // ICONDIR header
  ico.writeUInt16LE(0, 0)     // reserved
  ico.writeUInt16LE(1, 2)     // type: 1 = ICO
  ico.writeUInt16LE(count, 4) // image count

  // ICONDIRENTRY for each image
  SIZES.forEach((size, i) => {
    const base = headerSize + i * entrySize
    ico.writeUInt8(size === 256 ? 0 : size, base)      // width
    ico.writeUInt8(size === 256 ? 0 : size, base + 1)  // height
    ico.writeUInt8(0, base + 2)   // color count
    ico.writeUInt8(0, base + 3)   // reserved
    ico.writeUInt16LE(1, base + 4)  // planes
    ico.writeUInt16LE(32, base + 6) // bit count
    ico.writeUInt32LE(pngBuffers[i].length, base + 8)  // image size
    ico.writeUInt32LE(offsets[i], base + 12)            // image offset
  })

  // Copy PNG data
  let pos = dataOffset
  for (const buf of pngBuffers) {
    buf.copy(ico, pos)
    pos += buf.length
  }

  return ico
}

async function main() {
  console.log('Generating favicon.ico...')
  const pngs = await Promise.all(SIZES.map(svgToPng))
  const ico = buildIco(pngs)
  writeFileSync(outputPath, ico)
  console.log(`✓ Written to ${outputPath} (${SIZES.join(', ')}px, ${ico.length} bytes)`)
}

main().catch(console.error)
