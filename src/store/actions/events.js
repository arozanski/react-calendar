import * as actionTypes from './actionTypes';


export const setSelectedEvent = (event) => {
    return {
        type: actionTypes.SET_EVENT,
        event
    }
}

export const addEvent = (event) => {
    return {
        type: actionTypes.ADD_EVENT,
        event: event
    }
}

export const deleteEvent = (event) => {
    return {
        type: actionTypes.DELETE_EVENT,
        event: event
    }
}

export const deselectEvent = () => {
    return {
        type: actionTypes.DESELECT_EVENT
    }
}