import {Outlet, Link, useNavigate} from "react-router-dom";
import styles from "./Layout.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {setLogOut, selectCurrentToken} from "../../features/auth/authSlice";
import {useLogoutMutation} from "../../features/auth/authApiSlice";

const Layout = () => {
    const token = useSelector(selectCurrentToken);
    const [logout, {isLoading}] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const logoutData = await logout({}).unwrap();
            console.log(logoutData)
            dispatch(setLogOut());
            navigate('/')
        } catch (error) {
            console.log('logout failed')
            console.log(error);
        }
    }

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <Link to="/" className={styles.link_button}>HOME</Link>
                <h1>Welcome to the club, buddy</h1>
                {token ? <a onClick={handleLogout} className={styles.link_button}>Logout</a> : <></>}
            </header>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <footer className={styles.footer}>

            </footer>
        </div>
    )
};

export default Layout;