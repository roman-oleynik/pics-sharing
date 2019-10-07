import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.scss';
import {Provider} from 'react-redux';
import store from '../store/store';
import {connect} from 'react-redux';
import {Store, InternetConnectionStatus, ServerConnectionStatus} from '../types/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {ACT_CONNECT_APP_TO_THE_INTERNET} from '../actions/actions';
import {ACT_CONNECT_APP_TO_THE_SERVER} from '../actions/actions';


import Navbar from './Navbar';
import MainPage from './MainPage';
import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';
import UserPage from './UserPage';
import ChildPage from './ChildPage';
import AddChildInterface from './AddChildInterface';
import Offline from './Offline';

interface IProps {
  dispatch: any,
  hasInternetConnection: InternetConnectionStatus,
  hasServerConnection: ServerConnectionStatus
}

class App extends React.PureComponent<IProps> {

  public componentWillMount = () => {
    if (navigator.onLine) {
      this.props.dispatch(ACT_CONNECT_APP_TO_THE_INTERNET(InternetConnectionStatus.Connected));
    } else {
      this.props.dispatch(ACT_CONNECT_APP_TO_THE_INTERNET(InternetConnectionStatus.Disconnected));
    }
    axios.get('http://localhost:4000/users')
      .then((res: AxiosResponse): void => {
        console.log(res);
        this.props.dispatch(ACT_CONNECT_APP_TO_THE_SERVER(ServerConnectionStatus.Connected))
      })
      .catch((err: AxiosError): void => {
        console.log(err);
        this.props.dispatch(ACT_CONNECT_APP_TO_THE_SERVER(ServerConnectionStatus.Disconnected))
      })
  };

  public render() {
    console.log(this.props.hasInternetConnection)
    console.log(this.props.hasServerConnection)
    return <main className="App">
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
                <Navbar />
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
            
      </main>
  }
}

let mapStateToProps = (state: Store) => {
  return {
    hasInternetConnection: state.hasInternetConnection,
    hasServerConnection: state.hasServerConnection,
  };
}

export default connect(mapStateToProps)(App);
