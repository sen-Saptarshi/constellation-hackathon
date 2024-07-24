import { useState, useEffect } from "react";

/**
 * Gets and activates Stargazer (constellation, ethereum) providers
 */
import { activateStargazerProviders } from "./activateStargazerProviders";

const ConnectStargazerButton = () => {
  const [providers, setProviders] = useState(null);
  const [error, setError] = useState(null);

  const connectStargazer = async () => {
    try {
      const providers = await activateStargazerProviders();
      setProviders(providers);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={connectStargazer}>Connect with Stargazer</button>
      {providers ? (
        <div>
          <p>Connected to Stargazer</p>
          <h2>ETH Provider Info</h2>
          {providers.ethAccounts ? (
            <div>
              <p>Accounts: {providers.ethAccounts.join(", ")}</p>
              <p>Chain ID: {providers.ethChainId}</p>
            </div>
          ) : (
            <p>Loading ETH Provider Info...</p>
          )}
          <h2>DAG Provider Info</h2>
          {providers.dagAccounts ? (
            <div>
              <p>Accounts: {providers.dagAccounts.join(", ")}</p>
              <p>Chain ID: {providers.dagChainId}</p>
            </div>
          ) : (
            <p>Loading DAG Provider Info...</p>
          )}
        </div>
      ) : (
        <p>Not connected</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ConnectStargazerButton;
