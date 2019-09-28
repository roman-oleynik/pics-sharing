import React from 'react';
import {Child, UserObject, ChildPhoto, Store,} from '../types/types';
import {ACT_GET_PHOTOS_DATA} from '../actions/actions';
import {connect} from 'react-redux';
import axios from 'axios';

interface IProps {
    loggedUser: UserObject,
    userPhotos: ChildPhoto[],
    photoData: ChildPhoto,
    dispatch: any,
    match: any
};


class Photo extends React.PureComponent<IProps> {
    public deletePhoto = () => {
        axios.delete(`http://localhost:4000/photos/${this.props.photoData.id}`)
            .then((res) => {
                console.log(res);
                let updPhotosList: ChildPhoto[] = [];
                this.props.userPhotos && this.props.userPhotos.forEach((photo: ChildPhoto) => {
                    photo.id !== this.props.photoData.id && updPhotosList.push(photo);
                });

                this.props.dispatch(ACT_GET_PHOTOS_DATA(updPhotosList));
            })
            .catch((err) => console.log(err));
    };

    public render() {
        return <div className="Photo-Item">
            <img src={this.props.photoData.src} alt="img" className="Photo-Item__Photo" />
            <button className="Photo-Item__Delete" onClick={this.deletePhoto}>X</button>
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

export default connect(mapStateToProps)(Photo);