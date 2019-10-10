import React, { FormEvent } from 'react';
import './ChildPage.scss';
import {Store, UserObject, Child, ChildPhoto} from '../types/types';
import {ACT_GET_PHOTOS_DATA, ACT_ADD_CHILD_PHOTO} from '../actions/actions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {generateId} from '../modules/generateId';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {storage} from '../firebase/firebaseConfig';
import Photo from './Photo';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'

interface IProps {
  loggedUser: UserObject,
  userChildren: Child[],
  userPhotos: ChildPhoto[],
  match: any,
  dispatch: any
};

interface IState {
  loadPhotoStatus: PhotoStatus,
};

enum PhotoStatus {
  Loading,
  Loaded
}

class ChildPage extends React.PureComponent<IProps, IState> {
  public state = {
    loadPhotoStatus: PhotoStatus.Loaded,
  };

  

  public currentChild: Child | false | undefined;

  public _dateOfTakingPicture: string = new Date().toISOString();

  public childPhotoObjectOnEditing: ChildPhoto = {
    id: `${this.currentChild ? this.currentChild.id : ""}`,
    src: "",
    createdAt: new Date(),
    childItemId: ""
  };
  
  public componentWillMount = (): void => {
    this.currentChild = this.props.loggedUser && this.props.userChildren && this.props.userChildren.find((child: Child) => {
      return child.id === this.props.match.params.childId;
    });
  };

  public changeDateOfTakingPicture = (EO: any) => {
    console.log(EO.target.value)
    this._dateOfTakingPicture = new Date(EO.target.value).toISOString()
  };  
   
  public uploadFile = (EO: FormEvent) => {
    EO.preventDefault();
    let uploadedFiles: any = this.refs.files;
    let image = uploadedFiles.files[0];
    const upload = storage.ref(`images/${image.name}`).put(image);

    upload.on("state_changed", 
      (snapshot) => {
        this.setState({loadPhotoStatus: PhotoStatus.Loading})
        snapshot.bytesTransferred === snapshot.totalBytes && this.setState({loadPhotoStatus: PhotoStatus.Loaded})
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
      createdAt: this._dateOfTakingPicture,
      childItemId: this.currentChild && this.currentChild.id
    };

    axios.post(`http://localhost:4000/photos`, newPhoto)
      .then((res: AxiosResponse) => {
        console.log(res);
        this.props.dispatch(ACT_ADD_CHILD_PHOTO(res.data));
      })
      .catch((err: AxiosError) => console.log(err));
  };


  public sortPhotosByAge = (photo1: ChildPhoto, photo2: ChildPhoto): number => {
    if (typeof this.currentChild !== "undefined" && typeof this.currentChild !== "boolean") {
      return (+new Date(photo1.createdAt) - +new Date(this.currentChild.dateOfBirth)) - (+new Date(photo2.createdAt) - +new Date(this.currentChild.dateOfBirth));
    }
    return 0;
  }

  public render() {
    const {loggedUser, userChildren, userPhotos} = this.props;

    if (loggedUser == null) {
      return <Redirect to="/login" />
    }
    
    return <div className="Child-Page-Container"> 
              <NavLink to={`/in/${this.props.loggedUser.id}/children`} className="Child-Page-Container__Back">
                <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
              </NavLink>
              <h2 className="Child-Page-Container__Child-Name">{this.currentChild && this.currentChild.name}</h2>

              <div className="Child-Page-Container__Photos-Container">
                <div className="Child-Page-Container__Photos">
                  <div className="Load-Image-Interface">
                      {
                        this.state.loadPhotoStatus === PhotoStatus.Loading
                        ? 
                        <img src="/img/loader.gif" alt="loader"/>
                        :
                        this.state.loadPhotoStatus === PhotoStatus.Loaded
                        ?  
                        <form onSubmit={this.uploadFile}>
                          <label htmlFor="file" className="Load-Image-Interface__Label">+
                            <input type="file" name="image" id="file" ref="files" className="Load-Image-Interface__Input-File" required />
                          </label>
                          <input type="date" ref="_dateOfTakingPicture" defaultValue={this._dateOfTakingPicture.slice(0,10)} onChange={this.changeDateOfTakingPicture} required />
                          <input type="submit" className="Load-Image-Interface__Submit-Image-Button" value="Submit" />
                        </form>
                        :
                        null
                      }
                    </div>
                  {
                    loggedUser && 
                    userChildren && 
                    userPhotos.length > 0 && 
                    userPhotos
                    .filter((photo: ChildPhoto) => {
                      return photo.childItemId === this.props.match.params.childId;   
                    })
                    .sort(this.sortPhotosByAge)
                    .map((photo: ChildPhoto): React.ReactElement => {
                      return <Photo 
                        key={photo.id} 
                        photoData={photo} 
                        currentChild={this.currentChild}
                      />
                    })
                  }
                  
                </div>
              </div>
            </div>  
  };
};

let mapStateToProps = (state: Store) => {
  return {
    loggedUser: state.loggedUser,
    userChildren: state.userChildren,
    userPhotos: state.userPhotos
  };
}

export default connect(mapStateToProps)(ChildPage);