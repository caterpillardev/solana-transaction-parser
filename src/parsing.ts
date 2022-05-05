/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getTokenInfoDetails, getTokenInfo } from './token';
import {
  TokenSwapInfo,
  SwapInfo,
  TokenTransferResponse,
  TokenInfo,
} from './types';
import {
  getOwnerAssociatedAccount,
  getTokenOwnerAssociatedAccount,
} from './utils';

export const WrappedSOL = 'So11111111111111111111111111111111111111112';

/**
 *
 * @param connection web3 Connection
 * @param signature solana transaction signature
 * @returns Parsed detail transfer token information for this signature
 */
export async function tokenTransfer(
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
      if (
        program == 'spl-token' &&
        (type == 'transferChecked' || type == 'transfer')
      ) {
        // Send token
        const from = await getOwnerAssociatedAccount(connection, info.source);
        const to = await getOwnerAssociatedAccount(
          connection,
          info.destination
        );
        const infoDetail = await getTokenInfoDetails(connection, info.mint);
        return {
          from: from,
          to: to,
          amount: info.tokenAmount.uiAmount,
          tokenInfo: infoDetail,
          isNative: false,
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

/**
 *
 * @param connection
 * @param signature
 * @returns Parsed detail swap token information for this signature
 */
export async function tokenSwap(
  connection: Connection,
  signature: string
): Promise<SwapInfo> {
  const confirmedTransaction = await connection.getParsedConfirmedTransaction(
    signature
  );
  const innerInstructions = confirmedTransaction.meta.innerInstructions;
  let sourceSwap: TokenSwapInfo = null;

  let destinationSwap: TokenSwapInfo = null;

  for (const innerInstruction of innerInstructions) {
    const instructions = innerInstruction.instructions;
    for (const instruction of instructions) {
      // parsing get data
      // @ts-ignore
      const info = instruction.parsed?.info;
      // @ts-ignore
      const program = instruction.program;
      // @ts-ignore
      const type = instruction.parsed?.type;

      // Check transfer of SPL TOKEN
      if (program == 'spl-token' && type == 'transfer') {
        if (!sourceSwap) {
          const associatedAccountFrom = info.source;
          const associateAccountTo = info.destination;
          let mintAddress: string;
          let tokenInfo: TokenInfo;

          // Get mint address by associated token(sender or receiver)
          mintAddress = await getTokenOwnerAssociatedAccount(
            connection,
            associatedAccountFrom
          );
          if (!mintAddress) {
            mintAddress = await getTokenOwnerAssociatedAccount(
              connection,
              associateAccountTo
            );
          }

          // check mint Address: SPL TOKEN || SOL
          if (mintAddress == WrappedSOL) {
            tokenInfo = await getTokenInfo(connection, mintAddress);
          } else {
            tokenInfo = await getTokenInfoDetails(connection, mintAddress);
          }
          // Get source token
          const destination = await getOwnerAssociatedAccount(
            connection,
            associateAccountTo
          );
          sourceSwap = {
            from: info.authority,
            to: destination,
            token: tokenInfo,
            rawAmount: info.amount,
          };
        }
        const destinationAssociatedAccount = info.destination;
        const destination = await getOwnerAssociatedAccount(
          connection,
          destinationAssociatedAccount
        );

        if (destination === sourceSwap.from) {
          const mintAddress = await getTokenOwnerAssociatedAccount(
            connection,
            destinationAssociatedAccount
          );
          const tokenInfo = await getTokenInfoDetails(connection, mintAddress);
          destinationSwap = {
            from: info.authority,
            to: destination,
            token: tokenInfo,
            rawAmount: info.amount,
          };
        }
      }
    }
  }

  if (sourceSwap && destinationSwap) {
    return {
      source: sourceSwap,
      destination: destinationSwap,
    };
  } else {
    return null;
  }
}
