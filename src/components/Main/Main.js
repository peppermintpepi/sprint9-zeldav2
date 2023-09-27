import React from "react";
import { Link } from 'react-router-dom';
import triforceGold from '../../img/triforce-gold.png';
import linkGold from '../../img/link-shadow-gold.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText,
    CategoryButton, ButtonContainer, ListContainer, PageText, PageCategory,
    PageTextContainer, LogoutButton } from './MainStyles'

// pàgina d'inici amb la informació
function Welcome() {

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };

    return (
        <Background>
            <ContentWrapper>

                <TriforceLogo src={triforceGold} ></TriforceLogo>
                <TitleText>Welcome to Zelda's main database</TitleText>
                <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>

                <PageTextContainer>
                    <PageText>
                        The series centers on the various incarnations of Link, 
                        a courageous young man of the elf-like Hylian race, and Princess Zelda, 
                        a magical princess who is the mortal reincarnation of the goddess Hylia, 
                        as they fight to save the magical land of Hyrule from Ganon, an evil warlord turned demon king, 
                        who is the principal antagonist of the series. Ganon wishes to use the Triforce, 
                        a sacred relic left behind by the three goddesses that created Hyrule, 
                        to remake the world in his own dark image. When gathered together, 
                        the power of the Triforce can grant any wish its user desires; 
                        however, if someone with a heart that does not possess a balance of the three virtues of Power, 
                        Courage, and Wisdom attempts to touch the Triforce, it will split into three triangles 
                        and bond with three people whose hearts embody the required virtue.
                    </PageText>
                </PageTextContainer>

                <PageCategory>
                    Choose a category to find more information.
                </PageCategory>
                

                <ul>
                    <ListContainer>
                        <ButtonContainer>
                            <CategoryButton>
                                <span><i class="material-icons">videogame_asset</i></span>
                                <Link to='/games'>{'  '}Games</Link>
                            </CategoryButton>
                        </ButtonContainer>

                        <ButtonContainer>
                            <CategoryButton>
                                <span><i class="material-icons">contacts</i></span>
                                <Link to='/staff'>{' '}Staff</Link>
                            </CategoryButton>
                        </ButtonContainer>

                        <ButtonContainer>
                            <CategoryButton>
                                <span><i class="material-icons">directions_walk</i></span>
                                <Link to='/characters'>{' '}Characters</Link>
                            </CategoryButton>
                        </ButtonContainer>

                        <ButtonContainer>
                            <CategoryButton>
                                <span><i class="material-icons">mood_bad</i></span>
                                <Link to='/bosses'>{' '}Bosses</Link>
                            </CategoryButton>
                        </ButtonContainer>
                    </ListContainer>
                </ul>


                <LinkCharGold src={linkGold} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
}

export default Welcome;