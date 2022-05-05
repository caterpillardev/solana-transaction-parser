/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, PublicKey } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Metadata,
  Edition,
  MasterEdition,
} from '@metaplex-foundation/mpl-token-metadata';
import { TokenListProvider } from '@solana/spl-token-registry';
import { TokenStandard, TokenInfo } from './types';

/**
 *
 * @param connection
 * @param mintAddress
 * @returns Return Token standard of specify mint address (based on metaplex standard)
 */
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

/**
 *
 * @param connection
 * @param mintAddress
 * @returns Get basic info of a token
 */
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

/**
 *
 * @param connection
 * @param mintAddress
 * @returns Get token info in detail
 */
export async function getTokenInfoDetails(
  connection: Connection,
  mintAddress: string
): Promise<TokenInfo> {
  const info = await getTokenInfo(connection, mintAddress);
  const standard = await getTokenStandard(connection, mintAddress);
  if (standard === TokenStandard.Fungible) {
    const item = await new TokenListProvider().resolve().then((tokens) => {
      return tokens
        .filterByChainId(101)
        .getList()
        .filter((item) => {
          if (item.address === mintAddress) {
            return item;
          } else {
            return null;
          }
        });
    });
    if (item) {
      return {
        tokenStandard: standard,
        name: item[0]?.name,
        symbol: item[0]?.symbol,
        ...info,
      };
    }
    return info;
  } else {
    const metadataPDA = await Metadata.getPDA(mintAddress);
    const tokenMetaData = await Metadata.load(connection, metadataPDA);
    return {
      tokenStandard: standard,
      name: tokenMetaData.data?.data?.name,
      symbol: tokenMetaData.data?.data?.symbol,
      ...info,
    };
  }
}
