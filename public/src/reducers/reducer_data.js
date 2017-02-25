import React, { Component } from 'react';

import {SET_DATA} from '../actions/index';
import data from '../data/data';



export default function(state=data, action){

    const {payload, type} = action;
    switch(type){
        case SET_DATA:

    }
    return state;
}