import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    events: [{
        title: "test event",
        start: "2019-04-10T09:09:00.000Z",
        end: "2019-04-10T17:45:00.000Z",
        backgroundColor: "#f44256",
        id: 'evt-1'
    }],
    selected: null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.SET_EVENT: return updateObject(state, { selected: action.event });
        case actionTypes.DESELECT_EVENT: return updateObject(state, { selected: null });
        case actionTypes.ADD_EVENT: 
            const newEvents = [...state.events, action.event];
            const newState = {
                ...state,
                events: newEvents
            }
            return newState;
        case actionTypes.DELETE_EVENT: return updateObject(state, { events: state.events.filter(event => event.id !== action.eventId) });
        case actionTypes.UPDATE_EVENT: 
        const updatedEvents = [...state.events.filter(event => event.id !== action.event.id), action.event];
        const udpatedState = {
            ...state,
            events: updatedEvents
        }
        return udpatedState;
        default: return state;
    }
}

export default reducer;