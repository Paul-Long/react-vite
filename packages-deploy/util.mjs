import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import {glob} from 'glob';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';

const require = createRequire(import.meta.url);

export const env = require('./env.json');

export function createS3Client() {
  return new S3Client(env.s3Config);
}

export async function upload(s3Client, uploadParams, log = true) {
  try {
    await s3Client.send(new PutObjectCommand(uploadParams));
    if (log) {
      console.log('Success', uploadParams.Key);
    }
  } catch (err) {
    console.log('Error', err);
  }
}

export function loadFiles(cwd) {
  return glob('**/*.*', {cwd});
}

export function calcFileHash(fullPath, length = 6) {
  return new Promise((resolve) => {
    const md5 = crypto.createHash('md5');
    const stream = fs.createReadStream(fullPath);
    stream.on('data', (chunk) => md5.update(chunk, 'hex'));
    stream.on('end', () => resolve(md5.digest('hex').slice(-length)));
  });
}
