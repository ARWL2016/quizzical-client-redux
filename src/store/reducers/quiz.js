import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    quizzes: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case actionTypes.SET_QUIZZES:
            return updateObject(state, { quizzes: action.payload })
       
        default: 
            return state;
    }
};

export default reducer;