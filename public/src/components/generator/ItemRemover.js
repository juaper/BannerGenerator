import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ItemRemover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    componentDidUpdate = ()=> {
        const { canvas } = this.props;
        const self = this;
        const remover = document.querySelector(".remover");
        canvas.on("object:selected", function () {
            const activeObject = canvas.getActiveObject();
            const type = activeObject.get('type');
            if (type === 'image') {
                self.setState({ show: true });
            }
        });


    };

    removeSelectedItem = ()=> {
        const { canvas } = this.props;
        canvas.getActiveObject().remove();
        this.setState({ show: false })

    };


    render = ()=> {
        const { text, icon, click } = this.props;

        return (
            <div>
                <div className="trash" onClick={this.removeSelectedItem}>
                    <span className="glyphicon glyphicon-trash" />
                </div>)
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        canvas: state.canvas
    }
}


export default connect(mapStateToProps)(ItemRemover)
