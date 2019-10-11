import React from 'react';
import './MainPage.scss';
import {Store, UserObject} from '../types/types';
import {connect} from 'react-redux';
import Navbar from './Navbar';

interface IProps {
    loggedUser: UserObject
};

class MainPage extends React.PureComponent<IProps> {
    
    public render() {
        const divStyle = {
            background: 'url(./img/main-screen-picture.jpg) no-repeat center center',
            backgroundSize: "cover"
        };
        return <section className="Main-Page" style={divStyle}>
            <Navbar />
            <section className="Main-Screen">
                <h1 className="Main-Screen__Title">Embellish <br /> your <br /> memories</h1>
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
