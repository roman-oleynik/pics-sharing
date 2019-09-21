import React from 'react';

import './UserPage.scss';

import {Store, UserObject, Child} from '../types/types';
import {ACT_GET_USER} from '../actions/actions';

import ChildrenList from './ChildrenList';

import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import axios from 'axios';

interface IProps {
    loggedUser: UserObject,
    currentUser: UserObject,
    match: any,
    dispatch: any
}

class UserPage extends React.PureComponent<IProps> {
    getUser = (id: string) => {
        axios.get('http://localhost:4000/data')
            .then(res => {
                let curUser = res.data.find((user: UserObject) => {
                    return user.id === id && user.id
                });
                this.props.dispatch(ACT_GET_USER(curUser))
            })
            .catch(err => console.log(err))
    };
    componentWillMount = () => {
        this.getUser(this.props.match.params.id)
    };
    public render() {
        if (this.props.loggedUser == null) {
            return <Redirect to="/login" />
        }
        return this.props.currentUser ? <section className="Page-Content">
            <h1 className="Page-Content__Username">{`${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`}</h1>
            {
                this.props.loggedUser !== null && <ChildrenList /> // ? : GetChildrenInterface
            }
        </section> : <div>Loading...</div> // add option of user's absence

    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(UserPage);