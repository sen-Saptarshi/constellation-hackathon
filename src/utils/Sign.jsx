import { useState } from "react";
import { activateStargazerProviders } from "./activateStargazerProviders";

export default function Sign() {
  const [signatureCode, setSignatureCode] = useState(null);
  const [signContent, setSignContent] = useState(null);

  const signData = async () => {
    const provider = await activateStargazerProviders();
    const signatureRequest = {
      content: signContent,
      metadata: {
        user: "3feb69d6-d3f0-4812-9c93-384bee08afe8",
      },
    };

    const signatureRequestEncoded = window.btoa(
      JSON.stringify(signatureRequest)
    );
    const signature = await provider.dagProvider.request({
      method: "dag_signMessage",
      params: [provider.dagAccounts[0], signatureRequestEncoded],
    });

    const publicKey = await provider.dagProvider.request({
      method: "dag_getPublicKey",
      params: [provider.dagAccounts[0]],
    });

    setSignatureCode({ signature, publicKey });
  };

  return (
    <div>
      <div>
        <input
          name="content"
          id="data"
          placeholder="Enter data"
          onInput={(e) => setSignContent(e.target.value)}
        />
      </div>

      <button onClick={() => signData()}>Sign Data</button>

      {signatureCode && (
        <div>
          <p>Signature: {signatureCode.signature}</p>
          <p>Public Key: {signatureCode.publicKey}</p>
        </div>
      )}
    </div>
  );
}
