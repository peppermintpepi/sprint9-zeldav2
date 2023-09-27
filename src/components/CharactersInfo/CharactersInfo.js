import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import triforceBlue from '../../img/triforce-blue.png';
import charactersShadow from '../../img/characters-shadow.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton,
    ListContainer, PageText, LogoutButton, BackButton, VideoContainer } from './CharactersInfoStyles';

function CharacterInfo() {
    const { characterId } = useParams();
    const [character, setCharacter] = useState(null);
    const [gameName, setGameName] = useState(null);
    const [videoId, setVideoId] = useState(null); 

    const youtubeApiKey = `AIzaSyDNrpMiafysf6QEokAV7FKNLMyNo8syX5M`;
    const history = useNavigate();

    // Defineix una funció per gestionar el clic del botó "Back"
    const handleBackClick = () => {
        setVideoId(null);
        history('/characters');
    };

    useEffect(() => {
        setVideoId(null);

        if (characterId) {
            axios.get(`https://zelda.fanapis.com/api/characters/${characterId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setCharacter(response.data);

                const appearancesArray = response.data.data.appearances;

                if (Array.isArray(appearancesArray) && appearancesArray.length > 0) {
                    const gameURL = appearancesArray[0];
                    const gameID = gameURL.substring(gameURL.lastIndexOf('/') + 1);

                    return axios.get(`https://zelda.fanapis.com/api/games/${gameID}`);
                } else {
                    throw new Error('Invalid appearances format');
                }
            })
            .then((gameResponse) => {
                console.log('Game Data from API:', gameResponse.data);
                setGameName(gameResponse.data.data.name);
            })
            .catch((error) => {
                console.error('Error fetching la información del personatge: (linia 56) ', error);
            });
        }
    }, [characterId]);

    useEffect(() => {
        // Utilitza gameID per buscar vídeos relacionats amb el joc
        if (gameName) {
            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    q: `${character.data.name} ${gameName} Zelda`,
                    key: youtubeApiKey,
                    maxResults: 1,
                    type: 'video',
                }
            })
            .then((youtubeResponse) => {
                const videoItems = youtubeResponse.data.items;
                if (videoItems.length > 0) {
                    const videoId = videoItems[0].id.videoId;
                    setVideoId(videoId);
                } else {
                    console.error("No s'ha trobat cap vídeo relacionat.");
                }
            })
            .catch((error) => {
                console.error('Error fetching YouTube data: ', error);
            });
        }
    }, [characterId, gameName, youtubeApiKey]);

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };

    return (
        <Background>
            <ContentWrapper>
            <TriforceLogo srt={triforceBlue} ></TriforceLogo>

        <LogoutButton onClick={handleLogout}><span><i class="material-icons">exit_to_app</i></span>
                {' '}LOGOUT</LogoutButton>
            {character ? (
                <>
                    <TitleText>{character?.data?.name}</TitleText>
                    <PageText>Appearances: {gameName}</PageText>
                    <PageText>About the character: {character?.data?.description}</PageText>
                    <PageText>Gender: {character?.data?.gender}</PageText>
                    <PageText>Race: {character?.data?.race}</PageText>

                    <VideoContainer>
                        {videoId && (
                            <div>
                                <iframe
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </VideoContainer>

                    <BackButton>
                        <span><i class="material-icons">chevron_left</i></span>
                        <Link to='/characters'>{' '}BACK</Link>
                    </BackButton>
                    
                    <CategoryButton>
                        <span><i class="material-icons">home</i></span>
                        <Link to='/main'>{' '}MAIN MENU</Link>
                    </CategoryButton>   
                </>
            ) : (
                <div>Loading...</div>
            )}

            

            <LinkCharGold src={charactersShadow} ></LinkCharGold>
            </ContentWrapper>
        </Background>   
    );
}

export default CharacterInfo;
