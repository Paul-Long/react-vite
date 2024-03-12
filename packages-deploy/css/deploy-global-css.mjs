import mime from 'mime';
import {createReadStream} from 'node:fs';
import {join, resolve} from 'node:path';
import {createS3Client, env, loadFiles, upload} from '../util.mjs';

const distDir = env.scssDistDir;

const s3Client = createS3Client();
const keyPrefix = 'static.rate-x.io/css';
const files = await loadFiles(distDir);
for (const file of files) {
  const fullPath = resolve(distDir, file);

  const key = join(keyPrefix, file);
  const uploadParams = createUploadParams(fullPath, key);
  console.log([file.padEnd(40, ' '), key].join('  ->  '));
  await upload(s3Client, uploadParams, false);
}

function createUploadParams(fullPath, key) {
  return {
    Bucket: 'ratex.io',
    Key: key,
    Body: createReadStream(fullPath),
    ContentType: mime.getType(fullPath),
  };
}
