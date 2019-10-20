import React from 'react';
import './ChildLink.scss';
import {ACT_EDIT_SERVER_CONNECTION_STATUS, ACT_GET_CHILDREN_DATA} from '../actions/actions';
import {Store, UserObject, Child, ChildPhoto, ServerConnectionStatus} from '../types/types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios, { AxiosError } from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[],
    childInfo: Child,
    dispatch: any,
    turnOnChildMode: (child: Child) => void
};

class ChildItem extends React.PureComponent<IProps> {

    public age: {years: number, months: number} = {
        years: (+new Date() - +new Date(this.props.childInfo.dateOfBirth)) / 31536000000,
        months: (+new Date() - +new Date(this.props.childInfo.dateOfBirth)) / 2592000000,
    };

    public removeChild = async () => {
        await axios.delete(`http://localhost:4000/childItems/${this.props.childInfo.id}`);
            try {
                let updChildrenList: Child[] = this.props.userChildren && this.props.userChildren.filter((child: Child) => {
                    return child.id !== this.props.childInfo.id;
                });
                this.props.dispatch(ACT_GET_CHILDREN_DATA(updChildrenList)); // WRITE DELETE CHILDREN ACTION
            } catch(err) {
                console.log(err);
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
            }
    };

    public turnOnEditMode = () => {
        this.props.turnOnChildMode(this.props.childInfo);
    };

    public render() {
        const childAvatar: ChildPhoto | false | undefined = this.props.userPhotos && this.props.userPhotos.length > 0 && this.props.userPhotos.find((photo: ChildPhoto) => photo.childItemId === this.props.childInfo.id);
        return <div className="Child-Item-Container">
                <NavLink className="Child-Item-Container__Child-Link" to={`/in/${this.props.loggedUser.id}/children/${this.props.childInfo.id}`}>
                    <img className="Child-Item-Container__Avatar" src={childAvatar ? childAvatar.src : "/img/noname.png"} alt="avatar"/>
                    <h2 className="Child-Item-Container__Child-Name">{`${this.props.childInfo.name} (${Math.round(this.age.years)} y.o.)`}</h2>
                </NavLink>
                <button className="Child-Item-Container__Edit" onClick={this.turnOnEditMode}>
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                </button>
                <button className="Child-Item-Container__Delete" onClick={this.removeChild}>
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
            </div>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser,
        userChildren: state.userChildren,
        userPhotos: state.userPhotos
    }
}

export default connect(mapStateToProps)(ChildItem);