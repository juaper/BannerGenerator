import React, { Component } from 'react';

import {CHANGE_FORMAT} from '../actions/index';

export default function(state='normal', action){

    const {payload, type} = action;
    switch(type){
        case CHANGE_FORMAT:
            return payload
    }
    return state;
}