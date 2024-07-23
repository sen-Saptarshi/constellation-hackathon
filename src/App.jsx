import "./App.css";
import ConnectStargazerButton from "./utils/Connect";
// import ConnectAndSignData from "./utils/Sign";

function App() {
  return (
    <>
      <h1>Connect Wallet</h1>
      <ConnectStargazerButton />

      <hr />
      <h1>$DAG - Sign Data</h1>

      {/* <ConnectAndSignData /> */}
    </>
  );
}

export default App;
