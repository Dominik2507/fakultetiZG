import {useAuth0} from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LogoutButton= () =>{
    const {logout, isAuthenticated}=useAuth0();

    return (
        isAuthenticated && (
            <>
                <div><Link to={"/profile"}>Profil</Link></div>
                <button onClick={()=> logout()}>
                    Odjava
                </button>
            </>
        )
    )

}

export default LogoutButton