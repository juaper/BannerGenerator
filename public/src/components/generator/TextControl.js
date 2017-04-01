
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
            "borderColor": "blue",
            "cornerColor": "blue",
            "transparentCorners": false,
            "cornerSize": 8,
            editable: false,
            fontFamily: "impacta_oebold, impact",
            lineHeight: 1,
            fontSize : '20',
            strokeWidth : '0',
            textAlign : 'center'
        };


        const strokeStyle = {
            strokeLineJoin: "round",
            stroke: "#000",
            hasControls: false,
            hasBorders: false,
            selectable: false,
            editable: false,
            fontFamily: "impacta_oebold, impact",
            lineHeight: 1,
            strokeWidth :'1',
            fontSize : '20',
            fill: "#000",
            textAlign : 'center'

        }
        const dankStyle = {
            "fill": "#000",
            "borderColor": "blue",
            "cornerColor": "blue",
            "transparentCorners": false,
            "cornerSize": 8,
            editable: false,
            fontSize: 10,
            fontWeight: 100,
            fontFamily: "helvetica, Open Sans Hebrew",
            lineHeight: 1.3,
        };
        this.state = {
            textValue : '',
            textAreaLimit : 38,
            alreadyOnCanvas : false,
            position: this.props.position,
            fillTextBox: new fabric.Textbox("", fillStyle),
            strokeTextBox : new fabric.Textbox("", strokeStyle),
            name : this.props.name,
            currentTextColor : '#fff'
        };
    }

    componentWillReceiveProps = (nextProps)=>{
        if(this.props.format !== nextProps.format){
            this.setState({textValue : ''});
            this.setState({alreadyOnCanvas : false})
        }
    };

    getTextPosition = (textBox,position)=>{
        const {canvas} = this.props;
        switch(position) {
            case 'top':
                return 0.05 * canvas.height;
                break;
            case 'bottom':
                return (canvas.height - textBox.fontSize * 2.2);
                break;
            case 'middle':
                return  canvas.height / 2;
                break;
        }
    };


    styleTextDimensions = (...textBoxes)=>{
        const {canvas} = this.props;
        textBoxes.forEach((textBox) =>{
            const isStroke = parseInt(textBox.strokeWidth);
            /** DEFAULT STYLES FOR ALL TEXT BOXES**/
            textBox.width = canvas.width * 0.975 || 100;
            console.log('fsdfsdf',textBox.width)
            textBox.left = (canvas.width) / 100;
            textBox.fontSize =/* this.props.newFormat ? canvas.width / 15 :*/ canvas.width / 10;
            textBox.top = this.getTextPosition(textBox,this.state.position);
            textBox.strokeWidth = isStroke ? textBox.fontSize / 6 : '0';
            canvas.renderAll();
        })
        
    };

    styleTextAccordingToNewFormat = (...textBoxes)=>{
        const {canvas} = this.props;
        textBoxes.forEach((textBox)=>{
            const isStroke = parseInt(textBox.strokeWidth);
            textBox.fill = '#000';
            textBox.fontFamily = 'Helvetica Neue, Open Sans Hebrew';
            textBox.fontWeight = '200';
            textBox.opacity=  isStroke ? '0' : '1';
            textBox.fontSize = 33;
            textBox.lineHeight = 1.3;


        });
        this.setState({currentTextColor: "#000"})
       
    };



    styleTextAccordingToNormalFormat = (...textBoxes)=>{

        textBoxes.forEach((textBox)=>{
            const isStroke = parseInt(textBox.strokeWidth);
            textBox.fill = isStroke ? '#000' :'#fff';
            textBox.fontFamily = 'impacta_oebold, impact';
            textBox.opacity=  "1";

        });
        this.setState({currentTextColor: "#fff"})

    };

     styleIfDankFormat = (fillTextBox, strokeTextBox) => {
         const {position, format,canvas} = this.props;
         const { currentTextColor } = this.state;
         const needsDankStyle = ((format === 'dank' && position === 'top') || currentTextColor === '#000');
        if(needsDankStyle){
            this.styleTextAccordingToNewFormat(fillTextBox, strokeTextBox);
        }
        else{
            this.styleTextAccordingToNormalFormat(fillTextBox,strokeTextBox);
        }
        canvas.renderAll()
    };

    onInputChange = (event)=>{
        this.setState({textValue: event.target.value});
        const {fillTextBox ,strokeTextBox, alreadyOnCanvas } = this.state;
        const { canvas } = this.props;
        const value = event.target.value;

        if(!alreadyOnCanvas){
            this.styleTextDimensions(fillTextBox,strokeTextBox);
            this.addText(value);
            this.bindTextBoxEvents();
            this.setStrokeLayerPos(fillTextBox, strokeTextBox);
            this.styleIfDankFormat(fillTextBox, strokeTextBox);
        }
        strokeTextBox.setText(value);
        strokeTextBox.bringForward();
        fillTextBox.setText(value);
        fillTextBox.bringToFront();
        canvas.renderAll();
    };


    addText = ()=>{
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
    };

    toggleTextColor = ()=>{
        const {fillTextBox, strokeTextBox, currentTextColor} = this.state;
        const { canvas } = this.props;
        if(fillTextBox.fill === '#fff'){
            this.styleTextAccordingToNewFormat(fillTextBox,strokeTextBox);
        }
        else{
            this.styleTextAccordingToNormalFormat(fillTextBox,strokeTextBox);
        }

        canvas.renderAll();
    };
    makeFontSmaller = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.fontSize -= 5;
        strokeTextBox.fontSize -= 5;
        this.setStrokeLayerPos(fillTextBox,strokeTextBox);
        canvas.renderAll();
    };

    //font weight
    makeFontBold = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.fontFamily = "impacta_oebold, impact";
        strokeTextBox.fontFamily = "impacta_oebold, impact";
        canvas.renderAll();
    };
    makeFontLight = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.fontFamily = "helvetica";
        strokeTextBox.fontFamily = "helvetica";
        canvas.renderAll();
    };

    //text-align
    alignTextLeft = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.textAlign = 'left';
        strokeTextBox.textAlign = 'left';
        document.getElementById('c').dir='ltr';
        canvas.renderAll();
    };
    alignTextRight = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.textAlign = 'right';
        strokeTextBox.textAlign = 'right';
        document.getElementById('c').dir='rtl';
        canvas.renderAll();
    };
    alignTextCenter = ()=>{
        const {fillTextBox, strokeTextBox} = this.state;
        const{canvas} = this.props;
        fillTextBox.textAlign = 'center';
        strokeTextBox.textAlign = 'center';
        document.getElementById('c').dir='rtl';
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

        const {lang} = this.props;
        const LETTER = lang === 'he' ?  'א' : 'a';

      return(
          <div className='flex'>
              <TextControlButton
                  clickEvent={this.alignTextLeft}
                  icon="glyphicon glyphicon-align-left"
                  text=""
                  className="text-left" />


              <TextControlButton
                  clickEvent={this.alignTextCenter}
                  icon="glyphicon glyphicon-align-center"
                  text=""
                  className="text-right" />

              <TextControlButton
                  clickEvent={this.alignTextRight}
                  icon="glyphicon glyphicon-align-right"
                  text=""
                  className="text-right" />

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
                  text={LETTER}
                  className="lite"
              />
              <TextControlButton
                  clickEvent={this.makeFontBold}
                  icon=''
                  text={LETTER}
                  className="bold"
              />
              <TextControlButton
                  clickEvent={this.toggleTextColor}
                  icon='glyphicon glyphicon-text-color'
                  className={this.state.fillTextBox.fill === '#fff' ? 'white' : "black"}
              />

          </div>
      )
    };









    render = ()=>{

        const {lang} = this.props;
        const PLACEHOLDER = lang =='he' ? 'טקסט' : 'Text';
        return (

            <div className="controllers_wrapper clearfix">
                <textarea placeholder={PLACEHOLDER}
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
        format : state.format,
        lang : state.lang
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({  modifyTextInputsAmount}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TextControl);


