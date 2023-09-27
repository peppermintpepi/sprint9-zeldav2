import React, { useState } from 'react';
import triforce from '../../img/triforce-blue.png';
import linkShadow from '../../img/link-shadow.png';
import { Background, ContentWrapper, TriforceLogo, LinkChar, TitleText, MainText, Label, 
  LoginButton, SignupContainer, IntupDesign, ButtonContainer } from "./SignupStyles";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    passwordMatch: '',
    invalidEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessages({
        ...errorMessages,
        passwordMatch: 'Passwords do not match',
      });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessages({
        ...errorMessages,
        invalidEmail: 'Enter a valid email address',
      });
      return;
    }

    localStorage.setItem('username', formData.username);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('password', formData.password);

    window.location.href = '/main';
  };

  return (
    <Background>
      <ContentWrapper>
        <TriforceLogo src={triforce}></TriforceLogo>
        <TitleText>Create Account</TitleText>

        <MainText>
          Enter the information below to register.
        </MainText>
        
        <form onSubmit={handleSubmit}>
          <SignupContainer>
            <Label>Username:</Label>
            <IntupDesign
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </SignupContainer>
          <SignupContainer>
            <Label>Password:</Label>
            <IntupDesign
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </SignupContainer>
          <SignupContainer>
            <Label>Confirm Password:</Label>
            <IntupDesign
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errorMessages.passwordMatch && <p>{errorMessages.passwordMatch}</p>}
          </SignupContainer>
          <SignupContainer>
            <Label>Email:</Label>
            <IntupDesign
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errorMessages.invalidEmail && <p>{errorMessages.invalidEmail}</p>}
          </SignupContainer>

          <ButtonContainer>
            <LoginButton type="submit">Sign Up</LoginButton>
          </ButtonContainer>

        </form>
        <LinkChar src={linkShadow}></LinkChar>
      </ContentWrapper>
    </Background>
  );
};

export default Signup;
