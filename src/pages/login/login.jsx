import { useNavigate } from 'react-router-dom';

import { signInWithGooglePopup } from '../../config/firebase-auth';

import './login.css';

const Login = () => {

    let navigate = useNavigate();

    const signIn = async () => {
        signInWithGooglePopup().then((response) => {
            navigate("/");
        });
    }

    return (
        <div className="loginPage">
            <h3>Sign in with Google to continue</h3>
            <button className="login-with-google-btn" onClick={signIn}>
                Sign in with Google
            </button>
        </div>
    )
}

export default Login;