
import { Outlet } from 'react-router-dom';

import Logo from '../../assets/mtn_logo.png';

import {
    NavigationContainer,
    LogoContainer,
    LogoImg,
    NavTitle,
    NavLinks,
    NavLink
} from './navigation.styles.jsx';

const Navigation = ({isAuth, signOutUser}) => {
    
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <LogoImg src={Logo} alt="Logo" />
                </LogoContainer>
                <NavTitle className="f1">Huffaker Hooligans</NavTitle>
                <NavLinks>
                    <NavLink to="/"> Home </NavLink>
                    <NavLink to="/places-map"> Map </NavLink>
                    { isAuth ? (
                    <>
                        <NavLink to="/createpost"> Create Post </NavLink>
                        <span className="logout" onClick={signOutUser}>Logout</span>
                    </>
                    ) : (
                    <NavLink to="/login"> Login </NavLink>
                    )}
                </NavLinks>
            </NavigationContainer>
            <Outlet />
        </>
    )
}

export default Navigation;