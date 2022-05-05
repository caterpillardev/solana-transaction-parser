import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';

export enum SignatureType {
  Swap,
  Transfer,
  Unknown,
}

export enum TokenStandard {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
}

export type TokenTransferResponse = {
  mint?: string;
  from: string;
  to: string;
  amount: string;
  decimals?: number;
  tokenInfo?: TokenInfo;
  isNative?: boolean;
};

export type SigInfo = {
  blockTime?: number;
  signature?: string;
  slot?: number;
};

export type TokenInfo = {
  tokenStandard?: TokenStandard;
  mintAddress: string;
  supply: string;
  decimals: number;
  name?: string;
  symbol?: string;
};

export type TokenSwapInfo = {
  from: string;
  to: string;
  token: TokenInfo;
  rawAmount: string;
};

export type SwapInfo = {
  source: TokenSwapInfo;
  destination: TokenSwapInfo;
};
export type InstructionsDetails =
  | ParsedInstruction
  | PartiallyDecodedInstruction;

export type NFTAction = 'bid' | 'trade' | 'transfer';
