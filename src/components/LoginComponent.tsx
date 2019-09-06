import React from 'react';
import {Redirect} from 'react-router-dom';

import {UserObject, Store} from '../types/types';

import {ACT_AUTHORIZE_USER} from '../actions/actions';

import axios from 'axios';

import {connect} from 'react-redux';

interface IProps {
    dispatch: any,
    activeUser: UserObject
}

class LoginComponent extends React.PureComponent<IProps> {
    private findUserInTheServer = (users: UserObject[], user: UserObject) => {
        let foundUser = users.find(el => {
            if (el.email === user.email && el.password === user.password) {
                return el;
            } else {
                console.error("User not found");
            }
        });
        return foundUser;
        
    };
    private submitFormData = (UserObject: UserObject) => {
        axios.get('http://localhost:4000/data')
            .then(res => {
                const users = res.data;
                const loggedUser = this.findUserInTheServer(users, UserObject);
                if (loggedUser) {
                    this.props.dispatch(ACT_AUTHORIZE_USER(loggedUser))
                }
            })
            .catch(err => console.log(err))
    }
    private validatePasswordOfUserObject = (UserObject: UserObject) => {
        if (UserObject.password.length > 6) {
            this.submitFormData(UserObject);
        } else {
            alert('Your password must contain more than 6 symbols!')
        }
    };
    public processFormData = (EO: any): void => {
        EO.preventDefault();
        const {_email, _password}: any = this.refs; //any
        const UserObject: UserObject = {
            id: Math.floor(Math.random()*10000),
            email: _email.value,
            password: _password.value
        }
        this.validatePasswordOfUserObject(UserObject);
    };
    public render() {
        console.log(this.props.activeUser)
        if (this.props.activeUser) {
            return <Redirect to='/' />
        }
        return <div className="Login-Component-Container">
            <h1 className="Login-Component-Container__Title">Log In</h1>
            <form className="Login-Component-Form" onSubmit={this.processFormData}>
                <div className="Login-Input-Container">
                    <label>Email:
                        <input ref="_email" type="email" placeholder="E-mail" required />
                    </label>
                    <label>Password:
                        <input ref="_password" type="password" placeholder="More than 6 symbols" required />
                    </label>
                </div>
            
                <input type="submit" value="Submit" />
            </form>
        </div>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps)(LoginComponent);