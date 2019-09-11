import React from 'react';

import './Navbar.scss';

import {Store, UserObject} from '../types/types';

import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';

interface IProps {
    activeUser: UserObject
}

const Navbar = (props: IProps) => {
    return  <header className="Header-Container">
        <span className="Header-Container__Title">Header</span>
        <section className="Sign-In/Up-Section">
            <NavLink to="/login" className="Header-Container__Sign-In-Button"><button>Sign In</button></NavLink>
            <NavLink to="/registration" className="Header-Container__Sign-Up-Button"><button>Sign Up</button></NavLink>
        </section>
        {
            props.activeUser && <div className="Header-Container__Avatar">{props.activeUser.email.split("").slice(0,1)}</div>
        }
    </header>
}

let mapStateToProps = (state: Store) => {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps)(Navbar);