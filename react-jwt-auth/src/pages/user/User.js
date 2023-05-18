import {useSelector} from "react-redux";
import {selectCurrentUser, selectCurrentToken} from "../../features/auth/authSlice";

const User = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const tokenAbbr = `${token.slice(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) + 10)}`

    return (
        <section className="welcome">
            <div>Welcome {user.name}</div>
            <p>Part of token: {tokenAbbr}...</p>
            <p>
                *token expire after reloading page
            </p>
        </section>
    )
}

export default User;