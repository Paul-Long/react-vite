import {env} from '../util.mjs';
import {deploy} from './share.mjs';

(async () => {
  await deploy(env.ssgDistDir, 'rate-x.io', 'rate-x.io');
  console.log('😄😄😄😄Upload SSG completed.😄😄😄😄');
})()
