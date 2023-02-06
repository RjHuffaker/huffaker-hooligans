import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '../utils/firebase/firebase.utils';


const Login = ({ setIsAuth }) => {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((response) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
        });
    }

    return (
        <div className="loginPage">
            <h3>Sign in with Google to continue</h3>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default Login;