import React from "react";
// UI elements
import { Heading2, Button } from "@stellar/design-system";
// Modals
import { SecretKeySignInModal } from "../components/SecretKeySignInModal";
import { SetPincodeModal } from "../components/SetPincodeModal";

interface IntroProps {
  createAndSetAccount: (pincode: string) => Promise<void>;
  signInWithSecretKey: (secretKey: string, pincode: string) => void;
  isUiUpdating: boolean;
}

export const Intro = ({
  createAndSetAccount,
  signInWithSecretKey,
  isUiUpdating
}: IntroProps) => {
  // 🌎 Handling React local state (state variables and setter functions)
  const [newPinModalVisible, setNewPinModalVisible] = React.useState(false);
  const [secretKeyModalVisible, setSecretKeyModalVisible] = React.useState(
    false
  );

  // 🌎 Render Intro view UI
  return (
    <div>
      <Heading2>Benkiko DAO</Heading2>

      <div className="Intro__buttons">
        {/* 🌎 Show modal to generate new account */}
        <Button
          onClick={() => setNewPinModalVisible(true)}
          isLoading={isUiUpdating}
        >
          Generate keypair for new account
        </Button>

        {/* 🌎 Show modal to sign in with a secret key */}
        <Button onClick={() => setSecretKeyModalVisible(true)}>
          Sign in with a secret key
        </Button>
      </div>

      {/* Modals */}
      <SetPincodeModal
        visible={newPinModalVisible}
        onClose={() => setNewPinModalVisible(false)}
        onDone={createAndSetAccount}
      />
      <SecretKeySignInModal
        visible={secretKeyModalVisible}
        onClose={() => setSecretKeyModalVisible(false)}
        onDone={signInWithSecretKey}
      />
    </div>
  );
};
