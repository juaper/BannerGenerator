import React, { Component } from 'react';
import {connect} from 'react-redux';
import data from '../../data/items-data';
import { setHeightAndWidth, setHeightAndWidthAccordingToNewFormat } from '../../modules/CanvasImageController';
import ItemRemover from './ItemRemover';

export  class ItemsArea extends Component {
    constructor(props){
        super(props);
        this.state = {
            data :data
        }
    }

    addItem = (event)=>{
        const src = event.target.src;
        const { canvas } = this.props;
        const self= this;
        fabric.Image.fromURL(src, function(image) {
            image = setHeightAndWidth(image, 120, 120);
            image.left = canvas.width / 2;
            image.top = canvas.height / 2;
            canvas.add(image);
            image.lockSkewingX = false;
            image.lockSkewingY = false;
            self.bringAllTextForward()
        });

    };

    bringAllTextForward = ()=>{
        const {canvas} = this.props;
        for(var i = 0; i < canvas.getObjects().length; i++){
            if(canvas.getObjects()[i].text ){
                if(  canvas.getObjects()[i].text.length > 1){
                    if(canvas.getObjects()[i]._stroke === '#fff'){
                        canvas.getObjects()[i].bringToFront();
                    }
                }
            }
        }
    };


    clearSelectedItem(){
        if(this.props.canvas.getActiveObject()){
            this.props.canvas.getActiveObject().remove();
        }
    };


    renderItems = ()=>{
        return this.state.data.map((item) => <div ><img onClick={this.addItem} src={`./public/images/meme_items/${item}`} /></div>)
    };

    render = ()=> {
        return (
            <div className="items_area">

                <div className="items_wrapper">
                    <ItemRemover/>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        canvas : state.canvas
    }
}



export default connect(mapStateToProps)(ItemsArea)