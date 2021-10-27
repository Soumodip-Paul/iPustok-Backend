import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './components/context/Auth';
import { Home } from './components/pages/Home';
import { Login } from './components/utils/Login';
import { SignUp } from './components/utils/SignUp';
import { NavBar, NavBarLink } from './components/utils/NavBar'
import { Pricing } from './components/pages/Pricing';
import { About } from './components/pages/About';
import { Dashboard } from './components/pages/Dashboard';
import { Profile } from './components/pages/Profile';
import { Footer } from './components/utils/Footer';

function App() {
    const { authToken } = useContext(AuthContext);
    return (
        <>
            <Router>
                <NavBar>
                    <NavBarLink to='/'>Home</NavBarLink>
                    <NavBarLink to='/about'>About</NavBarLink>
                    <NavBarLink to='/pricing'>Pricing</NavBarLink>
                    {authToken && <NavBarLink to='/profile'>Profile</NavBarLink>}
                </NavBar>
                <Switch>
                    <Route exact path="/">{!authToken ? <Home /> : <Dashboard /> }</Route>
                    <Route exact path='/pricing'><Pricing /></Route>
                    <Route exact path='/about'><About /></Route>
                    {authToken && <Route exact path='/profile'><Profile/></Route>}
                </Switch>
            </Router>
            <SignUp />
            <Login />
            <Footer/>
        </>
    );
}

export default App;
