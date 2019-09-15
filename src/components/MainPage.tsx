import React from 'react';

import './MainPage.scss';

import {Store, UserObject} from '../types/types';

import {NavLink, Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginComponent from './LoginComponent';
import RegistrationComponent from './RegistrationComponent';

interface IProps {
    loggedUser: UserObject
}

class MainPage extends React.PureComponent<IProps> {
    public render() {
        return <section className="Main-Page">
            <section className="Main-Screen">
                <h1 className="Main-Screen__Title">Embellish <br /> your <br /> memories</h1>
                <img src='./img/main-screen-picture.png' className="Main-Screen__Picture" alt="Main screen picture" /> 
            </section>
        </section>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(MainPage);
