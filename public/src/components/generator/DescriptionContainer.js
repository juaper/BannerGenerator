import React, { Component } from 'react';
import Button from './Button';

export default class DescriptionContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSuccessMessage : false
        }
    }


    saveDescription = ()=>{
        this.props.saveDescriptionToDataBase();
        this.showSuccessMessage()
    };

    showSuccessMessage = ()=>{
        this.setState({showSuccessMessage: true})
    };

    render = ()=>{
        const { description, descriptionAuthorName,onAuthorNameChange ,formVisible, descriptionFromDataBase} = this.props;
        const { showSuccessMessage } = this.state;
        const FORM = (
            <div className="description">
                <h5> הוסיפו תיאור משלכם למם </h5>
                <textarea placeholder="תיאור המם" value={description} onChange={this.props.onDescriptionChange}/>
                <textarea placeholder="שם נותן התיאור (אופציונאלי)" value={descriptionAuthorName}
                          onChange={onAuthorNameChange}/>
                <Button style=" send_btn" click={this.saveDescription} text="שליחת תיאור המם לאישור" icon="glyphicon glyphicon-send"/>
            </div>
        );

        const SUCCESS_MESSAGE_HTML = (
            <div>
                <h3 className="hebrew">
                    תיאור המם נשלח בהצלחה והוא ממתין לאישור
                </h3>
            </div>
        );

        const MEME_DESCRIPTION = (
            <div className="description_text_container">
                <h4> תיאור המם : </h4>
                <p>{descriptionFromDataBase.text}</p>
                <h6> כותב התיאור :  </h6>
                <p className="author">{descriptionFromDataBase.author}</p>
            </div>
        )

        return (
            <div className="description_top_container">
                {formVisible && !showSuccessMessage ? FORM : null}
                {showSuccessMessage ? SUCCESS_MESSAGE_HTML : null}
                {descriptionFromDataBase.text ? MEME_DESCRIPTION : null}

            </div>
        );
    }
}