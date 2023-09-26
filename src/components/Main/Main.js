import React from "react";
import { Link } from 'react-router-dom';

// pàgina d'inici amb la informació
function Welcome() {

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };

    return (
        <div>
            <h1>Welcome to Zelda's main database</h1>
            <p>Choose a category</p>

            <ul>
                <li>
                    <Link to='/games'>Games</Link>
                </li>
                <li>
                    <Link to='/staff'>Staff</Link>
                </li>
                <li>
                    <Link to='/characters'>Characters</Link>
                </li>
                <li>
                    <Link to='/bosses'>Bosses</Link>
                </li>
            </ul>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Welcome;