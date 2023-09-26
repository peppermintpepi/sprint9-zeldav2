import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// generar un llistat dels principals personatges de la saga
function Characters() {
    const [characterList, setCharacterList] = useState([]);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get('https://zelda.fanapis.com/api/characters', {
                    params: {
                        limit: 100, 
                    }
                });
                setCharacterList(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error en carregar el llistat dels personatges: ', error);
            }
        };
        fetchCharacter();
    }, []);

    return (
        <div>
            <h1>Zelda's Characters</h1>
            <ul>
                {characterList.map((character) => (
                    <li key={character.id}>
                        <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    </li>
                ))}
            </ul>

            <button>
                <Link to='/main'>Back to Main</Link>
            </button>
        </div>
    );
};

export default Characters;
