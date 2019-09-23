import React from 'react';
import './ChildItem.scss';
import {Store, UserObject, Child} from '../types/types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

interface IProps {
    loggedUser: UserObject,
    childInfo: Child
};

class ChildItem extends React.PureComponent<IProps> {
    public age:{years: number, months: number} = {
        years: (+new Date() - +new Date(this.props.childInfo.dateOfBirth)) / 31536000000,
        months: (+new Date() - +new Date(this.props.childInfo.dateOfBirth)) / 2592000000,
    };

    public render() {
        return <NavLink to={`/in/${this.props.loggedUser.id}/children/${this.props.childInfo.id}`}>
            <div className="Child-Item-Container">
                <img src={this.props.childInfo.photos.length ? this.props.childInfo.photos[0].src : "/img/photo.jpg"} alt="img" className="Child-Item-Container__Photo" />
                <h2 className="Child-Item-Container__Child-Name">{`${this.props.childInfo.name} (${Math.round(this.age.months)} months)`}</h2>
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