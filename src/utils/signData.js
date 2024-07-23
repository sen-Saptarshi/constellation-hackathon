const dagProvider = window.stargazer.getProvider("constellation");
const ethProvider = window.stargazer.getProvider("ethereum");

// Build the signature request
const signatureRequest = {
  content: "Sign this message to confirm your address",
  metadata: {
    user: "3feb69d6-d3f0-4812-9c93-384bee08afe8",
  },
};

// Encode the signature request - Base64 < JSON < Request
const signatureRequestEnconded = window.btoa(JSON.stringify(signatureRequest));

// Send the request and wait for the signature
await dagProvider.request({
  method: "dag_signMessage",
  params: [
    "DAG88C9WDSKH451sisyEP3hAkgCKn5DN72fuwjfX",
    signatureRequestEnconded,
  ],
});
// "3045022100b35798008516373fcc6eef75fe8e322ce8fe0dccc4802b052f3ddc7c6b5dc2900220154cac1e4f3e7d9a64f4ed9d2a518221b273fe782f037a5842725054f1c62280"

// Send the request and wait for the signature
// Send the request and wait for the signature
await dagProvider.request({
  method: "dag_getPublicKey",
  params: ["DAG88C9WDSKH451sisyEP3hAkgCKn5DN72fuwjfX"],
});
// "0482c4566a9c4cbb6f23b9a31c96876501c71f5c04b35f416e0b2243113cce8fb386a2db0b3881d1c908d33465748b948649165a6705904120238999eed6eed1f4"
