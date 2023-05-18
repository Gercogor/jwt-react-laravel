import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";

import {useDispatch} from "react-redux";
import {setCredentials} from "../../features/auth/authSlice";
import {useLoginMutation} from "../../features/auth/authApiSlice";

import styles from "./Login.module.scss";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({email, password}).unwrap();
            console.log(userData)
            dispatch(setCredentials({...userData}));
            setEmail('')
            setPassword('')
            navigate('/user')
        } catch (error) {
            setErrMsg('Login Failed, mismatch email or password')
            console.log(error);
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);

    return (
        <section className={styles.login}>
            {errMsg && <p className={styles.error}>{errMsg}</p>}
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_input}>
                    <label htmlFor="useremail">User email</label>
                    <input
                        type="text"
                        id="useremail"
                        value={email}
                        onChange={handleEmailInput}
                        autoComplete="off"
                        required
                    />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordInput}
                        autoComplete="off"
                        required
                    />
                </div>
                <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
            </form>
            <p>
                Not registered? <Link to="/register">Register</Link>.
            </p>
        </section>
    )
};
export default Login;