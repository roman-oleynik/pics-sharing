import React, { ChangeEvent } from 'react';
import './UserPage.scss';
import {Store, UserObject, Child, ChildPhoto} from '../types/types';
import {ACT_GET_USER_DATA, ACT_EDIT_CHILD_DATA, ACT_GET_CHILDREN_DATA, ACT_ADD_CHILD, ACT_GET_PHOTOS_DATA} from '../actions/actions';
import {generateId} from '../modules/generateId';
import {Redirect, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ChildLink from './ChildLink';
import {storage} from '../firebase/firebaseConfig';
import Navbar from './Navbar';


interface IProps {
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[],
    match: any,
    dispatch: any
};

interface IState {
    pageStatus: PageStatus,
    childOnEditing: Child,
    userAvatar: any
}

enum PageStatus {
    ChildList,
    AddChild,
    EditChild
}

class UserPage extends React.PureComponent<IProps, IState> {
    public state: IState = {
        pageStatus: PageStatus.ChildList,
        childOnEditing: {
            id: "",
            name: "",
            dateOfBirth: new Date(),
            placeOfBirth: "",
            userId: ""
        },
        userAvatar: {}
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
                this.props.dispatch(ACT_ADD_CHILD(res.data));
                this.setState({pageStatus: PageStatus.ChildList});
            })
            .catch(err => console.log(err))
    };

    public submitEditedChildData = (): void => {
        axios.put(`http://localhost:4000/childItems/${this.state.childOnEditing.id}`, this.state.childOnEditing)
            .then(res => {
                console.log(res.data);
                this.props.dispatch(ACT_EDIT_CHILD_DATA(res.data));
                this.setState({pageStatus: PageStatus.ChildList});
            })
            .catch(err => console.log(err))
    };

    public goBackToUserPage = (): void => {
        this.setState({pageStatus: PageStatus.ChildList});
    };

    public turnOnAddChildInterface = () => {
        this.setState({pageStatus: PageStatus.AddChild});
    };

    public turnOnEditChildInterface = (child: Child) => {
        this.setState({
            pageStatus: PageStatus.EditChild,
            childOnEditing: child
        });

    };

    public changeDataOfChildOnEditing = () => {
        const {_name, _dateOfBirth, _placeOfBirth}: any = this.refs;
        let childObj: Child = {
            id: this.state.childOnEditing.id,
            name: _name.value,
            dateOfBirth: _dateOfBirth.value,
            placeOfBirth: _placeOfBirth.value,
            userId: this.state.childOnEditing.userId
        };
        this.setState({childOnEditing: childObj});
    };


    public changeAvatar = (EO: any): void => {
        console.log(EO.target.files[0]);
        let image = EO.target.files[0];
        this.setState({userAvatar: image})
    };
    
    public submitAvatarData = (EO: any): void => {
        EO.preventDefault();
        const upload = storage.ref(`images/${this.state.userAvatar.name}`).put(this.state.userAvatar);

        upload.on("state_changed", 
        (snapshot) => {
            
        }, 
        (err) => {
                //err
        }, 
        () => {
            storage.ref('images').child(this.state.userAvatar.name).getDownloadURL()
            .then(url => {
                console.log(url);
                const newUserData: UserObject = {
                    ...this.props.loggedUser,
                    avatar: url
                };
                axios.put(`http://localhost:4000/users/${this.props.loggedUser.id}`, newUserData)
                    .then((res: AxiosResponse) => this.props.dispatch(ACT_GET_USER_DATA(res.data)))
                    .catch((err: AxiosError) => console.log(err))
                

            })
            .catch(err => console.log(err));
        });
    };

    public render() {
        const {loggedUser, userChildren} = this.props;
        if (loggedUser === null) {
            return <Redirect to="/login" />
        }
        return loggedUser ? <section className="Child-Page-Container">
            <Navbar />
            {
                this.state.pageStatus === PageStatus.ChildList && loggedUser !== null && 
                    <div className="Page-Content">
                        <div className="Avatar-Container">
                            <img className="Avatar-Container__Image" src={loggedUser.avatar !== "" ? loggedUser.avatar : "/img/avatar.jpg"} alt="avatar"/>
                            <form onSubmit={this.submitAvatarData}>
                                <input type="file" onChange={this.changeAvatar} required />
                                <input type="submit" value="Submit" />
                            </form>
                            
                        </div>
                        
                        <div className="Add-Child-Interface">
                            <section className="Add-Child-Interface__Child-List">
                            {
                                (loggedUser && userChildren.length !== 0) 
                                ? 
                                userChildren.map((child: Child) => {
                                    return <ChildLink 
                                        key={child.id} 
                                        turnOnChildMode={this.turnOnEditChildInterface} 
                                        childInfo={child} 
                                    />
                                })
                                :
                                (loggedUser && userChildren.length === 0)
                                ?
                                <div>Children list is empty</div>
                                :
                                <div>Loading...</div>
                            } 
                            </section>
                            <div className="Add-Child-Interface__Button-Container">
                                <button onClick={this.turnOnAddChildInterface}>+</button>
                            </div>
                        </div>
                    </div>
            }
            {
                this.state.pageStatus === PageStatus.AddChild && loggedUser !== null && 
                <div>
                    <h1 className="Page-Content__Username">Add Child</h1>
                    <input type="text" ref="_name" required />
                    <input type="date" ref="_dateOfBirth" required />
                    <input type="text" ref="_placeOfBirth" required />
                    <button onClick={this.processFormData}>Submit</button>
                    <button onClick={this.goBackToUserPage}>Back</button>
                </div> 
            }
            {
                this.state.pageStatus === PageStatus.EditChild && loggedUser !== null && 
                <div>
                    <h1 className="Page-Content__Username">Edit Child</h1>
                    <input type="text" defaultValue={this.state.childOnEditing.name} onChange={this.changeDataOfChildOnEditing} ref="_name" required />
                    <input type="date" defaultValue={this.state.childOnEditing.dateOfBirth.toString().slice(0,10)} onChange={this.changeDataOfChildOnEditing} ref="_dateOfBirth" required />
                    <input type="text" defaultValue={this.state.childOnEditing.placeOfBirth} onChange={this.changeDataOfChildOnEditing} ref="_placeOfBirth" required />
                    <button onClick={this.submitEditedChildData}>Submit</button>
                    <button onClick={this.goBackToUserPage}>Back</button>
                </div> 
            }
            
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