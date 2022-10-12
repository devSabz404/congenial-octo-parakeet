import React from "react";
// UI elements
import { Button, Modal, Input } from "@stellar/design-system";

interface TrustAssetModalProps {
  visible: boolean;
  onClose: () => void;
  onDone: (code: string, issuer: string, pin: string) => void;
}

export const TrustAssetModal = ({
  visible,
  onClose,
  onDone
}: TrustAssetModalProps) => {
  // 🌎 Handling React local state (state variable and setter function)
  const [assetCode, setAssetCode] = React.useState("");
  const [assetIssuer, setAssetIssuer] = React.useState("");
  const [pincode, setPincode] = React.useState("");

  const handleDone = () => {
    if (!assetCode || !assetIssuer || !pincode) {
      // 🌎 Handle error here
      return;
    }

    onDone(assetCode, assetIssuer, pincode);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Modal.Heading>Trust Asset</Modal.Heading>
      <p>Create a trustline to an asset.</p>
      <Modal.Body>
        <Input
          id="assetCode"
          label="Enter asset code"
          onBlur={(e) => setAssetCode(e.target.value)}
        />
        <Input
          id="assetIssuer"
          label="Enter asset issuer"
          onBlur={(e) => setAssetIssuer(e.target.value)}
        />
        <Input
          id="pincode"
          label="Enter your keystore pincode"
          onBlur={(e) => setPincode(e.target.value)}
          note="Pincode is needed to get the secret key from the keystore"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant={Button.variant.secondary} onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleDone}>Continue</Button>
      </Modal.Footer>
    </Modal>
  );
};
