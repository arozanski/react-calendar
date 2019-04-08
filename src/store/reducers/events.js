import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    events: [],
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
        default: return state;
    }
}

export default reducer;