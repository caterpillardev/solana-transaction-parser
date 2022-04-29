import { Connection } from '@solana/web3.js';
import { getSuccessSignatures } from './parsing';

(async () => {
  const rpcUrl = process.env.RPC as string
  const connection = new Connection(rpcUrl);
  const address = 'DisXwVm1T6jdajyKX6FoMmSJ98CzCPcWWqUAJ3xUASc9';
  const r = await getSuccessSignatures(connection, address);
})();
