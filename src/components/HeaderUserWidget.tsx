import React from 'react';
import './HeaderUserWidget.scss';
import {Store, UserObject} from '../types/types';
import {ACT_LOG_OUT} from '../actions/actions';
import {Redirect, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    loggedUser: UserObject,
    dispatch: any
};

class HeaderUserWidget extends React.PureComponent<IProps> {
    public logOut = (): void => {
        this.props.dispatch(ACT_LOG_OUT())
    };

    public render() {
        let {firstName, lastName} = this.props.loggedUser;
        if (this.props.loggedUser === null) {
            return <Redirect to="/" />
        }

        return <div className="Logged-User-Widget">
                    <div className="Logged-User-Widget__Avatar">
                        {
                            this.props.loggedUser.email.split("").slice(0,1) // write a first letter of email in an avatar block 
                        } 
                    </div> 
                    <NavLink to={`/in/${this.props.loggedUser.id}/children`} className="Logged-User-Widget__Title">{`${firstName} ${lastName}`}</NavLink>
                    <button className="Logged-User-Widget__Log-Out" onClick={this.logOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> 
                    </button>
            </div>
    };    
}

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(HeaderUserWidget);