import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';
import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';
import UserPage from './UserPage';

class App extends React.PureComponent {
  public render() {
    return <BrowserRouter>
      <Route path="/" exact component={MainPage} />
      <Route path='/login' component={LoginComponent} />
      <Route path='/registration' component={RegistrationComponent} />
      <Route path='/user-page' component={UserPage} />
    </BrowserRouter>
  }
}

export default App;
