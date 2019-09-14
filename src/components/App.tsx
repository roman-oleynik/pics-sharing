import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.scss';

import {Provider} from 'react-redux';
import store from '../store/store';

import Navbar from './Navbar';
import MainPage from './MainPage';
import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';
import UserPage from './UserPage';

class App extends React.PureComponent {
  public render() {
    return <main className="App">
          <Provider store={store}>
            <BrowserRouter>
            <Navbar />
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path='/login' component={LoginComponent} />
              <Route path='/registration' component={RegistrationComponent} />
              <Route path='/in/:id/children' component={UserPage} />
            </Switch>  
          </BrowserRouter>
        </Provider>
      </main>
  }
}

export default App;
