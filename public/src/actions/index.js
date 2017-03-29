

export const GENERATOR_DISPLAY = 'GENERATOR_DISPLAY';

export const MODIFY_TEXT_INPUTS_AMOUNT = 'MODIFY_TEXT_INPUTS_AMOUNT';

export const ACTIVE_IMAGE = 'ACTIVE_IMAGE';

export const SET_CANVAS = 'SET_CANVAS';

export const CHANGE_FORMAT = 'CHANGE_FORMAT';

export const SET_DATA = "SET_DATA";

export const SET_LANGUAGE = 'SET_LANGUAGE';

export const SET_DESCRIPTION = 'SET_DESCRIPTION'


export function generatorDisplayToggle(visible){

    return{
        type: GENERATOR_DISPLAY,
        payload : visible
    }
}

export function setDescription(description){

    return{
        type: SET_DESCRIPTION,
        payload : description
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

export function setLanguage(lang){
    return{
        type : SET_LANGUAGE,
        payload : lang
    }
}


