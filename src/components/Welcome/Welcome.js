import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom"; 
import triforce from '../../img/triforce-blue.png';
import linkShadow from '../../img/link-shadow.png';
import { Background, ContentWrapper, TriforceLogo, LinkChar, TitleText, TitleSign, MainText, Label, 
  LoginButton, SignupContainer, IntupDesign } from "./WelcomeStyles";

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
    <Background>
      <ContentWrapper>
        <TriforceLogo src={triforce}></TriforceLogo>
        <TitleText>Welcome to Zelda's database</TitleText>
        <MainText>
          This project is designed to replace many of the standard content
          pages that are already available with information about each aspect of
          the Zelda universe. This is a project to which anyone can contribute.
          The only requirement is that you make an account.
        </MainText>
        <TitleSign>Sign In</TitleSign>
        <SignupContainer>
          <Label>
            Username:
            <IntupDesign
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
        </SignupContainer>
        <SignupContainer>
          <Label>
            Password:
            <IntupDesign
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
        </SignupContainer>
        <div>
          <SignupContainer>
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          </SignupContainer>
          <SignupContainer>
            <MainText>
              No account? {' '}
              <strong style={{ fontFamily: "'Noto Serif NP Hmong', serif", fontSize: '1.4rem' }}>
                 Signup{" "}
              </strong>
              <span onClick={() => setIsLogin(false)}>
                <SignupContainer>
                  <LoginButton>
                    <Link to="/signup">Signup</Link>
                  </LoginButton>
                </SignupContainer>
              </span>
            </MainText>
          </SignupContainer>
        </div>

        <LinkChar src={linkShadow}></LinkChar>
      </ContentWrapper>
    </Background>
  );
}

export default Welcome;
