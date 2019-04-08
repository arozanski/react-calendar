import * as actionTypes from '../actions/actionTypes';

const initState = {
    colors: [{
        label: 'red',
        hex: '#f44256'
    }, {
        label: 'blue',
        hex: '#2589c6'
    }, {
        label: 'green',
        hex: '#24c662'
    }]
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default reducer;