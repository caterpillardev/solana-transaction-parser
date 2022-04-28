import { Connection, PublicKey, ConfirmedSignatureInfo, ParsedMessage } from '@solana/web3.js';
import { ParseResponse, SigInfo } from './types';

export async function getSuccessSignatures(
  connection: Connection,
  walletAddress: string
): Promise<SigInfo[]> {
  const listSignature = await connection.getConfirmedSignaturesForAddress2(
    new PublicKey(walletAddress)
  );
  const successSig = listSignature
    .filter((item: ConfirmedSignatureInfo) => item.err === null)
    .map((item: ConfirmedSignatureInfo) => {
      return {
        blockTime: item?.blockTime,
        signature: item?.signature,
        slot: item?.slot,
      };
    });
  return successSig;
}

export async function parsing(
  connection: Connection,
  signature: string
): Promise<ParsedMessage> {
  const confirmedTransaction = await connection.getParsedConfirmedTransaction(signature)
  return confirmedTransaction.transaction.message
}
