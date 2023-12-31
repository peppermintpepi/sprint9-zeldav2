import styled from "styled-components";
import backgroundImg from '../../img/main-bg.png'

const Background = styled.div`
    background-image: url(${backgroundImg});
    background-color: #007935;
    background-size: cover; 
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
    width: 25%;
`

const TitleText = styled.h1`
    position: fixed;
    top: 4rem;
    margin-left: 30%;
    color: #6e571d;
    text-align: center;
    font-family: 'Noto Serif NP Hmong', serif;
    font-size: 2rem;
    letter-spacing: 1px;
    text-shadow: 2px 2px 3px #f5f4e2;

    @media screen and (max-width: 640px) {
        top: 3rem;
        font-size: 1.25rem;
    }
`

const PageText = styled.p`
    font-family: 'Inclusive Sans', sans-serif;
    color: #f5f4e2;
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
    color: #6e571d;
    position: fixed;
    top: 5rem;
    right: 4rem;
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
    ListContainer, PageText, LogoutButton };