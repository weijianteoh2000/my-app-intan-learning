import logo from './logo.svg';
import { PeraWalletConnect } from "@perawallet/connect";
import { useState} from 'react';
import MyRouter from './router';
function App() {
  const [account, setAccount] = useState(null);
  //connect dengan algo wallet utk dapatkan account user 
  const connectPeraAlgoWallet = async () => {
    let account = "";
    const peraConnect = new PeraWalletConnect({
      shouldShowSignTxnToast: false
    });
    await peraConnect.connect()
      .then((value) => {
        console.log('Connected with Pera Wallet. Account address:', value);
        setAccount(value);
      })
      .catch((err) => {
        console.error('Error connecting with Pera Wallet:', err);
      });
    return account;
  }
  return (
    <div className="App">
      {(account!=null)?<MyRouter/>:<header className="App-header">
       
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={connectPeraAlgoWallet}>Connect to Pera Algo Wallet</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>}
    </div>
  
  );
}

export default App;
