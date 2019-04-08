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
        event
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: actionTypes.DELETE_EVENT,
        eventId
    }
}

export const deselectEvent = () => {
    return {
        type: actionTypes.DESELECT_EVENT
    }
}

export const updateEvent = (event) => {
    return {
        type: actionTypes.UPDATE_EVENT,
        event
    }
}