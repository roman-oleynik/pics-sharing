import React from 'react';
import {Redirect} from 'react-router-dom';

import './LoginComponent.scss';

import {generateId} from '../modules/generateId';

import {UserObject, Store} from '../types/types';

import {ACT_AUTHORIZE_USER} from '../actions/actions';

import {NavLink} from 'react-router-dom';

import axios from 'axios';

import {connect} from 'react-redux';
import MainPage from './MainPage';

interface IProps {
    dispatch: any,
    loggedUser: UserObject
}

interface IState {
    isFormOpened: boolean,
    formStatus: string
}

class LoginComponent extends React.PureComponent<IProps, IState> {
    public state = {
        isFormOpened: true,
        formStatus: "active"
    };
    private findUserInTheServer = (users: UserObject[], user: UserObject) => {
        let foundUser = users.find(el => { // nesessary
            if (el.email === user.email && el.password === user.password) {
                return el;
            } 
        });
        if (!foundUser) {
            this.setState({formStatus: "userNotFound"})
        }
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
            id: generateId(),
            email: _email.value,
            password: _password.value,
            firstName: "",
            lastName: "",
            children: []
        }
        this.validatePasswordOfUserObject(UserObject);
    };
    public closeForm = () => {
        this.setState({isFormOpened: false})
    };
    public render() {
        if (this.props.loggedUser !== null) {
            return <Redirect to={`/in/${this.props.loggedUser.id}/children`} />
        }
        if (!this.state.isFormOpened) {
            return <Redirect to={`/`} />
        }
        return <React.Fragment>
                <MainPage />                
                <div className="Login-Component-Container">
                    <h1 className="Login-Component-Container__Title">Sign In</h1>
                    {
                        this.state.formStatus === "userNotFound" && 
                        <div className="User-Not-Found">User Not Found</div>
                    }
                    
                    <form className="Login-Component-Form" onSubmit={this.processFormData}>
                        <div className="Login-Input-Container">
                            <label className="Login-Input-Container__Label">Email: <br/>
                                <input ref="_email" type="email" placeholder="E-mail" required />
                            </label>
                            <label className="Login-Input-Container__Label">Password: <br/>
                                <input ref="_password" type="password" placeholder="More than 6 symbols" required />
                            </label>
                        </div>

                        <div className="Login-Buttons-Container">
                            <input type="submit" value="Submit" className='Login-Component-Form__Submit' />
                            <input type="button" value="Cancel" className='Login-Component-Form__Cancel' onClick={this.closeForm} />
                        </div>
                        
                    </form>
                    <NavLink to="/registration">Registration</NavLink>
                </div>
        </React.Fragment>
       
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(LoginComponent);