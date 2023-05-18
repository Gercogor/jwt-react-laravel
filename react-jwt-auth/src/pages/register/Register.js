import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import {useDispatch} from "react-redux";
import {setCredentials} from "../../features/auth/authSlice";
import {useRegisterMutation} from "../../features/auth/authApiSlice";

import styles from "./Register.module.scss"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        setErrors({});
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await register({email, name, password}).unwrap();
            console.log(userData)
            dispatch(setCredentials({...userData}));
            setEmail('')
            setPassword('')
            setName('')
            navigate('/user')
        } catch (error) {
            setErrors(error.data.errors);
            console.log(error.data.errors);
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleNameInput = (e) => setName(e.target.value);

    return (
        <section className={styles.register}>
            <h1>Register</h1>
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
                    {errors.email && errors.email.map((elem, index)=>
                        <p key={'email'+ index} className={styles.error}>{elem}</p>
                    )}
                </div>
                <div className={styles.form_input}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameInput}
                        autoComplete="off"
                        required
                    />
                    {errors.name && errors.name.map((elem, index)=>
                        <p key={'name'+ index} className={styles.error}>{elem}</p>
                    )}
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
                    {errors.password && errors.password.map((elem, index)=>
                        <p key={'password'+ index} className={styles.error}>{elem}</p>
                    )}
                </div>
                <button>Register</button>
            </form>
        </section>
    )
};
export default Login;