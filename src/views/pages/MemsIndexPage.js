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



// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";


import {Container } from "reactstrap";
import NewMem from "components/Mems/NewMem.js";;

function MemsIndexPage() {

    let pageHeader = React.createRef();

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("profile-page");
        return function cleanup() {
            document.body.classList.remove("profile-page");
        };
    });
    return (
        <>
            <ExamplesNavbar />
            <div
                style={{
                    backgroundImage: "url(" + require("assets/img/daniel-olahh.jpg") + ")"
                }}
                className="page-header"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter" />
                <Container>
                    <div className="motto text-center">
                        <h1>A new Day</h1>
                        <h3>What are you doing today to change your World.</h3>
                        <br />
                        <NewMem/>
                    </div>
                </Container>
            </div>
            <DemoFooter />
        </>
    );
}

export default MemsIndexPage;
