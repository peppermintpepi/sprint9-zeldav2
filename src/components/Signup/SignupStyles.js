import styled from "styled-components";
import backgroundImg from '../../img/zelda-bg.png';

const Background = styled.div`
    background-image: url(${backgroundImg});
    background-color: #000316;
    background-size: contain; 
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    position: relative;
`
const TriforceLogo = styled.img`
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 25%;

    @media screen and (min-width: 1450px) {
        width: 20%;
    }
`

const LinkChar = styled.img `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 30%;

`

const ContentWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
`

const TitleText = styled.h1`
    color: #f5f4e2;
    text-align: center;
    font-family: 'Noto Serif NP Hmong', serif;
    letter-spacing: 1px;
    margin-left: 25%;
    margin-right: 25%;
    margin-top: calc(20% + 1rem);

    @media screen and (max-width: 1450px) {
        margin-top: calc(20% + 1rem);
    }
    @media screen and (min-width: 1450px) {
        margin-top: calc(23% + 1rem);
    }
    @media screen and (max-width: 1080px) {
        margin-top: calc(15% + 1rem);
    }
    @media screen and (max-width: 640px) {
        font-size: 1.25rem;
        margin-top: calc(15% + 1rem);
    }
`

const MainText = styled.p `
    font-family: 'Inclusive Sans', sans-serif;
    color: #f5f4e2;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 640px) {
        margin-right: 20%;
        margin-left: 20%;
        font-size: 0.75rem;
    }
`
const Label = styled.label `
    font-family: 'Inclusive Sans', sans-serif;
    color: #f5f4e2;

    @media screen and (max-width: 640px) {
        font-size: 0.75rem;
    }
`

const LoginButton = styled.button `
    font-family: 'Noto Serif NP Hmong', serif;
    font-size: 1rem;
    background-color: rgb(76, 175, 219);
    color: #f5f4e2;
    padding: 0.75rem 3rem;
    border: none; 
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
`

const SignupContainer = styled.div `
    display: flex;
    align-items: center;
    margin-left: 50%;
    transform: translateX(-50%);
`

const ButtonContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;

    &:hover {
        color: #000316;
    }
`

const IntupDesign = styled.input `
    font-family: 'Inclusive Sans', sans-serif;
    border: 2px solid rgb(76, 175, 219);
    border-radius: 5px;
    margin-top: 0.5rem;
    margin-left: auto;
    text-align: right;
`

export { Background, ContentWrapper, TriforceLogo, LinkChar, TitleText, MainText, Label, LoginButton, SignupContainer, IntupDesign, ButtonContainer };
