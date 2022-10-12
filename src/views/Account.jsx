// 🌎 Imports in the file
import React from "react";
import StellarSdk from "stellar-sdk";
import sjcl from "@tinyanvil/sjcl";
// UI elements
import { Button, TextLink, Identicon, Heading3 } from "@stellar/design-system";
// Modals
import { EnterPincodeModal } from "../components/EnterPincodeModal";
import { MakePaymentModal } from "../components/MakePaymentModal";
import { TrustAssetModal } from "../components/TrustAssetModal";
// Methods
import { copyToClipboard } from "../methods/copyToClipboard";
import { makePayment } from "../methods/makePayment";
import { trustAsset } from "../methods/trustAsset";
// Types




export const Account = ({
  accountKeys,
  accountData,
  refreshAccount
}) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [isUiUpdating, setIsUiUpdating] = React.useState(false);
  const [pinModalVisible, setPinModalVisible] = React.useState(false);
  const [trustAssetModalVisible, setTrustAssetModalVisible] = React.useState(
    false
  );
  const [makePaymentModalVisible, setMakePaymentModalVisible] = React.useState(
    false
  );

  // Helpers
  const getKeypairFromKeystore = (pincode) => {
    if (accountKeys?.keystore) {
      try {
        // 🚀 Create keypair from secret key
        return StellarSdk.Keypair.fromSecret(
          // 🌎 Decrypt secret key from keystore
          sjcl.decrypt(pincode, accountKeys.keystore)
        );
      } catch (e) {
        // 🌎 Handle pincode error
      }
    }
  };

  // Action handlers
  const handleCopyAddress = () => {
    // 🌎 Copy public key to clipboard
    copyToClipboard(accountKeys?.publicKey);
  };

  const handleCopySecret = (pincode) => {
    const secretKey = getKeypairFromKeystore(pincode).secret();
    // 🌎 Copy secret key to clipboard
    copyToClipboard(secretKey);
  };

  const handleTrustAsset = async (
    assetCode,
    assetIssuer,
    pincode
  ) => {
    try {
      // 🌎 Indicating that UI is loading
      setIsUiUpdating(true);
      // 🚀 Get account secret key from keystore
      const secretKey = getKeypairFromKeystore(pincode).secret();
      // 🚀 trust asset helper method
      await trustAsset({ secretKey, assetCode, assetIssuer });
      // 🌎 Fetching updated account information
      refreshAccount();
      // 🌎 Indicating that UI is done loading
      setIsUiUpdating(false);
    } catch (e) {
      // 🌎 Handle trust asset error here
      setIsUiUpdating(false);
    }
  };

  const handleMakePayment = async ({
    destination,
    amount,
    assetCode,
    assetIssuer,
    pincode
  }) => {
    try {
      // 🌎 Indicating that UI is loading
      setIsUiUpdating(true);
      // 🚀 Get account secret key from keystore
      const secretKey = getKeypairFromKeystore(pincode).secret();
      // 🚀 make payment helper method
      await makePayment({
        destination,
        amount,
        assetCode,
        assetIssuer,
        secretKey
      });
      // 🌎 Fetching updated account information
      refreshAccount();
      // 🌎 Indicating that UI is done loading
      setIsUiUpdating(false);
    } catch (e) {
      // 🌎 Handle make payment error here
      setIsUiUpdating(false);
    }
  };

  // 🌎 Render Account view UI
  return (
    <div className="Account">
      <Heading3>Your account address</Heading3>
      {/* 🚀 Display identicon which is a unique icon, generated based on the
      wallet public key */}
      <Identicon publicAddress={accountKeys.publicKey} />

      <div className="Account__copyLinks">
        {/* 🌎 Trigger copy public key action */}
        <TextLink onClick={handleCopyAddress}>Copy Address</TextLink>
        {/* 🌎 Trigger copy secret key action */}
        <TextLink onClick={() => setPinModalVisible(true)}>
          Copy Secret
        </TextLink>
      </div>

      <Heading3>Balances</Heading3>
      <table className="Balances">
        <tbody>
          {/* 🚀 Render account balances */}
          {accountData?.balances.map((b) => (
            <tr key={`${b.asset_code}-${b.asset_issuer || "native"}`}>
              <td>{b.asset_code}</td>
              <td>{b.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="Account__buttons">
        <Button onClick={refreshAccount} isLoading={isUiUpdating}>
          Refresh Account
        </Button>

        <Button
          onClick={() => setTrustAssetModalVisible(true)}
          isLoading={isUiUpdating}
        >
          Trust Asset
        </Button>

        <Button
          onClick={() => setMakePaymentModalVisible(true)}
          isLoading={isUiUpdating}
        >
          Make Payment
        </Button>
      </div>

      {/* Modals */}
      <EnterPincodeModal
        visible={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onDone={handleCopySecret}
      />
      <TrustAssetModal
        visible={trustAssetModalVisible}
        onClose={() => setTrustAssetModalVisible(false)}
        onDone={handleTrustAsset}
      />
      <MakePaymentModal
        visible={makePaymentModalVisible}
        onClose={() => setMakePaymentModalVisible(false)}
        onDone={handleMakePayment}
      />
    </div>
  );
};

