import React from 'react';

import './MainPage.scss';

import {Store, UserObject} from '../types/types';

import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';
import UserPage from './UserPage';

interface IProps {
    activeUser: UserObject
}

class MainPage extends React.PureComponent<IProps> {
    public render() {
        return <main className="Main-Page">
            <header className="Header-Container">
                <span className="Header-Container__Title">Header</span>
                <section className="Sign-In/Up-Section">
                    <NavLink to="/login" className="Header-Container__Sign-In-Button"><button>Sign In</button></NavLink>
                    <NavLink to="/registration" className="Header-Container__Sign-Up-Button"><button>Sign Up</button></NavLink>
                </section>
            </header>
            {
                this.props.activeUser &&
                <UserPage />
            }
        </main>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps)(MainPage);
