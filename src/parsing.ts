/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connection, PublicKey, ConfirmedSignatureInfo } from '@solana/web3.js';
import { getTokenStandard } from './token';
import { SigInfo, ParsedSignatureInfo } from './types';

/**
 *
 * @param connection
 * @param walletAddress
 * @returns List of transaction signature successed
 */
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

export async function parsingTransfer(
  connection: Connection,
  signature: string
): Promise<ParsedSignatureInfo | null> {
  const confirmedTransaction = await connection.getParsedConfirmedTransaction(
    signature
  );
  const items = confirmedTransaction?.transaction?.message?.instructions;
  for (const item of items) {
    if (item) {
      // @ts-ignore
      const program = item.program;
      // @ts-ignore
      const info = item?.parsed?.info;
      console.log({program, info})
      // send token
      if (program == 'spl-token' && info.type === 'transferChecked') {
        // Send token
        const mintAddress = info.mint
        const standard = getTokenStandard(connection, mintAddress)
        
      }
      if (program == 'system' && info.type === 'transfer') {
        // send SOL
        
      } else {
        // TODO late
      }
    }
  }

  return null;
}
