import React, { Component } from 'react';

import {ACTIVE_IMAGE} from '../actions/index';

const isImage = (img)=>{
    return true
};

export default function(state=[], action){

    const {payload, type} = action;
    switch(type){
        case ACTIVE_IMAGE:
            if(payload.length <= 1 && isImage(payload[0])){
                console.log(payload[0])
                return payload[0];
            }
    }
    return state;
}