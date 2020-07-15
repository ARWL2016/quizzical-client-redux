import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    count: 0
};

const reducer = ( state = initialState, action ) => {
    // console.log('counter state', state)
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            return updateObject(state, {count: state.count + 1});
        case actionTypes.DECREMENT:
            return updateObject(state, {count: state.count - 1});
        default: 
            return state;
    }
    // return state;
};

export default reducer;