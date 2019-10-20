import React from 'react';
import './HeaderUserWidget.scss';
import {Store, UserObject} from '../types/types';
import {ACT_LOG_OUT} from '../actions/actions';
import {Redirect, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    loggedUser: UserObject,
    dispatch: any
};

interface IState {
    isDropdownOpened: boolean
}

class HeaderUserWidget extends React.PureComponent<IProps, IState> {
    readonly state: IState = {
        isDropdownOpened: false
    };

    public logOut = (): void => {
        this.props.dispatch(ACT_LOG_OUT())
    };

    public switchDropdown = (): void => {
        this.setState({isDropdownOpened: !this.state.isDropdownOpened})
    };

    public render() {
        let {firstName, lastName} = this.props.loggedUser;
        if (this.props.loggedUser === null) {
            return <Redirect to="/" />
        }

        return <div className="Logged-User-Widget" onClick={this.switchDropdown}>
                    <NavLink to={`/in/${this.props.loggedUser.id}/children`} className="Logged-User-Widget__Title">{`${firstName}`}</NavLink>

                    <div className="Logged-User-Widget__Avatar-Container">
                        {
                            this.props.loggedUser.avatar !== ""
                            ?
                            <img className="Logged-User-Widget__Avatar" src={this.props.loggedUser.avatar} alt="avatar" />
                            :
                            this.props.loggedUser.email.split("").slice(0,1) // write a first letter of email in an avatar block 
                        } 
                    </div> 
                    <button className="Logged-User-Widget__Dropdown-Button">
                        <FontAwesomeIcon icon={faChevronDown} size="sm" /> 
                    </button>
                    {
                        this.state.isDropdownOpened && <div className="Logged-User-Widget__Dropdown">
                            <button className="Logged-User-Widget__Log-Out" onClick={this.logOut}>Log Out</button>
                        </div>
                    }
                    
            </div>
    };    
}

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(HeaderUserWidget);