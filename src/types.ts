import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from '@solana/web3.js';
export type TypeAction = 'swap' | 'transfer' | 'send' | 'receive';

export enum TokenStandard {
  NonFungible,
  FungibleAsset,
  Fungible,
  NonFungibleEdition,
}

export type ParsedSignatureInfo = {
  action?: TypeAction;
  mintAddress?: string;
  typeToken?: TokenStandard;
  from?: string;
  to?: string;
  type?: string;
  amount?: string;
  program?: string;
  programId?: string;
};

export type SigInfo = {
  blockTime?: number;
  signature?: string;
  slot?: number;
};

export type TokenInfo = {
  mintAddress: string;
  supply: string;
  decimals: number;
  name?: string;
  symbol?: string;
};

export type InstructionsDetails =
  | ParsedInstruction
  | PartiallyDecodedInstruction;

export type NFTAction = 'bid' | 'trade' | 'transfer';
