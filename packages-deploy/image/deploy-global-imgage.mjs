import mime from 'mime';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {calcFileHash, createS3Client, env, loadFiles, upload} from '../util.mjs';

const cwd = env.imageUploadDir;

const s3Client = createS3Client();
const keyPrefix = 'static.rate-x.io/img/v1';
const files = await loadFiles(cwd);
for (const file of files) {
  const fullPath = path.resolve(cwd, file);
  const hash = await calcFileHash(fullPath);
  const key = path.join(keyPrefix, hash, file);

  const uploadParams = createUploadParams(fullPath, key);
  const basename = path.basename(file);
  console.log(
    [
      file.padEnd(30, ' '),
      path.join(hash, basename).padEnd(30, ' '),
      path.join(keyPrefix, hash, basename),
    ].join('  ->  ')
  );
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
