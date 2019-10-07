import React from 'react';
import './ChildLink.scss';
import {ACT_GET_USER_DATA, ACT_GET_CHILDREN_DATA} from '../actions/actions';
import {Store, UserObject, Child, ChildPhoto} from '../types/types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface IProps {
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[],
    childInfo: Child,
    dispatch: any
};

class ChildItem extends React.PureComponent<IProps> {

    public age: {years: number, months: number} = {
        years: (+new Date() - +new Date(this.props.childInfo.dateOfBirth)) / 31536000000,
        months: (+new Date() - +new Date(this.props.childInfo.dateOfBirth)) / 2592000000,
    };

    public removeChild = (): void => {

        axios.delete(`http://localhost:4000/childItems/${this.props.childInfo.id}`)
            .then((res) => {
                console.log(res);
                let updChildrenList: Child[] = [];
                this.props.userChildren && this.props.userChildren.forEach((child: Child) => {
                    child.id !== this.props.childInfo.id && updChildrenList.push(child);
                });

                this.props.dispatch(ACT_GET_CHILDREN_DATA(updChildrenList));
            })
            .catch((err) => console.log(err));
    }

    public render() {
        const childAvatar: ChildPhoto | false | undefined = this.props.userPhotos && this.props.userPhotos.length > 0 && this.props.userPhotos.find((photo: ChildPhoto) => photo.childItemId === this.props.childInfo.id);
        return <div className="Child-Item-Container">
                <NavLink className="Child-Item-Container__Child-Link" to={`/in/${this.props.loggedUser.id}/children/${this.props.childInfo.id}`}>
                    <img className="Child-Item-Container__Avatar" src={childAvatar ? childAvatar.src : "/img/noname.png"} alt="avatar"/>
                    <h2 className="Child-Item-Container__Child-Name">{`${this.props.childInfo.name} (${Math.round(this.age.years)} y.o.)`}</h2>
                </NavLink>
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