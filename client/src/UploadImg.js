import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Col, Container, Row, Image, ListGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import history from './history';
import userProfile from './UserProfile';
import FileReader from 'filereader';
const fs = require('fs');

var base64String = '';

const UploadImg = () => {
  const [fileURL, setFileURL] = useState();
  const [placeholder, setPlaceholder] = useState('Click here to select files (small JPEG images only)');
  const [fileSelected, setFileSelected] = useState(false);
  const [file, setFile] = useState();
  const [updated, isUpdated] = useState(0);


  function AddFile(event) {
  	console.log(event.target.files);
  	setFile(event.target.files);
  	if (!event.target.files[0]) {
  		setPlaceholder('Please select a file');
  		setFileSelected(false);
  	}
  	else {
  		setPlaceholder('File selected (' + event.target.files[0].name + ')');
  		setFileSelected(true);

      let file1 = event.target.files[0];
      let reader = new window.FileReader();
      reader.onloadend = () => {
        base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
      // reader.onload = function() {
      //     console.log(reader.result);
      // };
      };
      reader.readAsDataURL(file1);


  	}
  }
  function SessionInActive() {
    return (
      <div>
        <Container className='err401'>
          Unauthorized!
          <br/>
          <div className='errDesc'>
            <a onClick={() => history.push('/login')}> Click here to login and try again.</a>
          </div>
        </Container>
      </div>
    )
  }

  function uploadFile() {
    if(fileSelected) {
      let val = {
        fname: userProfile.getFname(),
        img: base64String
      }
      axios
        .post('uploadimg', val)
        .then(res => {
          console.log("upload done");
          history.push('/dashboard');
        })
    }

  }

  if (!userProfile.getFname()) {
    return SessionInActive();
  }
  else{
    return (
        <div>
        <br/> <br/>
        <div className="titlemain"> Welcome, {userProfile.getFname()}! </div>
        <br />
      					<Form.Row className="justify-content-md-center" >
      							<Form.Group as={Col} md="6">
      								<Form.File
      									id="photo"
      									name="photo"
      									accept=" .jpeg, .jfif |image/*"
      									onChange={AddFile.bind(this)}
      									label={placeholder}
      									custom
      								/>
      							</Form.Group>
      						</Form.Row>
      						<div className="text-center"> <br />
      							<Button disabled={!fileSelected} onClick={() => uploadFile()}> Upload image </Button>
      						</div>
          </div>
    )
  }
}

export default UploadImg;
