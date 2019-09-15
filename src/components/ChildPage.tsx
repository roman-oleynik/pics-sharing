import React from 'react';

import {Store, UserObject, Child} from '../types/types';

import {connect} from 'react-redux';


interface IProps {
    loggedUser: UserObject,
    childInfo: Child,
    match: any
}

class ChildPage extends React.PureComponent<IProps> {
    public render() {
        return <div className="Child-Page-Container">
            {/* <img src={this.props.childInfo.photoSrc} alt="img" className="Child-Item-Container__Photo" /> */}
            <h2 className="Child-Page-Container__Child-Name">{this.props.match.params.name}</h2>
        </div>
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(ChildPage);