import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import triforceGold from '../../img/triforce-gold.png';
import bossShadow from '../../img/boss-shadow.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton, ButtonContainer, 
    ListContainer, PageText, LogoutButton } from './BossesStyles';

// Genera un llistat de tots els monstres finals de la saga Zelda
function Bosses() {
    const [bossList, setBossList] = useState([]);

    useEffect(() => {
        const fetchBosses = async () => {
            try {
                const response = await axios.get('https://zelda.fanapis.com/api/bosses', {
                    params: {
                        limit: 100, 
                    }
                });
                setBossList(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error en carregar el llistat dels bosses: ', error);
            }
        };
        fetchBosses();
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
            <TitleText>Main Zelda Bosses</TitleText>

            <ListContainer>
                {bossList.map((boss) => (
                    <PageText key={boss.id}>
                        <Link to={`/bosses/${boss.id}`}>{boss.name}</Link>
                    </PageText>
                ))}
            </ListContainer>

            <CategoryButton>
                <span><i class="material-icons">home</i></span>
                <Link to='/main'>{' '}MAIN MENU</Link>
            </CategoryButton>

                    <LinkCharGold src={bossShadow} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
}

export default Bosses;
