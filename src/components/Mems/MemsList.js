import React, {Component} from 'react'
import axios from 'axios';
import {Container, Row, Col, Form, Input, Button} from "reactstrap";

/**
 * Logic to create a new mem
 */
class MemsList extends Component {

    state = {
        mems: []
    }

    componentDidMount() {
        axios.get(`/v1/mems`)
            .then(res => {
                const mems = res.data;
                this.setState([mems]);
            })
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

export default MemsList