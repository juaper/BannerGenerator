
/* global
fabric , $*/

import React, {Component} from 'react';
import TextControlButton from './TextControlButton';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {modifyTextInputsAmount} from '../../actions/index';

export class TextControl extends Component{
    constructor(props){
        super(props);
        const fillStyle = {
            "fill": "#fff",
            "borderColor": "white",
            "cornerColor": "white",
            "transparentCorners": false,
            "cornerSize": 8,
            editable: false,
            textAlign: "center",
            fontFamily: "impacta_oebold, impact",
            lineHeight: 1
        };
        const strokeStyle = {
            strokeLineJoin: "round",
            stroke: "#000",
            hasControls: false,
            hasBorders: false,
            selectable: false,
            editable: false,
            textAlign: "center",
            fontFamily: "impacta_oebold, impact",
            lineHeight: 1
        }
        const fillStyle_newformat_for_first_line = {
            top: 26, "fill": "#000", "editable": true, "borderColor": "blue", "cornerColor": "blue", "transparentCorners": false, "cornerSize": 8, editable: false, fontSize: 10, textAlign: "right", fontWeight: 100, fontFamily: "Open Sans Hebrew", lineHeight: 1.3,
        };
        console.log('text control props', this.props)
        this.state = {
            textValue : '',
            textAreaLimit : 38,
            alreadyOnCanvas : false,
            position: this.props.position,
            fillTextBox: new fabric.Textbox("", fillStyle),
            strokeTextBox : new fabric.Textbox("", strokeStyle),
            name : this.props.name,
            currentTextColor : 'white'
        };
    }

    componentWillReceiveProps = (nextProps)=>{
        if(this.props.format !== nextProps.format){
            this.setState({textValue : ''})
        }
    };

    getTextPosition = (textBox,position)=>{
        const {canvas} = this.props;
        switch(position) {
            case 'top':
                return 0.05 * canvas.height;
                break;
            case 'bottom':
                return (canvas.height - textBox.fontSize * 1.8);
                break;
            case 'middle':
                return  canvas.height / 2;
                break;
        }
    };


    styleTextAccordingToCurrentCanvasSize = (textBox, isStroke)=>{
        const {canvas} = this.props;

        /** DEFAULT STYLES FOR ALL TEXT BOXES**/
        textBox.width = canvas.width * 0.975;
        textBox.left = (canvas.width) / 100;
        textBox.fontSize = this.props.newFormat ? canvas.width / 15 : canvas.width / 10;
        textBox.strokeWidth = isStroke ? textBox.fontSize / 6 : 0;
        textBox.top = this.getTextPosition(textBox,this.state.position);

        canvas.renderAll();
    };

    styleTextAccordingToNewFormat = (textBox , isStroke)=>{
        if(isStroke){
            textBox.opacity= '0';
        }
        else{
            textBox.fill = 'black';
            textBox.fontFamily = 'Helvetica';
            textBox.textAlign = 'right';
        }
    };

    styleTextAccordingToNormalFormt = (textBox , isStroke)=>{
        if(isStroke){
            textBox.opacity= '1';
        }
        else{
            textBox.fill = 'white';
            textBox.fontFamily = 'impacta_oebold, impact';
            textBox.textAlign = 'center';
        }
    }

    styleTextAccordingToNormalFormat = (textBox , isStroke)=>{
        if(isStroke){
            textBox.opacity= '1';
        }
        else{
            textBox.fill = '#fff';
            textBox.fontFamily = 'impacta_oebold, impact';
            textBox.textAlign = 'center';

        }
    };

     styleIfDankFormat = (fillTextBox, strokeTextBox) => {
         const {position, format} = this.props;
         const { currentTextColor } = this.state;
         const needsDankStyle = ((format === 'dank' && position === 'top') || currentTextColor === 'black');
        if(needsDankStyle){
            this.styleTextAccordingToNewFormat(fillTextBox);
            this.styleTextAccordingToNewFormat(strokeTextBox,true);
        }
        else{
            this.styleTextAccordingToNormalFormat(fillTextBox);
            this.styleTextAccordingToNormalFormat(strokeTextBox,true);
        }
    };

    onDelete = (event)=>{
        if(event.type !== 'keydown'){
            return;
        }
        this.setState({textValue : event.target.value});
        const {  fillTextBox , strokeTextBox } = this.state;
        const {canvas} = this.props;
        if (this.state.textValue === '' ) {
            this.setState({textValue : event.target.value});
            canvas.remove(fillTextBox);
            canvas.remove(strokeTextBox);


        }
    };

    onInputChange = (event)=>{
        this.setState({textValue: event.target.value});
        const {fillTextBox ,strokeTextBox, alreadyOnCanvas } = this.state;
        const { canvas } = this.props;
        const value = event.target.value;

        if(!alreadyOnCanvas){
            this.styleTextAccordingToCurrentCanvasSize(fillTextBox);
            this.styleTextAccordingToCurrentCanvasSize(strokeTextBox,true);
            this.addText(value);
            this.bindTextBoxEvents();
            this.setStrokeLayerPos(fillTextBox, strokeTextBox);
        }
        this.styleIfDankFormat(fillTextBox, strokeTextBox);
        strokeTextBox.setText(value);
        strokeTextBox.bringForward();
        fillTextBox.setText(value);
        fillTextBox.bringToFront();
        canvas.renderAll();
    };


    handleTextAreaHeight = (event) => {
        if(event.target.value.length > this.state.textAreaLimit){
            var height = $(event.target).css('height');
            var f_height = parseInt(height.substring(0, height.length - 2)) * 1.3;
            $(event.target).css('height' , f_height + 'px')
            this.setState({textAreaLimit : this.state.textAreaLimit * 2})
        }
        else if(event.target.value.length  === 0){
            $(event.target).css('height', '40px')
        }
    };

    addText = (value)=>{
        const {canvas} = this.props;
        const {strokeTextBox, fillTextBox} = this.state;
        this.setState({alreadyOnCanvas : true});
        canvas.add(strokeTextBox);
        canvas.add(fillTextBox);
    };




    bindTextBoxEvents = ()=>{

        const {fillTextBox, strokeTextBox} = this.state;

        //on move
        fillTextBox.on('moving', function(){
            strokeTextBox.top = fillTextBox.top - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleX) ;
            strokeTextBox.left = fillTextBox.left - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleY);
            strokeTextBox.bringToFront();
            fillTextBox.bringToFront();
        });

        //on rotating
        fillTextBox.on('rotating', function(e) {
            strokeTextBox.setAngle(fillTextBox.angle);
        });

        //on scaling
        fillTextBox.on('scaling', function(e) {
            strokeTextBox.setWidth(fillTextBox.width);
            strokeTextBox.top = fillTextBox.top - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleX) ;
            strokeTextBox.left = fillTextBox.left - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleY)
        });
    }



    //Set stroke position
    setStrokeLayerPos = (fill,stroke)=>{
        stroke.top = fill.top - (stroke.strokeWidth / 2 * fill.scaleX) ;
        stroke.left = fill.left - (stroke.strokeWidth / 2 * fill.scaleY)
    };






    //Buttons functions
    makeFontLarger = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const {canvas} = this.props;
        fillTextBox.fontSize += 5;
        strokeTextBox.fontSize += 5;
        canvas.renderAll();
        this.setStrokeLayerPos(fillTextBox,strokeTextBox);
    }

    toggleTextColor = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const { canvas } = this.props;
        if(this.state.currentTextColor === 'white'){
            this.styleTextAccordingToNewFormat(fillTextBox,false);
            this.styleTextAccordingToNewFormat(strokeTextBox,true);
            this.setState({currentTextColor : 'black'});
        }
        else{
            this.styleTextAccordingToNormalFormt(fillTextBox,false);
            this.styleTextAccordingToNormalFormt(strokeTextBox,true);
            this.setState({currentTextColor : 'white'});

        }

        canvas.renderAll();
    }
    makeFontSmaller = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.fontSize -= 5;
        strokeTextBox.fontSize -= 5;
        this.setStrokeLayerPos(fillTextBox,strokeTextBox);
        canvas.renderAll();
    }

    //font weight
    makeFontBold = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.fontFamily = "impacta_oebold, impact";
        strokeTextBox.fontFamily = "impacta_oebold, impact";
        canvas.renderAll();
    }
    makeFontLight = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.fontFamily = "helvetica";
        strokeTextBox.fontFamily = "helvetica";
        canvas.renderAll();
    }

    //text-align
    alignTextLeft = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.textAlign = 'left';
        strokeTextBox.textAlign = 'left';
        canvas.renderAll();
    }
    alignTextRight = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.textAlign = 'right';
        strokeTextBox.textAlign = 'right';
        canvas.renderAll();
    }
    alignTextCenter = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.textAlign = 'center';
        strokeTextBox.textAlign = 'center';
        canvas.renderAll();
    };




    remove = (event)=>{
        this.props.modifyTextInputsAmount('delete', this);
        const { fillTextBox , strokeTextBox } = this.state;
        const {canvas} = this.props;
        canvas.remove(fillTextBox);
        canvas.remove(strokeTextBox)
        this.setState({textValue: ''})
    };

    renderButtons = ()=>{

      return(
          <div className='flex'>
              <TextControlButton
                  clickEvent={this.alignTextRight}
                  icon="glyphicon glyphicon-align-right"
                  text=""
                  className="text-right" />
              <TextControlButton
                  clickEvent={this.alignTextCenter}
                  icon="glyphicon glyphicon-align-center"
                  text=""
                  className="text-right" />


              <TextControlButton
                  clickEvent={this.alignTextLeft}
                  icon="glyphicon glyphicon-align-left"
                  text=""
                  className="text-left" />


              <TextControlButton
                  clickEvent={this.remove}
                  icon="glyphicon glyphicon-trash"
                  text=""
              />


              <TextControlButton
                  clickEvent={this.makeFontSmaller}
                  icon=''
                  text="-"
              />
              <TextControlButton
                  clickEvent={this.makeFontLarger}
                  icon=''
                  text="+"
              />
              <TextControlButton
                  clickEvent={this.makeFontLight}
                  icon=''
                  text="א"
                  className="lite"
              />
              <TextControlButton
                  clickEvent={this.makeFontBold}
                  icon=''
                  text="א"
                  className="bold"
              />
              <TextControlButton
                  clickEvent={this.toggleTextColor}
                  icon=''
                  text="א"
                  className={this.state.currentTextColor === 'white' ? 'black' : "white"}
              />

          </div>
      )
    };









    render = ()=>{


        return (

            <div className="controllers_wrapper clearfix">
                <textarea placeholder="טקסט"
                          value={this.state.textValue}
                          onChange={event => this.onInputChange(event)}
                          //onKeyDown={event => this.onInputChange(event)}
                          type='text'
                          id={Math.random()}
                />

                {this.renderButtons()}


            </div>
            )
    }
}

function mapStateToProps(state) {
    return {
        show: state.generatorDisplay,
        canvas : state.canvas,
        format : state.format
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({  modifyTextInputsAmount}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TextControl);


