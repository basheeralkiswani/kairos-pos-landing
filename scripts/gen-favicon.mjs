import sharp from "sharp";
import { writeFileSync } from "fs";

const SRC = "public/images/logo-light.png"; // أبيض + ذهبي على شفاف
const OUT_DIR = "src/app";
const BG = { r: 10, g: 10, b: 12, alpha: 1 }; // #0a0a0c — لون خلفية الموقع

// قصّ رمز الـ"K" (الجزء العلوي) بدون كلمة KAIROS SPACE
const CROP = { left: 735, top: 240, width: 2740, height: 2740 };

async function makeTile(size, markRatio = 0.78) {
  const m = Math.round(size * markRatio);
  const mark = await sharp(SRC)
    .extract(CROP)
    .resize(m, m, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

function buildIco(images) {
  // images: [{ size, data(Buffer of PNG) }]
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;
  for (const img of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 0); // width
    e.writeUInt8(img.size >= 256 ? 0 : img.size, 1); // height
    e.writeUInt8(0, 2); // color count
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bit count
    e.writeUInt32LE(img.data.length, 8); // size of data
    e.writeUInt32LE(offset, 12); // offset
    offset += img.data.length;
    entries.push(e);
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoImages = [];
for (const size of [16, 32, 48, 64]) {
  icoImages.push({ size, data: await makeTile(size, size <= 32 ? 0.84 : 0.78) });
}
writeFileSync(`${OUT_DIR}/favicon.ico`, buildIco(icoImages));
writeFileSync(`${OUT_DIR}/icon.png`, await makeTile(512));
writeFileSync(`${OUT_DIR}/apple-icon.png`, await makeTile(180, 0.72));

console.log("✓ favicon.ico, icon.png, apple-icon.png generated");
