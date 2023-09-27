import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import triforceGold from '../../img/triforce-gold.png';
import bossesShadow from '../../img/bosses-shadow.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton,
    ListContainer, PageText, LogoutButton, BackButton, VideoContainer } from './BossesInfoStyles';

function BossesInfo() {
    const { bossId } = useParams();
    const [boss, setBoss] = useState(null);
    const [videoId, setVideoId] = useState(null); 
    const [dungeons, setDungeons] = useState([]);
    const [gameNames, setGameNames] = useState([]); // Defineix una variable d'estat per als noms dels jocs

    const youtubeApiKey = `AIzaSyDNrpMiafysf6QEokAV7FKNLMyNo8syX5M`;
    const history = useNavigate();

    const handleBackClick = () => {
        setVideoId(null);
        history('/bosses');
    };

    useEffect(() => {
        setVideoId(null);
    
        if (bossId) {
            axios.get(`https://zelda.fanapis.com/api/bosses/${bossId}`)
            .then((response) => {
                setBoss(response.data);
    
                const appearancesArray = response.data.data.appearances;
    
                if (Array.isArray(appearancesArray) && appearancesArray.length > 0) {
                    const gamePromises = appearancesArray.map(gameURL => (
                        axios.get(gameURL)
                        .then(gameResponse => gameResponse.data.data.name) 
                    ));
    
                    return Promise.all(gamePromises);
                } else {
                    throw new Error('Invalid appearances format');
                }
            })
            .then((gameNames) => {
                setGameNames(gameNames);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
        }
    }, [bossId]);
    
    
    

    useEffect(() => {
        if (bossId) {
            axios.get(`https://zelda.fanapis.com/api/bosses/${bossId}`)
            .then((response) => {
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
                const dungeonsArray = gameResponse.data.data.dungeons;
                setDungeons(dungeonsArray);
            })
            .catch((error) => {
                console.error('Error fetching dungeons data: ', error);
            });
        }
    }, [bossId]);

    useEffect(() => {
        // Utilitza gameNames per renderitzar els noms dels jocs
        // Utilitza gameNames per buscar vídeos relacionats amb els jocs
        if (gameNames.length > 0) {
            const gameName = gameNames[0]; // Agafa el primer nom de joc com a exemple, pots adaptar-ho segons les teves necessitats
            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    q: `${gameName} boss Zelda`,
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
    }, [gameNames]);

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

            {boss ? (
                <>
                    <TitleText>{boss?.data?.name}</TitleText>
                    
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

                    <PageText>Appearances:</PageText>
                        <ul>
                            <ListContainer>
                                {gameNames.map((gameName, index) => (
                                    <li key={index}>{gameName}</li>

                                ))}
                            </ListContainer>
                        </ul>
                    <PageText>About the boss: {boss?.data?.description}</PageText>
                    <PageText>
                        Dungeons:
                        {dungeons && dungeons.length > 0 ? (
                            <ul>
                                <ListContainer>
                                    {dungeons.map((dungeon, index) => (
                                        <li key={index}>{dungeon}</li>
                                    ))}
                                </ListContainer>
                            </ul>
                        ) : (
                            'No dungeons available'
                        )}
                    </PageText>

                <BackButton>
                    <span><i class="material-icons">chevron_left</i></span>
                    <Link to='/bosses'>{' '}BACK</Link>
                </BackButton>
                
                <CategoryButton>
                    <span><i class="material-icons">home</i></span>
                    <Link to='/main'>{' '}MAIN MENU</Link>
                </CategoryButton>

                </>
            ) : (
                <div>Loading...</div>
                )}

                <LinkCharGold src={bossesShadow} ></LinkCharGold>

                </ContentWrapper>
        </Background>
    );
}

export default BossesInfo;
