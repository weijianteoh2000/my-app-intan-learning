import { useState} from 'react';
import MyRouter from './router';
function App() {
  const [login,setLogin] = useState(false);
  const loginApp = () => {
    setLogin(true);
  }
  return (
    <div className="App">
      {(login==true)?<MyRouter/>:
        <button onClick={loginApp}>Login</button>
      }
    </div>
  );
}
export default App;
