import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import triforceBlue from '../../img/triforce-blue.png';
import linkShadow from '../../img/link-games.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton, 
    ListContainer, PageText, LogoutButton, BackButton, VideoContainer } from './GameInfoStyles';

// renderitzar les dades del joc triat
function GameInfo() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [videoId, setVideoId] = useState(null); 

    // Funció per buscar el vídeo de YouTube pel nom del joc
    const searchYouTubeVideo = (gameName) => {
        axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                q: `${gameName}`,
                key: 'AIzaSyDNrpMiafysf6QEokAV7FKNLMyNo8syX5M', // Clau d'API de YouTube
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
    };

    useEffect(() => {
        axios.get(`https://zelda.fanapis.com/api/games/${gameId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setGame(response.data);

                // Crida la funció de cerca de vídeos amb el nom del joc
                searchYouTubeVideo(response.data.data.name);
            })
            .catch((error) => {
                console.error('Error fetching la información del juego: ', error);
            });
    }, [gameId]);

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <Background>
            <ContentWrapper>
                <TriforceLogo src={triforceBlue} ></TriforceLogo>

                <LogoutButton onClick={handleLogout}><span><i class="material-icons">exit_to_app</i></span>
                    {' '}LOGOUT</LogoutButton>

                <ListContainer>
                    <TitleText>{game.data.name}</TitleText>
                    <PageText>{game.data.description}</PageText>
                    <PageText>Developer: {game.data.developer}</PageText>
                    <PageText>Publisher: {game.data.publisher}</PageText>
                    <PageText>Released Date: {game.data.released_date}</PageText>
                </ListContainer>   

                <VideoContainer>
                    {videoId && (
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                    ></iframe>
                    )}
                </VideoContainer> 

            <BackButton>
                <span><i class="material-icons">chevron_left</i></span>
                <Link to='/games'>{' '}BACK</Link>
            </BackButton>
            
            <CategoryButton>
                <span><i class="material-icons">home</i></span>
                <Link to='/main'>{' '}MAIN MENU</Link>
            </CategoryButton>

            <LinkCharGold src={linkShadow} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
}

export default GameInfo;
