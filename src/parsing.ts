/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Connection,
  PublicKey,
  ConfirmedSignatureInfo,
  ParsedMessage,
} from '@solana/web3.js';
import { SigInfo, InstructionsDetails } from './types';

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

export async function parsingIntructions(
  connection: Connection,
  signature: string
): Promise<InstructionsDetails[]> {
  const confirmedTransaction = await connection.getParsedConfirmedTransaction(
    signature
  );
  const instructions = confirmedTransaction?.transaction?.message?.instructions;
  return instructions;
}

export async function getInfo(connection: Connection) {
  // @TODO

  return;
}
