import React, {Component} from 'react'
import axios from 'axios';
import {Container, Row, Col, Form, Input, Button} from "reactstrap";

/**
 * Logic to create a new mem
 */
class NewMem extends Component {

    //constructor
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            mems: []
        };

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    //change description
    onChangeDescription(e) {
        this.setState({description: e.target.value})
    }

    componentDidMount() {
        axios.get(`/v1/mems`)
            .then(res => {
                const mems = res.data;
                debugger;
                this.setState({mems: mems.mems});
            })
    }

    //submit
    onSubmit(e) {
        e.preventDefault()

        const ememObject = {
            title: 'Missing title...',
            description: this.state.description,
        };

        axios.post("/v1/mems", ememObject)
            .then((res) => {
                console.log(res.data)
                debugger;
            }).catch((error) => {
            console.log(error)
        });

        this.setState({description: ''})
    }

    //render
    render() {

        function ListMems(props) {
            const mems =  props.mems;

            const listItems = mems.map((mem) =>
                <div className="row">
                    <div className="typography-line"><span className="note">{mem.id}</span>
                        <blockquote className="blockquote"><p className="mb-0">{mem.description}</p><br/>
                            <footer className="blockquote-footer">Someone famous in <cite title="source Title">Source
                                Title</cite></footer>
                        </blockquote>
                    </div>
                </div>

            );
            return listItems
        }

        return (
            <>
                <div className="section">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" md="8">
                                <h2 className="text-center">What are you thinking?</h2>
                                <Form className="contact-form" onSubmit={this.onSubmit}>
                                    <label>Message</label>
                                    <Input
                                        placeholder="Release your thoughts and feelings..."
                                        type="textarea"
                                        rows="4"
                                        value={this.state.description}
                                        name="description"
                                        onChange={this.onChangeDescription}

                                    />
                                    <Row>
                                        <Col className="ml-auto mr-auto" md="4">
                                            <Button className="btn-fill" color="danger"
                                                    size="lg" type="submit">
                                                Release
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="tim-container container">
                    <div className="title"><h3>Your recent thoughts..</h3></div>
                    <div id="typography">
                        <ListMems mems={this.state.mems} />
                    </div>
                </div>
            </>

        )
    }
}

export default NewMem