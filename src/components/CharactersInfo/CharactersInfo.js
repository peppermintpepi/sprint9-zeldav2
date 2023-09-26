import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

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

    return (
        <div>
            {character ? (
                <>
                    <h2>{character?.data?.name}</h2>
                    <p>Appearances: {gameName}</p>
                    <p>About the character: {character?.data?.description}</p>
                    <p>Gender: {character?.data?.gender}</p>
                    <p>Race: {character?.data?.race}</p>

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

                    <button onClick={handleBackClick}> 
                        Back
                    </button>

                    <button> 
                        <Link to='/main'>Main Menu</Link>
                    </button>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default CharacterInfo;
