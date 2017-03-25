import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '../components/generator/Button';
import { activeImage, generatorDisplayToggle} from '../actions/index';
export class Uploader extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount = ()=>{
        this.initializeFileUploadElement();
    };

    initializeFileUploadElement = ()=>{

        const handleFileSelect = this.handleFileSelect;
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    };

    handleFileSelect = (event)=>{
        localStorage.clear();
        const {activeImage, generatorDisplayToggle} = this.props;
        const files = event.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            const reader = new FileReader();
            const isThisMultipleFilesCase = files.length > 1;
                // Closure to capture the file information.
                let counter = 0;
                reader.onload = (function (theFile) {
                    return function (e) {
                        // Render thumbnail.
                        localStorage.setItem(isThisMultipleFilesCase ? `mult${++counter}` : 'singleImage', e.target.result);
                        activeImage(isThisMultipleFilesCase
                                                            ?
                                                              [localStorage[`mult${counter}`],localStorage[`mult${counter-1}`] ]
                                                            : [localStorage.singleImage])
                    };
                })(f);
            reader.readAsDataURL(f);
        }
         generatorDisplayToggle(true);
         document.querySelector(".cover").style.display = 'block';


    };


    render = ()=>{
        const {lang} = this.props;
        const UPLOADER_TEXT = lang === 'he' ? "העלאת תמונה" : "UPLOAD";
        return (
            <div>
                <input type="file" name="files[]" id="files" className="inputfile" multiple/>
                <label htmlFor="files" className="upload_button">
                    <span className="text">{lang ? UPLOADER_TEXT : ''}</span>
                    <span className="glyphicon glyphicon-cloud-upload"/>
                </label>
            </div>
        );
    }
}





function mapStateToProps(state) {
    return {
        textControls : state.textControls,
        format: state.format,
        lang : state.lang
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ activeImage, generatorDisplayToggle }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)