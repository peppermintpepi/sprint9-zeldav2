import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import triforceGold from '../../img/triforce-gold.png';
import linkGold from '../../img/link-shadow-gold.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton, ButtonContainer, 
    ListContainer, PageText, LogoutButton } from "./GamesStyles";
// generar un llistat de tots els jocs de la saga Zelda
function Games() {
    const [gamesList, setGamesList] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('https://zelda.fanapis.com/api/games', {
                    params: {
                        limit: 100, 
                    }
                });
                setGamesList(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error en carregar el llistat dels jocs: ', error);
            }
        };
        fetchGames();
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
                    
                <TitleText>Zelda's Games</TitleText>

                <ul>
                    <ListContainer>
                        {gamesList.map((game) => (
                            <PageText key={game.id}>
                                <Link to={`/games/${game.id}`}>{game.name}</Link>
                            </PageText>
                        ))}
                    </ListContainer>
                </ul>

                <CategoryButton>
                    <span><i class="material-icons">home</i></span>
                    <Link to='/main'>{' '}MAIN MENU</Link>
                </CategoryButton>


                <LinkCharGold src={linkGold} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
};

export default Games;
