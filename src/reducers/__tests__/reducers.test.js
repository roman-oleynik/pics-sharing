import { internetConnectionReducer } from '../internetConnectionReducer';
import { serverConnectionReducer } from '../serverConnectionReducer';
import { loggedUserReducer } from '../loggedUserReducer';
import { userChildrenReducer } from '../userChildrenReducer';
import { userPhotosReducer } from '../userPhotosReducer';
import { EDIT_INTERNET_CONNECTION_STATUS, InternetConnectionStatus } from '../../types/types';
import { EDIT_SERVER_CONNECTION_STATUS, ServerConnectionStatus } from '../../types/types';
import {GET_USER_DATA, DELETE_CHILD_PHOTO, GET_PHOTOS_DATA, ADD_CHILD_PHOTO, AUTHORIZE_USER, LOG_OUT, ADD_CHILD, EDIT_CHILD_DATA, GET_CHILDREN_DATA} from '../../types/types';
import { generateId } from '../../modules/generateId';


describe("tests of internetConnectionReducer", () => {

  it('test of internetConnectionReducer', () => {
    const AO = {
      type: EDIT_INTERNET_CONNECTION_STATUS, 
      status: InternetConnectionStatus.Connected
    };
    expect(internetConnectionReducer(InternetConnectionStatus.Connection, AO))
      .toBe(AO.status);
  });

});

describe("tests of serverConnectionReducer", () => {

  it('test of serverConnectionReducer', () => {
    const AO = {
      type: EDIT_SERVER_CONNECTION_STATUS,
      status: ServerConnectionStatus.Connected
    };
    expect(serverConnectionReducer(ServerConnectionStatus.Connection, AO))
      .toBe(AO.status);
  });

});

describe("tests of loggedUserReducer", () => {

  it("test of loggedUserReducer's behavior with AUTHORIZE_USER action", () => {
    const AO = {
      type: AUTHORIZE_USER,
      body: {
        id: generateId(),
        email: "somemail@gmail.com",
        password: "12345678",
        firstName: "John",
        lastName: "Doe",
        location: "Minsk"
      }
    };
    expect(loggedUserReducer(null, AO))
      .toBe(AO.body);
  });

  it("test of loggedUserReducer's behavior with LOG_OUT action", () => {
    const loggedUser = {
      id: generateId(),
      email: "somemail@gmail.com",
      password: "12345678",
      firstName: "John",
      lastName: "Doe",
      location: "Minsk"
    };
    const AO = {type: LOG_OUT};

    expect(loggedUserReducer(loggedUser, AO))
      .toBe(null);
  });

  it("test of loggedUserReducer's behavior with GET_USER_DATA action", () => {
    const loggedUser = {
      id: generateId(),
      email: "somemail@gmail.com",
      password: "12345678",
      firstName: "John",
      lastName: "Doe",
      location: "Minsk"
    };
    const AO = {
      type: GET_USER_DATA,
      body: loggedUser
    };
    expect(loggedUserReducer(loggedUser, AO))
      .toBe(AO.body);
  });

});

describe('tests of userChildrenReducer', () => {

  it("test of userChildrenReducer's behavior with ADD_CHILD action", () => {
    const childrenState = [
      {
        id: generateId(),
        name: "Mike",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      },
      {
        id: generateId(),
        name: "John",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      }
    ]
    const childDataForAdding = {
      id: generateId(),
      name: "John",
      dateOfBirth: new Date(),
      userId: "111111111111111111111111"
    };
    const AO = {
      type: ADD_CHILD,
      body: childDataForAdding
    };
    expect(userChildrenReducer(childrenState, AO))
      .toEqual([...childrenState, AO.body]);
  });

  it("test of userChildrenReducer's behavior with EDIT_CHILD_DATA action", () => {
    const childrenState = [
      {
        id: '222222222222222222222222',
        name: "Mike",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      },
      {
        id: '333333333333333333333333',
        name: "John",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      }
    ];
    const childDataForEditing = {
      id: '333333333333333333333333',
      name: "John",
      dateOfBirth: new Date(),
      userId: "111111111111111111111111"
    };
    const AO = {
      type: EDIT_CHILD_DATA,
      body: childDataForEditing 
    };
    const filteredState = childrenState.filter(child => child.id !== childDataForEditing.id);
    const newState = [...filteredState, AO.body];

    expect(userChildrenReducer(childrenState, AO))
      .toEqual(newState);
  });

  it("test of loggedUserReducer's behavior with GET_CHILDREN_DATA action", () => {
    const childrenState = [
      {
        id: '222222222222222222222222',
        name: "Mike",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      },
      {
        id: '333333333333333333333333',
        name: "John",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      }
    ];
    const AO = {
      type: GET_CHILDREN_DATA,
      body: childrenState
    };
    expect(userChildrenReducer(null, AO))
      .toEqual(AO.body);
  });

  it("test of userChildrenReducer's behavior with LOG_OUT action", () => {
    const childrenState = [
      {
        id: '222222222222222222222222',
        name: "Mike",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      },
      {
        id: '333333333333333333333333',
        name: "John",
        dateOfBirth: new Date(),
        userId: "111111111111111111111111"
      }
    ];
    const AO = {type: LOG_OUT};

    expect(userChildrenReducer(childrenState, AO))
      .toEqual([]);
  });

});

describe("tests of userPhotosReducer", () => {

  it("test of userPhotosReducer's behavior with ADD_CHILD_PHOTO action", () => {
    const photosState = [
      {
        id: generateId(),
        src: "",
        createdAt: new Date(),
        childItemId: generateId()
      },
      {
        id: generateId(),
        src: "",
        createdAt: new Date(),
        childItemId: generateId()
      }
    ];
    const childPhotoDataForAdding = {
      id: generateId(),
      src: "",
      createdAt: new Date(),
      childItemId: generateId()
    };
    const AO = {
      type: ADD_CHILD_PHOTO,
      body: childPhotoDataForAdding
    };
    expect(userPhotosReducer(photosState, AO))
      .toEqual([...photosState, AO.body]);
  });

  it("test of userPhotosReducer's behavior with DELETE_CHILD_PHOTO action", () => {
    const photosState = [
      {
        id: '222222222222222222222222',
        src: "",
        createdAt: new Date(),
        childItemId: "111111111111111111111111"
      },
      {
        id: '333333333333333333333333',
        src: "",
        createdAt: new Date(),
        childItemId: "111111111111111111111111"
      }
    ];
     
    const childPhotoDataForDeleting = {
      id: '333333333333333333333333',
      src: "",
      createdAt: new Date(),
      childItemId: "111111111111111111111111"
    };
    const AO = {
      type: DELETE_CHILD_PHOTO,
      body: childPhotoDataForDeleting 
    };
    const newState = photosState.filter(photo => photo.id !== childPhotoDataForDeleting.id);
  
    expect(userPhotosReducer(newState, AO))
      .toEqual(newState);
  });

  it("test of userPhotosReducer's behavior with LOG_OUT action", () => {
    const photosState = [
      {
        id: '222222222222222222222222',
        src: "",
        createdAt: new Date(),
        childItemId: "111111111111111111111111"
      },
      {
        id: '333333333333333333333333',
        src: "",
        createdAt: new Date(),
        childItemId: "111111111111111111111111"
      }
    ];
    const AO = {
      type: LOG_OUT 
    };
     
    expect(userPhotosReducer(photosState, AO))
      .toEqual([]);
  });

  it("test of userPhotosReducer's behavior with GET_PHOTOS_DATA action", () => {
    const photosData = [
      {
        id: '222222222222222222222222',
        src: "",
        createdAt: new Date(),
        childItemId: "111111111111111111111111"
      },
      {
        id: '333333333333333333333333',
        src: "",
        createdAt: new Date(),
        childItemId: "111111111111111111111111"
      }
    ];
    const AO = {
      type: GET_PHOTOS_DATA,
      body: photosData
    };
     
    expect(userPhotosReducer([], AO))
      .toEqual(AO.body);
  });

})