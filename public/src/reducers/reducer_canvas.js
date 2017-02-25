import React, { Component } from 'react';

import {SET_CANVAS} from '../actions/index';


export default function(state={}, action){

    const {payload, type} = action;

    switch(type){
        case SET_CANVAS:
            return payload;
    }
    return state;
}