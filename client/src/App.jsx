import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container">
      <h1>PA2</h1>
      <button onClick={() => setShowLogin(true)}>Login</button>
      <button onClick={() => setShowLogin(false)}>Sign Up</button>

      {showLogin ? <Login /> : <Signup />}
    </div>
  );
}

export default App;