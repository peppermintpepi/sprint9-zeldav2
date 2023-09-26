import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

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

    return (
        <div>
            {boss ? (
                <>
                    <h2>{boss?.data?.name}</h2>
                    <p>Appearances:</p>
                        <ul>
                            {gameNames.map((gameName, index) => (
                                <li key={index}>{gameName}</li>
                            ))}
                        </ul>
                    <p>About the boss: {boss?.data?.description}</p>
                    <p>
                        Dungeons:
                        {dungeons && dungeons.length > 0 ? (
                            <ul>
                                {dungeons.map((dungeon, index) => (
                                    <li key={index}>{dungeon}</li>
                                ))}
                            </ul>
                        ) : (
                            'No dungeons available'
                        )}
                    </p>


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

export default BossesInfo;
