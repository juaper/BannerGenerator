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
        this.state = {
            showLoader : true
        }
    }



    componentDidUpdate = ()=>{

        const { show, format , canvas} = this.props;

        if(show){
            if(format === 'clean'){
                this.createCleanSlate();
            }
            else{
                this.addImage(canvas)
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
        const MOBILE_DANK_CANVAS_SIZE = window.innerWidth < 767 ? canvasContainerWidth : 400;

        canvas.setWidth(canvasContainerWidth);

        const self = this;
        canvas.clear();
        fabric.Image.fromURL(imageUrl, function (image) {
            document.querySelector(".spinner").style.display = 'none';
            image = isNormalFormat  ? setHeightAndWidth(image) : setHeightAndWidthAccordingToNewFormat(image) ;

            canvas.setHeight(isNormalFormat ? image.height : image.height + spaceToADDForDankFormatStyle );
            canvas.setWidth(isNormalFormat ? image.width : MOBILE_DANK_CANVAS_SIZE);
            canvas.add(image);
            image.set({hoverCursor: "default"});
            image.lockMovementX = isNormalFormat;
            image.lockMovementY = isNormalFormat;
            image.lockScalingX = isNormalFormat;
            image.lockScalingY = isNormalFormat;
            image.lockUniScaling = isNormalFormat;
            image.hasBorders = !isNormalFormat;
            image.selectable = true;
            self.addWaterMark();
        });
        console.log('add image')

    };

    addWaterMark = ()=>{
        console.log('add');
        const canvas = this.props.canvas;
        const waterMark = window.innerWidth < 767  ? 'watermark-mobile' : 'watermark-desktop';
        fabric.Image.fromURL(`./public/images/${waterMark}.jpg`, function (watermark) {
            canvas.add(watermark);
            watermark.lockMovementX = true;
            watermark.lockMovementY = true;
            const mobilePosition = {
                left: 0,
                top: canvas.height - 6,
                width: 50, height: 6,
                opacity: 0.5
            };
            const desktopPosition = {
                left: 0,
                top: canvas.height - 12,
                width: 99, height: 12,
                opacity: 0.5
            };
            const currentNeededPosition = window.innerWidth <= 767 ? mobilePosition : desktopPosition;
            watermark.set(currentNeededPosition);
            canvas.bringToFront(watermark);
            canvas.renderAll();
        })
    };


    closeGenerator = ()=>{
        const { generatorDisplayToggle , changeFormat } = this.props;
        generatorDisplayToggle(false);
        changeFormat('normal');
        document.querySelector(".cover").style.display = 'none';
    };


    getLoaderHtml = ()=>{
        return ( <div className="spinner">Loading&</div> );
    };

    render= ()=>{
        const {lang} = this.props;
        const GENERATOR_TITLE = lang === 'he' ? 'מחולל הממים' : "Meme Generator";
        if(this.props.show){
            return(
                <div className="generator">
                    <h1 className="text-center generator__title">
                        {lang ? GENERATOR_TITLE : ''}
                    </h1>
                    <div className="generator__wrapper">
                        <div className="generator__canvas-wrapper col-sm-7">
                            <Canvas />
                            {this.state.showLoader ? this.getLoaderHtml() : null}
                        </div>
                        <div className="generator__utils col-sm-5">
                            <TextInputContainer />
                        </div>
                    </div>
                    <div className="generator__close glyphicon glyphicon-remove"  onClick={this.closeGenerator}>  </div>
                    <div className="bottom_details text-center">
                        <h4>
                            The generator was built by <a href="mailto:nirbenya@gmail.com">  Nir Ben-Yair </a>
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
        format : state.format,
        lang : state.lang
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ generatorDisplayToggle , changeFormat}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Generator)