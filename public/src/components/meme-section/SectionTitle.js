import React, {Component} from 'react';
import  '../../modules/MaterialClick';
export default class SectionTitle extends Component {

    constructor(props) {
        super(props);
    }


    getNumberOfDaysBetween = (d1, d2) => {
        let diff = Math.abs(d1.getTime() - d2.getTime());
        return diff / (1000 * 60 * 60 * 24);
    };


    isUpdatedLately = () => {

        const {dateUpdated} = this.props;
        if (!dateUpdated) {
            return false
        }

        const dateLastUpdated = new Date(dateUpdated);
        const DAYS_TO_REDUCE = 1;

        const currentDate = new Date();
        return this.getNumberOfDaysBetween(currentDate, dateLastUpdated) <= DAYS_TO_REDUCE;

    };


    getUpdatedDateInCorrectFormat = () => {
        const {dateUpdated} = this.props;
        const dateAsObject = new Date(dateUpdated)

        return `${dateAsObject.getDate()}/${dateAsObject.getMonth()}`

    };

    render = () => {

        const {text, icon} = this.props;
        const imageSrc = `./public/build-memes/meme-thumbs/${icon}`;
        const DATE_HTML = (<p className="date">
                                <span className="glyphicon glyphicon-gift"/>
                                <span>{this.getUpdatedDateInCorrectFormat()} <span className="hebrew">: עודכן לאחרונה  </span> </span>
                            </p>);
        return (
            <h2 className="meme-section-title" onClick={() => this.props.clickEvent()}>
                <img src={imageSrc} alt={text}/>
                <span className="text-container">
                    <span className="text">{text}</span>
                    {this.isUpdatedLately() ? DATE_HTML : null}
                </span>
            </h2>
        );
    }
}
