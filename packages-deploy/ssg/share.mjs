import path from 'node:path';
import {createReadStream} from 'node:fs';
import mime from 'mime';
import {createS3Client, loadFiles, upload} from '../util.mjs';

export async function deploy(distDir, domain) {
  const cwd = path.resolve(distDir, 'client');
  const s3Client = createS3Client();
  const files = await loadFiles(cwd);
  await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(cwd, file);
      const uploadParams = createUploadParams(fullPath, file, domain);
      await upload(s3Client, uploadParams);
    })
  );
}

function createUploadParams(fullPath, file, domain) {
  const dirname = path.dirname(file);
  const filename = path.basename(file);
  console.log(fullPath, mime.getType(fullPath))
  return {
    Bucket: 'ratex.io',
    Key: calcKey(domain, dirname, filename),
    Body: createReadStream(fullPath),
    ContentType: mime.getType(fullPath),
  };
}

function calcKey(domain, dirname, filename) {
  const file = path.join(domain, dirname, filename);
  if (path.basename(file) === 'index.html') {
    const dirname = path.dirname(file);
    if (dirname === domain) {
      return file;
    }
    return path.dirname(file);
  }
  return file;
}
