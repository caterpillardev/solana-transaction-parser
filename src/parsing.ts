/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { getTokenInfoDetails } from './token';
import { TokenTransferResponse } from './types';
import { getOwnerAssociatedAccount } from './utils';


/**
 * 
 * @param connection web3 Connection
 * @param signature solana transaction signature
 * @returns Parsed detail transfer token information for this signature
 */
export async function parsingTokenTransfer(
  connection: Connection,
  signature: string
): Promise<TokenTransferResponse> {
  const confirmedTransaction = await connection.getParsedConfirmedTransaction(
    signature
  );
  const instructions = confirmedTransaction?.transaction?.message?.instructions;
  for (const item of instructions) {
    // @ts-ignore
    if (item.program == 'spl-token' || item.program == 'system') {
      // @ts-ignore
      const program = item.program;
      // @ts-ignore
      const info = item?.parsed?.info;
      // @ts-ignore
      const type = item?.parsed?.type;
      // send token
      if (program == 'spl-token' && type == 'transferChecked') {
        // Send token
        const from = await getOwnerAssociatedAccount(connection, info.source);
        const to = await getOwnerAssociatedAccount(
          connection,
          info.destination
        );
        const infoDetail = await getTokenInfoDetails(connection, info.mint)
        return {
          from: from,
          to: to,
          amount: info.tokenAmount.uiAmount,
          tokenInfo: infoDetail,
          isNative: false
        };
      }
      if (program == 'system' && type == 'transfer') {
        // send SOL
        return {
          from: info.source,
          to: info.destination,
          amount: (info.lamports / LAMPORTS_PER_SOL).toString(),
          isNative: true,
        };
      }
    }
  }
}

export async function parsingSwapToken(connection: Connection, signature: string): Promise<any>{
  const confirmedTransaction = await connection.getParsedConfirmedTransaction(
    signature
  );
  // console.log(confirmedTransaction)
  return confirmedTransaction.transaction.message.instructions
}
