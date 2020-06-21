import React, {Component} from 'react'
import axios from 'axios';



import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";

/**
 * Logic to create a new mem
 */
class MemsList extends Component {

    //constructor
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            mems: []
        };

    }

    componentDidMount() {
        axios.get(`/v1/mems`)
            .then(res => {
                const mems = res.data;
                this.setState({mems: mems.mems});
            })
            .catch(error => {
                console.log(error.response);
            });

    }


    //render
    render() {

        function ListMems(props) {
            const mems =  props.mems;

            const listItems = mems.map((mem) =>
                <Row>
                    <Col className="ml-auto mr-auto" md="10">
                        <ul className="list-unstyled follows">
                            <li>
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="2" md="2" xs="4">
                                        <img
                                            alt="..."
                                            className="img-circle img-no-padding img-responsive"
                                            src={require("assets/img/faces/jorge-cardenas-pic.jpg")}
                                        />
                                    </Col>
                                    <Col className="ml-auto mr-auto" lg="7" md="8" xs="4">
                                        <h6>
                                            {mem.title} <br />
                                            <small>{mem.description}</small>
                                        </h6>
                                    </Col>
                                    <Col className="ml-auto mr-auto" lg="3" md="2" xs="4">
                                        <FormGroup check>
                                            <label className="label label-info mr-1">Edit</label>
                                            <label className="label label-danger mr-1">Remove</label>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </li>
                            <hr />
                        </ul>
                    </Col>
                </Row>

            );
            return listItems
        }

        return (
            <>
                <ListMems mems={this.state.mems}/>
            </>
        )
    }
}

export default MemsList