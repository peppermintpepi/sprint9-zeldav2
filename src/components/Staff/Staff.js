import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// generar un llistat amb els principals treballadors de la saga
function Staff() {
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await axios.get('https://zelda.fanapis.com/api/staff', {
                    params: {
                        limit: 100, 
                    }
                });
                setStaffList(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error en carregar el llistat dels jocs: ', error);
            }
        };
        fetchStaff();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "/";
    };

    return (
        <div>
            <h1>Zelda's main Staff</h1>
            <ul>
                {staffList.map((staff) => (
                    <li key={staff.id}>
                        <Link to={`/staff/${staff.id}`}>{staff.name}</Link>
                    </li>
                ))}
            </ul>

            <button>
                <Link to='/main'>Back to Main</Link>
            </button>

            <button onClick={handleLogout}>Logout</button>

        </div>
    );
};

export default Staff;
