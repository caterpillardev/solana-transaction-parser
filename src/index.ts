import { Connection, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import { createConstructor } from 'typescript';
dotenv.config();

(async () => {
  const rpcUrl = process.env.RPC || 'https://solana-api.projectserum.com';
  console.log(rpcUrl);
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
  // const swap = await connection.getParsedConfirmedTransaction(swapSig);

  // console.log("swap instruction: ", swap.transaction.message.instructions)
  console.log('------------------');
  const sig =
    '28ZdQNMRB6zhJnVcA1KmqjJoBUpcqDgLh192ubrsBz8eCRDGya5q62EfqRRKUXCtQznAk3yqmef8ZJkkVBNi7oim';
  const nft = await connection.getParsedConfirmedTransaction(sendNFT);
  // console.log("send nft meta 1: ", nft.meta)
  console.log('send nft transaction 1:', nft.transaction.message.instructions);
  // console.log("send nft innerInstructions 2: ", nft.meta.innerInstructions[1].instructions)
  // console.log("send nft instruction message 0: ", nft.transaction.message.instructions[0])
  // console.log("send nft instruction message 1: ", nft.transaction.message.instructions[1])
  console.log('-------------');
  const nft2 = await connection.getParsedConfirmedTransaction(sendNFT2);
  // console.log("send nft meta 2: ", nft2.meta)
  console.log(
    'send nft transaction 2: ',
    nft2.transaction.message.instructions
  );

  const trade = await connection.getParsedConfirmedTransaction(tradeNFT);
  console.log('trade nft: ', trade);
  console.log('trade nft: ', trade.transaction.message.instructions);
})();
