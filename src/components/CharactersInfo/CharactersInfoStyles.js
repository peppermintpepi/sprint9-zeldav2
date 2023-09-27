import styled from "styled-components";
import backgroundImg from '../../img/characters-bg.png'

const Background = styled.div`
    background-image: url(${backgroundImg});
    background-color: #7bb0f4;
    background-size: contain; 
    background-repeat: no-repeat;
    width: 100%;
    min-height: 100vh;
    position: relative;
`

const ContentWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
`

const TriforceLogo = styled.img`
    position: fixed;
    top: 1.5rem;
    left: 2rem;
    width: 25%;
`

const LinkCharGold = styled.img `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 30%;

    @media screen and (min-width: 1000px) {
        width: 25%;
    }
`

const TitleText = styled.h1`
    margin-left: auto;
    margin-right: auto;
    max-width: 60%;
    color: #f5f4e2;
    font-family: 'Noto Serif NP Hmong', serif;
    font-size: 2rem;
    letter-spacing: 1px;

    @media screen and (max-width: 640px) {
        top: 3rem;
        font-size: 1.25rem;
        left: 10%; 
        right: 10%;
        transform: none;
        text-align: center; 
    }
`

const PageText = styled.p`
    font-family: 'Inclusive Sans', sans-serif;
    color: #000316;
    font-size: 1rem; 
    margin-left: auto;
    margin-right: auto;
    max-width: 60%; 
    padding: 0 20%; 

    @media screen and (max-width: 640px) {
        font-size: 0.75rem; 
        max-width: 80%; 
`

const ListContainer = styled.ul `
    margin-top: 10rem !important;
    
`

const CategoryButton = styled.button `
    background-color: Transparent;
    border: none;
    cursor:pointer;
    color: #000316;
    position: fixed;
    top: 5rem;
    right: 4rem;
`

const LogoutButton = styled.button `
    background-color: Transparent;
    border: none;
    cursor:pointer;
    color: #000316;
    position: fixed;
    top: 3rem;
    right: 4rem;
`

const BackButton = styled.button `
    background-color: Transparent;
    border: none;
    cursor:pointer;
    color: #000316;
    position: fixed;
    top: 7rem;
    right: 4rem;
`

const VideoContainer = styled.div`
    width: 60%;
    position: relative;
    padding: 2%;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    z-index: 0; 

    &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1; 
    }

    @media screen and (max-width: 950px) {
        width: 70%;
    }

    @media screen and (max-width: 850px) {
        width: 75%;
    }
    @media screen and (max-width: 750px) {
        width: 80%;
    }
`

export { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton,
    ListContainer, PageText, LogoutButton, BackButton, VideoContainer };