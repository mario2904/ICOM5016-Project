import React, { Component } from 'react';
import { Modal,Button,Popover, Tooltip, OverlayTrigger, Checkbox,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';



export default class ProfileAssociationModal extends Component{
  constructor (){
    super();
    this.state = {showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Button
          bsStyle="primary"
          onClick={this.open}>
          Edit
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Edit Your Association's Sponsors</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4><strong>Add A Sponsor:</strong></h4>

              <FormGroup controlId="formHorizontalEmail" >
                <Col sm={6}>
                  <ControlLabel></ControlLabel>
                  <FormControl type="text" placeholder="Sponsor Name" />
                </Col>
              </FormGroup>

                <FormGroup controlId="formControlsFile" >
                  <Col>
                    <ControlLabel>Profile Pic</ControlLabel>
                    <input type="file" id="formsControlsFile"/>
                  </Col>
                </FormGroup>

            <hr></hr>
            <h4><strong>Delete A Sponsor:</strong></h4>
              <FormGroup controlId="formHorizontalCollege">
                <Col >
                <Checkbox>Spotery</Checkbox>
                <Checkbox>Yiftee</Checkbox>
                <Checkbox>Inprende</Checkbox>
                <Checkbox>Arranca</Checkbox>
                <Checkbox>{"H3"}</Checkbox>
                <Checkbox>Sunne</Checkbox>
                <Checkbox>E-Ship</Checkbox>
                <Checkbox>Enfoque</Checkbox>

                </Col>
              </FormGroup>
          </Modal.Body>
          <Modal.Footer>

            <Button bsStyle="danger" onClick={this.close}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const radioStyle={
  display: "inline-block",
  padding: "0px 0px 0px 15px",
  margin: "10px 0px 0px 0px"
}

const radio1={
  display: "inline-block",
margin: "10px 0px 0px 0px"
}
