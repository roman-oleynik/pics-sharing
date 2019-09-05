import React from 'react';

import {UserObject} from '../types/types';

import axios from 'axios';

interface IProps {
    dispatch: any
}

class LoginComponent extends React.PureComponent<IProps> {
    
    private submitFormData = (UserObject: UserObject) => {
        let data: UserObject[] = [];
        axios.get('http://localhost:4000/data')
            .then(res => {
                data = res.data
                let isOriginal: boolean = true;
                data.forEach(el => {
                    if (el.email === UserObject.email) {
                        isOriginal = false;
                    } 
                });
                console.log(isOriginal);
                if (isOriginal) {
                    axios.post('http://localhost:4000/data', UserObject)
                    .then(res => {
                        
                        console.log(res);
                    })
                    .catch(err => console.log(err))
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
        return <div className="Registration-Component-Container">
            <h1 className="Registration-Component-Container__Title">Registration</h1>
            <form className="Registration-Component-Form" onSubmit={this.processFormData}>
                <div className="Registration-Input-Container">
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