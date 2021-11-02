import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './components/context/Auth';
import { Home } from './components/pages/Home';
import { Login } from './components/utils/Login';
import { SignUp } from './components/utils/SignUp';
import { NavBar, NavBarLink } from './components/utils/NavBar'
import { Pricing } from './components/pages/Pricing';
import { Dashboard } from './components/pages/Dashboard';
import { Profile } from './components/pages/Profile';
import { Footer } from './components/utils/Footer';
import { authToken as token } from './components/assets/config'
import { Admin } from './components/pages/Admin';
import { GetPage } from './components/pages/GetPage';
import { ScrollTop } from './components/utils/Scrolltop';

function App() {
    const { authToken, setAuthToken } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null)
    useEffect(() => {
        window.addEventListener('storage', e => {
            setAuthToken(localStorage.getItem(token))
        })
        const checkIfAdmin = async (authToken) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_KEY || 'http://localhost:8000'}/api/auth/admin`, {
                    method: 'POST',
                    headers: {
                        'auth-token': authToken
                    }
                })
                const data = await response.json()
                setIsAdmin(data)
            } catch (error) {
                console.log(error)
                setIsAdmin(null)
            }
        }

        if (authToken) checkIfAdmin(authToken)
        if (!authToken) setIsAdmin(null)

    }, [setAuthToken, authToken])
    return (
        <>
            <Router>
                <NavBar>
                    <NavBarLink to='/'>Home</NavBarLink>
                    <NavBarLink to='/about'>About</NavBarLink>
                    <NavBarLink to='/pricing'>Pricing</NavBarLink>
                    {authToken && <NavBarLink to='/profile'>Profile</NavBarLink>}
                    {isAdmin && <NavBarLink to='/admin'>Admin</NavBarLink>}
                </NavBar>
                <Switch>
                    <Route exact path="/">{!authToken ? <Home /> : <Dashboard />}</Route>
                    <Route exact path='/pricing'><Pricing /></Route>
                    {authToken && <Route exact path='/profile'><Profile /></Route>}
                    {isAdmin && <Route exact path='/admin'><Admin/></Route>}
                    <Route exact path="/:url"><GetPage /></Route>
                </Switch>
            </Router>
            <SignUp />
            <Login />
            <Footer />
            <ScrollTop />
        </>
    );
}

export default App;
