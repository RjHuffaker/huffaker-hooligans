import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: rgba(000,000,000,0.25);;
    border: 1px solid black;
`

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 160px;
    padding: 5px;
`

export const LogoImg = styled.img`
    
    width: auto;
`

export const NavTitle = styled.h1`
    display: inline;
    padding: 0px;
    margin: 0px;
`

export const NavLinks = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const NavLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`