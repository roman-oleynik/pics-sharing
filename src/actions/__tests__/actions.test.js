import {
    LOG_OUT, 
    ADD_CHILD, 
    AUTHORIZE_USER, 
    ADD_CHILD_PHOTO, 
    GET_USER_DATA, 
    GET_CHILDREN_DATA,
    EDIT_CHILD_DATA,
    GET_PHOTOS_DATA,
    DELETE_CHILD_PHOTO,
    EDIT_INTERNET_CONNECTION_STATUS,
    EDIT_SERVER_CONNECTION_STATUS,
    InternetConnectionStatus,
} from '../../types/types';

import {generateId} from '../../modules/generateId';

import { ACT_EDIT_INTERNET_CONNECTION_STATUS, ACT_EDIT_SERVER_CONNECTION_STATUS, ACT_AUTHORIZE_USER, ACT_GET_USER_DATA, ACT_GET_CHILDREN_DATA, ACT_EDIT_CHILD_DATA, ACT_GET_PHOTOS_DATA, ACT_ADD_CHILD, ACT_ADD_CHILD_PHOTO, ACT_DELETE_CHILD_PHOTO, ACT_LOG_OUT } from '../actions';

describe("actions tests", () => {
    it("ACT_CONNECT_APP_TO_THE_INTERNET test", () => {
        const status = InternetConnectionStatus.Connection;
        expect(ACT_EDIT_INTERNET_CONNECTION_STATUS(status))
            .toEqual({
                type: EDIT_INTERNET_CONNECTION_STATUS,
                status
            })
    });

    it("ACT_CONNECT_APP_TO_THE_SERVER test", () => {
        const status = InternetConnectionStatus.Connection;
        expect(ACT_EDIT_SERVER_CONNECTION_STATUS(status))
            .toEqual({
                type: EDIT_SERVER_CONNECTION_STATUS,
                status
            })
    });

    it("ACT_AUTHORIZE_USER test", () => {
        const user = {
            id: generateId(),
            email: "somemail@gmail.com",
            password: "12345678",
            firstName: "John",
            lastName: "Doe",
            location: "Minsk"
        };
        expect(ACT_AUTHORIZE_USER(user))
            .toEqual({
                type: AUTHORIZE_USER,
                body: user
            })
    });

    it("ACT_GET_USER_DATA test", () => {
        const userData = {
            id: generateId(),
            email: "somemail@gmail.com",
            password: "12345678",
            firstName: "John",
            lastName: "Doe",
            location: "Minsk"
        };
        expect(ACT_GET_USER_DATA(userData))
            .toEqual({
                type: GET_USER_DATA,
                body: userData
            })
    });

    it("ACT_GET_CHILDREN_DATA test", () => {
        const children =  [
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
        expect(ACT_GET_CHILDREN_DATA(children))
            .toEqual({
                type: GET_CHILDREN_DATA,
                body: children
            })
    });

    it("ACT_EDIT_CHILD_DATA test", () => {
        const child = {
            id: '333333333333333333333333',
            name: "John",
            dateOfBirth: new Date(),
            userId: "111111111111111111111111"
        };
        
        expect(ACT_EDIT_CHILD_DATA(child))
            .toEqual({
                type: EDIT_CHILD_DATA,
                body: child
            })
    });

    it("ACT_GET_PHOTOS_DATA test", () => {
        const photos = [
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
        
        expect(ACT_GET_PHOTOS_DATA(photos))
            .toEqual({
                type: GET_PHOTOS_DATA,
                body: photos
            })
    });

    it("ACT_ADD_CHILD test", () => {
        const child = {
            id: '333333333333333333333333',
            name: "John",
            dateOfBirth: new Date(),
            userId: "111111111111111111111111"
        };
        
        expect(ACT_ADD_CHILD(child))
            .toEqual({
                type: ADD_CHILD,
                body: child
            })
    });

    it("ACT_ADD_CHILD_PHOTO test", () => {
        const photo = {
            id: generateId(),
            src: "",
            createdAt: new Date(),
            childItemId: generateId()
        };
        
        expect(ACT_ADD_CHILD_PHOTO(photo))
            .toEqual({
                type: ADD_CHILD_PHOTO,
                body: photo
            })
    });

    it("ACT_DELETE_CHILD_PHOTO test", () => {
        const photo = {
            id: generateId(),
            src: "",
            createdAt: new Date(),
            childItemId: generateId()
        };
        
        expect(ACT_DELETE_CHILD_PHOTO(photo))
            .toEqual({
                type: DELETE_CHILD_PHOTO,
                body: photo
            })
    });

    it("ACT_LOG_OUT test", () => {        
        expect(ACT_LOG_OUT())
            .toEqual({
                type: LOG_OUT
            })
    });
});