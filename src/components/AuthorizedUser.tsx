import React from 'react';

import './AuthorizedUser.scss';

import {Store, UserObject} from '../types/types';

// import {ACT_LOG_OUT} from '../actions/actions';

import {NavLink, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

interface IProps {
    loggedUser: UserObject,
    dispatch: any
}

class AuthorizedUser extends React.PureComponent<IProps> {
    public render() {
        console.log(this.props.loggedUser);
        if (this.props.loggedUser === null) {
            return <Redirect to="/" />
        }
        return <div className="Header-Container__Avatar">
            {
                this.props.loggedUser.email.split("").slice(0,1) // write a first letter of email in an avatar block 
            } 
        </div>
    }
    
}

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(AuthorizedUser);