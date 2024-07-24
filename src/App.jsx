import "./App.css";
import ConnectStargazerButton from "./utils/Connect";
// import ConnectAndSignData from "./utils/Sign";
import Sign from "./utils/signData";
import { useState } from "react";
function App() {
  return (
    <>
      <h1>Connect Wallet</h1>
      <ConnectStargazerButton />

      <hr />
      <h1>$DAG - Sign Data</h1>
      
      <button onClick={Sign}>Sign karne ka button</button>
      
      {/* <ConnectAndSignData /> */}
    </>
  );
}

export default App;
