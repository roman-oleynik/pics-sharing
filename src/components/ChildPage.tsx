import React from 'react';

import {Store, UserObject, Child} from '../types/types';

import {ACT_ADD_CHILD_PHOTO} from '../actions/actions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

import {generateId} from '../modules/generateId';

import axios from 'axios';

interface IProps {
    loggedUser: UserObject,
    childInfo: Child,
    match: any,
    dispatch: any
}

class ChildPage extends React.PureComponent<IProps> {
    public currentChild = this.props.loggedUser !== null && this.props.loggedUser.children.find(el => {
        return el.id === this.props.match.params.id
    });
    public uploadFile = () => {
        let uploadedFiles: any = this.refs.files;
        // let viewImage:any = this.refs.viewImage;
        let reader = new FileReader();
        reader.onload = (e:any) => {
            const picture = e.target.result;
            console.log(picture)
            // viewImage.src = picture;
            this.sendPhoto(picture);
        }
        reader.readAsDataURL(uploadedFiles.files[0]);
    };
    public sendPhoto = (picture: string) => {
        let activeUser: UserObject = {...this.props.loggedUser};
        let currentChild: any = this.props.loggedUser !== null && activeUser.children.find( (child:Child) => child === this.currentChild);
        currentChild.photos = [...currentChild.photos, 
            {
                id: generateId(),
                src: picture,
                createdAt: new Date().toDateString()
            }
        ]

        console.log(activeUser)
        axios.put(`http://localhost:4000/data/${this.props.loggedUser.id}`, activeUser)
            .then(res => {
                console.log(res);
                this.props.dispatch(ACT_ADD_CHILD_PHOTO(activeUser))
            })
            .catch(err => console.log(err))
    };
    public render() {
        if (this.props.loggedUser == null) {
            return <Redirect to="/login" />
        }
        return this.currentChild && <div className="Child-Page-Container">
                {
                    this.currentChild.photos.map((photo: any) => {
                        return <img key={photo.id} src={photo.src} alt="img" className="Child-Item-Container__Photo" />
                 
                    })
                }
                <h2 className="Child-Page-Container__Child-Name">{this.currentChild.name}</h2>
                <div className="Load-Image-Interface">
                    <input type="file" name="image" id="file" ref="files" />
                    <button className="Load-Image-Interface__Submit-Image-Button" onClick={this.uploadFile}>Submit</button>
                    <br />
                    {/* <img src="" id="images" width="400" alt="img" ref="viewImage" /> */}
                </div>
            </div>  
    }
} 

let mapStateToProps = (state: Store) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(ChildPage);