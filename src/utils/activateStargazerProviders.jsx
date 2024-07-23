export const activateStargazerProviders = async () => {
  const walletProvider = window.stargazer;

  if (!walletProvider) {
    throw new Error("Unable to get wallet provider, is stargazer installed?");
  }

  if (!("getProvider" in walletProvider)) {
    throw new Error("This seems like a really old version of stargazer");
  }

  /**
   * An standard EIP-1193 Provider.
   */
  const ethProvider = walletProvider.getProvider("ethereum");
  await ethProvider.activate();

  /**
   * A compliant EIP-1193 Provider (JSON-RPC).
   */
  const dagProvider = walletProvider.getProvider("constellation");
  await dagProvider.activate();

  return {
    ethProvider,
    dagProvider,
  };
};
