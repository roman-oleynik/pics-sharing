import React from 'react';

import './MainPage.scss';

import {NavLink} from 'react-router-dom';

class MainPage extends React.PureComponent {
    public render() {
        return <main className="Main-Page">
            <header className="Header-Container">
                <span className="Header-Container__Title">Header</span>
                <section className="Sign-In/Up-Section">
                    <NavLink to="/login" className="Header-Container__Sign-In-Button"><button>Sign In</button></NavLink>
                    <NavLink to="/registration" className="Header-Container__Sign-Up-Button"><button>Sign Up</button></NavLink>
                </section>
            </header>
        </main>
    }
} 

export default MainPage;
