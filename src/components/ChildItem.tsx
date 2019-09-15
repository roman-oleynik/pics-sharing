import React from 'react';

import {Store, UserObject, Child} from '../types/types';

import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';


interface IProps {
    loggedUser: UserObject,
    childInfo: Child
}

class ChildItem extends React.PureComponent<IProps> {
    public render() {
        return <NavLink to={`/in/${this.props.loggedUser.id}/children/${this.props.childInfo.name}`}>
            <div className="Child-Item-Container">
                <img src={this.props.childInfo.photoSrc} alt="img" className="Child-Item-Container__Photo" />
                <h2 className="Child-Item-Container__Child-Name">{this.props.childInfo.name}</h2>
            </div>
        </NavLink>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(ChildItem);