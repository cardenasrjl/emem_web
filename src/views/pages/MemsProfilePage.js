/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Button,
    Label,
    FormGroup,
    Input,
    Modal,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ListMems from "components/Mems/MemsList.js";
import NewMem from "../../components/Mems/NewMem";

function MemsProfilePage() {
    const [activeTab, setActiveTab] = React.useState("1");

    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });
    return (
        <>
            <ExamplesNavbar />
            <ProfilePageHeader />
            <div className="section profile-content">
                <Container>
                    <div className="owner">
                        <div className="avatar">
                            <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require("assets/img/faces/jorge-cardenas-pic.jpg")}
                            />
                        </div>
                    </div>
                    <Row>
                        <Col className="ml-auto mr-auto text-center" md="6">
                            <p>
                                Software developer Jorge Cardenas - Working in everyday's challenges.
                            </p>
                            <br/>
                            <NewMem />
                        </Col>
                    </Row>
                    <br />
                    <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === "1" ? "active" : ""}
                                        onClick={() => {
                                            toggle("1");
                                        }}
                                    >
                                        Your Thoughts.
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={activeTab === "2" ? "active" : ""}
                                        onClick={() => {
                                            toggle("2");
                                        }}
                                    >
                                        Books.
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                    </div>
                    {/* Your toughts*/}
                    <TabContent className="following" activeTab={activeTab}>
                        <TabPane tabId="1" id="follows">
                            <ListMems />
                        </TabPane>
                        <TabPane className="text-center" tabId="2" id="following">
                            <h3 className="text-muted">Not following anyone yet :(</h3>
                            <Button className="btn-round" color="warning">
                                Find artists
                            </Button>
                        </TabPane>
                    </TabContent>

                </Container>
            </div>
            <DemoFooter />
        </>
    );
}

export default MemsProfilePage;
