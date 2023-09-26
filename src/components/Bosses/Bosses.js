import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    return (
        <div>
            <h1>Main Zelda Bosses</h1>
            <ul>
                {bossList.map((boss) => (
                    <li key={boss.id}>
                        <Link to={`/bosses/${boss.id}`}>{boss.name}</Link>
                    </li>
                ))}
            </ul>
            <button>
                <Link to='/main'>Back to Main</Link>
            </button>
        </div>
    );
}

export default Bosses;
