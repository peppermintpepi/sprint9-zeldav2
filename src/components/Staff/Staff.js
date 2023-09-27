import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import triforceGold from '../../img/triforce-gold.png';
import linkStaff from '../../img/link-shadow-gold2.png';
import { Background, ContentWrapper, TriforceLogo, LinkCharGold, TitleText, CategoryButton, ButtonContainer, 
    ListContainer, PageText, LogoutButton } from './StaffStyles';

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
        <Background>
            <ContentWrapper>
                <TriforceLogo src={triforceGold} ></TriforceLogo>

            <LogoutButton onClick={handleLogout}><span><i class="material-icons">exit_to_app</i></span>
                    {' '}LOGOUT</LogoutButton>
            <TitleText>Zelda's main Staff</TitleText>
            <ul>
                <ListContainer>
                {staffList.map((staff) => (
                    <PageText key={staff.id}>
                            <Link to={`/staff/${staff.id}`}>{staff.name}</Link>
                    </PageText>
                ))}
                </ListContainer>
            </ul>

            <CategoryButton>
                <span><i class="material-icons">home</i></span>
                <Link to='/main'>{' '}MAIN MENU</Link>
            </CategoryButton>

                    <LinkCharGold src={linkStaff} ></LinkCharGold>
            </ContentWrapper>
        </Background>
    );
};

export default Staff;
