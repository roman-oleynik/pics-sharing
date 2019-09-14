import React from 'react';

import {Store, UserObject, Child} from '../types/types';

import {connect} from 'react-redux';

interface IProps {
    loggedUser: UserObject
}

class AddChildInterface extends React.PureComponent<IProps> {
    public render() {
        return <div className="Add-Child-Interface">
            <h2 className="Add-Child-Interface__Title">Children</h2>
            <ol className="Add-Child-Interface__Child-List">
            {
                this.props.loggedUser && this.props.loggedUser.children.length !== 0 && this.props.loggedUser.children.map((child: Child) => {
                    return <li key={child.name}>{child.name}</li>
                })
            }
            </ol>
            <div className="Add-Child-Interface__Button-Container">
                <button className="Add-Child-Interface__Button">Add child</button>
            </div>
        </div>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(AddChildInterface);