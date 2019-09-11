import React from 'react';

import {Store, UserObject} from '../types/types';
import {ACT_GET_USER} from '../actions/actions'

import {connect} from 'react-redux';

import axios from 'axios';

interface IProps {
    activeUser: UserObject,
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
        console.log(this.props.currentUser)
        return this.props.currentUser && <section className="Page-Content">
            {`${this.props.currentUser.email}`}
        </section>

    }
} 

let mapStateToProps = (state: Store) => {
    return {
        activeUser: state.activeUser,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(UserPage);