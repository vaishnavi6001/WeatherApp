import { Link } from 'react-router-dom';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

const Navbar = () => {

    function responseGoogle(response){
        console.log(response);
        console.log(response.profileObj);
        const login = 'loggedin';
    }

    return ( 
        <nav className="navbar">
            <h1>The Weather App</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/"><GoogleLogin clientId='295176366885-fal4t3aguo3aeki47lc95ti1scu5uru2.apps.googleusercontent.com' 
                    buttonText="Login with BITS mail" onSuccess={responseGoogle} onFailure={responseGoogle} hostedDomain="hyderabad.bits-pilani.ac.in"
                    cookiePolicy={'single_host_origin'}></GoogleLogin></Link>
                <Link to="/"><GoogleLogout clientId="295176366885-fal4t3aguo3aeki47lc95ti1scu5uru2.apps.googleusercontent.com"
                    buttonText="Logout" onSuccess={responseGoogle} onFailure={responseGoogle}></GoogleLogout></Link>
            </div>
        </nav>
    );
}
 
export default Navbar;