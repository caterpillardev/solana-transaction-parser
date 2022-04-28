export type TypeAction = 'swap' | 'transfer' | 'send' | 'receive';

export type TypeToken = 'Fungible' | 'NonFungible' | 'SemiFungible';

export type ParseResponse = {
  action?: TypeAction;
  mintAddress?: string;
  typeToken?: TypeToken;
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
