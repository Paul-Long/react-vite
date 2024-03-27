import {env} from '../util.mjs';
import {deploy} from '../ssg/share.mjs';
(async () => {
  await deploy(env.tradeDistDir, 'dev11.rate-x.io');
  console.log('😄😄😄😄Upload Trade completed.😄😄😄😄');
})()
