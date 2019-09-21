import React from 'react';

import {Store, UserObject, Child} from '../types/types';

import {connect} from 'react-redux';

import {Redirect, NavLink} from 'react-router-dom';

import ChildItem from './ChildItem';

interface IProps {
    loggedUser: UserObject
}

class ChildrenList extends React.PureComponent<IProps> {
    public render() {
        if (this.props.loggedUser == null) {
            return <Redirect to="/login" />
        }
        return <div className="Add-Child-Interface">
            <h2 className="Add-Child-Interface__Title">Children</h2>
            <section className="Add-Child-Interface__Child-List">
            {
                this.props.loggedUser && this.props.loggedUser.children.length !== 0 && this.props.loggedUser.children.map((child: Child) => {
                    return <ChildItem key={child.id} childInfo={child} />
                })
            }
            </section>
            <div className="Add-Child-Interface__Button-Container">
                <NavLink to={`/in/${this.props.loggedUser.id}/children/add`} className="Add-Child-Interface__Button">Add child</NavLink>
            </div>
        </div>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(ChildrenList);