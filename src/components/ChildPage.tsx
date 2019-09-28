import React from 'react';
import './ChildPage.scss';
import {Store, UserObject, Child, ChildPhoto} from '../types/types';
import {ACT_ADD_CHILD_PHOTO} from '../actions/actions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {generateId} from '../modules/generateId';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {storage} from '../firebase/firebaseConfig';
import Photo from './Photo';

interface IProps {
    loggedUser: UserObject,
    userChildren: Child[],
    userPhotos: ChildPhoto[],
    match: any,
    dispatch: any
};

class ChildPage extends React.PureComponent<IProps> {
    public currentChild: Child | false | undefined;

    componentWillMount = () => {
        this.currentChild = this.props.loggedUser && this.props.userChildren && this.props.userChildren.find((child: Child) => {
            return child.id === this.props.match.params.childId;
        });
    }

   
    public uploadFile = () => {
        let uploadedFiles: any = this.refs.files;
        let image = uploadedFiles.files[0];
        const upload = storage.ref(`images/${image.name}`).put(image);

        upload.on("state_changed", 
        (snapshot) => {
            //progress
        }, 
        (err) => {
            //err
        }, 
        () => {
            storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    this.sendPhoto(url);
                })
                .catch(err => console.log(err));
        });
    };

    public sendPhoto = (picture: string) => {
        
        let newPhoto = {
            id: generateId(),
            src: picture,
            createdAt: new Date(),
            childItemId: this.currentChild && this.currentChild.id
        }

        axios.post(`http://localhost:4000/photos`, newPhoto)
            .then((res: AxiosResponse) => {
                console.log(res);
                const arrayWithNewPhotos: ChildPhoto[] = [...this.props.userPhotos, res.data]
                this.props.dispatch(ACT_ADD_CHILD_PHOTO(arrayWithNewPhotos));
            })
            .catch((err: AxiosError) => console.log(err));
    };

    public render() {
        const {loggedUser} = this.props;

        let childPhotos: any = [];

        this.props.loggedUser && this.props.userChildren && this.props.userPhotos.forEach((photo: ChildPhoto) => {
            photo.childItemId === this.props.match.params.childId && childPhotos.push(photo);
            
        });
        if (loggedUser == null) {
            return <Redirect to="/login" />
        }
        return <div className="Child-Page-Container"> 
                <div className="Child-Page-Container__Photos">
                {
                    childPhotos && childPhotos.map((photo: ChildPhoto): React.ReactElement => {
                        return <Photo key={photo.id} photoData={photo} match={this.props.match} />
                    })
                }
                </div>
                
                <h2 className="Child-Page-Container__Child-Name">{this.currentChild && this.currentChild.name}</h2>
                <div className="Load-Image-Interface">
                    <input type="file" name="image" id="file" ref="files" />
                    <button className="Load-Image-Interface__Submit-Image-Button" onClick={this.uploadFile}>Submit</button>
                    
                </div>
            </div>  
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser,
        userChildren: state.userChildren,
        userPhotos: state.userPhotos
    }
}

export default connect(mapStateToProps)(ChildPage);