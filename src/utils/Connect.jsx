import { useState, useEffect } from "react";

/**
 * Gets and activates Stargazer (constellation, ethereum) providers
 */
import { activateStargazerProviders } from "./activateStargazerProviders";

const ConnectStargazerButton = () => {
  const [providers, setProviders] = useState(null);
  const [error, setError] = useState(null);
  const [ethInfo, setEthInfo] = useState(null);
  const [dagInfo, setDagInfo] = useState(null);

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

  useEffect(() => {
    const fetchProviderInfo = async () => {
      if (providers) {
        try {
          const ethAccounts = await providers.ethProvider.request({
            method: "eth_accounts",
          });
          const ethChainId = await providers.ethProvider.request({
            method: "eth_chainId",
          });

          const dagAccounts = await providers.dagProvider.request({
            method: "dag_accounts",
          });
          const dagChainId = await providers.dagProvider.request({
            method: "dag_chainId",
          });

          setEthInfo({ accounts: ethAccounts, chainId: ethChainId });
          setDagInfo({ accounts: dagAccounts, chainId: dagChainId });
        } catch (err) {
          setError(err.message);
          console.error(err);
        }
      }
    };

    fetchProviderInfo();
  }, [providers]);

  return (
    <div>
      <button onClick={connectStargazer}>Connect with Stargazer</button>
      {providers ? (
        <div>
          <p>Connected to Stargazer</p>
          <h2>ETH Provider Info</h2>
          {ethInfo ? (
            <div>
              <p>Accounts: {ethInfo.accounts.join(", ")}</p>
              <p>Chain ID: {ethInfo.chainId}</p>
            </div>
          ) : (
            <p>Loading ETH Provider Info...</p>
          )}
          <h2>DAG Provider Info</h2>
          {dagInfo ? (
            <div>
              <p>Accounts: {dagInfo.accounts.join(", ")}</p>
              <p>Chain ID: {dagInfo.chainId}</p>
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
