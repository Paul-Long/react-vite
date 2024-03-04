import mime from 'mime';
import fs from 'node:fs';
import {basename, join, resolve} from 'node:path';
import {createS3Client, env, loadFiles, upload} from '../util.mjs';

const distDir = env.fontDistDir;

const s3Client = createS3Client();
const keyPrefix = 'static.rate-x.io/css';
const files = await loadFiles(distDir);
for (const file of files) {
  const fullPath = resolve(distDir, file);

  const uploadParams = createUploadParams(fullPath, file, keyPrefix);
  const bn = basename(file);
  console.log([file.padEnd(24, ' '), join(keyPrefix, bn)].join('  ->  '));
  await upload(s3Client, uploadParams, false);
}

function createUploadParams(fullPath, file, keyPrefix) {
  const bn = basename(file);
  const key = join(keyPrefix, bn);
  return {
    Bucket: 'ratex-io',
    Key: key,
    Body: fs.createReadStream(fullPath),
    ContentType: mime.getType(file),
  };
}
