import React from 'react';

import './ChildItem.scss';

import {Store, UserObject, Child} from '../types/types';

import {NavLink} from 'react-router-dom';

import {connect} from 'react-redux';


interface IProps {
    loggedUser: UserObject,
    childInfo: Child
}

class ChildItem extends React.PureComponent<IProps> {
    public render() {
        return <NavLink to={`/in/${this.props.loggedUser.id}/children/${this.props.childInfo.id}`}>
            <div className="Child-Item-Container">
                {/* {
                    this.props.childInfo && this.props.childInfo.photos.map((photo:any) => {
                        return  <img src={photo.src} alt="img" className="Child-Item-Container__Photo" /> 
                    })
                } */}
               
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