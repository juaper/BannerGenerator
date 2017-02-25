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
        const { format, changeFormat, modifyTextInputsAmount } = this.props;
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

    };

    clearCanvas = ()=> {
        this.props.canvas.clear();
    };

    render = ()=> {

        return (
            <div>
                <div>
                    {this.props.textControls}
                </div>
                <div className="flex space-between">
                    <CanvasResizer /> <GeneratorUploader />
                </div>

                <div className="flex space-between">
                    <Button text="add a text line" icon="glyphicon glyphicon-plus" click={this.addTextLine} />
                    <Button text="Add an item" icon="glyphicon glyphicon-sunglasses" click={this.toggleItemsArea} />
                </div>

                {this.state.itemsAreaShown ? <ItemsArea /> : ''}

                <Button text="Change Format" icon="glyphicon glyphicon-retweet" click={this.changeFormat} />
                <Button text="Clear All" icon="glyphicon glyphicon-stop" click={this.clearCanvas} />


                <Button text="Download" icon="glyphicon glyphicon-download-alt" style="download" click={this.download} />

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        textControls: state.textControls,
        format: state.format,
        canvas: state.canvas
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ modifyTextInputsAmount, changeFormat }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TextInputsContainer)