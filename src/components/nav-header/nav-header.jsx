import { Link } from 'react-router-dom';

import './nav-header.css';

const NavHeader = ({isAuth, signOutUser}) => {
    return (
        <nav>
            <Link to="/"> Home </Link>
            <Link to="/places-map"> Map </Link>
            { isAuth ? (
            <>
                <Link to="/createpost"> Create Post </Link>
                <span className="logout" onClick={signOutUser}>Logout</span>
            </>
            ) : (
            <Link to="/login"> Login </Link>
            )}
        </nav>
    );
}

export default NavHeader;