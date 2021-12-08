import React, { useState } from 'react';
import logo from 'assets/images/logo.png';
import { Link } from "react-router-dom"
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, FormGroup, Input, Label } from "reactstrap"
export default function Footer() {
  const [ show, setShow ] = useState(false)
  return (
    <div className="flex bg-black text-white" style={{padding: '10px 50px 10px 30px'}}>
        <div className="pt-4">
            <img src={logo} width="100" alt="logo" />
        </div>
        <div className="pt-12 px-4">
            @2021 dca.trading All Rights Reserved
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col px-4">
            About dca.trading<br/>
            <small><Link to="/about">About us</Link></small>
            <small><Link to="/faq">FAQ</Link></small>
            <small><a onClick={() => setShow(true)}>Contact us</a></small>
        </div>
        <div>
            Legal<br/>
            <small><Link to="/privacy_policy"> Privacy policy</Link></small><br/>
            <small><Link to="/terms_of_service"> Terms of service </Link> </small>
        </div>
        <Modal
            fade={false}
            isOpen={show}
        >
            <ModalHeader>
            Contact Us
            </ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="exampleEmail">
                Title
                </Label>
                <Input
                name="title"
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                Content
                </Label>
                <Input
                type="textarea" rows="6"
                />
            </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Button
                color="primary"
                onClick={() => setShow(false)}
            >
                Submit
            </Button>
            {' '}
            <Button onClick={() => setShow(false)}>
                Cancel
            </Button>
            </ModalFooter>
        </Modal>
    </div>
  );
}
