import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import Home from '../views/Home';
import HomeOwner  from '../views/Home';
import Login  from '../views/Login';
import  Register  from '../views/Register';
import  RegisterOwner  from '../views/RegisterOwner';
import  ParkDetail  from '../views/ParkDetail';
import  CreatePark  from '../views/CreatePark';

class AppRouter extends Component {
    render() {
      return (
        <div>
          <Router>
                <div>
                    <Switch> 
                        <Route path="/Inicio" component={ Home }/>
                        <Route path="/" component={ Login } />
                        <Route path="/InicioDueño" component={ HomeOwner } />
                        <Route path="/SignUp" component={ Register } />
                        <Route path="/SignUpOwner" component={ RegisterOwner } />
                        <Route path="/CreatePark" component={ CreatePark } />
                        <Route path="/ParkDetail" component={ ParkDetail } />
                    </Switch>
                </div>
            </Router>
        </div>
      );
    }
  }
        
            
    


export default AppRouter