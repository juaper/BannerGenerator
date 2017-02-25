

export const GENERATOR_DISPLAY = 'GENERATOR_DISPLAY';

export const MODIFY_TEXT_INPUTS_AMOUNT = 'MODIFY_TEXT_INPUTS_AMOUNT';

export const ACTIVE_IMAGE = 'ACTIVE_IMAGE';

export const SET_CANVAS = 'SET_CANVAS';

export const CHANGE_FORMAT = 'CHANGE_FORMAT';

export const SET_DATA = "SET_DATA";

export function generatorDisplayToggle(visible){

    return{
        type: GENERATOR_DISPLAY,
        payload : visible
    }
}


export function modifyTextInputsAmount(task, target){
    return{
        type: MODIFY_TEXT_INPUTS_AMOUNT,
        payload : {task: task, target: target}
    }
}

export function activeImage(img){
    return{
        type: ACTIVE_IMAGE,
        payload : img
    }
}


export function setCanvas(canvas){
    return{
        type: SET_CANVAS,
        payload : canvas
    }
}


export function changeFormat(format){
    return{
        type: CHANGE_FORMAT,
        payload : format
    }
}

export function setData(data){
    return{
        type: SET_DATA,
        payload : data
    }
}


