import React from 'react';
import './Photo.scss';
import {Child, UserObject, ChildPhoto, Store,} from '../types/types';
import {ACT_GET_PHOTOS_DATA} from '../actions/actions';
import {connect} from 'react-redux';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    loggedUser: UserObject,
    userPhotos: ChildPhoto[],
    currentChild: Child | false | undefined,
    photoData: ChildPhoto,
    dispatch: any,
    match?: any
};


interface IState {
    delButtonColor: string
}

class Photo extends React.PureComponent<IProps, IState> {
    public state = {
        delButtonColor: "violet"
    }
    public age: { years: number | false | undefined, 
        months: number | false | undefined
    } = {
        years: this.props.currentChild && (+new Date(this.props.photoData.createdAt) - +new Date(this.props.currentChild.dateOfBirth)) / 31536000000,
        months: this.props.currentChild && (+new Date(this.props.photoData.createdAt) - +new Date(this.props.currentChild.dateOfBirth)) / 2592000000,
    };

    public deletePhoto = (): void => {
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

    public manageMouseOver = () => this.setState({delButtonColor: "red"});
    public manageMouseOut = () => this.setState({delButtonColor: "violet"});


    public render() {
        let ageString: string = "";
        if (typeof this.age.years === "number" && typeof this.age.months === "number") {
            if (this.age.months <= 12) {
                ageString = `${this.age.months.toFixed(0)} months`;
            } else if (this.age.months >= 12 && this.age.months < 24) {
                ageString = `${this.age.years.toFixed(0)} year`;
            } else if (this.age.months >= 12 && this.age.months > 24) {
                ageString = `${this.age.years.toFixed(0)} years`;
            }
        }
        
        return <div className="Photo-Item">
            <img src={this.props.photoData.src} alt="img" className="Photo-Item__Photo" />
            <button 
                className="Photo-Item__Delete" 
                onClick={this.deletePhoto} 
                onMouseOver={this.manageMouseOver}
                onMouseOut={this.manageMouseOut}
            >
                <FontAwesomeIcon icon={faTimesCircle} size="2x" color={this.state.delButtonColor} />
            </button>
            {/* <button className="Photo-Item__Edit" onClick={this.turnOnEditMode}>Edit</button> */}
            <div className="Photo-Item__Age-Label">{ageString}</div>
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