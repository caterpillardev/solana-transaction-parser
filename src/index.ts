import { Connection, PublicKey } from '@solana/web3.js';
import dotenv, { parse } from 'dotenv';
import { parsingTokenTransfer, parsingSwapToken } from './parsing';
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
  console.log("instruction swap: ")
  const instructions = await parsingSwapToken(connection, swapSig)
  console.log(instructions)
  console.log(instructions)
  console.log("-----------------------------")
  console.log("instruction swap raydiym: ", await parsingSwapToken(connection, swapRaydium))
  // const parsed = await parsingTokenTransfer(connection, sendToken);
  // console.log('send Token: ', parsed);
  // console.log("-------------")
  // const parsedSOL = await parsingTokenTransfer(connection, sendSOL);
  // console.log('send SOL: ', parsedSOL);
  // console.log("-------------")
  // // await parsingTransfer(connection, sendSemiToken);
  // const parsedNFT = await parsingTokenTransfer(connection, sendNFT);
  // console.log('NFT: ', parsedNFT);
  // console.log("-------------")
  // console.log("NFT 2: ", await parsingTokenTransfer(connection, sendNFT2));
  // console.log("-------------")
  // console.log("trade NFT: ", await parsingTokenTransfer(connection, tradeNFT))
})();
