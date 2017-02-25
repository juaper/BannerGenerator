import React, { Component } from 'react';
import {connect} from 'react-redux';
import { setHeightAndWidth, setHeightAndWidthAccordingToNewFormat } from '../../modules/CanvasImageController';
export class GeneratorUploader extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = ()=>{
        this.initializeFileUploadElement();
    };

    initializeFileUploadElement = ()=>{

        const handleFileSelect = this.handleFileSelect;
        document.getElementById('generator-uploader').addEventListener('change', handleFileSelect, false);
    };

    handleFileSelect = (event)=>{
        localStorage.clear();
        const {activeImage, generatorDisplayToggle} = this.props;
        const files = event.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        let filesCounter = 0;
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            const reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    // Render thumbnail.
                    localStorage.setItem( `item_${++filesCounter}`, e.target.result);
                };
            })(f);
            reader.readAsDataURL(f);

        }
        setTimeout(()=>{this.addItemsToCanvas()}, 1000)

    };


    addItemsToCanvas = ()=>{
        console.log(localStorage,'ls')
        for(var prop in localStorage){
            this.addImageToCanvas(localStorage[prop])
        }
    };

    addImageToCanvas = (item)=>{
        const { canvas } = this.props;
        const randomX = (Math.floor(Math.random() * canvas.width) + 1) /2;
        const randomY = (Math.floor(Math.random() * canvas.height) + 1) / 2;
        fabric.Image.fromURL(item, function (image) {
            image = setHeightAndWidth(image, 100);
            image.left = randomX
            image.top = randomY;
            canvas.add(image);
            image.set({hoverCursor: "default"});
            image.lockMovementX = false;
            image.lockMovementY = false;
            image.hasBorders = true;
            image.selectable = true;
            canvas.bringForward(image);

        });
    };

    render = ()=> {
        const { text,icon , click } = this.props;

        return (
            <div className="generator-uploader-wrapper">
                <input type="file" name="files[]" id="generator-uploader" className="inputfile" multiple/>
                <label htmlFor="generator-uploader" className="utils_button">
                    <span className="glyphicon glyphicon-picture"/>
                    <span> העלאת תמונות </span>
                </label>
            </div>
        );
    }
}




function mapStateToProps(state) {
    return {
        canvas : state.canvas
    }
}


export default connect(mapStateToProps)(GeneratorUploader)
