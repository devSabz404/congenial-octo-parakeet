export type AccountBalance = {
  asset_code: string;
  asset_issuer: string | undefined;
  balance: string;
};

export type AccountData = {
  last_modified_time: string;
  balances: AccountBalance[];
  num_sponsoring: number;
  num_sponsored: number;
};

export type AccountKeys = {
  publicKey: string;
  keystore: string;
};

export type MakePaymentResponseParam = {
  destination: string;
  amount: string;
  assetCode: string;
  assetIssuer: string;
  pincode: string;
};
