import {deploy} from '../ssg/share.mjs';
import {env} from '../util.mjs';
(async () => {
  await deploy(env.tradeDistDir, 'app-testnet.rate-x.io');
  console.log('😄😄😄😄Upload Trade completed.😄😄😄😄');
})();
