import {GENERATOR_DISPLAY} from '../actions/index';

export default function(state=false, action){
    switch(action.type){
        case GENERATOR_DISPLAY:
            return action.payload
    }
    return state;
}