import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/generator/Button';
import ItemsArea from '../components/generator/ItemsArea';
import GeneratorUploader from '../components/generator/GeneratorUploader';
import CanvasResizer from '../components/generator/CanvasResizer';
import { modifyTextInputsAmount, changeFormat } from '../actions/index';
export class TextInputsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsAreaShown: false
        }

    }

    addTextLine = ()=> {
        this.props.modifyTextInputsAmount('add');
    };

    reset = ()=> {
        this.props.modifyTextInputsAmount('reset');
    };

    changeFormat = ()=> {
        const { format, changeFormat, modifyTextInputsAmount, canvas } = this.props;
        canvas.clear();
        modifyTextInputsAmount('reset');
        format === 'normal' ? changeFormat('dank') : changeFormat('normal');
    };

    toggleItemsArea = ()=> {
        this.setState({ itemsAreaShown: !this.state.itemsAreaShown })
    };

    download = (event)=> {
        const canvas = this.props.canvas;
        canvas.deactivateAll().renderAll();
        const clickedElement = event.target.tagName === 'SPAN' ? event.target.parentNode : event.target;
        //saveing the canvas and resizing it before downloading depads on screen resolution.
        const zoom = window.innerWidth < 600 ? 2 : 1;
        canvas.setZoom(zoom);
        // need to enlarge canvas otherwise the svg will be clipped
        canvas.setWidth(canvas.getWidth() * zoom).setHeight(canvas.getHeight() * zoom);
        clickedElement.href = document.getElementById('c').toDataURL();
        clickedElement.download = 'MemeKing';
        //!* need to set back canvas dimensions *
        canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom);
        canvas.setZoom(1);
        this.handleGoogleAnalytics()
    };


    handleGoogleAnalytics = ()=>{
        const textAreas = document.getElementsByTagName('TEXTAREA');
        const imagePath = this.props.activeImage.split('/');
        const imageName = imagePath[imagePath.length - 1].replace('jpg','');
        console.log(textAreas);
        let text = `${imageName} : ${textAreas[0].value} ${textAreas[1].value}`;
        ga('send', {
            hitType: 'event',
            eventCategory: 'Meme Downloaded',
            eventAction: text,
            eventLabel: 'Meme Downloaded'
        });
    };



    clearCanvas = ()=> {
        this.props.canvas.clear();
    };

    render = ()=> {
        const {format, lang} = this.props;
        const FORMAT_BUTTON_TEXT = format === 'normal' ? 'Dank Meme Format' : "Normal Meme Format";
        const ADD_TEXT_LINE = lang === 'he' ? "הוספת שורת טקסט" : "Add a Text Line";
        const ADD_AN_ITEM = lang === 'he' ? "הוספת פריט" : "Add an Item";
        const CLEAR_ALL = lang === 'he' ? "נקה הכל" : "Clear All";
        const DOWNLOAD = lang === 'he' ? "הורדה" : "Download";

        return (
            <div>
                <div>
                    {this.props.textControls}
                </div>
                <div className="flex space-between">
                    <CanvasResizer />
                    <GeneratorUploader />
                </div>

                <div className="flex space-between">
                    <Button
                        text={ADD_TEXT_LINE}
                        icon="glyphicon glyphicon-plus"
                        style="auto" click={this.addTextLine} />
                    <Button text={ADD_AN_ITEM} icon="glyphicon glyphicon-sunglasses"
                            click={this.toggleItemsArea} />
                </div>

                {this.state.itemsAreaShown ? <ItemsArea /> : ''}

                <Button text={FORMAT_BUTTON_TEXT}
                        style="format-changer"
                        icon="glyphicon glyphicon-retweet"
                        click={this.changeFormat} />
                <Button text={CLEAR_ALL}
                        icon="glyphicon glyphicon-stop"
                        click={this.clearCanvas} />


                <Button text={DOWNLOAD}
                        icon="glyphicon glyphicon-download-alt"
                        style="download"
                        click={this.download} />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        textControls: state.textControls,
        format: state.format,
        canvas: state.canvas,
        lang : state.lang,
        activeImage : state.activeImage,

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ modifyTextInputsAmount, changeFormat }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInputsContainer)