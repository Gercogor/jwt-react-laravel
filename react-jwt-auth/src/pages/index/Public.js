import {Link} from "react-router-dom";
import styles from "./Public.module.scss"
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../features/auth/authSlice";

const Public = () => {
    const user = useSelector(selectCurrentUser);

    return (
        <>
            <div className={styles.public}>
                {
                    user
                        ? <div>
                            <Link to="/user" className={styles.link_button}>Profile</Link>
                        </div>
                        : <>
                            <p>Login or Register</p>
                            <div>

                                <Link to="/login" className={styles.link_button}>Login</Link>
                                <Link to="/register" className={styles.link_button}>Register</Link>
                            </div>
                        </>
                }

            </div>
        </>
    );
}

export default Public;