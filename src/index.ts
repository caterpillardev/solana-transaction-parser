import { Connection, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config(); 
(async () => {
  const rpcUrl = process.env.RPC
  const address = 'DisXwVm1T6jdajyKX6FoMmSJ98CzCPcWWqUAJ3xUASc9';
  const swapSig =
    'wn9H7RmjW6KobQNL6q17bdTW23hP8P2AGHb23A2oEaegUADz4et1Gfiki6LC8Ldu3yKtaiEabV4qUYSTj63kc3n';
  const sendToken =
    '2M8PjS3AyaFy7WBqXXTt9BsRX7ghXRU4wJWbGNfWVrA8qzr52rnJP78gaFe59gASbn5V4oJMSEXPmz6DTduSzEdE';
  const sendSemiToken =
    '3jfrwChToeHvZyudPFpYR9gMw8miqaW1QMYXFBuzfeaz5fUw66gttgJgSPta8sCNkt21mNmgCF1JqgzZKLXjt2bP';
  const connection = new Connection(rpcUrl);
  console.log('----');
  const latestTx =
    '2g5bqA1qLhge6kjd9q942xoEt1KVTPdFy63wEVYhix2Q6mkD36SnSFgmdSKhNfCnfP9njvysBez3RcbUUJt51dEi';
  const signatures = await connection.getConfirmedSignaturesForAddress2(
    new PublicKey(address)
  );
  // console.log(signatures)
  const latestSignature = signatures.filter(
    (item) => item.signature == latestTx
  )[0];
  // console.log(latestSignature)
  
  // const swap = await connection.getParsedConfirmedTransaction(swapSig);
  
  // console.log("swap instruction: ", swap.transaction.message.instructions)
  console.log('------------------');
  const sig = '28ZdQNMRB6zhJnVcA1KmqjJoBUpcqDgLh192ubrsBz8eCRDGya5q62EfqRRKUXCtQznAk3yqmef8ZJkkVBNi7oim'
  const nft = await connection.getParsedConfirmedTransaction(sig);
  console.log("send nft innerInstructions 1: ", nft.meta.innerInstructions[0].instructions)
  // console.log("send nft innerInstructions 2: ", nft.meta.innerInstructions[1].instructions)
  console.log("#################")
  console.log("send nft instruction message 0: ", nft.transaction.message.instructions[0])
  // console.log("send nft instruction message 1: ", nft.transaction.message.instructions[1])
  console.log('-------------')
  // const token = await connection.getParsedConfirmedTransaction(sendToken);
  // console.log("send token instruction: ", nft.transaction.message.instructions)
})();
