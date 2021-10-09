import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth, AuthContext } from './components/context/Auth';
import { Home } from './components/pages/Home';
import { Login } from './components/utils/Login';
import { SignUp } from './components/utils/SignUp';
import { NavBar, NavBarLink } from './components/utils/NavBar'
import { Pricing } from './components/pages/Pricing';
import { About } from './components/pages/About';

function App() {
    const { authToken } = useContext(AuthContext);
    return (
        <Auth>

            <Router>
                <NavBar>
                    <NavBarLink to='/'>Home</NavBarLink>
                    <NavBarLink to='/about'>About</NavBarLink>
                    <NavBarLink to='/pricing'>Pricing</NavBarLink>
                    {authToken && <NavBarLink to='/profile'>Profile</NavBarLink>}
                </NavBar>
                <Switch>
                    <Route exact path="/">{authToken ? <Home /> : <Home />}</Route>
                    <Route exact path='/pricing'><Pricing/></Route>
                    <Route exact path='/about'><About/></Route>
                </Switch>
            </Router>
            <SignUp />
            <Login />
        </Auth>
    );
}

export default App;
