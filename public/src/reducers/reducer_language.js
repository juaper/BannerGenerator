import React, { Component } from 'react';

import {SET_LANGUAGE} from '../actions/index';

export default function(state=null, action){

    const {payload, type} = action;
    switch(type){
        case SET_LANGUAGE:
            return payload
    }
    return state;
}