import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {generatorDisplayToggle, changeFormat} from '../actions/index';
import TextInputContainer from './TextInputsContainer';
import Canvas from '../components/generator/Canvas';
import { setHeightAndWidth, setHeightAndWidthAccordingToNewFormat } from '../modules/CanvasImageController';
export class Generator extends Component {
    constructor(props){
        super(props);
    }



    componentDidUpdate= ()=>{

        const { show, format , canvas} = this.props;

        if(show){
            if(format === 'clean'){
                this.createCleanSlate()
            }
            else{
                this.addImage(canvas);
            }
        }
    };


    createCleanSlate = ()=>{
        const {canvas} = this.props;
        const DISTANCE = window.innerWidth > 767 ? 140 : 30;
        const width = document.querySelector('.generator__canvas-wrapper').offsetWidth - DISTANCE;
        const height= window.innerWidth > 767 ? 430 : 260;
        canvas.setWidth(width);
        canvas.setHeight(height);

    };

    addImage = (canvas)=>{
        const imageUrl = this.props.activeImage,
              {format} = this.props,
              isNormalFormat = format === 'normal',
              spaceToADDForDankFormatStyle = window.innerWidth < 767 ? 100 : 150,
              canvasContainerWidth = document.querySelector('.generator__canvas-wrapper').offsetWidth - 30;
                const MOBILE_DANK_CANVAS_SIZE = window.innerWidth < 767 ? canvasContainerWidth : 400
        canvas.clear();
        fabric.Image.fromURL(imageUrl, function (image) {
            image = isNormalFormat  ? setHeightAndWidth(image) : setHeightAndWidthAccordingToNewFormat(image) ;
            canvas.setHeight(isNormalFormat ? image.height : image.height + spaceToADDForDankFormatStyle );
            canvas.setWidth(isNormalFormat ? image.width : MOBILE_DANK_CANVAS_SIZE);
            canvas.add(image);
            image.set({hoverCursor: "default"});
            image.lockMovementX = isNormalFormat;
            image.lockMovementY = isNormalFormat;
            image.lockSkewingX = true;
            image.lockSkewingY = true;
            image.lockScalingX = true;
            image.lockScalingY = true;
            image.lockUniScaling = isNormalFormat;
            image.hasBorders = !isNormalFormat;
            image.selectable = true;
        });
    };


    closeGenerator = ()=>{
        const { generatorDisplayToggle , changeFormat } = this.props;
        generatorDisplayToggle(false);
        changeFormat('normal');
        document.querySelector(".cover").style.display = 'none';
    };

    render= ()=>{
        if(this.props.show){
            return(
                <div className="generator">
                    <h1 className="text-center generator__title">  מחולל הממים</h1>
                    <div className="generator__wrapper">
                        <div className="generator__canvas-wrapper col-sm-7">
                            <Canvas />
                        </div>
                        <div className="generator__utils col-sm-5">
                            <TextInputContainer />
                        </div>
                    </div>
                    <div className="generator__close glyphicon glyphicon-remove"  onClick={this.closeGenerator}>  </div>
                    <div className="bottom_details text-center">
                        <h4>
                            This Meme Generator was built by Nir Ben-Yair
                        </h4>
                        <p className="text-center">
                            הפונט אשר בשימוש הינו הפונט ׳אימפקטה׳, שנתרם ע״י הטיפוגרף עודד עזר.
                            <a href="http://www.hebrewtypography.com/"> לאתר הפונטים הישראלי</a>
                        </p>
                    </div>
                </div>
            )
        }


        return (
            <div>
            </div>
        );
    }
}







function mapStateToProps(state) {
    return {
        show: state.generatorDisplay,
        activeImage : state.activeImage,
        canvas : state.canvas,
        format : state.format
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ generatorDisplayToggle , changeFormat}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Generator)