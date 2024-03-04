import {env} from '../util.mjs';
import {deploy} from './share.mjs';

(async () => {
  await deploy(env.ssgDistDir, 'dev10.rate-x.io');
  console.log('😄😄😄😄Upload SSG completed.😄😄😄😄');
})()
