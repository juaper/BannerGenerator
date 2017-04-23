import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ExamplesContainer from '../components/generator/ExamplesContainer';
import DescriptionContainer from '../components/generator/DescriptionContainer';
import Button from '../components/generator/Button';
import {Modal} from 'react-bootstrap';

export class ExampleSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examples: [],
            description: '',
            descriptionFromDataBase: 'initial',
            descriptionAuthorName: '',
            showModal : false,
            uploadState : false
        }
    }

    makeRandomId = () => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    componentDidMount = () => {
        this.loadExamplesFromDataBase();
    };

    getObjectAsArray = (obj) => {
        const currentExamples = [];
        for (let prop in obj) {
            const currentVal = obj[prop];
            currentExamples.push(currentVal);
        }
        return currentExamples;
    };

    loadExamplesFromDataBase = () => {
        const currentMemeNameForDataBase = this.getCurrentMemeNameForDataBase();
        const self = this;
        firebase.database().ref(`/examples/${currentMemeNameForDataBase}`).once('value').then((snapshot) => {
            const exampleObjectFromDataBase = snapshot.val();
            if (exampleObjectFromDataBase) {
                const {description, images} = exampleObjectFromDataBase;
                const currentExamples = self.getObjectAsArray(images);
                self.setState({
                    examples: currentExamples.reverse().slice(0, 3),
                    descriptionFromDataBase: description || '',
                });
            }
            else {
                self.setState({
                    descriptionFromDataBase: '',
                });
            }
        });
    };


    getCurrentMemeNameForDataBase = () => {
        const {meme} = this.props;
        //if the meme is not a string it meants it was uploaded or its a clean slate issue
        if(!(typeof meme === 'string')){
            this.setState({uploadState : true})
            return 'uploaded meme'
        };

        return meme.split('memes/').slice(-1)[0].replace(/\./g, '_dot').replace(/\//g, '_slash').replace(/ /g, '_space')
    };

    getOriginalMemeName = () => {
        return this.props.meme.split('memes/').slice(-1)[0]
    };

    saveExampleImageToDataBase = (event) => {
        //if the meme is uploaded or its a clean slate case, we will return and not save the meme to the database
        if(this.state.uploadState){
            return;
        }
        event.preventDefault();
        const self = this;
        const MEME_NAME = this.getCurrentMemeNameForDataBase();
        const RANDOM_ID = this.makeRandomId();
        const MEME_UNIQUE_NAME = `${MEME_NAME}__${RANDOM_ID}`;
        const storageRef = firebase.storage().ref();
        const memeImageRef = storageRef.child(`memes/${MEME_NAME}/${MEME_UNIQUE_NAME}.jpg`);
        const originalUrlNamePath = `memes/${MEME_NAME}/originalUrlName`;

        self.setState({showModal : true});


        document.getElementById('c').toBlob((blob) => {
            memeImageRef.put(blob).then(function (snapshot) {
                console.log(snapshot.downloadURL);
                firebase.database().ref(`examples/${MEME_NAME}/images/${MEME_UNIQUE_NAME}`).set({
                    url: snapshot.downloadURL,
                    approved: false,
                });

            });
        });

        this.saveOriginalMemeNameUrlToDataBase(originalUrlNamePath);
    };

    saveDescriptionToDataBase = () => {
        const {description, descriptionAuthorName} = this.state;
        const MEME_NAME = this.getCurrentMemeNameForDataBase();
        const descriptionPath = `examples/${MEME_NAME}/description`;
        const originalUrlNamePath = `examples/${MEME_NAME}/originalUrlName`;
        const self = this;
        firebase.database().ref(descriptionPath).set({
            text: description,
            approved: false,
            author: descriptionAuthorName,
        });
        this.saveOriginalMemeNameUrlToDataBase(originalUrlNamePath)

    };

    saveOriginalMemeNameUrlToDataBase = (originalUrlNamePath) => {
        firebase.database().ref(originalUrlNamePath).set(this.getOriginalMemeName());
    };


    onDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    };

    onAuthorNameChange = (event) => {
        this.setState({descriptionAuthorName: event.target.value})
    }


    render = () => {
        if(!this.props.visible){ return null}
        const {description, descriptionFromDataBase, descriptionAuthorName, examples} = this.state;

        const SEND_EXAMPLE_BTN = (
            <div>
                <Button style="send_btn" click={this.saveExampleImageToDataBase} text="שמרו את המם שלכם כדוגמא" icon="glyphicon glyphicon-send" />
                <p className="example_explanation hebrew">במידה ותבחר באפשרות זו, המם יישמר במאגר שלנו ויוצג כדוגמא
                    אפשרית לשימוש במם, במידה ויימצא מתאים לכך.
                </p>
            </div>
        );


        return (
            <div>
                        <DescriptionContainer description={description}
                                              formVisible={!descriptionFromDataBase}
                                              onAuthorNameChange={this.onAuthorNameChange}
                                              onDescriptionChange={this.onDescriptionChange}
                                              descriptionAuthorName={descriptionAuthorName}
                                              saveDescriptionToDataBase={this.saveDescriptionToDataBase}
                                              descriptionFromDataBase={descriptionFromDataBase}

                        />
                <div className="examples_section">
                    {SEND_EXAMPLE_BTN}
                    {examples.length ? <h5> דוגמאות לשימוש במם </h5> : null}
                    <ExamplesContainer exampleImages={examples}/>

                </div>
                <Modal show={this.state.showModal} onHide={()=> this.setState({showModal : false})} >
                    <p className="example_confirmation">
                        הדוגמא התקבלה בהצלחה והינה ממתינה לאישור.
                    </p>
                </Modal>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        data: state.data,
        lang: state.lang,
        canvas: state.canvas
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleSection)