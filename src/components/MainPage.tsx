import React from 'react';

import {Store, UserObject} from '../types/types';

import {NavLink, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import UserPage from './UserPage';

interface IProps {
    activeUser: UserObject
}

class MainPage extends React.PureComponent<IProps> {
    public render() {
        return <main className="Main-Page">
            main content
        </main>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps)(MainPage);
