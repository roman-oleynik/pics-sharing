import React from 'react';

import './Navbar.scss';

import {Store, UserObject} from '../types/types';

import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';

import AuthorizedUser from './AuthorizedUser';

interface IProps {
    loggedUser: UserObject
}

const Navbar = (props: IProps) => {
    return  <header className="Header-Container">
        <NavLink to="/" className="Logo">
                <img src="/img/logo.png" className="Logo__Image" alt="Logo" />
                <span className="Logo__Title">childbunch</span>
        </NavLink>
        
        {
            props.loggedUser === null && <section className="Sign-In-Up-Section">
                <NavLink to="/login" className="Header-Container__Sign-In-Button"><button>Sign In</button></NavLink>
                <NavLink to="/registration" className="Header-Container__Sign-Up-Button"><button>Sign Up</button></NavLink>
            </section>
        }
        {
            props.loggedUser && <AuthorizedUser />
        }
    </header>
}

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Navbar);