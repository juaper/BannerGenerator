import React, { Component } from 'react';
import { connect } from 'react-redux';
export class CanvasResizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasHeight: 0,
        }
    }

    componentDidMount = ()=> {
        const { canvas } = this.props;
        const container = document.querySelector('.generator__wrapper');




        this.setState({
                          canvasHeight: canvas.height,
                          canvasMaxHeight : container.offsetHeight
                      }
        )
    };

    onChange = (event)=> {
        const { canvas } = this.props;
        const value = event.target.value;
        this.setState({ canvasHeight: value });

        canvas.setHeight(value)


    };

    render = ()=> {
        const { canvas, lang } = this.props;
        const RESIZER_TEXT = lang === 'he' ? "שינוי גודל הלוח" : "Resize Canvas";

        if(window.innerWidth <= 767){
            return null;
        }
        return (
            <div className="resizer-wrapper">
                <h5 className="text-center"> {RESIZER_TEXT} </h5>
                <input type="range"
                       name="points" min='0'
                       value={this.state.canvasHeight}
                       max={900}
                       onChange={this.onChange} />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        canvas: state.canvas,
        lang : state.lang
    }
}


export default connect(mapStateToProps)(CanvasResizer)
