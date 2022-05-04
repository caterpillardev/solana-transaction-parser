import { Connection } from '@solana/web3.js';
import { getSuccessSignatures } from './parsing';
import { getTokenInfoDetails, getTokenStandard } from './token';
import dotenv from 'dotenv';
import { convertToObject } from 'typescript';
dotenv.config();

(async () => {
  const rpcUrl = process.env.RPC || 'https://solana-api.projectserum.com';
  const connection = new Connection(rpcUrl);
  const nft = '39mExy8vot28dyBaRiQrFYi4Y1mzUmecoFkAKatpNAXm';
  const token = '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R';
  const nftedition = '8nJDKCP2AjzaRDMk1DPYjo3SKEuofBNTFx1KMBNWRcLn';
  console.log('NFT edition: ', await getTokenStandard(connection, nftedition));
  console.log('NFT: ', await getTokenStandard(connection, nft));
  console.log('Token: ', await getTokenStandard(connection, token));
  console.log('Token info: ', await getTokenInfoDetails(connection, token));
  console.log('NFT info: ', await getTokenInfoDetails(connection, nft));
})();
