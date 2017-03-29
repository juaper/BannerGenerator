import React, { Component } from 'react';

import {SET_DESCRIPTION} from '../actions/index';


export default function(state='', action){

    const {payload, type} = action;
    switch(type){
        case SET_DESCRIPTION:
            return payload;
    }
    return state;
}