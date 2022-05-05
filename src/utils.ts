/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connection, PublicKey, ConfirmedSignatureInfo } from '@solana/web3.js';
import { SigInfo } from './types';

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

/**
 *
 * @param connection
 * @param associateAccount
 * @returns get wallet address owner of specify associate Account
 */
export async function getOwnerAssociatedAccount(
  connection: Connection,
  associateAccount: string
): Promise<string> {
  const info = await connection.getParsedAccountInfo(
    new PublicKey(associateAccount)
  );
  // @ts-ignore
  return info.value?.data?.parsed?.info?.owner;
}

/**
 *
 * @param connection
 * @param associateAccount
 * @returns Get token mint address of specify associate Account
 */
export async function getTokenOwnerAssociatedAccount(
  connection: Connection,
  associateAccount: string
): Promise<string> {
  const info = await connection.getParsedAccountInfo(
    new PublicKey(associateAccount)
  );
  // @ts-ignore
  return info.value?.data?.parsed?.info?.mint;
}
