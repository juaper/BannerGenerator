import React, { Component } from 'react';

import {MODIFY_TEXT_INPUTS_AMOUNT} from '../actions/index';
import TextControl from '../components/generator/TextControl';
let TextInputsCounter = 2;
const initialState = [<TextControl key={1} name={1} position="top"/> ,<TextControl key={2} name={2} position="bottom"  />];

export default function(state=initialState, action){

    const {payload, type} = action;
    switch(type){
        case MODIFY_TEXT_INPUTS_AMOUNT:
            if(payload.task === 'add'){
                TextInputsCounter++;
                return  [...state ,<TextControl key={TextInputsCounter} name={TextInputsCounter} position="middle" />];
            }
            else if(payload.task=== 'reset'){
                TextInputsCounter = 2;
                return initialState;
            }
            else if(payload.task === 'delete'){
                return state.filter(elm =>  elm.key !=  payload.target.state.name )
            }
    }
    return initialState;
}