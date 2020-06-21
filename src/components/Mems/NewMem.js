import React, {Component} from 'react'
import axios from 'axios';
import {Container, Row, Col, Form, Input, Button, Modal} from "reactstrap";
import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';


const styles = {
    editor: {
        border: '1px solid gray',
        minHeight: '20em'
    }
};

/**
 * Logic to create a new mem
 */
class NewMem extends Component {
    //constructor
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            mems: [],
            editorState: EditorState.createEmpty(),
            modal:false,
        };

        this.onChange = (editorState) => this.setState({editorState});

        this.setEditor = (editor) => {
            this.editor = editor;
        };

        this.focusEditor = () => {
            if (this.editor) {
                this.editor.focus();
            }
        };

        this.toggleModal = () => {
            if (this.state.modal) {
                this.createEmem();
            }
            this.setState({modal: !this.state.modal});
        };

    }

    componentDidMount() {
        this.focusEditor();
    }

    //create a new event
    createEmem() {
        var newThought = this.getPlainText();

        if (newThought.length > 5) {
            const ememObject = {
                title: 'Missing title...',
                description: this.getPlainText(),
            };

            axios.post("/v1/mems", ememObject)
                .then((res) => {
                    //TODO: Update texts
                    console.log(res.data)
                }).catch((error) => {
                    alert(error);
            });
        }
    }

    getPlainText() {
        const { blocks } = convertToRaw(this.state.editorState.getCurrentContent());
        const mappedBlocks = blocks.map(
            block => (!block.text.trim() && "\n") || block.text,
        );

        return mappedBlocks.reduce((acc, block) => {
            let returned = acc;
            if (block === "\n") returned += block;
            else returned += `${block}\n`;
            return returned;
        }, "");
    }


    //render
    render() {
            return (
            <>
                {/* Modal */}
                <Button
                    className="btn-round"
                    color="success"
                    type="button"
                    onClick={this.toggleModal}
                    id="btnOpenModal"
                >
                    Create
                </Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    dialogClassName="modal-thought"
                >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={this.toggleModal}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                        <h5
                            className="modal-title text-center"
                            id="exampleModalLabel"
                        >
                           Release your self.
                        </h5>
                    </div>
                    <div style={styles.editor} >
                        <div className="modal-body">
                            <Editor
                                ref={this.setEditor}
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="left-side">
                            <Button
                                className="btn-link"
                                color="success"
                                type="button"
                                onClick={this.toggleModal}
                                id="btnSave"
                            >
                                Save
                            </Button>
                        </div>
                        <div className="divider" />
                        <div className="right-side">
                            <Button className="btn-link" color="danger" type="button" onClick={this.toggleModal}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>


            </> )


    }
}

export default NewMem