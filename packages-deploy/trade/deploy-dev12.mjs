import {env} from '../util.mjs';
import {deploy} from '../ssg/share.mjs';
(async () => {
  await deploy(env.tradeDistDir, 'app-dev12.rate-x.io');
  console.log('😄😄😄😄Upload Trade completed.😄😄😄😄');
})()
