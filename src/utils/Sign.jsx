import { useState } from "react";
import { activateStargazerProviders } from "./activateStargazerProviders";
import { dag4 } from "@stardust-collective/dag4";

const ConnectAndSignData = () => {
  const [payload, setPayload] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const connectAndSign = async () => {
    try {
      const { dagProvider } = await activateStargazerProviders();

      const data = {
        field1: "content_field_1",
        field2: {
          field2_1: true,
          field2_2: 12332435,
          field2_3: {
            field2_3_1: "content_field2_3_1",
          },
        },
        field3: [1, 2, 3, 4],
        field4: null,
      };

      const dataEncoded = window.btoa(JSON.stringify(data));

      const dagAccounts = await dagProvider.request({
        method: "dag_accounts",
        params: [],
      });
      const userAddress = dagAccounts[0];

      const signature = await dagProvider.request({
        method: "dag_signData",
        params: [userAddress, dataEncoded],
      });

      const publicKey = await dagProvider.request({
        method: "dag_getPublicKey",
        params: [userAddress],
      });

      const payload = { dataEncoded, signature, publicKey };
      setPayload(payload);

      const message = `\u0019Constellation Signed Data:\n${dataEncoded.length}\n${dataEncoded}`;
      const result = await dag4.keyStore.verifyData(
        publicKey,
        message,
        signature
      );
      setVerificationResult(result);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={connectAndSign}>Connect and Sign Data</button>
      {payload && (
        <div>
          <h2>Signature Payload</h2>
          <pre>{JSON.stringify(payload, null, 2)}</pre>
        </div>
      )}
      {verificationResult !== null && (
        <div>
          <h2>Verification Result</h2>
          <p>
            {verificationResult
              ? "Verification succeeded"
              : "Verification failed"}
          </p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ConnectAndSignData;
