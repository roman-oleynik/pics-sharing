import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import MainPage from './MainPage';
import LoginComponent from './LoginComponent';

class App extends React.PureComponent {
  public render() {
    return <BrowserRouter>
      <Route path="/" exact component={MainPage} />
      <Route path='/login' component={LoginComponent} />
    </BrowserRouter>
  }
}

export default App;
