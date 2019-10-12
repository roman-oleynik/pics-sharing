import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import {Provider} from 'react-redux';
import store from '../store/store';
import {connect} from 'react-redux';
import {Store, InternetConnectionStatus, ServerConnectionStatus} from '../types/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {ACT_EDIT_INTERNET_CONNECTION_STATUS} from '../actions/actions';
import {ACT_EDIT_SERVER_CONNECTION_STATUS} from '../actions/actions';


import Navbar from './Navbar';
import MainPage from './MainPage';
import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';
import UserPage from './UserPage';
import ChildPage from './ChildPage';
import Offline from './Offline';

interface IProps {
  dispatch: any,
  hasInternetConnection: InternetConnectionStatus,
  hasServerConnection: ServerConnectionStatus
}

class App extends React.PureComponent<IProps> {

  public componentWillMount = () => {
    if (navigator.onLine) {
      this.props.dispatch(ACT_EDIT_INTERNET_CONNECTION_STATUS(InternetConnectionStatus.Connected));
    } else {
      this.props.dispatch(ACT_EDIT_INTERNET_CONNECTION_STATUS(InternetConnectionStatus.Disconnected));
    }
    axios.get('http://localhost:4000/users')
      .then((res: AxiosResponse): void => {
        console.log(res);
        this.props.dispatch(ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Connected))
      })
      .catch((err: AxiosError): void => {
        console.log(err);
        this.props.dispatch(ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected))
      })
  };

  public render() {
    
    return <div className="App">
            {
              this.props.hasInternetConnection === InternetConnectionStatus.Connection 
              ||
              this.props.hasServerConnection === ServerConnectionStatus.Connection 

              ?
              
              <div>Loading...</div>

              :

              this.props.hasInternetConnection === InternetConnectionStatus.Connected 
              && 
              this.props.hasServerConnection === ServerConnectionStatus.Connected

              ?

              <BrowserRouter>
                <Switch>
                  <Route path="/" exact component={MainPage} />
                  <Route path='/login' component={LoginComponent} />
                  <Route path='/registration' component={RegistrationComponent} />
                  <Route path='/in/:id/children' exact component={UserPage} />
                  <Route path='/in/:id/children/:childId' component={ChildPage} />
                </Switch>  
              </BrowserRouter> 

              :

              this.props.hasInternetConnection === InternetConnectionStatus.Disconnected
              ||
              this.props.hasServerConnection === ServerConnectionStatus.Disconnected 

              ?

              <Offline />

              : null
            }
            
      </div>
  }
}

let mapStateToProps = (state: Store) => {
  return {
    hasInternetConnection: state.hasInternetConnection,
    hasServerConnection: state.hasServerConnection,
  };
}

export default connect(mapStateToProps)(App);
