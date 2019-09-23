import React from 'react';
import './UserPage.scss';
import {Store, UserObject} from '../types/types';
import {ACT_GET_USER} from '../actions/actions';
import ChildrenList from './ChildrenList';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface IProps {
    loggedUser: UserObject,
    currentUser: UserObject,
    match: any,
    dispatch: any
};

class UserPage extends React.PureComponent<IProps> {
    getUser = (id: string): void => {
        axios.get('http://localhost:4000/data')
            .then((res: AxiosResponse) => {
                console.log(res)
                let curUser: UserObject = res.data.find((user: UserObject) => {
                    return user.id === id && user.id
                });
                this.props.dispatch(ACT_GET_USER(curUser))
            })
            .catch((err: AxiosError) => console.log(err))
    };

    componentWillMount = (): void => {
        this.getUser(this.props.match.params.id)
    };

    public render() {
        const {loggedUser} = this.props;
        if (loggedUser === null) {
            return <Redirect to="/login" />
        }

        return loggedUser ? <section className="Page-Content">
            <h1 className="Page-Content__Username">{`${loggedUser.firstName} ${loggedUser.lastName}`}</h1>
            {
                loggedUser !== null && <ChildrenList />
            }
        </section> : <div>Loading...</div>
    };
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(UserPage);