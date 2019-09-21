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
import ChildPage from './ChildPage';
import AddChildInterface from './AddChildInterface';
import ChildrenList from './ChildrenList';

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
              <Route path='/in/:id/children' exact component={UserPage} />
              <Route path='/in/:id/children/add' component={AddChildInterface} />
              <Route path='/in/:id/children/:id' component={ChildPage} />
            </Switch>  
          </BrowserRouter>
        </Provider>
      </main>
  }
}

export default App;
