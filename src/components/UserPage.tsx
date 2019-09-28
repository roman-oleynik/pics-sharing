import React from 'react';
import './UserPage.scss';
import {Store, UserObject, Child, ChildPhoto} from '../types/types';
import {ACT_GET_USER_DATA, ACT_GET_CHILDREN_DATA, ACT_ADD_CHILD, ACT_GET_PHOTOS_DATA} from '../actions/actions';
import {generateId} from '../modules/generateId';
import {Redirect, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ChildItem from './ChildItem';

// import AddChildInterface from './AddChildInterface';

interface IProps {
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[],
    match: any,
    dispatch: any
};

interface IState {
    pageStatus: string
}

// enum {}

class UserPage extends React.PureComponent<IProps, IState> {
    public state = {
        pageStatus: "child-list"
    };

    public componentWillMount = (): void => {
        // console.log(this.props.loggedUser);
        this.getUser(this.props.match.params.id);
        this.getChildren(this.props.match.params.id);
        this.getPhotos(this.props.match.params.id);
    };

    public getUser = (id: string): void => {
        axios.get(`http://localhost:4000/users/${id}`)
            .then((res: AxiosResponse) => {
                // console.log(res)
                
                this.props.dispatch(ACT_GET_USER_DATA(res.data))
            })
            .catch((err: AxiosError) => console.log(err))
    };

    public getChildren = (id: string): void => {
        axios.get(`http://localhost:4000/users/${id}/childItems`)
            .then((res: AxiosResponse) => {
                // console.log(res.data)
                
                this.props.dispatch(ACT_GET_CHILDREN_DATA(res.data))
            })
            .catch((err: AxiosError) => console.log(err))
    };

    public getPhotos = (id: string): void => {
        axios.get(`http://localhost:4000/users/${id}/photos`)
            .then((res: AxiosResponse) => {
                this.props.dispatch(ACT_GET_PHOTOS_DATA(res.data))
            })
            .catch((err: AxiosError) => console.log(err))
    };

    public processFormData = (): void => {
        let {_name, _dateOfBirth, _placeOfBirth}: any = this.refs;

        let newChildData: Child = this.props.loggedUser && {
            id: generateId(),
            name: _name.value,
            dateOfBirth: new Date(_dateOfBirth.value),
            placeOfBirth: _placeOfBirth.value,
            userId: this.props.loggedUser.id
        };
        this.submitData(newChildData);
    };

    public submitData = (data: Child): void => {
        axios.post(`http://localhost:4000/childItems`, data)
            .then(res => {
                console.log(res.data);
                let newArrayOfChildren: Child[] = [...this.props.userChildren, res.data];
                this.props.dispatch(ACT_ADD_CHILD(newArrayOfChildren));
                this.setState({pageStatus: "child-list"});
            })
            .catch(err => console.log(err))
    };

    public goBackToUserPage = (): void => {
        this.setState({pageStatus: "child-list"});
    };

    public turnOnAddChildInterface = () => {
        this.setState({pageStatus: "add-child"});

    };

    public render() {
        const {loggedUser, userChildren, userPhotos} = this.props;
        if (loggedUser === null) {
            return <Redirect to="/login" />
        }
        return loggedUser ? <section className="Child-Page-Container">
            {
                this.state.pageStatus === "child-list" && loggedUser !== null && 
                    <div className="Page-Content">
                        <h1 className="Page-Content__Username">{`${loggedUser.firstName} ${loggedUser.lastName}`}</h1>
                        <div className="Add-Child-Interface">
                            <h2 className="Add-Child-Interface__Title">Children</h2>
                            <section className="Add-Child-Interface__Child-List">
                            {
                                (loggedUser && userChildren && userChildren.length !== 0) 
                                ? 
                                userChildren.map((child: Child) => {
                                    return <ChildItem key={child.id} childInfo={child} />
                                })
                                :
                                (loggedUser && userChildren && userChildren.length === 0) 
                                ?
                                <div>Children list is empty</div>
                                :
                                <div>Loading...</div>
                            } 
                            </section>
                            
                        </div>
                    </div>
            }
            {
                this.state.pageStatus === "add-child" && loggedUser !== null && 
                <div>
                    <h1 className="Page-Content__Username">Add Child</h1>
                    <input type="text" ref="_name" required />
                    <input type="date" ref="_dateOfBirth" required />
                    <input type="text" ref="_placeOfBirth" required />
                    <button onClick={this.processFormData}>Submit</button>
                    <button onClick={this.goBackToUserPage}>Back</button>
                </div> 
            }
            <div className="Add-Child-Interface__Button-Container">
                <button onClick={this.turnOnAddChildInterface}>Add Child</button>
            </div>
        </section> : <div>Loading...</div>
    };
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser,
        userChildren: state.userChildren,
        userPhotos: state.userPhotos
    }
}

export default connect(mapStateToProps)(UserPage);