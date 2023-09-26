import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

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

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{game.data.name}</h2>
            <p>{game.data.description}</p>
            <p>Developer: {game.data.developer}</p>
            <p>Publisher: {game.data.publisher}</p>
            <p>Released Date: {game.data.released_date}</p>

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

            <button>
                <Link to='/games'>Back</Link>
            </button>
            
            <button> 
                <Link to='/main'>Main Menu</Link>
            </button>
        </div>
    );
}

export default GameInfo;
