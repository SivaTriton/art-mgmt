import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ArtJob from './components/ArtJob';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/art-job" component={ArtJob} />
                <Route path="/admin-dashboard" component={AdminDashboard} />
            </Switch>
        </Router>
    );
};

export default App;
