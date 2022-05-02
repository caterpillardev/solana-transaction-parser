/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, PublicKey } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Metadata,
  Edition,
  MasterEdition,
} from '@metaplex-foundation/mpl-token-metadata';
import { TokenStandard, TokenInfo } from './types';

export async function getTokenStandard(
  connection: Connection,
  mintAddress: string
): Promise<TokenStandard> {
  try {
    const edition = await Metadata.getEdition(connection, mintAddress);
    if (edition instanceof Edition) {
      return TokenStandard.NonFungibleEdition;
    } else if (edition instanceof MasterEdition) {
      return TokenStandard.NonFungible;
    }
  } catch {
    const info = await getTokenInfo(connection, mintAddress);
    if (info.decimals == 0 && Number.parseFloat(info.supply) > 1) {
      return TokenStandard.FungibleAsset;
    } else if (info.decimals > 0 && Number.parseFloat(info.supply) > 1) {
      return TokenStandard.Fungible;
    }
  }
}

export async function getTokenInfo(
  connection: Connection,
  mintAddress: string
): Promise<TokenInfo> {
  const token = new Token(
    connection,
    new PublicKey(mintAddress),
    TOKEN_PROGRAM_ID,
    {} as any
  );
  const mintInfo = await token.getMintInfo();
  return {
    mintAddress: mintAddress,
    supply: mintInfo.supply.toString(),
    decimals: mintInfo.decimals,
  };
}
