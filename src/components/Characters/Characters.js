import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import triforceGold from '../../img/triforce-gold.png';
import zeldaShadow from '../../img/zelda-shadow.png'
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton, ButtonContainer, 
    ListContainer, PageText, LogoutButton } from './CharacterStyles';

// generar un llistat dels principals personatges de la saga
function Characters() {
    const [characterList, setCharacterList] = useState([]);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get('https://zelda.fanapis.com/api/characters', {
                    params: {
                        limit: 100, 
                    }
                });
                setCharacterList(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error en carregar el llistat dels personatges: ', error);
            }
        };
        fetchCharacter();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };

    return (
        <Background>
            <ContentWrapper>
                <TriforceLogo src={triforceGold} ></TriforceLogo>
                
                <LogoutButton onClick={handleLogout}><span><i class="material-icons">exit_to_app</i></span>
                    {' '}LOGOUT</LogoutButton>

                    <CategoryButton>
                        <span><i class="material-icons">home</i></span>
                        <Link to='/main'>{' '}MAIN MENU</Link>
                    </CategoryButton>

                    <TitleText>Zelda's Characters</TitleText>
                    <ul>
                        <ListContainer>
                            {characterList.map((character) => (
                                <PageText key={character.id}>
                                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                                </PageText>
                            ))}
                        </ListContainer>
                    </ul>


                    <LinkCharGold src={zeldaShadow} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
};

export default Characters;
