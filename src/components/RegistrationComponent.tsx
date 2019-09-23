import React, { FormEvent } from 'react';
import './RegistrationComponent.scss';
import {generateId} from '../modules/generateId';
import {UserObject} from '../types/types';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Redirect } from 'react-router';
import MainPage from './MainPage';

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

    public submitFormData = (UserObject: UserObject): void => {
        let data: UserObject[] = [];
        axios.get('http://localhost:4000/data')
            .then((res: AxiosResponse) => {
                data = res.data
                let isOriginal: boolean = true;
                data.forEach(el => {
                    if (el.email === UserObject.email) {
                        isOriginal = false;
                    } 
                });
                if (isOriginal) {
                    axios.post('http://localhost:4000/data', UserObject)
                    .then((res: AxiosResponse) => {
                        res && this.setState({isSuccessful: true})
                    })
                    .catch((err: AxiosError) => console.log(err));
                } else {
                    console.log('this email is already busy');
                }
            })
            .catch((err: AxiosError) => console.log(err));
    };

    public validatePasswordOfUserObject = (UserObject: UserObject): void => {
        if (UserObject.password.length > 6) {
            this.submitFormData(UserObject);
        } else {
            alert('Your password must contain more than 6 symbols!');
        }
    };

    public processFormData = (EO: FormEvent): void => {
        EO.preventDefault();
        const {_email, _password, _firstName, _lastName}: any = this.refs; 
        const UserObject: UserObject = {
            id: generateId(),
            email: _email.value,
            password: _password.value,
            firstName: _firstName.value,
            lastName: _lastName.value,
            children: []
        }
        this.validatePasswordOfUserObject(UserObject);
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
                        <label className="Registration-Input-Container__Label">Email: <br />
                            <input ref="_email" type="email" placeholder="E-mail" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Password: <br />
                            <input ref="_password" type="password" placeholder="More than 6 symbols" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Firstname: <br />
                            <input ref="_firstName" type="text" required />
                        </label>
                        <label className="Registration-Input-Container__Label">Lastname: <br />
                            <input ref="_lastName" type="text" required />
                        </label>
                    </div>

                    <div className="Login-Buttons-Container">
                        <input type="submit" value="Submit" className='Registration-Component-Form__Submit' />
                        <input type="button" value="Cancel" className='Registration-Component-Form__Cancel' onClick={this.closeForm} />
                    </div>
                    
                </form>
            </div>
        </React.Fragment>
    };
} 

export default LoginComponent;