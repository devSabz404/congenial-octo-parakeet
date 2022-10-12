// 🌎 Importing Stellar SDK JS library
import StellarSdk from "stellar-sdk";
// 🌎 Importing constants
import { NETWORK_URL, NETWORK_PASSPHRASE } from "../constants";

type TrustAssetProps = {
  secretKey: string;
  assetCode: string;
  assetIssuer: string;
};

export const trustAsset = async ({
  secretKey,
  assetCode,
  assetIssuer
}: TrustAssetProps) => {
  try {
    // 🚀 Creating server instance with Stellar test network
    const server = new StellarSdk.Server(NETWORK_URL);
    // 🚀 Creating keypair from the secret key
    const keypair = StellarSdk.Keypair.fromSecret(secretKey);
    // 🚀 Getting account object with populated sequence number
    const account = await server.loadAccount(keypair.publicKey());
    // 🚀 Creating transaction with the operation
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE
    })
      .addOperation(
        // 🚀 Using `changeTrust` operation to create trustline
        StellarSdk.Operation.changeTrust({
          asset: new StellarSdk.Asset(assetCode, assetIssuer)
        })
      )
      // 🚀 `setTimeout(0)` will set `maxTime` timebounds internally. This is
      // needed if you want to be sure to receive the status of the transaction
      // within a given period.
      .setTimeout(0)
      .build();

    // 🚀 Signing transaction
    transaction.sign(keypair);

    // 🚀 Submitting transaction to the network
    return await server.submitTransaction(transaction);
  } catch (error) {
    // 🌎 Handle error here
    throw new Error("Add trustline transaction failed");
  }
};
