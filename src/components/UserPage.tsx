import React from 'react';
import './UserPage.scss';
import {Store, UserObject, Child, ChildPhoto} from '../types/types';
import {ACT_GET_USER_DATA, ACT_EDIT_SERVER_CONNECTION_STATUS, ACT_EDIT_CHILD_DATA, ACT_GET_CHILDREN_DATA, ACT_ADD_CHILD, ACT_GET_PHOTOS_DATA} from '../actions/actions';
import {generateId} from '../modules/generateId';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import ChildLink from './ChildLink';
import {storage} from '../firebase/firebaseConfig';
import Navbar from './Navbar';
import {ServerConnectionStatus} from '../types/types';
import isoFetch from 'isomorphic-fetch';


interface IProps {
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[],
    match: any,
    dispatch: any,
    hasServerConnection: ServerConnectionStatus
};

interface IState {
    pageMode: PageMode,
    childOnEditing: Child,
    userAvatar: any,
    avatarLoadingStatus: PhotoLoadingStatus
};

enum PageMode {
    ChildList,
    AddChild,
    EditChild
};
enum PhotoLoadingStatus {
    Loading,
    Loaded,
    Unloaded
};
  

class UserPage extends React.PureComponent<IProps, IState> {
    public state: IState = {
        pageMode: PageMode.ChildList,
        childOnEditing: {
            id: "",
            name: "",
            dateOfBirth: new Date(),
            userId: ""
        },
        userAvatar: {},
        avatarLoadingStatus: PhotoLoadingStatus.Loaded
    };

    public componentWillMount = (): void => {
        this.getUser(this.props.match.params.id);
        this.getChildren(this.props.match.params.id);
        this.getPhotos(this.props.match.params.id);
    };

    public getUser = async (id: string) => {
        const getUser = await axios.get(`http://localhost:4000/users/${id}`);
            try {
                this.props.dispatch(ACT_GET_USER_DATA(getUser.data));
            } catch(err) {
                console.log(err);
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
            }
    };

    public getChildren = async (id: string) => {
        const getChildren = await axios.get(`http://localhost:4000/users/${id}/childItems`);
            try {
                this.props.dispatch(ACT_GET_CHILDREN_DATA(getChildren.data));
            } catch (err) {
                console.log(err);
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
            }
    };

    public getPhotos = async (id: string) => {
        const getPhotos = await axios.get(`http://localhost:4000/users/${id}/photos`);
            try {
                this.props.dispatch(ACT_GET_PHOTOS_DATA(getPhotos.data))
            } catch(err) {
                console.log(err);
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
            }
    };

    public processFormData = (): void => {
        let {_name, _dateOfBirth, _placeOfBirth}: any = this.refs;

        let newChildData: Child = this.props.loggedUser && {
            id: generateId(),
            name: _name.value,
            dateOfBirth: new Date(_dateOfBirth.value),
            userId: this.props.loggedUser.id
        };
        this.submitData(newChildData);
    };

    public submitData = async (data: Child) => {
        const result = await axios.post(`http://localhost:4000/childItems`, data);
            try {
                this.props.dispatch(ACT_ADD_CHILD(result.data));
                this.setState({pageMode: PageMode.ChildList});
            } catch {
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
            }
    };

    public submitEditedChildData = async () => {
        const result = await axios.put(`http://localhost:4000/childItems/${this.state.childOnEditing.id}`, this.state.childOnEditing);
            try {
                this.props.dispatch(ACT_EDIT_CHILD_DATA(result.data));
                this.setState({pageMode: PageMode.ChildList});
            } catch(err) {
                ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
                throw new Error("status: " + err);
            }
    };

    public goBackToUserPage = (): void => {
        this.setState({pageMode: PageMode.ChildList});
    };

    public turnOnAddChildInterface = () => {
        this.setState({pageMode: PageMode.AddChild});
    };

    public turnOnEditChildInterface = (child: Child) => {
        this.setState({
            pageMode: PageMode.EditChild,
            childOnEditing: child
        });

    };

    public changeDataOfChildOnEditing = () => {
        const {_name, _dateOfBirth, _placeOfBirth}: any = this.refs;
        let childObj: Child = {
            id: this.state.childOnEditing.id,
            name: _name.value,
            dateOfBirth: _dateOfBirth.value,
            userId: this.state.childOnEditing.userId
        };
        this.setState({childOnEditing: childObj});
    };


    public changeAvatar = (EO: any): void => {
        console.log(EO.target.files[0]);
        let image = EO.target.files[0];
        this.setState({userAvatar: image});
    };
    
    public submitAvatarData = async (EO: any) => {
        EO.preventDefault();
        const upload: any = await storage.ref(`images/${this.state.userAvatar.name}`).put(this.state.userAvatar);

        upload.on("state_changed", 
        (snapshot: any) => {
            this.setState({avatarLoadingStatus: PhotoLoadingStatus.Loading});
            snapshot.bytesTransferred === snapshot.totalBytes && this.setState({avatarLoadingStatus: PhotoLoadingStatus.Loaded});
        }, 
        (err: any) => {
            console.log(err);
            this.props.dispatch(ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected))
        }, 
        async () => {
            const url = await storage.ref('images').child(this.state.userAvatar.name).getDownloadURL();
                try {
                    const newUserData: UserObject = {
                        ...this.props.loggedUser,
                        avatar: url
                    };
                    const getUser = await axios.put(`http://localhost:4000/users/${this.props.loggedUser.id}`, newUserData);
                        try {
                            this.props.dispatch(ACT_GET_USER_DATA(getUser.data));
                        } catch(err) {
                            console.log(err);
                            ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
                        }
                } catch(err) {                    
                    console.log(err);
                    ACT_EDIT_SERVER_CONNECTION_STATUS(ServerConnectionStatus.Disconnected);
                }
        });
    };

    public render() {
        const {loggedUser, userChildren} = this.props;
        if (loggedUser === null) {
            return <Redirect to="/login" />
        }
        if (this.props.hasServerConnection === ServerConnectionStatus.Disconnected) {
            return <div>Disconnected</div>
        }
        return loggedUser ? <section className="Child-Page-Container">
            <Navbar />
            {
                this.state.pageMode === PageMode.ChildList && loggedUser !== null && 
                    <div className="Page-Content">
                        <div className="Avatar-Container">
                            {
                                this.state.avatarLoadingStatus === PhotoLoadingStatus.Loaded 
                                ?
                                <img className="Avatar-Container__Image" src={loggedUser.avatar !== "" ? loggedUser.avatar : "/img/avatar.jpg"} alt="avatar"/>
                                :
                                <img src="/img/loader.gif" alt="loader"/>
                            }
                            <form className="User-Avatar-Form" onSubmit={this.submitAvatarData}>
                                <label className="User-Avatar-Form__File-Input-Label">Load Avatar
                                    <input className="User-Avatar-Form__File-Input" type="file" onChange={this.changeAvatar} required />
                                </label>
                                <input className="User-Avatar-Form__Submit" type="submit" value="Submit" />
                            </form>
                        </div>
                        
                        <div className="Child-Interface">
                            <h2 className="Child-Interface__Title">Children</h2>
                            <section className="Child-Interface__Child-List">
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
                            <div className="Child-Interface__Button-Container">
                                <button onClick={this.turnOnAddChildInterface}>+</button>
                            </div>
                        </div>
                    </div>
            }
            {
                this.state.pageMode === PageMode.AddChild && loggedUser !== null && 
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
                this.state.pageMode === PageMode.EditChild && loggedUser !== null && 
                <div>
                    <h1 className="Page-Content__Username">Edit Child</h1>
                    <input type="text" defaultValue={this.state.childOnEditing.name} onChange={this.changeDataOfChildOnEditing} ref="_name" required />
                    <input type="date" defaultValue={this.state.childOnEditing.dateOfBirth.toString().slice(0,10)} onChange={this.changeDataOfChildOnEditing} ref="_dateOfBirth" required />
                    <button onClick={this.submitEditedChildData}>Submit</button>
                    <button onClick={this.goBackToUserPage}>Back</button>
                </div> 
            }
            
        </section> : <div>Loading...</div>
    };
} 

let mapStateToProps = (state: Store) => {
    return {
        hasServerConnection: state.hasServerConnection,
        loggedUser: state.loggedUser,
        userChildren: state.userChildren,
        userPhotos: state.userPhotos
    }
}

export default connect(mapStateToProps)(UserPage);