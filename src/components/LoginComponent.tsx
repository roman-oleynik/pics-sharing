import React from 'react';

import {UserObject} from '../types/types';

interface IProps {
    dispatch: any
}

class LoginComponent extends React.PureComponent<IProps> {
    public submitFormData = (EO: any): void => {
        EO.preventDefault();
        const {_email, _password}: any = this.refs; //any
        const UserObject: UserObject = {
            email: _email.value,
            password: _password.value
        }
        console.log(UserObject)
    }
    public render() {
        return <div className="Login-Component-Container">
            <form className="Login-Component-Form" onSubmit={this.submitFormData}>
                <div className="Input-Container">
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

export default LoginComponent;