import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import triforGold from '../../img/triforce-gold.png';
import staffShadow from '../../img/staff-shadow.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton,
    ListContainer, PageText, LogoutButton, BackButton, VideoContainer } from './StaffInfoStyles';

// renderitzar la informació de cada treballador
function StaffInfo() {
    const { staffId } = useParams();
    const [programer, setProgramer] = useState(null);
    const [gameName, setGameName] = useState(null);
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
        axios.get(`https://zelda.fanapis.com/api/staff/${staffId}`)
            .then((response) => {
                console.log('Data from API:', response.data);
                setProgramer(response.data);
    
                const workedOnArray = response.data.data.worked_on;
    
                if (Array.isArray(workedOnArray) && workedOnArray.length > 0) {
                    const gameURL = workedOnArray[0];
                    const gameID = gameURL.substring(gameURL.lastIndexOf('/') + 1);
    
                    return axios.get(`https://zelda.fanapis.com/api/games/${gameID}`);
                } else {
                    throw new Error('Invalid worked_on format');
                }
            })
            .then((gameResponse) => {
                console.log('Game Data from API:', gameResponse.data);
                setGameName(gameResponse.data.data.name);
                
                // Crida la funció per buscar el vídeo de YouTube amb el nom del joc
                searchYouTubeVideo(gameResponse.data.data.name);
            })
            .catch((error) => {
                console.error('Error fetching la informació del personatge: ', error);
            });
    }, [staffId]);

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };
    
    if (!programer || !gameName) {
        return <div>Loading...</div>;
    }

    console.log('Staff object:', programer);

    return (
        <Background>
            <ContentWrapper>
                <TriforceLogo srt={triforGold} ></TriforceLogo>

            <LogoutButton onClick={handleLogout}><span><i class="material-icons">exit_to_app</i></span>
                    {' '}LOGOUT</LogoutButton>

            <TitleText>{programer.data.name}</TitleText>
            <PageText>Worked On: {gameName}</PageText>

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
                <Link to='/staff'>{' '}BACK</Link>
            </BackButton>
            
            <CategoryButton>
                <span><i class="material-icons">home</i></span>
                <Link to='/main'>{' '}MAIN MENU</Link>
            </CategoryButton>

            <LinkCharGold src={staffShadow} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
}

export default StaffInfo;
