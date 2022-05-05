import { Connection, PublicKey } from '@solana/web3.js';
import dotenv, { parse } from 'dotenv';
import { tokenTransfer, tokenSwap } from './parsing';
dotenv.config();

(async () => {
  const rpcUrl = process.env.RPC || 'https://solana-api.projectserum.com';
  const connection = new Connection(rpcUrl);

  //
  const address = 'DisXwVm1T6jdajyKX6FoMmSJ98CzCPcWWqUAJ3xUASc9';
  const swapSig =
    'wn9H7RmjW6KobQNL6q17bdTW23hP8P2AGHb23A2oEaegUADz4et1Gfiki6LC8Ldu3yKtaiEabV4qUYSTj63kc3n';
  const swapRaydium =
    '28ZdQNMRB6zhJnVcA1KmqjJoBUpcqDgLh192ubrsBz8eCRDGya5q62EfqRRKUXCtQznAk3yqmef8ZJkkVBNi7oim';

  const swapSig2 =
    '3t4Y4DX6f2AHoq1oiQjqbR2YekPWy8pPHaAubahs1n52UtuwE44mzjvLej4M38u4VTS6PeDSFtTaNFtookiTUnsg';
  const SOL2RAY =
    '2JWMrDkVbmZegqCzWL88Ut5vG8zcaieTZtUuzNQCQ6be9aEgQSdS2AjyrVKAYGc4v7mtwg8XHgXwh5sLLRbkBiFQ';
  const sendToken =
    '2M8PjS3AyaFy7WBqXXTt9BsRX7ghXRU4wJWbGNfWVrA8qzr52rnJP78gaFe59gASbn5V4oJMSEXPmz6DTduSzEdE';
  const sendSemiToken =
    '3jfrwChToeHvZyudPFpYR9gMw8miqaW1QMYXFBuzfeaz5fUw66gttgJgSPta8sCNkt21mNmgCF1JqgzZKLXjt2bP';
  const sendSOL =
    '5nqgVBLxTquQY93S147PvhNz6hGn6KWsqmZZs28jPr3PZuEQUHNgxXBZxNRsGFzsnXxdcpkSAfccapxAdyeCiSB2';
  const sendNFT =
    '2g5bqA1qLhge6kjd9q942xoEt1KVTPdFy63wEVYhix2Q6mkD36SnSFgmdSKhNfCnfP9njvysBez3RcbUUJt51dEi';
  const sendNFT2 =
    '47jhorFSVevFwstkNb8pYPvhnDt3ndJeNderkZ3zRufmUQuKyk5bZjFNt8ZwJkX3gsjyBsm4ebMBTx8HWSbBHQy4';
  const tradeNFT =
    '9WyU2KCdFz5L2RJihev1TUModu9BWuLu8Rv8qJM5yzmqxP4W1WwDhui3DfyrB76cXPuyJTguoXGtqp4boeBcxRX';

  console.log(await tokenSwap(connection, SOL2RAY));

  console.log('-----------------------------');
  console.log(await tokenSwap(connection, swapSig));

  console.log('-----------------------------');
  console.log(await tokenSwap(connection, swapSig2));

  console.log('-----------------------------');

  // console.log("siganture: ", RAY2SOL)
  // await parsingSwapToken(connection, RAY2SOL)

  // console.log("-----------------------------")
  // await parsingSwapToken(connection, swapSig3)

  // console.log(await parsingTokenTransfer(connection, '4seiXyEwDvuCahbM67TQYDcMAfw4RQMC5VWKfMyzJTk9fRUry2NjQXdjfb6h7s8eyKDBFVTwdMHo2gJ4x3qoVbv4'))
})();
