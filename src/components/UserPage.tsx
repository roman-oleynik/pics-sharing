import React from 'react';

import {Store, UserObject} from '../types/types';

import {connect} from 'react-redux';

interface IProps {
    activeUser: UserObject
}

class UserPage extends React.PureComponent<IProps> {
    public render() {
        return <section className="Page-Content">
            {`Logged in using email: ${this.props.activeUser.email}`}
        </section>

    }
} 

let mapStateToProps = (state: Store) => {
    return {
        activeUser: state.activeUser
    }
}

export default connect(mapStateToProps)(UserPage);