import styled from "styled-components";
import backgroundImg from '../../img/main-bg.png'

const Background = styled.div`
    background-image: url(${backgroundImg});
    background-color: #007935;
    background-size: contain; 
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
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
`

const TitleText = styled.h1`
    position: fixed;
    right: 4rem;
    top: 3rem;
    margin-left: 30%;
    color: #6e571d;
    text-align: right;
    font-family: 'Noto Serif NP Hmong', serif;
    font-size: 2rem;
    letter-spacing: 1px;
    text-shadow: 2px 2px 3px #f5f4e2;

    @media screen and (max-width: 640px) {
        font-size: 1.25rem;
    }
`

const PageText = styled.p`
    font-family: 'Inclusive Sans', sans-serif;
    color: #f5f4e2;
    font-size: 1rem; 
    margin-top: 10rem;
    margin-left: auto;
    margin-right: auto;
    max-width: 60%; 
    padding: 0 20%; 

    @media screen and (max-width: 640px) {
        font-size: 0.75rem; 
        max-width: 80%; 
`

const PageTextContainer = styled.div `
    position: relative;
    z-index: 1;
`

const PageCategory = styled.p`
    font-family: 'Inclusive Sans', sans-serif;
    color: #f5f4e2;
    font-size: 1rem; 
    margin-left: auto;
    margin-right: auto;
    max-width: 60%; 
    padding: 0 20%; 
    position: relative;
    z-index: 1;
    
    @media screen and (max-width: 640px) {
        font-size: 0.75rem; 
        max-width: 80%; 
`

const ListContainer = styled.ul `
    margin-top: 5% !important;
    
`

const CategoryButton = styled.button `
    font-family: 'Noto Serif NP Hmong', serif;
    font-size: 1rem;
    background-color: #f5f4e2;
    color: #6e571d;
    padding: 0.75rem 2rem;
    border: none; 
    border-radius: 5px;
    cursor: pointer;
    width: 200px;

    &:hover {
        background-color: #6e571d; 
        color: #f5f4e2; 
        transform: translateX(5px);
    }

    @media screen and (max-width: 640px) {
        font-size: 0.75rem;
    }
`

const ButtonContainer = styled.div `
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    @media screen and (max-width: 640px) {
        margin-left: 0; 
      }
`

const LogoutButton = styled.button `
    background-color: Transparent;
    border: none;
    cursor:pointer;
    color: #6e571d;
    position: fixed;
    top: 3rem;
    right: 4rem;
`

export { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton, ButtonContainer, 
    ListContainer, PageText, PageCategory, PageTextContainer, LogoutButton };