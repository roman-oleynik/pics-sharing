import React from 'react';
import './MainPage.scss';
import {Store, UserObject} from '../types/types';
import {connect} from 'react-redux';

interface IProps {
    loggedUser: UserObject
};

class MainPage extends React.PureComponent<IProps> {
    public render() {
        return <section className="Main-Page">
            <section className="Main-Screen">
                <h1 className="Main-Screen__Title">Embellish <br /> your <br /> memories</h1>
                <img src='./img/main-screen-picture.png' className="Main-Screen__Picture" alt="Main screen" /> 
            </section>
        </section>
    };
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(MainPage);
