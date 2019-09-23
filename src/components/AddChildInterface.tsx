import React from 'react';
import {Store, UserObject, Child} from '../types/types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {generateId} from '../modules/generateId';
import axios from 'axios';
import { ACT_ADD_CHILD } from '../actions/actions';

interface IProps {
    loggedUser: UserObject,
    currentUser: UserObject,
    match: any,
    dispatch: any
};
interface IState {
    isChildAdded: boolean
};

class AddChildInterface extends React.PureComponent<IProps, IState> {
    public state = {
        isChildAdded: false
    };

    public processFormData = (): void => {
        let {_name, _dateOfBirth, _placeOfBirth}: any = this.refs;

        let childData: Child = this.props.loggedUser && {
            id: generateId(),
            name: _name.value,
            dateOfBirth: new Date(_dateOfBirth.value),
            placeOfBirth: _placeOfBirth.value,
            photos: []
        };
        this.submitData(childData);
    };

    public submitData = (data: Child): void => {
        let user: UserObject = {...this.props.loggedUser};
        let children: Child[] = [...user.children, data];
        user.children = children;

        axios.put(`http://localhost:4000/data/${this.props.loggedUser.id}`, user)
            .then(res => {
                console.log(res.data);
                this.props.dispatch(ACT_ADD_CHILD(res.data));
                this.setState({isChildAdded: true});
            })
            .catch(err => console.log(err))
    };

    public render() {
        const {loggedUser} = this.props;
        const {isChildAdded} = this.state;
        if (loggedUser == null) {
            return <Redirect to="/login" />
        }
        if (isChildAdded) {
            return <Redirect to={`/in/${this.props.loggedUser.id}/children`} />
        }
        return <div>
            <input type="text" ref="_name" required />
            <input type="date" ref="_dateOfBirth" required />
            <input type="text" ref="_placeOfBirth" required />
            <button onClick={this.processFormData}>adssadsa</button>
        </div>
    };
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(AddChildInterface);