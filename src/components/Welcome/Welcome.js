import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom"; 

// pàgina d'inici amb login o redirecció a signup
function Welcome() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [redirect, setRedirect] = useState(false);
  
  const handleLogin = () => {
    const storedPassword = localStorage.getItem("password");
    const storedUsername = localStorage.getItem("username");

    // console.log("Stored Password:", storedPassword);
    // console.log("Entered Password:", password);
    // console.log("Stored Username:", storedUsername);
    // console.log("Entered Username:", username);
  
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("username", username);
      console.log("Successfull logged in!")
      setRedirect(true);
    } else {
      console.error("Error signing in");
    }
  };
  
  if (redirect) {
    return <Navigate to="/main" />
  }

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <p>
          No account? Signup{" "}
          <span onClick={() => setIsLogin(false)}>
            <button>
              <Link to="/signup">Signup</Link>
            </button>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Welcome;
