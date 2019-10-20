import React, { FormEvent } from 'react';
import './RegistrationComponent.scss';
import {generateId} from '../modules/generateId';
import {UserObject, ServerConnectionStatus} from '../types/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Redirect } from 'react-router';
import MainPage from './MainPage';
import {NavLink} from 'react-router-dom';
import {ACT_EDIT_SERVER_CONNECTION_STATUS} from '../actions/actions';


interface IProps {
    dispatch: any
};
interface IState {
    isSuccessful: boolean,
    isFormOpened: boolean
};

class LoginComponent extends React.PureComponent<IProps, IState> {
    public state = {
        isSuccessful: false,
        isFormOpened: true
    };

    public submitFormData = async (UserObject: UserObject) => {
        let data: UserObject[] = [];
        const getUsers = await axios.get('http://localhost:4000/users');
        let isOriginal: boolean = true;
            try {
                data = getUsers.data;
                data.forEach(el => {
                    if (el.email === UserObject.email) {
                        isOriginal = false;
                    }
                });
                if (isOriginal) {
                    const sendUser = await axios.post('http://localhost:4000/users', UserObject);
                        try {
                            sendUser && this.setState({isSuccessful: true});
                        } catch(err) {
                            console.log(err);
                            ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
                        }
                } else {
                    console.log('this email is already busy');
                }

            } catch(err) {
                console.log(err);
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
            }
    };

    public validatePasswordOfUserObject = (UserObject: UserObject, confirmPassword: string): void => {
        if (UserObject.password.length > 6 && confirmPassword === UserObject.password) {
            this.submitFormData(UserObject);
        } else if (confirmPassword !== UserObject.password) {
            alert("You haven't confirmed your password")
        } else {
            alert('Your password must contain more than 6 symbols!');
        }
    };

    public processFormData = (EO: FormEvent): void => {
        EO.preventDefault();
        const {_email, _password, _confirmPassword, _firstName, _lastName, _location}: any = this.refs; 
        const UserObject: UserObject = {
            id: generateId(),
            email: _email.value,
            password: _password.value,
            firstName: _firstName.value,
            lastName: _lastName.value,
            avatar: "",
            location: _location.value
        }
        this.validatePasswordOfUserObject(UserObject, _confirmPassword.value);
    };

    public closeForm = (): void => {
        this.setState({isFormOpened: false})
    };

    public render() {
        const {isSuccessful} = this.state;
        const {isFormOpened} = this.state;
        if (isSuccessful) {
            return <Redirect to="/login" />
        }
        if (!isFormOpened) {
            return <Redirect to={`/`} />
        }
        return <React.Fragment>
            <MainPage />
            <div className="Registration-Component-Container">
                <h1 className="Registration-Component-Container__Title">Registration</h1>
                <form className="Registration-Component-Form" onSubmit={this.processFormData}>
                    <div className="Registration-Input-Container">
                        <label className="Registration-Input-Container__Label">E-mail : <br />
                            <input className="Registration-Input-Container__Input" ref="_email" type="email" placeholder="E-mail" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Password : <br />
                            <input className="Registration-Input-Container__Input" ref="_password" type="password" placeholder="More than 6 symbols" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Confirm Password : <br />
                            <input className="Registration-Input-Container__Input" ref="_confirmPassword" type="password" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Firstname : <br />
                            <input className="Registration-Input-Container__Input" ref="_firstName" type="text" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Lastname : <br />
                            <input className="Registration-Input-Container__Input" ref="_lastName" type="text" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Location : <br />
                            <input className="Registration-Input-Container__Input" ref="_location" type="text" required />
                        </label>
                    </div>

                    <div className="Registration-Buttons-Container">
                        <input type="submit" value="Submit" className='Registration-Component-Form__Submit' />
                        <input type="button" value="Cancel" className='Registration-Component-Form__Cancel' onClick={this.closeForm} />
                    </div>
                    
                </form>
                <hr/>
                <br/>
                <span className="Registration-Component-Container__Login-Row">
                    Do you have an account?  
                    <NavLink to="/login" className="Registration-Component-Container__Login-Link">Log In</NavLink>
                </span>
            </div>
        </React.Fragment>
    };
} 

export default LoginComponent;